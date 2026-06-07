import { useState } from 'react'
import type { ImageItem } from '../types'

interface GalleryProps {
  images: ImageItem[]
  onImageClick: (index: number) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  nature: 'bg-emerald-500/80',
  architecture: 'bg-amber-500/80',
  cities: 'bg-sky-500/80',
}

function GalleryCard({ img, index, onClick }: { img: ImageItem; index: number; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-xl cursor-pointer group bg-surface-raised border border-border-subtle hover:border-faint transition-all duration-500 animate-slide-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Aspect ratio container */}
      <div className="aspect-[4/3] relative overflow-hidden">
        {/* Shimmer placeholder */}
        {!loaded && (
          <div className="absolute inset-0 bg-surface-overlay animate-shimmer" />
        )}

        <img
          src={img.src}
          alt={img.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`
            w-full h-full object-cover block
            transition-all duration-700 ease-out
            group-hover:scale-[1.08]
            ${loaded ? 'opacity-100' : 'opacity-0'}
          `}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Subtle vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          {/* Category badge */}
          <span className={`self-start px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-widest text-white mb-2 ${CATEGORY_COLORS[img.category] ?? 'bg-white/20'}`}>
            {img.category}
          </span>
          <h3 className="text-base font-medium text-white leading-snug">
            {img.title}
          </h3>
        </div>

        {/* Corner accent line on hover */}
        <div className="absolute top-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute top-3 left-3 w-[1px] h-5 bg-white/50" />
          <div className="absolute top-3 left-3 w-5 h-[1px] bg-white/50" />
        </div>
        <div className="absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-3 right-3 w-[1px] h-5 bg-white/50" />
          <div className="absolute bottom-3 right-3 w-5 h-[1px] bg-white/50" />
        </div>
      </div>
    </div>
  )
}

export function Gallery({ images, onImageClick }: GalleryProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-muted animate-fade-in">
        <p className="text-lg font-light">No images found in this category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
      {images.map((img, i) => (
        <GalleryCard
          key={img.id}
          img={img}
          index={i}
          onClick={() => onImageClick(i)}
        />
      ))}
    </div>
  )
}
