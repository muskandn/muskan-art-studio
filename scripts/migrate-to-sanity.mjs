/**
 * Migration script: Push existing artworks from artworks.ts to Sanity
 *
 * Usage:
 *   1. Create an API token at https://www.sanity.io/manage/project/25da9gto/api#tokens
 *      - Choose "Editor" permissions
 *   2. Run: node scripts/migrate-to-sanity.mjs YOUR_API_TOKEN
 */

import { createClient } from '@sanity/client'

const token = process.argv[2]
if (!token) {
  console.error('❌ Please provide a Sanity API token as argument')
  console.error('   node scripts/migrate-to-sanity.mjs YOUR_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: '25da9gto',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

const driveImg = (id) => `https://lh3.googleusercontent.com/d/${id}`

// All existing artworks data
const artworks = [
  // ═══ ORIGINALS ═══
  {
    title: 'Maa Durga — Divine Fury',
    category: 'Originals',
    description: 'A powerful charcoal and watercolor rendering of Maa Durga. Raw energy meets delicate detail in this large-format piece.',
    story: 'During Navratri, I was moved by the stories of Maa Durga — her fierce protection of the universe, her unwavering strength. This piece channels that divine feminine energy. The charcoal gives it raw power while the watercolor washes add a dreamlike quality, representing the balance between strength and grace.',
    externalImageUrl: driveImg('1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b'),
    externalGalleryUrls: [driveImg('1q3mvpH5H6phAMJLLyiyx9p6L-R6FVFlT')],
    medium: 'Charcoal & Watercolor on Paper',
    year: '2026',
    order: 1,
  },
  {
    title: 'Lord Shiva — The Destroyer',
    category: 'Originals',
    description: 'An intense acrylic and charcoal portrait of Lord Shiva in deep meditation. Blue tones and fierce strokes capture the cosmic energy of Mahadev.',
    story: 'Shiva has always fascinated me — the destroyer who is also the most compassionate. This painting captures that duality. The blue represents his cosmic form, while the charcoal strokes add an almost wild, untamable quality. Painting this felt like a meditation in itself.',
    externalImageUrl: driveImg('1hwX0uuQVUAxHxwpu5aBG0t_v4fn1w6RB'),
    externalGalleryUrls: [driveImg('1h_kcDozhMIm4WG92tsvCv6NQXZTAtcMQ')],
    medium: 'Acrylic & Charcoal on Canvas',
    year: '2026',
    order: 2,
  },
  {
    title: 'Lord Ganesha — Remover of Obstacles',
    category: 'Originals',
    description: 'A graceful depiction of Lord Ganesha in monochrome. Intricate details bring this beloved deity to life on canvas.',
    story: 'Ganesha is where every journey begins. I wanted this piece to feel gentle yet powerful — the monochrome palette strips away distraction and lets the form speak. Every curve and ornament was painted with reverence, a prayer in every brushstroke.',
    externalImageUrl: driveImg('1dDHqZzgsrGS-1gP4944zuKHor9FaJEYV'),
    externalGalleryUrls: [driveImg('1Y6T_5_MoxoyAYzuJueNbqgz6h2il9tcT')],
    medium: 'Acrylic on Canvas',
    year: '2026',
    order: 3,
  },
  {
    title: 'Lord Krishna — The Divine Flute',
    category: 'Originals',
    description: 'A watercolor and acrylic piece capturing Lord Krishna playing the divine flute. Soft colors and flowing composition evoke the melody of the cosmos.',
    story: 'Krishna\'s flute calls the soul home. This painting uses flowing watercolors to mirror the music — soft, ethereal, and endlessly beautiful. The golden tones represent divinity while the blues echo the infinite sky under which he played.',
    externalImageUrl: driveImg('1oOUE0mQ08hsXuhwmyskQE1CLJ1cs1h9D'),
    externalGalleryUrls: [driveImg('1qBLqQVoQ1F2yNutLf8ZD7guti4S6gBPw')],
    medium: 'Watercolor & Acrylic on Paper',
    year: '2026',
    order: 4,
  },
  {
    title: 'Hanuman — The Devoted',
    category: 'Originals',
    description: 'A striking portrayal of Lord Hanuman in red and black. Bold strokes convey devotion, strength, and unwavering courage.',
    story: 'Hanuman ji embodies pure devotion and limitless strength. The red symbolizes his fierce loyalty, while the black charcoal adds raw intensity. This was one of the most emotionally charged pieces I have ever created — I could feel the energy as I painted.',
    externalImageUrl: driveImg('1fICzrwANPjkUNQ2YP-f4NAmUoZjYEDbO'),
    externalGalleryUrls: [driveImg('1msWfUnnnjDj5MonFydIg7WDDxij2gh9c')],
    medium: 'Acrylic & Charcoal on Canvas',
    year: '2026',
    order: 5,
  },
  {
    title: 'Lord Ram — Maryada Purushottam',
    category: 'Originals',
    description: 'A regal depiction of Lord Ram with bow and arrow. Earthy tones and detailed ornamentation showcase the ideal man and king.',
    story: 'Ram represents dharma — the ideal in every role. This painting focuses on his gentle strength, the quiet determination in his eyes. The earthy tones ground the divine in the human, reminding us that righteousness is a choice we make every day.',
    externalImageUrl: driveImg('1W9XC5mEI1UEMM6aX5RQNkmpG0VTCN_gf'),
    externalGalleryUrls: [driveImg('1KpUKX7adNShSsLRdxJG930eqMQRAzUqi')],
    medium: 'Acrylic & Charcoal on Canvas',
    year: '2026',
    order: 6,
  },
  {
    title: 'Wild Horses — Freedom in Motion',
    category: 'Originals',
    description: 'A dynamic oil painting of wild horses galloping through golden light. Energy, freedom, and the raw beauty of nature captured on canvas.',
    story: 'Horses represent untamed freedom — the kind most of us only dream about. This painting captures that moment of pure motion, when muscle and wind become one. The golden light bathes them in warmth, as if nature itself is cheering them on.',
    externalImageUrl: driveImg('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH'),
    externalGalleryUrls: [driveImg('1GEmVUcFKpRc5CcITnrIre6YnmVpyZbVD')],
    medium: 'Oil on Canvas',
    year: '2026',
    order: 7,
  },
  {
    title: 'Autumn Serenity — Forest Path',
    category: 'Originals',
    description: 'A warm autumn landscape painting featuring a sunlit forest path. Golden leaves and soft light create a sense of peaceful solitude.',
    story: 'Autumn teaches us that letting go can be beautiful. This painting is about finding peace in change — the golden leaves falling, the light filtering through bare branches, the quiet path that invites you to walk and reflect.',
    externalImageUrl: driveImg('1nT22BcR8XTFeTKby1HXK-V0GpuXvM_mn'),
    externalGalleryUrls: [driveImg('17VWbJBgzdkdqIGQSbCvRkIhDrxNLjb51'), driveImg('1_mVWjd-T_Z5oZwrAE1FvtNKEFXGlV73A')],
    medium: 'Acrylic on Canvas',
    year: '2026',
    order: 8,
  },
  // ═══ PRINTS & POSTERS ═══
  {
    title: 'Print — Maa Durga',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Maa Durga painting. Signed and archival.',
    story: 'A print for those who want to bring the energy of Maa Durga into their homes. Printed on premium archival paper with gallery-grade inks.',
    externalImageUrl: driveImg('1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 9,
  },
  {
    title: 'Print — Lord Shiva',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Lord Shiva painting. Signed and archival.',
    story: 'A print capturing the cosmic energy of Mahadev. Perfect for meditation spaces and living rooms.',
    externalImageUrl: driveImg('1hwX0uuQVUAxHxwpu5aBG0t_v4fn1w6RB'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 10,
  },
  {
    title: 'Print — Lord Ganesha',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Lord Ganesha painting. Signed and archival.',
    story: 'Bring the blessings of the remover of obstacles into your space with this premium art print.',
    externalImageUrl: driveImg('1dDHqZzgsrGS-1gP4944zuKHor9FaJEYV'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 11,
  },
  {
    title: 'Print — Lord Krishna',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Lord Krishna painting. Signed and archival.',
    story: 'The divine flute player in your space — a print that brings peace, beauty, and a touch of the divine.',
    externalImageUrl: driveImg('1oOUE0mQ08hsXuhwmyskQE1CLJ1cs1h9D'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 12,
  },
  {
    title: 'Print — Hanuman',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Hanuman painting. Signed and archival.',
    story: 'The devotion and strength of Hanuman ji, now available as a premium art print for your home or office.',
    externalImageUrl: driveImg('1fICzrwANPjkUNQ2YP-f4NAmUoZjYEDbO'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 13,
  },
  {
    title: 'Print — Lord Ram',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Lord Ram painting. Signed and archival.',
    story: 'The regal presence of Maryada Purushottam Ram in a premium art print, perfect for any devotional or living space.',
    externalImageUrl: driveImg('1W9XC5mEI1UEMM6aX5RQNkmpG0VTCN_gf'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 14,
  },
  {
    title: 'Print — Wild Horses',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Wild Horses painting. Signed and archival.',
    story: 'The freedom and energy of wild horses in a premium art print that brings movement and life to any wall.',
    externalImageUrl: driveImg('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 15,
  },
  {
    title: 'Print — Autumn Serenity',
    category: 'Prints & Posters',
    description: 'Museum-quality fine art print of the original Autumn Serenity painting. Signed and archival.',
    story: 'The peaceful beauty of an autumn forest path, now available as a premium art print.',
    externalImageUrl: driveImg('1nT22BcR8XTFeTKby1HXK-V0GpuXvM_mn'),
    externalGalleryUrls: [],
    medium: 'Archival Print on Paper',
    year: '2026',
    order: 16,
  },
  // ═══ COMMISSIONS ═══
  {
    title: 'Commission — Horse Painting',
    category: 'Commissions',
    description: 'Commission a custom horse painting tailored to your vision. Choose your style, size, and color palette.',
    story: 'Every commission begins with a conversation. Tell me about the horse you envision — wild and free, gentle and noble, or something entirely unique. Together we will create a piece that speaks to your heart.',
    externalImageUrl: driveImg('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH'),
    externalGalleryUrls: [driveImg('1GEmVUcFKpRc5CcITnrIre6YnmVpyZbVD')],
    medium: 'Your Choice of Medium',
    year: '2026',
    order: 17,
  },
  {
    title: 'Commission — Lord Shiva Painting',
    category: 'Commissions',
    description: 'Commission a custom Lord Shiva painting. Choose your preferred depiction, style, and medium.',
    story: 'Shiva can be depicted in countless forms — the meditating ascetic, the cosmic dancer, the loving husband. Tell me which aspect of Mahadev resonates with you, and I will bring that vision to life on canvas.',
    externalImageUrl: driveImg('1hwX0uuQVUAxHxwpu5aBG0t_v4fn1w6RB'),
    externalGalleryUrls: [driveImg('1h_kcDozhMIm4WG92tsvCv6NQXZTAtcMQ')],
    medium: 'Your Choice of Medium',
    year: '2026',
    order: 18,
  },
  {
    title: 'Commission — Autumn Landscape',
    category: 'Commissions',
    description: 'Commission a custom autumn landscape painting. Perfect for bringing warmth and nature into your space.',
    story: 'Autumn landscapes are deeply personal — they reflect the viewer\'s own sense of nostalgia and peace. Whether you want a specific scene or a mood, I will create a landscape that feels like home.',
    externalImageUrl: driveImg('1nT22BcR8XTFeTKby1HXK-V0GpuXvM_mn'),
    externalGalleryUrls: [driveImg('17VWbJBgzdkdqIGQSbCvRkIhDrxNLjb51')],
    medium: 'Your Choice of Medium',
    year: '2026',
    order: 19,
  },
  // ═══ HOME DECOR ═══
  {
    title: 'Bird Paradise — Wall Hanging',
    category: 'Home Decor',
    description: 'A hand-painted decorative wall hanging featuring colorful birds. Adds life and vibrancy to any room.',
    story: 'Birds represent freedom and joy. This wall hanging brings that energy into your living space — hand-painted with love, each bird is unique, just like the moments they represent.',
    externalImageUrl: driveImg('1dh08JTnsGADyRTS7kIPurFK8JaUFYT-D'),
    externalGalleryUrls: [driveImg('1bhbVl4M1X57e-n9OXI6ACLLDT0fPq8MP'), driveImg('1P8ZM9UxvGYaI-Kk6HSREP9Erll9FEe9l')],
    medium: 'Acrylic on Wood Panel',
    year: '2026',
    order: 20,
  },
  {
    title: 'Vintage Clock — Wall Art',
    category: 'Home Decor',
    description: 'A hand-painted decorative wall piece featuring a vintage clock design. Functional art for your home.',
    story: 'Time is art. This wall piece merges the functional with the beautiful — a hand-painted clock design that turns your wall into a gallery.',
    externalImageUrl: driveImg('10VqB8sCPvj-d2G0SuOT-oHrmnI-_OPcW'),
    externalGalleryUrls: [driveImg('1yGwdhtnAuWFfernWtD-bOV0_iIMEEepM')],
    medium: 'Acrylic & Mixed Media on Board',
    year: '2026',
    order: 21,
  },
  {
    title: 'Hand-Painted Decorative Pot',
    category: 'Home Decor',
    description: 'A beautifully hand-painted terracotta pot. Perfect as a planter or decorative piece for your home.',
    story: 'A simple pot transformed into art. Hand-painted with intricate patterns and vibrant colors.',
    externalImageUrl: driveImg('1zihra7v9k4ijDksnzVHr_e5zC3cimWbM'),
    externalGalleryUrls: [driveImg('1Ce14uTZTewIQxxUD1l7VnCdIfOsiesId')],
    medium: 'Acrylic on Terracotta',
    year: '2026',
    order: 22,
  },
  {
    title: 'Abstract Wall Hanging',
    category: 'Home Decor',
    description: 'A bold abstract wall hanging with vibrant textures and patterns. A statement piece for modern interiors.',
    story: 'Abstract art speaks where words fail. This wall hanging brings raw emotion and color into your space.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=1BEM_H2gn1rgjnEja3a809gycErCbmDEr&sz=w1000',
    externalGalleryUrls: ['https://drive.google.com/thumbnail?id=1CWESVbSwnTkbJ4nQxp1wI5aNR3A7o3y3&sz=w1000'],
    medium: 'Acrylic & Mixed Media on Board',
    year: '2026',
    order: 23,
  },
  {
    title: 'Evil Eye — Wall Hanging',
    category: 'Home Decor',
    description: 'A hand-painted evil eye wall hanging. A protective talisman and a stunning decorative piece for your home.',
    story: 'The evil eye is a symbol of protection and good fortune across cultures.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=1mP8PKoasDkfEuLk8nVYah7Z7i_bHXIF8&sz=w1000',
    externalGalleryUrls: [],
    medium: 'Acrylic on Wood Panel',
    year: '2026',
    order: 24,
  },
  // ═══ PAINTED BAGS ═══
  {
    title: 'Floral Backpack',
    category: 'Painted Bags',
    description: 'A hand-painted backpack featuring a vibrant floral design. Functional wearable art for everyday use.',
    story: 'Why carry something ordinary when you can carry art? This backpack features hand-painted florals.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=1vXK5dWnq8KnNLVGEdyBvIKixvUOPpz0j&sz=w1000',
    externalGalleryUrls: [driveImg('1z31sQzBYKakWaRt0T8PAF-kOAeclAezz'), driveImg('1XYChz0IYNcs9vxnQFo2d08WklAP_ra2w')],
    medium: 'Acrylic on Canvas Bag',
    year: '2026',
    order: 25,
  },
  {
    title: 'Artistic Handbag — Design 1',
    category: 'Painted Bags',
    description: 'A structured handbag hand-painted with a unique artistic design. One-of-a-kind statement piece.',
    story: 'Every bag tells a story. This handbag was painted over several days, each brushstroke adding personality and flair.',
    externalImageUrl: driveImg('1uwgBSEXyr9bYjfEKDIieq1sJRUlI1uKj'),
    externalGalleryUrls: [driveImg('1KT5b_6H8nW6E2F3nlFtCR5yn3GW0gHlM')],
    medium: 'Acrylic on Faux Leather',
    year: '2026',
    order: 26,
  },
  {
    title: 'Artistic Handbag — Design 2',
    category: 'Painted Bags',
    description: 'A hand-painted handbag with bold colors and artistic patterns.',
    story: 'Dark romance meets wearable art — this handbag features deep colors and expressive patterns painted by hand.',
    externalImageUrl: driveImg('1ujrQmgxTrsBtF00N5ispjZRq12186gRT'),
    externalGalleryUrls: [driveImg('136SLnk4Kr1oehRee9pFmodtxP_0qr9l0'), driveImg('1S_Bak6tgnuUQBMQcULSV7IzgDrPtSi8m')],
    medium: 'Acrylic on Faux Leather',
    year: '2026',
    order: 27,
  },
  {
    title: 'Artistic Handbag — Design 3',
    category: 'Painted Bags',
    description: 'A beautifully crafted hand-painted handbag. Wearable art that stands out with every outfit.',
    story: 'Art is not just for walls — it belongs in your hands too.',
    externalImageUrl: driveImg('12Dqw6P1B5r__y-1JHmJyb7T3ijY0NeNF'),
    externalGalleryUrls: [driveImg('1C2PChD4ZKud5m_2n1slwezM6UUt97-fy')],
    medium: 'Acrylic on Faux Leather',
    year: '2026',
    order: 28,
  },
  // ═══ HANDMADE CARDS ═══
  {
    title: 'Handmade Greeting Card — Design 1',
    category: 'Handmade Cards',
    description: 'A beautifully hand-illustrated greeting card. Perfect for birthdays, weddings, and special occasions.',
    story: 'In a world of mass-produced cards, a handmade one speaks volumes.',
    externalImageUrl: driveImg('1oQEYC_W91kzNGVptJ8zEs_5NPCWjUQHd'),
    externalGalleryUrls: [],
    medium: 'Watercolor on Card Stock',
    year: '2026',
    order: 29,
  },
  {
    title: 'Handmade Greeting Card — Design 2',
    category: 'Handmade Cards',
    description: 'A hand-painted greeting card with floral and golden accents.',
    story: 'Love deserves art. These cards feature hand-painted details with touches of color and texture.',
    externalImageUrl: driveImg('1Woi-cokISGV75VMnYOLB7iVC0GyLPUgr'),
    externalGalleryUrls: [],
    medium: 'Watercolor & Ink on Card Stock',
    year: '2026',
    order: 30,
  },
  // ═══ PAINTED TEES ═══
  {
    title: 'Hand-Painted Tee — Design 1',
    category: 'Painted Tees',
    description: 'A one-of-a-kind hand-painted t-shirt. Wearable art that makes a bold statement.',
    story: 'Why wear something ordinary when you can wear art? Each tee is hand-painted with care.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=192WMfcOQ6NdwBUo19-K5FWDNj0oQ99oo&sz=w1000',
    externalGalleryUrls: ['https://drive.google.com/thumbnail?id=15BaZ_7SZdgOSupc1tWJJ_-cBRo1p8Ear&sz=w1000', 'https://drive.google.com/thumbnail?id=1vgGkQ0bROQ8f-NReokTlPmcJDnJRdjxE&sz=w1000'],
    medium: 'Fabric Paint on Cotton',
    year: '2026',
    order: 31,
  },
  // ═══ PORTRAITS ═══
  {
    title: 'Portrait — Style 1',
    category: 'Portraits',
    description: 'A beautifully crafted portrait capturing emotion and personality.',
    story: 'Every face tells a story. Portraits are my most intimate work.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=1Zbez5Hu1LWpE8v2CSmqNtaB9cJUhyqj2&sz=w1000',
    externalGalleryUrls: [],
    medium: 'Mixed Media',
    year: '2026',
    order: 32,
  },
  {
    title: 'Portrait — Style 2',
    category: 'Portraits',
    description: 'A striking portrait with bold strokes and vivid detail.',
    story: 'Art transforms a simple photograph into something timeless.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=1o0knzsApUHlo86-MroDIbS4gnIOP9FSx&sz=w1000',
    externalGalleryUrls: [],
    medium: 'Mixed Media',
    year: '2026',
    order: 33,
  },
  {
    title: 'Portrait — Style 3',
    category: 'Portraits',
    description: 'A delicate portrait rendered with soft tones and fine detail.',
    story: 'Some moments deserve to be immortalized in art.',
    externalImageUrl: 'https://drive.google.com/thumbnail?id=1APincQmOO6ZVqWaxvHyC6lyCtH91idOC&sz=w1000',
    externalGalleryUrls: [],
    medium: 'Mixed Media',
    year: '2026',
    order: 34,
  },
]

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function migrate() {
  console.log(`🚀 Migrating ${artworks.length} artworks to Sanity...`)

  for (let i = 0; i < artworks.length; i++) {
    const art = artworks[i]
    const slug = slugify(art.title)

    const doc = {
      _type: 'artwork',
      _id: `artwork-${slug}`,
      title: art.title,
      slug: { _type: 'slug', current: slug },
      category: art.category,
      description: art.description,
      story: art.story,
      externalImageUrl: art.externalImageUrl,
      externalGalleryUrls: art.externalGalleryUrls,
      price: null,
      medium: art.medium,
      size: 'Customizable',
      year: art.year,
      available: true,
      order: art.order,
    }

    try {
      await client.createOrReplace(doc)
      console.log(`  ✅ [${i + 1}/${artworks.length}] ${art.title}`)
    } catch (err) {
      console.error(`  ❌ [${i + 1}/${artworks.length}] ${art.title}:`, err.message)
    }
  }

  console.log('\n✨ Migration complete!')
}

migrate()
