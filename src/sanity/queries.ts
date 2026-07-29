import { client, urlFor } from './client'

// Raw Sanity artwork type
interface SanityArtwork {
  _id: string
  title: string
  slug: { current: string }
  category: string
  description: string
  story: string
  mainImage: any | null
  externalImageUrl: string | null
  galleryImages: any[] | null
  externalGalleryUrls: string[] | null
  price: string | null
  medium: string
  size: string
  year: string
  available: boolean
  order: number | null
}

// Frontend-compatible artwork type (matches existing interface)
export interface Artwork {
  id: string
  title: string
  category: string
  description: string
  story: string
  image: string
  images: string[]
  price: string | null
  medium: string
  size: string
  sizes: string[]
  year: string
  available: boolean
}

function getImageUrl(artwork: SanityArtwork): string {
  if (artwork.mainImage?.asset) {
    return urlFor(artwork.mainImage).width(1000).url()
  }
  return artwork.externalImageUrl || '/placeholder.jpg'
}

function getGalleryUrls(artwork: SanityArtwork): string[] {
  const urls: string[] = []

  // Main image first
  urls.push(getImageUrl(artwork))

  // Sanity gallery images
  if (artwork.galleryImages?.length) {
    artwork.galleryImages.forEach((img: any) => {
      if (img?.asset) {
        urls.push(urlFor(img).width(1000).url())
      }
    })
  }

  // External gallery URLs
  if (artwork.externalGalleryUrls?.length) {
    artwork.externalGalleryUrls.forEach((url: string) => {
      if (url && !urls.includes(url)) urls.push(url)
    })
  }

  return urls
}

function transformArtwork(raw: SanityArtwork): Artwork {
  return {
    id: raw.slug?.current || raw._id,
    title: raw.title,
    category: raw.category,
    description: raw.description || '',
    story: raw.story || '',
    image: getImageUrl(raw),
    images: getGalleryUrls(raw),
    price: raw.price || null,
    medium: raw.medium || '',
    size: raw.size || 'Customizable',
    sizes: ['Customizable'],
    year: raw.year || '',
    available: raw.available ?? true,
  }
}

const artworkQuery = `*[_type == "artwork"] | order(order asc) {
  _id,
  title,
  slug,
  category,
  description,
  story,
  mainImage,
  externalImageUrl,
  galleryImages,
  externalGalleryUrls,
  price,
  medium,
  size,
  year,
  available,
  order
}`

export async function getAllArtworks(): Promise<Artwork[]> {
  const raw: SanityArtwork[] = await client.fetch(artworkQuery)
  return raw.map(transformArtwork)
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  const raw: SanityArtwork | null = await client.fetch(
    `*[_type == "artwork" && slug.current == $slug][0] {
      _id, title, slug, category, description, story,
      mainImage, externalImageUrl, galleryImages, externalGalleryUrls,
      price, medium, size, year, available, order
    }`,
    { slug }
  )
  if (!raw) return null
  return transformArtwork(raw)
}

export async function getArtworksByCategory(category: string): Promise<Artwork[]> {
  const raw: SanityArtwork[] = await client.fetch(
    `*[_type == "artwork" && category == $category] | order(order asc) {
      _id, title, slug, category, description, story,
      mainImage, externalImageUrl, galleryImages, externalGalleryUrls,
      price, medium, size, year, available, order
    }`,
    { category }
  )
  return raw.map(transformArtwork)
}

export async function getCategories(): Promise<string[]> {
  return [
    'All',
    'Originals',
    'Prints & Posters',
    'Commissions',
    'Home Decor',
    'Painted Bags',
    'Handmade Cards',
    'Painted Tees',
    'Portraits',
  ]
}
