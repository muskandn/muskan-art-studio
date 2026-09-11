/**
 * Pre-build script: Fetches all artworks from Sanity and generates src/data/artworks.ts
 * Run before `next build` to ensure fresh data.
 */

import { createClient } from '@sanity/client'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '25da9gto',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Always fetch fresh data at build time
})

const query = `*[_type == "artwork"] | order(order asc) {
  _id,
  title,
  slug,
  category,
  description,
  story,
  inspiration,
  mainImage,
  externalImageUrl,
  galleryImages,
  externalGalleryUrls,
  price,
  originalPrice,
  priceFrom,
  medium,
  size,
  year,
  available,
  order
}`

// Category-wide pricing policy. Anything set in Sanity overrides these.
// Categories absent from this map stay "Price on Request".
const CATEGORY_PRICING = {
  // Originals are all one-offs at different sizes, so no fixed size is claimed.
  // Setting a real size on a piece in Sanity overrides this.
  'Originals': { price: '9999', size: 'Varies — larger than A4' },
  'Prints & Posters': { price: '699', originalPrice: '1049', size: 'A4' },
  'Handmade Cards': { price: '599' },
  'Painted Tees': { price: '2999', priceFrom: true },
  'Painted Bags': { price: '1999', priceFrom: true },
}

// Individual pieces priced differently from their category.
const PRICE_BY_SLUG = {
  'wild-horses-freedom-in-motion': '14999',
  'autumn-serenity-forest-path': '64999',
  'floral-backpack': '2999',
}

function sanityImageUrl(ref) {
  if (!ref?.asset?._ref) return null
  // Convert sanity image ref to URL
  // Format: image-{id}-{width}x{height}-{format}
  const parts = ref.asset._ref.replace('image-', '').split('-')
  const id = parts[0]
  const dims = parts[1]
  const format = parts[2]
  return `https://cdn.sanity.io/images/25da9gto/production/${id}-${dims}.${format}`
}

function getImageUrl(artwork) {
  const sanityUrl = sanityImageUrl(artwork.mainImage)
  if (sanityUrl) return sanityUrl
  return artwork.externalImageUrl || '/placeholder.jpg'
}

function getGalleryUrls(artwork) {
  const urls = []

  // Main image first
  urls.push(getImageUrl(artwork))

  // Sanity gallery images
  if (artwork.galleryImages?.length) {
    artwork.galleryImages.forEach((img) => {
      const url = sanityImageUrl(img)
      if (url) urls.push(url)
    })
  }

  // External gallery URLs
  if (artwork.externalGalleryUrls?.length) {
    artwork.externalGalleryUrls.forEach((url) => {
      if (url && !urls.includes(url)) urls.push(url)
    })
  }

  return urls
}

async function fetchAndGenerate() {
  console.log('📡 Fetching artworks from Sanity...')

  let artworks
  try {
    artworks = await client.fetch(query)
  } catch (err) {
    console.error('❌ Failed to fetch from Sanity:', err.message)
    console.log('⚠️  Using existing artworks.ts as fallback')
    return
  }

  console.log(`✅ Fetched ${artworks.length} artworks`)

  // Collect unique categories
  const categorySet = new Set(['All'])
  artworks.forEach((a) => categorySet.add(a.category))
  // Ensure order matches expected
  const categoryOrder = [
    'All', 'Originals', 'Prints & Posters', 'Commissions',
    'Home Decor', 'Painted Bags', 'Handmade Cards', 'Painted Tees', 'Portraits',
  ]
  const categories = categoryOrder.filter((c) => categorySet.has(c))
  // Add any new categories not in the predefined order
  categorySet.forEach((c) => {
    if (!categories.includes(c)) categories.push(c)
  })

  // Transform artworks
  const transformed = artworks.map((raw) => {
    const id = raw.slug?.current || raw._id
    const cat = CATEGORY_PRICING[raw.category] || {}

    // Sanity's `size` field has an initialValue of "Customizable", so treat
    // that value as "not set" rather than a real size.
    const size = raw.size && raw.size !== 'Customizable'
      ? raw.size
      : cat.size || 'Customizable'

    // Precedence: whatever is set in Sanity > per-piece fallback > category
    // policy > "Price on Request".
    const usingCategoryPrice = !raw.price && !PRICE_BY_SLUG[id]
    const price = raw.price || PRICE_BY_SLUG[id] || cat.price || null
    const originalPrice = raw.originalPrice || (usingCategoryPrice ? cat.originalPrice : null) || null
    const priceFrom = Boolean(price) && (raw.priceFrom ?? Boolean(cat.priceFrom))

    return {
      id,
      title: raw.title,
      category: raw.category,
      description: raw.description || '',
      story: raw.story || '',
      inspiration: raw.inspiration || '',
      image: getImageUrl(raw),
      images: getGalleryUrls(raw),
      price,
      originalPrice,
      priceFrom,
      medium: raw.medium || '',
      size,
      sizes: [size],
      year: raw.year || '',
      available: raw.available ?? true,
    }
  })

  // Generate TypeScript file
  const tsContent = `// AUTO-GENERATED by scripts/fetch-sanity-data.mjs — DO NOT EDIT MANUALLY
// Last generated: ${new Date().toISOString()}

export interface Artwork {
  id: string
  title: string
  category: string
  description: string
  story: string
  inspiration: string
  image: string
  images: string[]
  price: string | null
  originalPrice: string | null
  priceFrom: boolean
  medium: string
  size: string
  sizes: string[]
  year: string
  available: boolean
}

export const categories = ${JSON.stringify(categories, null, 2)}

export const artworks: Artwork[] = ${JSON.stringify(transformed, null, 2)}
`

  const outPath = join(__dirname, '..', 'src', 'data', 'artworks.ts')
  writeFileSync(outPath, tsContent, 'utf-8')
  console.log(`✅ Generated ${outPath}`)
  console.log(`   ${transformed.length} artworks in ${categories.length - 1} categories`)
}

fetchAndGenerate()
