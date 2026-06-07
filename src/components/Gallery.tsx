import type { ImageItem } from '../types'

interface GalleryProps {
  images: ImageItem[]
  onImageClick: (index: number) => void
}

export function Gallery({ images, onImageClick }: GalleryProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
      {images.map((img, i) => (
        <div
          key={img.id}
          onClick={() => onImageClick(i)}
          className="relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3] bg-[#1a1a1a] group"
        >
          <img
            src={img.src}
            alt={img.title}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-400 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <div>
              <div className="text-sm font-medium">{img.title}</div>
              <div className="text-xs text-gray-400 uppercase tracking-wider">
                {img.category}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
