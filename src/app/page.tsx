'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PriceTag from '@/components/PriceTag'
import StockLabel, { SoldOutOverlay } from '@/components/StockLabel'
import { artworks, categories, Artwork } from '@/data/artworks'

const d = (id: string) => `https://lh3.googleusercontent.com/d/${id}`

const HERO_QUOTE = 'Where every brushstroke tells a story.'

const PREVIEW_COUNT = 12

// Always shown first in the "All" mix, ahead of the category round-robin.
const PINNED_IDS = ['autumn-serenity-forest-path', 'print-autumn-serenity']

// Everything made to order, grouped behind the one Customization button.
const CUSTOM_FILTER = 'Customization'
const CUSTOM_CATEGORIES = ['Commissions', 'Home Decor', 'Painted Bags', 'Handmade Cards', 'Painted Tees', 'Portraits']

const heroSlides = [
  { title: 'Maa Durga — Divine Fury', img: d('1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b') },
  { title: 'Lord Shiva — The Destroyer', img: d('1hwX0uuQVUAxHxwpu5aBG0t_v4fn1w6RB') },
  { title: 'Wild Horses — Freedom in Motion', img: d('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH') },
  { title: 'Lord Krishna — The Divine Flute', img: d('1oOUE0mQ08hsXuhwmyskQE1CLJ1cs1h9D') },
  { title: 'Autumn Serenity — Forest Path', img: d('1nT22BcR8XTFeTKby1HXK-V0GpuXvM_mn') },
  { title: 'Lord Ganesha — Remover of Obstacles', img: d('1dDHqZzgsrGS-1gP4944zuKHor9FaJEYV') },
]

const N = heroSlides.length
// Three copies of the strip, so a neighbour is always in frame on both sides —
// including when the first or last painting is the one centred.
const heroLoop = [...heroSlides, ...heroSlides, ...heroSlides]

export default function Home() {
  const [pos, setPos] = useState(N)
  const [animating, setAnimating] = useState(true)
  const [activeCat, setActiveCat] = useState('All')

  const active = ((pos % N) + N) % N

  useEffect(() => {
    const timer = setTimeout(() => setPos(p => p + 1), 4500)
    return () => clearTimeout(timer)
  }, [active])

  // Once a slide settles outside the middle copy, hop back to the matching
  // slide in the middle copy with the transition switched off. The image on
  // screen is identical, so the hop is invisible — it just restocks the clones
  // on either side.
  useEffect(() => {
    if (pos >= 2 * N || pos < N) {
      const t = setTimeout(() => {
        setAnimating(false)
        setPos(N + active)
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [pos, active])

  // Re-arm the transition a frame after the silent hop, so the hop itself
  // never animates but the next slide does.
  useEffect(() => {
    if (animating) return
    let inner = 0
    const outer = requestAnimationFrame(() => { inner = requestAnimationFrame(() => setAnimating(true)) })
    return () => { cancelAnimationFrame(outer); cancelAnimationFrame(inner) }
  }, [animating])

  // Round-robins across the given categories so the grid reads as a spread
  // rather than a run of one category.
  const mixAcross = (cats: string[], pinned: Artwork[] = []) => {
    const mix = [...pinned]
    const taken = new Set(mix.map(a => a.id))
    const buckets = cats.map(c => artworks.filter(a => a.category === c && !taken.has(a.id)))

    for (let i = 0; mix.length < PREVIEW_COUNT; i++) {
      const before = mix.length
      buckets.forEach(b => { if (b[i] && mix.length < PREVIEW_COUNT) mix.push(b[i]) })
      if (mix.length === before) break
    }
    return mix
  }

  const galleryPreview = (() => {
    if (activeCat === CUSTOM_FILTER) return mixAcross(CUSTOM_CATEGORIES)
    if (activeCat !== 'All') return artworks.filter(a => a.category === activeCat).slice(0, PREVIEW_COUNT)

    // Commissions are left out of "All" — they're custom work, reached via the
    // Customization button rather than browsed.
    const pinned = PINNED_IDS
      .map(id => artworks.find(a => a.id === id))
      .filter((a): a is Artwork => Boolean(a))
    return mixAcross(categories.filter(c => c !== 'All' && c !== 'Commissions'), pinned)
  })()

  const collections = [
    {
      name: 'Originals',
      desc: 'One-of-a-kind paintings crafted with soul. Each piece is unique and unrepeatable.',
      img: d('1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b'),
      count: '8 pieces',
    },
    {
      name: 'Prints & Posters',
      desc: 'Museum-quality fine art prints and posters. Signed, numbered, and archival.',
      img: d('1h_kcDozhMIm4WG92tsvCv6NQXZTAtcMQ'),
      count: '8 prints',
    },
    {
      name: 'Commissions',
      desc: 'Custom artwork tailored to your vision, space, and story. Let me create for you.',
      img: d('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH'),
      count: '3 options',
    },
    {
      name: 'Home Decor',
      desc: 'Hand-painted wall hangings, decorative panels, and art pieces for your living space.',
      img: d('1dh08JTnsGADyRTS7kIPurFK8JaUFYT-D'),
      count: '5 pieces',
    },
    {
      name: 'Painted Bags',
      desc: 'Wearable art — hand-painted handbags, totes, and shoulder bags, each one-of-a-kind.',
      img: d('1uwgBSEXyr9bYjfEKDIieq1sJRUlI1uKj'),
      count: '4 pieces',
    },
    {
      name: 'Handmade Cards',
      desc: 'Beautifully illustrated greeting cards for every occasion — birthdays, weddings, and more.',
      img: d('1oQEYC_W91kzNGVptJ8zEs_5NPCWjUQHd'),
      count: '2 designs',
    },
    {
      name: 'Painted Tees',
      desc: 'Hand-painted t-shirts that turn everyday wear into wearable art. Bold, unique, and one-of-a-kind.',
      img: d('192WMfcOQ6NdwBUo19-K5FWDNj0oQ99oo'),
      count: '1 piece',
    },
    {
      name: 'Portraits',
      desc: 'Custom portrait paintings and sketches that capture the essence of your loved ones.',
      img: d('1Zbez5Hu1LWpE8v2CSmqNtaB9cJUhyqj2'),
      count: '3 pieces',
    },
  ]

  const featured = [
    { id: 'maa-durga-divine-fury', title: 'Maa Durga', medium: 'Charcoal & Watercolor', img: d('1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b') },
    { id: 'lord-shiva-the-destroyer', title: 'Lord Shiva', medium: 'Acrylic & Charcoal', img: d('1hwX0uuQVUAxHxwpu5aBG0t_v4fn1w6RB') },
    { id: 'wild-horses-freedom-in-motion', title: 'Wild Horses', medium: 'Oil on Canvas', img: d('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH') },
    { id: 'lord-ganesha-remover-of-obstacles', title: 'Lord Ganesha', medium: 'Acrylic on Canvas', img: d('1dDHqZzgsrGS-1gP4944zuKHor9FaJEYV') },
  ]

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      {/* ════════ HERO — centered slider with peeking neighbours ════════ */}
      <section className="pt-16 lg:pt-20 pb-10 lg:pb-12">
        {/* Slide width is capped in rem so the image is never scaled up past its
            natural size on wide screens, and capped against the viewport height
            so the hero always fits without scrolling. */}
        <div className="relative w-full overflow-hidden animate-fade-up"
          style={{
            animationDelay: '0.2s',
            '--slide-w': 'min(86vw, 34rem, (100vh - 11rem) * 0.8)',
            '--slide-gap': '1rem',
          } as React.CSSProperties}>

          <div className="flex transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(calc(50% - var(--slide-w) / 2 - ${pos} * (var(--slide-w) + var(--slide-gap))))`,
              ...(animating ? {} : {transition: 'none'}),
            }}>
            {heroLoop.map((s, i) => (
              <div key={i}
                onClick={() => setPos(i)}
                className={`relative flex-shrink-0 aspect-[4/5] overflow-hidden bg-[var(--border)] transition-opacity duration-[1100ms] ${
                  i === pos ? 'opacity-100' : 'opacity-40 cursor-pointer hover:opacity-60'
                }`}
                style={{width: 'var(--slide-w)', marginRight: 'var(--slide-gap)'}}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" aria-hidden={i !== pos} />
              </div>
            ))}
          </div>

          {/* Anchored over the centre frame so the quote stays put while the
              images slide beneath it. */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-2/3 w-[var(--slide-w)] bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[var(--slide-w)] p-6 sm:p-7 flex items-end justify-between gap-5">
            <div>
              <h1 className="font-classic italic text-white text-lg sm:text-xl lg:text-2xl leading-snug">
                &ldquo;{HERO_QUOTE}&rdquo;
              </h1>
              <div className="mt-5">
                <Link href="/shop" className="btn-light btn-sm inline-block">
                  Explore Gallery
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-shrink-0 pb-1.5">
              {heroSlides.map((s, i) => (
                <button key={s.title} onClick={() => setPos(pos - active + i)}
                  aria-label={`View ${s.title}`}
                  className={`w-[2px] transition-all duration-500 ${
                    i === active ? 'h-6 bg-white' : 'h-3 bg-white/40 hover:bg-white/70'
                  }`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MARQUEE STRIP ════════ */}
      <div className="py-4 border-y border-[var(--border)] overflow-hidden bg-[var(--bg)]">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {['Originals', 'Prints & Posters', 'Commissions', 'Home Decor', 'Painted Bags', 'Handmade Cards', 'Painted Tees', 'Portraits',
            'Originals', 'Prints & Posters', 'Commissions', 'Home Decor', 'Painted Bags', 'Handmade Cards', 'Painted Tees', 'Portraits'].map((item, i) => (
            <span key={i} className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-light)] flex items-center gap-12">
              {item} <span className="text-[var(--accent)]">&bull;</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════ EXPLORE GALLERY — filterable preview ════════ */}
      <section className="py-12 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-10">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3 font-medium">The Gallery</p>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light">
              Explore <span className="font-classic italic">Gallery</span>
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-[1.9] mt-5 max-w-md mx-auto font-light">
              Filter by category and find the piece that speaks to you.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-12">
            {categories.filter(c => c !== 'Commissions').map(cat => (
              <button key={cat} onClick={() => setActiveCat(cat)}
                className={`text-[10px] sm:text-[11px] tracking-[0.08em] px-3 sm:px-4 py-2 uppercase whitespace-nowrap border transition-all duration-300 ${
                  activeCat === cat
                    ? 'bg-[var(--text)] text-[var(--bg)] border-[var(--text)]'
                    : 'border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] hover:border-[var(--text)]'
                }`}>
                {cat}
              </button>
            ))}
            <button onClick={() => setActiveCat(CUSTOM_FILTER)}
              className={`text-[10px] sm:text-[11px] tracking-[0.08em] px-4 sm:px-6 py-2 uppercase whitespace-nowrap border font-medium text-white transition-all duration-300 ${
                activeCat === CUSTOM_FILTER
                  ? 'bg-[var(--accent-dark)] border-[var(--accent-dark)]'
                  : 'bg-[var(--accent)] border-[var(--accent)] hover:bg-[var(--accent-dark)] hover:border-[var(--accent-dark)]'
              }`}>
              {CUSTOM_FILTER}
            </button>
          </div>

          <div key={activeCat} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-5 sm:gap-y-12">
            {galleryPreview.map((art, i) => (
              <Link href={`/artwork/${art.id}`} key={art.id}
                className="group block animate-fade-up" style={{animationDelay: `${i * 0.07}s`}}>
                <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-[var(--border)]">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover img-zoom" />
                  {!art.available && <SoldOutOverlay />}
                </div>
                <h3 className="font-display text-sm sm:text-base truncate">{art.title}</h3>
                <p className="text-[var(--text-light)] text-[11px] mt-0.5">{art.medium}</p>
                <p className="text-[var(--text-light)] text-[9px] tracking-[0.1em] uppercase mt-0.5">{art.category}</p>
                {(art.category === 'Originals' || !art.available) && (
                  <StockLabel artwork={art} className="block text-[9px] tracking-[0.1em] uppercase mt-0.5" />
                )}
                <div className="flex items-center justify-between gap-2 mt-1.5">
                  <PriceTag artwork={art} />
                  <span className="hidden lg:inline-block text-[10px] tracking-[0.1em] uppercase text-[var(--accent)] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-14">
            <Link href={activeCat === 'All' || activeCat === CUSTOM_FILTER ? '/shop' : `/shop?category=${encodeURIComponent(activeCat)}`}
              className="btn-primary inline-block">
              View All Works
            </Link>
            <Link href="/contact" className="btn-outline inline-block">
              Request a Custom Piece
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ COLLECTIONS — text under images ════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-16">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3 font-medium">Browse by</p>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light">
                The <span className="font-classic italic">Collections</span>
              </h2>
            </div>
            <Link href="/shop" className="hidden sm:block link-underline text-[12px] tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-medium">
              View All &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8">
            {collections.map((col, i) => (
              <Link href={`/shop?category=${encodeURIComponent(col.name)}`} key={col.name}
                className="group block animate-fade-up"
                style={{animationDelay: `${i * 0.12}s`}}>
                <div className="aspect-[3/4] overflow-hidden bg-[var(--border)]">
                  <img src={col.img} alt={col.name}
                    className="w-full h-full object-cover img-zoom" />
                </div>
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-editorial text-lg sm:text-xl lg:text-2xl font-light">{col.name}</h3>
                    <span className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[var(--text-light)]">{col.count}</span>
                  </div>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed mb-2 font-light line-clamp-2">{col.desc}</p>
                  <span className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[var(--accent)] group-hover:tracking-[0.2em] transition-all duration-500 font-medium">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FEATURED WORKS ════════ */}
      <section className="py-24 lg:py-32 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-3 font-medium">Selected works</p>
            <h2 className="font-editorial text-4xl sm:text-5xl font-light">
              <span className="font-classic italic">Featured</span> Pieces
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {featured.map((art, i) => (
              <Link href={`/artwork/${art.id}`} key={i}
                className="group block animate-fade-up" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="aspect-[3/4] overflow-hidden mb-3 bg-[var(--border)]">
                  <img src={art.img} alt={art.title}
                    className="w-full h-full object-cover img-zoom" />
                </div>
                <h3 className="font-display text-sm sm:text-base">{art.title}</h3>
                <p className="text-[var(--text-light)] text-[11px] mt-0.5">{art.medium}</p>
                <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--accent)] mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details &rarr;
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/shop" className="btn-primary inline-block">
              View All Works
            </Link>
          </div>
        </div>
      </section>

      {/* ════════ ABOUT PREVIEW ════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={d('1wlp8alT_IQYz5-3SnG9SZJF3kNNFNusV')} alt="Muskan — The Artist"
                  className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:-bottom-8 sm:-right-8 bg-[var(--bg-warm)] p-6 sm:p-8 hidden sm:block">
                <p className="font-classic italic text-xl sm:text-2xl text-[var(--accent)] leading-tight">
                  &ldquo;Soft as a dream,<br />fierce in everything<br />I create.&rdquo;
                </p>
              </div>
            </div>

            <div className="max-w-lg">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 font-medium">The Artist</p>
              <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-8">
                Meet <span className="font-classic italic">Muskan</span>
              </h2>
              <p className="text-[var(--text-muted)] text-sm leading-[1.9] mb-6 font-light">
                I&apos;m an artist who finds beauty in the raw, the real, and the romantic.
                My work spans across mediums — from delicate watercolors to bold charcoal
                sketches, from dreamy florals to fierce mythological pieces.
              </p>
              <p className="text-[var(--text-muted)] text-sm leading-[1.9] mb-8 font-light">
                Every stroke carries a piece of my soul. Each artwork is a story
                waiting to find its home.
              </p>
              <Link href="/about" className="btn-outline inline-block">
                Read My Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ STUDIO STRIP ════════ */}
      <section className="py-0 overflow-hidden">
        <div className="grid grid-cols-3 gap-0">
          <div className="aspect-[4/3] overflow-hidden">
            <img src={d('1dDHqZzgsrGS-1gP4944zuKHor9FaJEYV')} alt="Studio" className="w-full h-full object-cover img-zoom" />
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <img src={d('1uC-YjXcY7HX7ktI7jU0ODT7P8z4yXcQH')} alt="Inspiration" className="w-full h-full object-cover img-zoom" />
          </div>
          <div className="aspect-[4/3] overflow-hidden">
            <img src={d('1nT22BcR8XTFeTKby1HXK-V0GpuXvM_mn')} alt="Process" className="w-full h-full object-cover img-zoom" />
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-24 lg:py-32 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-4 font-medium">Get in Touch</p>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light mb-6">
            Let&apos;s Create <span className="font-classic italic">Together</span>
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-[1.9] mb-10 max-w-lg mx-auto font-light">
            Whether you&apos;re looking for an original piece, a custom commission,
            or simply want to say hello — I&apos;d love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary inline-block">
              Get in Touch
            </Link>
            <a href="https://www.instagram.com/logsbymuskan" target="_blank" rel="noopener noreferrer"
              className="btn-outline inline-block">
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
