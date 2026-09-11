import { Artwork } from '@/data/artworks'

// Originals are one-of-a-kind, so they read as "1 piece available" rather than
// a generic "Available".
export default function StockLabel({ artwork, className = '' }: { artwork: Artwork; className?: string }) {
  const sold = !artwork.available
  const text = sold
    ? 'Sold Out'
    : artwork.category === 'Originals' ? '1 piece available' : 'Available'

  return (
    <span className={`${sold ? 'text-red-600 font-medium' : 'text-green-600'} ${className}`}>
      {text}
    </span>
  )
}

// Sits over an artwork image. The parent must be `relative`.
export function SoldOutOverlay() {
  return (
    <div className="absolute inset-0 bg-black/45 flex items-center justify-center pointer-events-none">
      <span className="border border-white/90 text-white text-[10px] sm:text-[11px] tracking-[0.25em] uppercase px-4 py-2">
        Sold Out
      </span>
    </div>
  )
}
