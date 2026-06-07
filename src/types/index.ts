export type Category = 'all' | 'nature' | 'architecture' | 'cities'

export interface ImageItem {
  id: string
  src: string
  title: string
  category: Category
}
