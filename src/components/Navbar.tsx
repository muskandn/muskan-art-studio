'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/components/ThemeProvider'
import { artworks } from '@/data/artworks'

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  const searchResults = searchQuery.length > 1
    ? artworks.filter(a =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.medium.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : []

  const handleSearchSelect = (id: string) => {
    setSearchOpen(false)
    setSearchQuery('')
    router.push(`/artwork/${id}`)
  }

  const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[var(--bg)]/95 backdrop-blur-md border-b border-[var(--border)]' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="font-editorial text-xl lg:text-2xl tracking-[0.05em]">
            <span className="font-light">Muskan</span>{' '}
            <span className="italic font-light text-[var(--accent)]">Art</span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                className="link-underline text-[12px] tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 hover:text-[var(--accent)] transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>

            <button onClick={toggleTheme}
              className="p-2 hover:text-[var(--accent)] transition-colors" aria-label="Toggle theme">
              {theme === 'light' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              )}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 hover:text-[var(--accent)] transition-colors" aria-label="Menu">
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ SEARCH OVERLAY ═══ */}
      {searchOpen && (
        <div className="absolute top-full left-0 right-0 bg-[var(--bg)] border-b border-[var(--border)] shadow-lg animate-fade-in">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4">
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-[var(--text-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search artworks, categories, mediums..."
                className="w-full bg-transparent pl-7 pr-8 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-light)] outline-none border-b border-[var(--border)] focus:border-[var(--accent)] transition-colors"
              />
              <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-[var(--text-light)] hover:text-[var(--text)]">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-3 space-y-1">
                {searchResults.map(art => (
                  <button key={art.id} onClick={() => handleSearchSelect(art.id)}
                    className="flex items-center gap-4 w-full text-left py-2.5 px-2 hover:bg-[var(--bg-warm)] transition-colors rounded">
                    <img src={art.image} alt={art.title} className="w-10 h-12 object-cover flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-display truncate">{art.title}</p>
                      <p className="text-[10px] tracking-[0.1em] uppercase text-[var(--text-light)]">{art.category} · {art.medium}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {searchQuery.length > 1 && searchResults.length === 0 && (
              <p className="mt-4 text-sm text-[var(--text-light)] text-center py-4">No results found for &ldquo;{searchQuery}&rdquo;</p>
            )}
          </div>
        </div>
      )}

      {/* ═══ MOBILE MENU ═══ */}
      {mobileOpen && (
        <div className="md:hidden bg-[var(--bg)] border-t border-[var(--border)] animate-fade-in">
          <div className="px-6 py-8 space-y-5">
            {navLinks.map(link => (
              <Link key={link.label} href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-[13px] tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--text)] transition-colors font-medium">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
