#!/usr/bin/env npx tsx

/**
 * WordPress to MDX Migration Script
 *
 * Usage: npx tsx src/scripts/migrate-wp.ts path/to/wordpress-export.xml
 *
 * This script converts WordPress XML export files to MDX format
 * suitable for the Next.js content system.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { parseStringPromise } from 'xml2js'
import TurndownService from 'turndown'
import * as yaml from 'yaml'

/**
 * Clean the WordPress XML to handle common issues
 */
function cleanWordPressXml(xml: string): string {
  let cleaned = xml

  // Remove ALL <!DOCTYPE declarations - they should never appear inside WP export content
  // The only valid DOCTYPE would be at the very start, but WP exports don't use it
  cleaned = cleaned.replace(/<!DOCTYPE[^>]*>/gi, '')

  // Remove any complete HTML documents that leaked into meta values (WP error pages)
  // Match from <html to </html> when inside meta_value tags
  cleaned = cleaned.replace(
    /<wp:meta_value>(\s*)<html[\s\S]*?<\/html>(\s*)<\/wp:meta_value>/gi,
    '<wp:meta_value><![CDATA[]]></wp:meta_value>'
  )

  // Remove any stray XML declarations inside content (keep the first one)
  cleaned = cleaned.replace(/<\?xml[^>]*\?>/gi, (match, offset) => {
    if (offset < 100) return match
    return ''
  })

  // Fix common CDATA issues - consecutive CDATA sections
  cleaned = cleaned.replace(/\]\]>\s*<!\[CDATA\[/g, '')

  return cleaned
}

const turndown = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
})

// Custom rules for WordPress-specific elements
turndown.addRule('wpCaption', {
  filter: (node) => {
    return node.nodeName === 'DIV' && node.className?.includes('wp-caption')
  },
  replacement: (content, node) => {
    const img = (node as Element).querySelector('img')
    const caption = (node as Element).querySelector('.wp-caption-text')
    if (img) {
      const src = img.getAttribute('src') || ''
      const alt = caption?.textContent || img.getAttribute('alt') || ''
      return `\n![${alt}](${src})\n*${alt}*\n\n`
    }
    return content
  },
})

interface WordPressItem {
  title: string[]
  'wp:post_name': string[]
  'wp:post_type': string[]
  'wp:status': string[]
  'content:encoded': string[]
  'excerpt:encoded'?: string[]
  pubDate: string[]
  'dc:creator'?: string[]
  category?: Array<{ _: string; $: { domain: string } }>
  'wp:postmeta'?: Array<{
    'wp:meta_key': string[]
    'wp:meta_value': string[]
  }>
}

interface PostFrontmatter {
  title: string
  slug: string
  description: string
  date: string
  author: string
  categories: string[]
  featured_image?: string
}

interface CaseFrontmatter {
  title: string
  slug: string
  client: string
  industry: string
  services: string[]
  results: Array<{ metric: string; value: string }>
  featured_image?: string
  year: number
}

function extractCategories(item: WordPressItem): string[] {
  if (!item.category) return []
  return item.category
    .filter((cat) => cat.$.domain === 'category')
    .map((cat) => cat._)
}

function extractFeaturedImage(item: WordPressItem): string | undefined {
  if (!item['wp:postmeta']) return undefined

  const thumbnailMeta = item['wp:postmeta'].find(
    (meta) => meta['wp:meta_key']?.[0] === '_thumbnail_id'
  )

  if (thumbnailMeta) {
    // In a real migration, you'd need to look up the attachment URL
    // For now, return a placeholder path
    const thumbnailId = thumbnailMeta['wp:meta_value']?.[0]
    if (thumbnailId) {
      return `/images/posts/${thumbnailId}.jpg`
    }
  }

  return undefined
}

function cleanContent(html: string): string {
  // Remove WordPress shortcodes
  let content = html.replace(/\[.*?\]/g, '')

  // Convert to Markdown
  content = turndown.turndown(content)

  // Clean up extra whitespace
  content = content.replace(/\n{3,}/g, '\n\n')

  return content.trim()
}

async function migrateWordPress(xmlPath: string) {
  console.log(`Reading WordPress export from: ${xmlPath}`)

  const rawXml = readFileSync(xmlPath, 'utf-8')
  console.log(`File size: ${(rawXml.length / 1024 / 1024).toFixed(2)} MB`)

  console.log('Cleaning XML...')
  const xml = cleanWordPressXml(rawXml)

  console.log('Parsing XML...')
  let data: Record<string, unknown>
  try {
    data = await parseStringPromise(xml, {
      explicitArray: true,
      strict: true,
      trim: true,
    })
  } catch (parseErr) {
    console.error('XML Parse error:', parseErr)
    process.exit(1)
  }

  if (!data) {
    console.error('Parsed data is null/undefined')
    process.exit(1)
  }

  // Debug: show top-level keys
  console.log('Top-level keys:', Object.keys(data))

  // Handle different XML structures
  let items: WordPressItem[] = []

  if (data.rss?.channel?.[0]?.item) {
    items = data.rss.channel[0].item
  } else if (data.RSS?.CHANNEL?.[0]?.ITEM) {
    // Uppercase variant (strict: false can cause this)
    items = data.RSS.CHANNEL[0].ITEM
  } else {
    // Try to find items in the structure
    const findItems = (obj: Record<string, unknown>, depth = 0): WordPressItem[] => {
      if (depth > 5) return []
      for (const key of Object.keys(obj)) {
        const val = obj[key]
        if (key.toLowerCase() === 'item' && Array.isArray(val)) {
          return val as WordPressItem[]
        }
        if (val && typeof val === 'object' && !Array.isArray(val)) {
          const found = findItems(val as Record<string, unknown>, depth + 1)
          if (found.length > 0) return found
        }
        if (Array.isArray(val) && val[0] && typeof val[0] === 'object') {
          const found = findItems(val[0] as Record<string, unknown>, depth + 1)
          if (found.length > 0) return found
        }
      }
      return []
    }
    items = findItems(data as Record<string, unknown>)
  }

  if (items.length === 0) {
    console.error('Could not find items in XML. Structure:', JSON.stringify(data, null, 2).slice(0, 2000))
    process.exit(1)
  }

  console.log(`Found ${items.length} items to process`)

  const contentDir = join(process.cwd(), 'src/content')

  // Ensure directories exist
  const dirs = ['posts', 'cases', 'pages']
  for (const dir of dirs) {
    const dirPath = join(contentDir, dir)
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }
  }

  let postsCount = 0
  let pagesCount = 0
  let casesCount = 0
  let skippedCount = 0
  let errorCount = 0

  for (const item of items) {
    try {
      const postType = item['wp:post_type']?.[0]
      const status = item['wp:status']?.[0]

      // Skip drafts and non-published content
      if (status !== 'publish') {
        skippedCount++
        continue
      }

      // Skip attachments, revisions, etc.
      if (!['post', 'page', 'portfolio'].includes(postType)) {
        skippedCount++
        continue
      }

      const title = item.title?.[0] || 'Untitled'
      const rawSlug = item['wp:post_name']?.[0] || ''
      const slug = rawSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

      if (!slug) {
        console.log(`Skipping item without slug: ${title}`)
        skippedCount++
        continue
      }

      const content = item['content:encoded']?.[0] || ''
      const excerpt = item['excerpt:encoded']?.[0] || ''
      const pubDate = item.pubDate?.[0] || new Date().toISOString()
      const author = item['dc:creator']?.[0] || 'Modular Digital'
      const categories = extractCategories(item)
      const featuredImage = extractFeaturedImage(item)

      if (postType === 'post') {
      const frontmatter: PostFrontmatter = {
        title,
        slug,
        description: excerpt
          ? turndown.turndown(excerpt).slice(0, 160)
          : content.slice(0, 160).replace(/\n/g, ' '),
        date: new Date(pubDate).toISOString().split('T')[0],
        author,
        categories,
      }

      if (featuredImage) {
        frontmatter.featured_image = featuredImage
      }

      const mdxContent = `---
${yaml.stringify(frontmatter)}---

${cleanContent(content)}
`

      const filePath = join(contentDir, 'posts', `${slug}.mdx`)
      writeFileSync(filePath, mdxContent)
      console.log(`Created: posts/${slug}.mdx`)
      postsCount++
    } else if (postType === 'page') {
      const frontmatter = {
        title,
        slug,
        description: excerpt
          ? turndown.turndown(excerpt).slice(0, 160)
          : content.slice(0, 160).replace(/\n/g, ' '),
      }

      const mdxContent = `---
${yaml.stringify(frontmatter)}---

${cleanContent(content)}
`

      const filePath = join(contentDir, 'pages', `${slug}.mdx`)
      writeFileSync(filePath, mdxContent)
      console.log(`Created: pages/${slug}.mdx`)
      pagesCount++
    } else if (postType === 'portfolio') {
      // Extract portfolio-specific metadata
      const portfolioCategories = item.category
        ?.filter((cat) => cat.$.domain === 'portfolio_category')
        .map((cat) => cat._) || []

      const frontmatter: CaseFrontmatter = {
        title,
        slug,
        client: title, // Will need manual editing
        industry: portfolioCategories[0] || 'Digital',
        services: portfolioCategories.length > 0 ? portfolioCategories : ['Web Development'],
        results: [], // Will need manual editing
        year: new Date(pubDate).getFullYear(),
      }

      if (featuredImage) {
        frontmatter.featured_image = featuredImage
      }

      const mdxContent = `---
${yaml.stringify(frontmatter)}---

${cleanContent(content)}
`

      const filePath = join(contentDir, 'cases', `${slug}.mdx`)
      writeFileSync(filePath, mdxContent)
      console.log(`Created: cases/${slug}.mdx`)
      casesCount++
    }
    } catch (err) {
      const title = item.title?.[0] || 'unknown'
      console.error(`Error processing item "${title}":`, err instanceof Error ? err.message : err)
      errorCount++
    }
  }

  console.log('\n--- Migration Complete ---')
  console.log(`Posts created: ${postsCount}`)
  console.log(`Pages created: ${pagesCount}`)
  console.log(`Cases created: ${casesCount}`)
  console.log(`Items skipped: ${skippedCount}`)
  console.log(`Errors: ${errorCount}`)
  console.log('\nNext steps:')
  console.log('1. Review the generated MDX files')
  console.log('2. Download images from WordPress and place in public/images/')
  console.log('3. Update image paths in the MDX files')
  console.log('4. Create case study MDX files manually (portfolio items)')
}

// Run the migration
const xmlPath = process.argv[2]

if (!xmlPath) {
  console.error('Usage: npx tsx src/scripts/migrate-wp.ts <path-to-wordpress-export.xml>')
  process.exit(1)
}

if (!existsSync(xmlPath)) {
  console.error(`File not found: ${xmlPath}`)
  process.exit(1)
}

migrateWordPress(xmlPath).catch(console.error)
