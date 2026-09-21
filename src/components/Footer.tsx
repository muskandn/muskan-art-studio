import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-16 lg:py-20 transition-colors duration-400">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-16">
          <div>
            <p className="font-editorial text-2xl mb-4 tracking-wide">
              <span className="font-light">Muskan</span>{' '}
              <span className="italic font-light text-[var(--accent)]">Art</span>
            </p>
            <p className="font-classic italic text-sm text-[var(--text-muted)] leading-relaxed">
              Soft as a dream, fierce in<br />everything I create.
            </p>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-5 font-medium">Collections</p>
            <div className="space-y-3">
              <Link href="/shop" className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Originals</Link>
              <Link href="/shop" className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Prints</Link>
              <Link href="/shop" className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Commissions</Link>
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-5 font-medium">Information</p>
            <div className="space-y-3">
              <Link href="/about" className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">About the Artist</Link>
              <Link href="/contact" className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Contact</Link>
              <p className="text-sm text-[var(--text-muted)]">Shipping &amp; Returns</p>
              <p className="text-sm text-[var(--text-muted)]">FAQ</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-5 font-medium">Connect</p>
            <div className="space-y-3">
              <a href="https://www.instagram.com/logsbymuskan" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
              <a href="mailto:creativelogsmuskan@gmail.com"
                className="block text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors break-all">
                creativelogsmuskan@gmail.com
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[var(--text-light)] tracking-wide">&copy; {new Date().getFullYear()} Muskan Art Studio</p>
          <p className="text-[11px] text-[var(--text-light)] tracking-wide font-classic italic">Handcrafted with love &amp; soul</p>
        </div>
      </div>
    </footer>
  )
}
