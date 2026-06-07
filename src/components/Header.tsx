import type { Category } from '../types'

interface HeaderProps {
  categories: Category[]
  activeCategory: Category
  onFilter: (category: Category) => void
}

export function Header({ categories, activeCategory, onFilter }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 text-center pt-10 pb-6 bg-gradient-to-b from-[#0f0f0f] from-80% to-transparent">
      <h1 className="text-3xl font-light tracking-[0.15em] uppercase mb-5">
        Gallery
      </h1>
      <div className="flex gap-2 justify-center flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onFilter(cat)}
            className={`px-5 py-1.5 rounded-full text-sm border transition-colors cursor-pointer ${
              activeCategory === cat
                ? 'border-gray-100 text-gray-100'
                : 'border-[#333] text-gray-400 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
    </header>
  )
}
