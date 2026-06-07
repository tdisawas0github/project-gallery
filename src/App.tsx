import { useState, useCallback, useEffect } from 'react'
import { Gallery } from './components/Gallery'
import { Lightbox } from './components/Lightbox'
import { Header } from './components/Header'
import type { ImageItem, Category } from './types'

const IMAGES: ImageItem[] = [
  { id: '1', src: 'https://picsum.photos/seed/g1/800/600', title: 'Misty Mountains', category: 'nature' },
  { id: '2', src: 'https://picsum.photos/seed/g2/800/600', title: 'Glass Facade', category: 'architecture' },
  { id: '3', src: 'https://picsum.photos/seed/g3/800/600', title: 'Skyline at Dusk', category: 'cities' },
  { id: '4', src: 'https://picsum.photos/seed/g4/800/600', title: 'Forest Path', category: 'nature' },
  { id: '5', src: 'https://picsum.photos/seed/g5/800/600', title: 'Spiral Staircase', category: 'architecture' },
  { id: '6', src: 'https://picsum.photos/seed/g6/800/600', title: 'Neon Streets', category: 'cities' },
  { id: '7', src: 'https://picsum.photos/seed/g7/800/600', title: 'Ocean Waves', category: 'nature' },
  { id: '8', src: 'https://picsum.photos/seed/g8/800/600', title: 'Concrete Curves', category: 'architecture' },
  { id: '9', src: 'https://picsum.photos/seed/g9/800/600', title: 'Bridge Lights', category: 'cities' },
  { id: '10', src: 'https://picsum.photos/seed/g10/800/600', title: 'Desert Dunes', category: 'nature' },
  { id: '11', src: 'https://picsum.photos/seed/g11/800/600', title: 'Arched Window', category: 'architecture' },
  { id: '12', src: 'https://picsum.photos/seed/g12/800/600', title: 'Rooftop View', category: 'cities' },
]

const CATEGORIES: Category[] = ['all', 'nature', 'architecture', 'cities']

function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = activeCategory === 'all'
    ? IMAGES
    : IMAGES.filter((img) => img.category === activeCategory)

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null)
    document.body.style.overflow = ''
  }, [])

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null
    )
  }, [filtered.length])

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null
    )
  }, [filtered.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      <Header
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onFilter={setActiveCategory}
      />
      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pb-12">
        <Gallery images={filtered} onImageClick={openLightbox} />
      </main>
      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
        />
      )}
    </div>
  )
}

export default App
