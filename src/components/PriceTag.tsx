import { Artwork } from '@/data/artworks'

export default function PriceTag({ artwork, variant = 'card' }: { artwork: Artwork; variant?: 'card' | 'detail' }) {
  const detail = variant === 'detail'

  if (!artwork.price) {
    return (
      <span className={`font-classic whitespace-nowrap ${detail ? 'text-xl text-[var(--accent)]' : 'text-xs sm:text-sm'}`}>
        Price on Request
      </span>
    )
  }

  // A sold piece shows what it went for, struck through. The StockLabel
  // rendered alongside it carries the "Sold Out" wording.
  if (!artwork.available) {
    return (
      <span className={`font-classic line-through text-[var(--text-light)] whitespace-nowrap ${detail ? 'text-2xl' : 'text-xs sm:text-sm'}`}>
        &#8377;{artwork.price}
      </span>
    )
  }

  const price = Number(artwork.price)
  const was = Number(artwork.originalPrice)
  const discount = was > price ? Math.round((1 - price / was) * 100) : 0

  return (
    <span className={`flex items-baseline whitespace-nowrap ${detail ? 'gap-3' : 'gap-1.5'}`}>
      <span className={`font-classic ${detail ? 'text-2xl text-[var(--accent)]' : 'text-xs sm:text-sm'}`}>
        &#8377;{artwork.price}
      </span>
      {artwork.priceFrom && (
        <span className={`text-[var(--text-muted)] ${detail ? 'text-xs tracking-[0.15em] uppercase' : 'text-[9px]'}`}>
          onwards
        </span>
      )}
      {discount > 0 && (
        <>
          <span className={`text-[var(--text-light)] line-through ${detail ? 'text-sm' : 'text-[10px]'}`}>
            &#8377;{artwork.originalPrice}
          </span>
          <span className={`font-medium text-green-600 ${detail ? 'text-[11px] tracking-[0.15em] uppercase' : 'text-[9px]'}`}>
            {discount}% Off
          </span>
        </>
      )}
    </span>
  )
}
