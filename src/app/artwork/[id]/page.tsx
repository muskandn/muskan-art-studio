import Link from 'next/link'
import { artworks } from '@/data/artworks'
import ArtworkClient from './ArtworkClient'

export function generateStaticParams() {
  return artworks.map((art) => ({ id: art.id }))
}

export default function ArtworkPage({ params }: { params: { id: string } }) {
  const artwork = artworks.find(a => a.id === params.id)

  if (!artwork) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-editorial text-4xl mb-4">Artwork Not Found</h1>
          <p className="text-[var(--text-muted)] mb-8">The piece you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/shop" className="btn-primary inline-block">Back to Gallery</Link>
        </div>
      </div>
    )
  }

  return <ArtworkClient artwork={artwork} />
}
