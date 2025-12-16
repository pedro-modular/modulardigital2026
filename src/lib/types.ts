// Content Types

export interface PostFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  author: string
  categories: string[]
  featured_image?: string
  seo?: {
    title?: string
    description?: string
  }
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: string
}

export interface CaseFrontmatter {
  title: string
  slug: string
  client: string
  industry: string
  services: string[]
  results: Array<{
    metric: string
    value: string
  }>
  featured_image?: string
  year: number
}

export interface CaseStudy extends CaseFrontmatter {
  content: string
}

export interface ServiceFrontmatter {
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
  related_industries: string[]
}

export interface Service extends ServiceFrontmatter {
  content: string
}

export interface IndustryFrontmatter {
  title: string
  slug: string
  description: string
  icon: string
  challenges: string[]
  solutions: string[]
}

export interface Industry extends IndustryFrontmatter {
  content: string
}

// SEO Data Types

export interface Location {
  slug: string
  name: string
  region: string
  population?: number
  metro_population?: number
  type?: 'capital' | 'major_city' | 'city' | 'town'
  characteristics?: string[]
  industries?: string[]
  landmarks?: string[]
  business_context?: string
}

export interface ServiceData {
  slug: string
  name: string
  keywords: string[]
  description: string
}

export interface IndustryData {
  slug: string
  name: string
  keywords: string[]
  description: string
}

// Navigation Types

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
