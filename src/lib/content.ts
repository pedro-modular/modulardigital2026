import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type {
  Post,
  PostFrontmatter,
  CaseStudy,
  CaseFrontmatter,
  Service,
  ServiceFrontmatter,
  Industry,
  IndustryFrontmatter
} from './types'

const contentDirectory = path.join(process.cwd(), 'src/content')

// Generic content loader
function getContentFiles(dir: string): string[] {
  const fullPath = path.join(contentDirectory, dir)
  if (!fs.existsSync(fullPath)) return []
  return fs.readdirSync(fullPath).filter(file => file.endsWith('.mdx') || file.endsWith('.md'))
}

function parseContent<T>(filePath: string): { frontmatter: T; content: string } {
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)
  return { frontmatter: data as T, content }
}

// Posts
export function getAllPosts(): Post[] {
  const files = getContentFiles('posts')

  return files
    .map(filename => {
      const filePath = path.join(contentDirectory, 'posts', filename)
      const { frontmatter, content } = parseContent<PostFrontmatter>(filePath)
      const stats = readingTime(content)

      return {
        ...frontmatter,
        slug: frontmatter.slug || filename.replace(/\.mdx?$/, ''),
        content,
        readingTime: stats.text
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post | undefined {
  const posts = getAllPosts()
  return posts.find(post => post.slug === slug)
}

// Case Studies
export function getAllCases(): CaseStudy[] {
  const files = getContentFiles('cases')

  return files
    .map(filename => {
      const filePath = path.join(contentDirectory, 'cases', filename)
      const { frontmatter, content } = parseContent<CaseFrontmatter>(filePath)

      return {
        ...frontmatter,
        slug: frontmatter.slug || filename.replace(/\.mdx?$/, ''),
        content
      }
    })
    .sort((a, b) => b.year - a.year)
}

export function getCaseBySlug(slug: string): CaseStudy | undefined {
  const cases = getAllCases()
  return cases.find(c => c.slug === slug)
}

// Services
export function getAllServices(): Service[] {
  const files = getContentFiles('services')

  return files.map(filename => {
    const filePath = path.join(contentDirectory, 'services', filename)
    const { frontmatter, content } = parseContent<ServiceFrontmatter>(filePath)

    return {
      ...frontmatter,
      slug: frontmatter.slug || filename.replace(/\.mdx?$/, ''),
      content
    }
  })
}

export function getServiceBySlug(slug: string): Service | undefined {
  const services = getAllServices()
  return services.find(s => s.slug === slug)
}

// Industries
export function getAllIndustries(): Industry[] {
  const files = getContentFiles('industries')

  return files.map(filename => {
    const filePath = path.join(contentDirectory, 'industries', filename)
    const { frontmatter, content } = parseContent<IndustryFrontmatter>(filePath)

    return {
      ...frontmatter,
      slug: frontmatter.slug || filename.replace(/\.mdx?$/, ''),
      content
    }
  })
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  const industries = getAllIndustries()
  return industries.find(i => i.slug === slug)
}

// Related content helpers
export function getCasesByIndustry(industry: string): CaseStudy[] {
  return getAllCases().filter(c => c.industry === industry)
}

export function getCasesByService(service: string): CaseStudy[] {
  return getAllCases().filter(c => c.services.includes(service))
}
