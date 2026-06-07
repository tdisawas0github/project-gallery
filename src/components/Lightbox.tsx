import type { ImageItem } from '../types'

interface LightboxProps {
  images: ImageItem[]
  currentIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export function Lightbox({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[currentIndex]

  return (
    <div
      className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-white text-3xl cursor-pointer z-[51] leading-none bg-transparent border-none"
        aria-label="Close"
      >
        &times;
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer z-[51] px-4 py-2 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none"
        aria-label="Previous"
      >
        &#10094;
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl cursor-pointer z-[51] px-4 py-2 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none"
        aria-label="Next"
      >
        &#10095;
      </button>

      <div
        className="max-w-[90vw] max-h-[90vh] text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.src}
          alt={img.title}
          className="max-w-full max-h-[80vh] rounded block"
        />
        <p className="mt-4 text-gray-300 text-sm">
          {img.title} — {img.category}
        </p>
      </div>
    </div>
  )
}
