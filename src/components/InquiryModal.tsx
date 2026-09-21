'use client'

import { useEffect, useState } from 'react'

// Contexts the modal can be opened in — controls the eyebrow label and the
// "context" field Muskan receives with the submission, so she can tell at a
// glance whether it's a purchase, a general question, or a sold-out enquiry.
export type InquiryContext = 'purchase' | 'question' | 'similar' | 'size' | 'general'

const CONTEXT_META: Record<InquiryContext, { eyebrow: string; heading: string; placeholder: string; button: string }> = {
  purchase: {
    eyebrow: 'Purchase Inquiry',
    heading: 'Enquire to Buy',
    placeholder: "I'm interested in this piece — could you share pricing, shipping and availability details?",
    button: 'Send Purchase Inquiry',
  },
  question: {
    eyebrow: 'Have a Question',
    heading: 'Ask About This Piece',
    placeholder: "Tell me what you'd like to know about this artwork…",
    button: 'Send Question',
  },
  similar: {
    eyebrow: 'Sold Out',
    heading: 'Enquire About a Similar Piece',
    placeholder: 'Loved this one — could you paint something similar for me?',
    button: 'Send Enquiry',
  },
  size: {
    eyebrow: 'Dimensions',
    heading: 'Request Exact Dimensions',
    placeholder: "Please share the exact size of this piece — I'm considering it for a specific spot.",
    button: 'Send Request',
  },
  general: {
    eyebrow: 'Say Hello',
    heading: 'Send a Message',
    placeholder: 'Tell me about your vision…',
    button: 'Send Message',
  },
}

interface Props {
  open: boolean
  onClose: () => void
  context: InquiryContext
  productName?: string
  /** Fixed for the artwork modal (product is auto-filled). Contact page uses a picker. */
  subjectOptions?: string[]
}

// Netlify captures a POST to any path where the body contains form-name=inquiry.
// The matching static form lives at public/__forms.html.
async function submitToNetlify(fields: Record<string, string>) {
  const body = new URLSearchParams({ 'form-name': 'inquiry', ...fields }).toString()
  const res = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
  if (!res.ok) throw new Error(`Submission failed (${res.status})`)
}

export default function InquiryModal({ open, onClose, context, productName, subjectOptions }: Props) {
  const meta = CONTEXT_META[context]

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(subjectOptions?.[0] || '')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')

  // Reset when reopened so a second buyer doesn't see the first buyer's data.
  useEffect(() => {
    if (open) {
      setStatus('idle'); setError('')
      setName(''); setEmail(''); setMessage('')
      setSubject(subjectOptions?.[0] || '')
    }
  }, [open, subjectOptions])

  // Esc to close, and prevent background scroll while open — matches the
  // behaviour of the existing confirmation modal.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])

  if (!open) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending'); setError('')
    try {
      await submitToNetlify({
        name, email, message,
        context,
        product: productName || subject || '',
      })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />
      <div className="relative bg-[var(--bg)] w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-[var(--text-light)] hover:text-[var(--text)] transition-colors z-10">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {status === 'sent' ? (
          <div className="p-8 sm:p-10 text-center">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)] text-white flex items-center justify-center mx-auto mb-5">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-editorial text-2xl mb-3">Message Sent</h3>
            <p className="text-[var(--text-muted)] text-sm leading-[1.9] mb-6">
              Thank you for reaching out{name ? `, ${name}` : ''}. I&apos;ll get back to you at{' '}
              <span className="text-[var(--text)]">{email}</span> within 24–48 hours.
            </p>
            <button onClick={onClose} className="btn-outline w-full text-center">Close</button>
          </div>
        ) : (
          <div className="p-8 sm:p-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--accent)] mb-3 font-medium">
              {meta.eyebrow}
            </p>
            <h3 className="font-editorial text-2xl sm:text-3xl font-light mb-2">{meta.heading}</h3>
            {productName && (
              <p className="text-[var(--text-muted)] text-sm mb-6">
                About <span className="text-[var(--text)] font-medium">{productName}</span>
              </p>
            )}
            {!productName && !subjectOptions && <div className="mb-6" />}

            <form onSubmit={handleSubmit} className="space-y-5"
              // No action attribute — the submit handler POSTs via fetch so
              // the buyer never leaves the page.
            >
              {/* Netlify honeypot: humans skip it, bots fill it, submission is dropped. */}
              <p className="hidden">
                <label>Do not fill this out: <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              </p>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                  Your Name
                </label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--border)] py-2.5 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors"
                  placeholder="Enter your name" />
              </div>

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                  Your Email
                </label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--border)] py-2.5 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors"
                  placeholder="your@email.com" />
                <p className="text-[10px] text-[var(--text-light)] mt-1.5">So I can reply to you.</p>
              </div>

              {productName ? (
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                    Regarding
                  </label>
                  <input type="text" readOnly value={productName}
                    className="w-full bg-[var(--bg-warm)] border-b border-[var(--border)] py-2.5 px-2 text-sm text-[var(--text-muted)] cursor-not-allowed" />
                </div>
              ) : subjectOptions ? (
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                    Subject
                  </label>
                  <select value={subject} onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-transparent border-b border-[var(--border)] py-2.5 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors cursor-pointer">
                    {subjectOptions.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ) : null}

              <div>
                <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                  Message
                </label>
                <textarea required rows={4} value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-transparent border-b border-[var(--border)] py-2.5 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors resize-none"
                  placeholder={meta.placeholder} />
              </div>

              {status === 'error' && (
                <p className="text-xs text-red-600">
                  {error}. Please try again, or email directly:{' '}
                  <a href="mailto:creativelogsmuskan@gmail.com" className="underline">creativelogsmuskan@gmail.com</a>
                </p>
              )}

              <button type="submit" disabled={status === 'sending'}
                className="btn-primary w-full text-center disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'sending' ? 'Sending…' : meta.button}
              </button>

              <p className="text-[10px] text-center text-[var(--text-light)] tracking-wide">
                Sends directly to Muskan — no email app opens.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
