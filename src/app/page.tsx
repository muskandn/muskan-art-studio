'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Home() {
  const d = (id: string) => `https://lh3.googleusercontent.com/d/${id}`

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

      {/* ════════ HERO — split layout ════════ */}
      <section className="pt-20 lg:pt-0 min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 py-12 lg:py-0">
              <p className="text-[11px] tracking-[0.3em] uppercase text-[var(--accent)] mb-6 animate-fade-up font-medium">
                Muskan Art Studio
              </p>
              <h1 className="animate-fade-up" style={{animationDelay: '0.12s'}}>
                <span className="block font-body font-extralight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05]">
                  Where Every
                </span>
                <span className="block font-classic italic text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[var(--accent)] leading-[1.15] mt-1">
                  Brushstroke
                </span>
                <span className="block font-body font-extralight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.05] mt-1">
                  Tells a Story
                </span>
              </h1>
              <p className="text-[var(--text-muted)] text-sm sm:text-[15px] leading-[1.9] max-w-md mt-8 mb-10 animate-fade-up font-light" style={{animationDelay: '0.24s'}}>
                Original paintings, fine art prints &amp; custom commissions —
                each piece handcrafted with love, intention, and a little bit of magic.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-up" style={{animationDelay: '0.36s'}}>
                <Link href="/shop" className="btn-primary inline-block">
                  Explore Gallery
                </Link>
                <Link href="/about" className="btn-outline inline-block">
                  My Story
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="aspect-[4/5] overflow-hidden">
                <img src={d('1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b')} alt="Featured artwork — Maa Durga"
                  className="w-full h-full object-cover" />
              </div>
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
