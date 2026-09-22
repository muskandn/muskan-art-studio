'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  title: string
  /** One-line description used in share text; falls back to the title. */
  description?: string
}

// Native share sheet on mobile (WhatsApp, Instagram, Messages, Mail all handled
// by the OS in one tap); explicit menu on desktop with the platforms buyers in
// India actually use.
export default function ShareButton({ title, description }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const currentUrl = () => (typeof window === 'undefined' ? '' : window.location.href)
  const shareText = description || title

  const handleClick = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({ title, text: shareText, url: currentUrl() })
        return
      } catch (err) {
        // User cancelled the sheet — ignore and fall through to the menu.
        if ((err as Error).name === 'AbortError') return
      }
    }
    setOpen(o => !o)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl())
      setCopied(true)
      setTimeout(() => { setCopied(false); setOpen(false) }, 1400)
    } catch {
      // Older browsers with no clipboard permission: show the URL so they can
      // long-press to copy.
      window.prompt('Copy this link:', currentUrl())
    }
  }

  const url = currentUrl()
  const encoded = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${shareText} — ${url}`)

  const targets = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodedText}`, icon: whatsappIcon },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`, icon: facebookIcon },
    { label: 'X (Twitter)', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encoded}`, icon: xIcon },
    { label: 'Email', href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodedText}`, icon: mailIcon },
  ]

  return (
    <div ref={rootRef} className="relative inline-block">
      <button onClick={handleClick}
        aria-label="Share this artwork"
        className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors font-medium">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
        </svg>
        Share
      </button>

      {open && (
        <div className="absolute z-20 top-full right-0 mt-3 w-56 bg-[var(--bg)] border border-[var(--border)] shadow-lg animate-fade-in">
          <div className="py-1.5">
            {targets.map(t => (
              <a key={t.label} href={t.href} target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-warm)] hover:text-[var(--text)] transition-colors">
                <span className="w-4 h-4 flex-shrink-0" aria-hidden>{t.icon}</span>
                {t.label}
              </a>
            ))}

            <button onClick={copyLink}
              className="flex items-center gap-3 px-4 py-2.5 w-full text-left text-[13px] text-[var(--text-muted)] hover:bg-[var(--bg-warm)] hover:text-[var(--text)] transition-colors">
              <span className="w-4 h-4 flex-shrink-0" aria-hidden>{copied ? checkIcon : linkIcon}</span>
              {copied ? 'Link copied!' : 'Copy link'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Inline monochrome glyphs — inherit `currentColor` so they follow the theme
// instead of shipping four full-colour brand marks.
const whatsappIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.15-.174.2-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.05 21.785h-.008a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.881 9.884zm8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)
const facebookIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)
const xIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const mailIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)
const linkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
  </svg>
)
const checkIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)
