'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PriceTag from '@/components/PriceTag'
import StockLabel, { SoldOutOverlay } from '@/components/StockLabel'
import { artworks, categories } from '@/data/artworks'

function ShopContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')

  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam)
    }
  }, [categoryParam])

  const filtered = artworks.filter(a => {
    const matchesCategory = activeCategory === 'All' ? a.category !== 'Prints & Posters' && a.category !== 'Commissions' : a.category === activeCategory
    const matchesSearch = searchQuery === '' ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.medium.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      {/* ════════ HERO BANNER ════════ */}
      <section className="relative pt-20 lg:pt-24">
        <div className="relative h-[35vh] sm:h-[45vh] overflow-hidden">
          <img src="https://lh3.googleusercontent.com/d/1hwX0uuQVUAxHxwpu5aBG0t_v4fn1w6RB" alt="Shop"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 w-full">
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/50 mb-3 font-medium">Gallery</p>
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-light text-white">
                {activeCategory !== 'All' ? (
                  <><span className="font-classic italic">{activeCategory}</span></>
                ) : (
                  <><span className="font-classic italic">Shop</span> Collection</>
                )}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SEARCH + FILTERS ════════ */}
      <section className="border-b border-[var(--border)] sticky top-16 lg:top-20 bg-[var(--bg)]/95 backdrop-blur-md z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between py-3 gap-4">
            <div className="flex flex-wrap gap-1 sm:gap-1.5 flex-1">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] sm:text-[11px] tracking-[0.08em] px-2.5 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 uppercase whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-[var(--text)] text-[var(--bg)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text)]'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <p className="hidden lg:block text-[11px] tracking-[0.1em] text-[var(--text-light)] uppercase flex-shrink-0">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>
        </div>
      </section>

      {/* ════════ GALLERY GRID ════════ */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-editorial text-2xl text-[var(--text-muted)] mb-3 italic">No artworks found</p>
              <p className="text-sm text-[var(--text-light)] mb-6">Try a different category or search term.</p>
              <button onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="btn-outline inline-block">
                View All Works
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-5 sm:gap-y-12">
              {filtered.map((art) => (
                <Link href={`/artwork/${art.id}`} key={art.id} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden mb-3 bg-[var(--border)]">
                    <img src={art.image} alt={art.title}
                      className="w-full h-full object-cover img-zoom" />
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
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <p className="text-[var(--text-light)] text-sm tracking-widest uppercase">Loading...</p>
      </div>
    }>
      <ShopContent />
    </Suspense>
  )
}
