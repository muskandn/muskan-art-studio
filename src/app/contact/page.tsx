'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(formData.subject + ' — ' + formData.name)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=creativelogsmuskan@gmail.com&su=${subject}&body=${body}`, '_blank')
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Navbar />

      {/* ════════ HERO ════════ */}
      <section className="relative pt-20 lg:pt-24">
        <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
          <img src="https://lh3.googleusercontent.com/d/1oQEYC_W91kzNGVptJ8zEs_5NPCWjUQHd" alt="Contact"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-12 w-full">
              <p className="text-[11px] tracking-[0.25em] uppercase text-white/50 mb-3">Say Hello</p>
              <h1 className="font-editorial text-5xl sm:text-6xl lg:text-7xl font-light text-white italic">Contact</h1>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CONTACT CONTENT ════════ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* LEFT — INFO */}
            <div>
              <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-5">Get in Touch</p>
              <h2 className="font-editorial text-4xl sm:text-5xl font-light leading-tight mb-8">
                I&apos;d Love to<br />Hear From <span className="italic">You</span>
              </h2>

              <p className="text-[var(--text-muted)] text-sm leading-[1.9] mb-10 max-w-md">
                Whether you&apos;re interested in purchasing an artwork, commissioning
                a custom piece, or just want to connect over a shared love of art —
                don&apos;t hesitate to reach out.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">Email</p>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=creativelogsmuskan@gmail.com" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                    creativelogsmuskan@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">Instagram</p>
                  <a href="https://www.instagram.com/logsbymuskan" target="_blank" rel="noopener noreferrer"
                    className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors">
                    @logsbymuskan
                  </a>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">Response Time</p>
                  <p className="text-sm text-[var(--text-muted)]">Usually within 24–48 hours</p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">Commissions</p>
                  <p className="text-sm text-[var(--text-muted)]">Currently accepting commissions. Typical turnaround is 2–4 weeks.</p>
                </div>
              </div>
            </div>

            {/* RIGHT — FORM */}
            <div className="bg-[var(--bg-warm)] p-8 sm:p-12 transition-colors">
              <h3 className="font-editorial text-2xl mb-8">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border)] py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors placeholder:text-[var(--text-light)]"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border)] py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors placeholder:text-[var(--text-light)]"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border)] py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors cursor-pointer"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Purchase Inquiry">Purchase Inquiry</option>
                    <option value="Commission Request">Commission Request</option>
                    <option value="Collaboration">Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2 font-medium">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b border-[var(--border)] py-3 text-sm text-[var(--text)] focus:border-[var(--accent)] outline-none transition-colors resize-none placeholder:text-[var(--text-light)]"
                    placeholder="Tell me about your vision..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full text-center mt-4">
                  Send Message
                </button>

                <p className="text-[10px] text-center text-[var(--text-light)] tracking-wide">
                  This will open Gmail compose with the message details
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="py-24 lg:py-32 bg-[var(--bg-warm)] transition-colors">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[var(--text-light)] mb-3 text-center">Common Questions</p>
          <h2 className="font-editorial text-4xl sm:text-5xl font-light text-center mb-16 italic">FAQ</h2>

          <div className="space-y-8">
            {[
              { q: 'Do you ship internationally?', a: 'Yes! I ship worldwide. Shipping costs vary based on size and destination. All artworks are carefully packaged to ensure safe delivery.' },
              { q: 'How do commissions work?', a: 'Start by reaching out with your vision — preferred medium, size, color palette, and any reference images. I\'ll provide a quote and timeline. A 50% deposit is required to begin work.' },
              { q: 'Are prints limited edition?', a: 'Yes, all prints are produced in limited runs. Each print is signed, numbered, and printed on museum-quality archival paper.' },
              { q: 'Can I return an artwork?', a: 'Due to the handmade nature of each piece, returns are accepted within 7 days of delivery if the artwork arrives damaged. Please contact me immediately.' },
              { q: 'How are prices determined?', a: 'Pricing is based on size, medium, complexity, and time invested. All prices are listed as "Price on Request" — reach out for current availability and pricing.' },
            ].map((faq, i) => (
              <div key={i} className="border-t border-[var(--border)] pt-6">
                <h3 className="font-display text-base sm:text-lg mb-3">{faq.q}</h3>
                <p className="text-[var(--text-muted)] text-sm leading-[1.8]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ MAP / LOCATION STRIP ════════ */}
      <section className="py-0 overflow-hidden">
        <div className="relative h-[30vh] sm:h-[40vh]">
          <img src="https://lh3.googleusercontent.com/d/1Eqjxlph19X978jzZGMe1t4l8LqSaVl5b" alt="Studio atmosphere"
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="text-center">
              <p className="font-editorial italic text-3xl sm:text-4xl text-white mb-4">
                Art connects us all
              </p>
              <Link href="/shop" className="btn-outline text-white border-white hover:bg-white hover:text-black inline-block">
                Explore the Gallery
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
