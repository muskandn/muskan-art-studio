'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PriceTag from '@/components/PriceTag'
import StockLabel, { SoldOutOverlay } from '@/components/StockLabel'
import InquiryModal, { InquiryContext } from '@/components/InquiryModal'
import { artworks, Artwork } from '@/data/artworks'

export default function ArtworkClient({ artwork }: { artwork: Artwork }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [inquiry, setInquiry] = useState<InquiryContext | null>(null)

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      {/* BREADCRUMB */}
      <div className="pt-20 lg:pt-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-[var(--text-light)]">
            <Link href="/" className="hover:text-[var(--text)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[var(--text)] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[var(--text-muted)]">{artwork.title}</span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <section className="pb-20 lg:pb-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

            {/* ═══ LEFT — IMAGES ═══ */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--border)] animate-fade-in">
                <img
                  src={artwork.images[selectedImage]}
                  alt={`${artwork.title} — View ${selectedImage + 1}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                {!artwork.available && <SoldOutOverlay />}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {artwork.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square overflow-hidden transition-all duration-300 ${
                      selectedImage === i
                        ? 'ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-[var(--bg)]'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* ═══ RIGHT — DETAILS ═══ */}
            <div className="lg:py-4">
              <div className="lg:sticky lg:top-28">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-3 font-medium">
                  {artwork.category}
                </p>
                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light mb-4 leading-tight">
                  {artwork.title}
                </h1>

                <div className="mb-6">
                  <PriceTag artwork={artwork} variant="detail" />
                </div>

                <div className="divider mb-8" />

                {/* STORY */}
                <div className="mb-8">
                  <h3 className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-3 font-medium">
                    The Story Behind This Piece
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-[1.9] font-light font-classic italic">
                    &ldquo;{artwork.story}&rdquo;
                  </p>
                </div>

                {artwork.inspiration && (
                  <div className="mb-8">
                    <h3 className="text-[10px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-3 font-medium">
                      What Inspired This
                    </h3>
                    {artwork.inspiration.split('\n\n').map((para, i) => (
                      <p key={i} className="text-[var(--text-muted)] text-sm leading-[1.9] font-light mb-3 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* SPECS */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8 py-6 border-y border-[var(--border)]">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-1 font-medium">Medium</p>
                    <p className="text-sm text-[var(--text-muted)]">{artwork.medium}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-1 font-medium">Size</p>
                    <p className="text-sm text-[var(--text-muted)]">{artwork.size}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-1 font-medium">Year</p>
                    <p className="text-sm text-[var(--text-muted)]">{artwork.year}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-1 font-medium">Status</p>
                    <StockLabel artwork={artwork} className="text-sm" />
                  </div>
                </div>

                {artwork.category === 'Originals' && (
                  <p className="text-[var(--text-muted)] text-xs leading-[1.9] -mt-4 mb-8 font-light">
                    Every original is one of a kind, so no two are the same size — all of them are
                    comfortably larger than A4.{' '}
                    <button onClick={() => setInquiry('size')}
                      className="link-underline text-[var(--accent)] font-medium">
                      Email me for the exact dimensions
                    </button>
                    {' '}of this piece.
                  </p>
                )}

                {/* ACTIONS */}
                <div className="space-y-3">
                  {!artwork.available ? (
                    <>
                      <div className="w-full py-3.5 text-[11px] tracking-[0.2em] uppercase border border-red-600 text-red-600 text-center font-medium">
                        Sold Out
                      </div>
                      <button onClick={() => setInquiry('similar')} className="btn-outline w-full text-center">
                        Enquire About a Similar Piece
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setInquiry('purchase')} className="btn-primary w-full text-center">
                        Send Purchase Inquiry
                      </button>

                      <button onClick={() => setInquiry('question')}
                        className="w-full py-3 text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors text-center">
                        Have Questions? Contact Me
                      </button>
                    </>
                  )}
                </div>

                {/* SHIPPING INFO */}
                <div className="mt-8 pt-6 border-t border-[var(--border)] space-y-3">
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H18.75m-7.5-2.25h7.5m-7.5 0v10.5m0-10.5L12 7.875M10.5 15.75h.375" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium">Worldwide Shipping</p>
                      <p className="text-[11px] text-[var(--text-light)]">Carefully packaged and insured</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium">Certificate of Authenticity</p>
                      <p className="text-[11px] text-[var(--text-light)]">Signed by the artist</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium">I&apos;ll Get Back to You</p>
                      <p className="text-[11px] text-[var(--text-light)]">Response within 24–48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <InquiryModal
        open={inquiry !== null}
        onClose={() => setInquiry(null)}
        context={inquiry ?? 'question'}
        productName={artwork.title}
      />

      {/* YOU MAY ALSO LIKE */}
      <section className="py-20 lg:py-28 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <h2 className="font-editorial text-3xl sm:text-4xl font-light mb-10">
            You May Also <span className="font-classic italic">Like</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {artworks
              .filter(a => a.id !== artwork.id)
              .slice(0, 4)
              .map((art) => (
                <Link href={`/artwork/${art.id}`} key={art.id} className="group block">
                  <div className="aspect-[3/4] overflow-hidden mb-3 bg-[var(--border)]">
                    <img src={art.image} alt={art.title} className="w-full h-full object-cover img-zoom" />
                  </div>
                  <h3 className="font-display text-sm">{art.title}</h3>
                  <p className="text-[var(--text-light)] text-[11px] mt-0.5">{art.medium}</p>
                  <span className="text-[10px] tracking-[0.1em] uppercase text-[var(--accent)] mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details &rarr;
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
