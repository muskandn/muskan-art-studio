'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section className="relative pt-20 lg:pt-24">
        <div className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
          <img src="https://lh3.googleusercontent.com/d/1wlp8alT_IQYz5-3SnG9SZJF3kNNFNusV" alt="About"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 w-full">
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-3">The Artist</p>
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-light text-white">
                About <span className="italic">Muskan</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ INTRO ════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="https://lh3.googleusercontent.com/d/1xR7XoMIAHJ9jRgJw1CrZC-41axyUutef" alt="Muskan"
                  className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 bg-[var(--bg-warm)] p-6 sm:p-10 hidden sm:block max-w-xs">
                <p className="font-editorial italic text-2xl text-[var(--accent)] leading-snug">
                  &ldquo;Soft as a dream,<br />fierce in everything<br />I create.&rdquo;
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-5">My Story</p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-light leading-tight mb-8">
                Every Stroke<br />Tells a <span className="italic">Story</span>
              </h2>

              <div className="space-y-6 text-[var(--text-muted)] text-sm leading-[1.9]">
                <p>
                  I&apos;m Muskan — an artist who finds beauty in the raw, the real, and the
                  romantic. From the quiet corners of my studio, I create art that speaks
                  before words do.
                </p>
                <p>
                  My work spans across mediums — from delicate watercolors that capture
                  fleeting moments to bold charcoal sketches that demand attention, from
                  dreamy florals that whisper softness to fierce mythological pieces that
                  roar with power.
                </p>
                <p>
                  Every stroke I make carries a piece of my soul. Whether it&apos;s the gentle
                  petals of a rose or the fierce gaze of Maa Durga, each artwork is a
                  story waiting to find its home — perhaps yours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PHILOSOPHY ════════ */}
      <section className="py-24 lg:py-32 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-5">Philosophy</p>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light leading-tight mb-10 italic">
            Art is not what you see,<br />but what you make others see.
          </h2>
          <div className="divider mx-auto mb-10" />
          <p className="text-[var(--text-muted)] text-sm leading-[1.9] max-w-2xl mx-auto">
            I believe art should evoke emotion. It should make you pause, feel something,
            and carry that feeling with you. My process is intuitive — I let the colors
            guide me, the textures speak, and the canvas breathe. Every piece I create
            is an honest conversation between me and the medium.
          </p>
        </div>
      </section>

      {/* ════════ NUMBERS ════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-center">
            {[
              { number: '3M+', label: 'Audience & Viewers' },
              { number: '50+', label: 'Original Artworks' },
              { number: '5+', label: 'Mediums Explored' },
              { number: '3', label: 'Years Creating' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-editorial text-5xl sm:text-6xl font-light text-[var(--accent)]">{stat.number}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-light)] mt-3">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ STUDIO ════════ */}
      <section className="py-24 lg:py-32 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-3">Behind the scenes</p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-light">
                From the <span className="italic">Studio</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="aspect-square overflow-hidden col-span-2 row-span-2">
              <img src="https://lh3.googleusercontent.com/d/1zVkCaNjwfxIg7VDihOB2GN_poz3aa7Gl" alt="Studio" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://lh3.googleusercontent.com/d/1nT22BcR8XTFeTKby1HXK-V0GpuXvM_mn" alt="Process" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://lh3.googleusercontent.com/d/10VqB8sCPvj-d2G0SuOT-oHrmnI-_OPcW" alt="Detail" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://lh3.googleusercontent.com/d/17VWbJBgzdkdqIGQSbCvRkIhDrxNLjb51" alt="Colors" className="w-full h-full object-cover img-zoom" />
            </div>
            <div className="aspect-square overflow-hidden">
              <img src="https://lh3.googleusercontent.com/d/1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b" alt="Inspiration" className="w-full h-full object-cover img-zoom" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ MEDIUMS ════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-3">What I Work With</p>
          <h2 className="font-editorial text-4xl sm:text-5xl font-light mb-16">
            Mediums &amp; <span className="italic">Materials</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'Acrylic on Canvas', desc: 'Bold, vibrant strokes with rich texture. My most expressive medium for florals and abstract work.' },
              { name: 'Watercolor on Paper', desc: 'Ethereal washes that capture light and movement. Perfect for landscapes and dreamy compositions.' },
              { name: 'Charcoal & Graphite', desc: 'Raw, dramatic sketches with deep contrast. Used for mythology series and portrait work.' },
              { name: 'Oil on Canvas', desc: 'Luminous, slow-drying layers that create unmatched depth and richness in every piece.' },
              { name: 'Mixed Media', desc: 'Collage, found objects, and paint combined into layered, textured narratives.' },
              { name: 'Digital & Print', desc: 'Select originals reproduced as museum-quality giclée prints on archival paper.' },
            ].map((medium) => (
              <div key={medium.name} className="border-t border-[var(--border)] pt-6">
                <h3 className="font-display text-lg mb-2">{medium.name}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-[1.8]">{medium.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CTA ════════ */}
      <section className="py-24 lg:py-32 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-4">Want to work together?</p>
          <h2 className="font-editorial text-4xl sm:text-5xl font-light mb-8">
            Let&apos;s Create Something <span className="italic">Beautiful</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop" className="btn-primary inline-block">
              Browse Gallery
            </Link>
            <Link href="/contact" className="btn-outline inline-block">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
