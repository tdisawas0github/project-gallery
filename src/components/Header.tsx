import type { Category } from '../types'

interface HeaderProps {
  categories: Category[]
  activeCategory: Category
  onFilter: (category: Category) => void
}

const CATEGORY_ICONS: Record<Category, string> = {
  all: '◈',
  nature: '❀',
  architecture: '◇',
  cities: '⬡',
}

export function Header({ categories, activeCategory, onFilter }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 animate-fade-in">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-surface/80 backdrop-blur-xl border-b border-border-subtle" />

      <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 pt-8 pb-5">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="font-serif text-4xl sm:text-[2.75rem] font-medium tracking-tight text-accent leading-tight">
            Project Gallery
          </h1>
          <p className="mt-2 text-sm text-muted tracking-wide font-light">
            A curated collection of visual moments
          </p>
        </div>

        {/* Category filter pills */}
        <nav className="flex gap-2 justify-center flex-wrap" role="tablist">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            const label = cat.charAt(0).toUpperCase() + cat.slice(1)
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => onFilter(cat)}
                className={`
                  group relative inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[13px] font-medium
                  tracking-wide uppercase transition-all duration-300 cursor-pointer border
                  ${isActive
                    ? 'bg-accent text-surface border-accent shadow-[0_0_20px_rgba(232,232,232,0.12)]'
                    : 'bg-transparent text-muted border-border hover:text-accent hover:border-faint hover:bg-surface-raised/50'
                  }
                `}
              >
                <span className={`text-[10px] transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100 group-hover:scale-110'}`}>
                  {CATEGORY_ICONS[cat]}
                </span>
                {label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
