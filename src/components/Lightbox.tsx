import { useState } from 'react'
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
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-surface/95 backdrop-blur-2xl" />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-sm"
        aria-label="Close"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M12 4L4 12M4 4l8 8" />
        </svg>
      </button>

      {/* Image counter */}
      <div className="absolute top-5 left-5 z-50 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-xs font-medium tracking-wider backdrop-blur-sm">
        {currentIndex + 1} / {images.length}
      </div>

      {/* Navigation — Previous */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110"
        aria-label="Previous image"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Navigation — Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-sm hover:scale-110"
        aria-label="Next image"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image container */}
      <div
        className="relative z-10 max-w-[92vw] max-h-[88vh] flex flex-col items-center animate-scale-in"
        onClick={(e) => e.stopPropagation()}
        key={currentIndex}
      >
        {/* Loading shimmer */}
        {!imageLoaded && (
          <div className="absolute inset-0 rounded-lg bg-surface-overlay animate-shimmer" />
        )}

        <img
          src={img.src}
          alt={img.title}
          onLoad={() => setImageLoaded(true)}
          className={`
            max-w-full max-h-[80vh] rounded-lg shadow-2xl shadow-black/50
            transition-all duration-500 ease-out
            ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}
          `}
        />

        {/* Caption */}
        <div className={`mt-5 text-center transition-all duration-500 delay-100 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <h2 className="text-lg font-serif font-medium text-accent">
            {img.title}
          </h2>
          <p className="mt-1 text-xs text-muted uppercase tracking-[0.2em] font-medium">
            {img.category}
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-1.5">
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === currentIndex
                ? 'w-6 bg-white/70'
                : 'w-1.5 bg-white/20'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
