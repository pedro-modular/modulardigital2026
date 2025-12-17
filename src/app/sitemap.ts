import { MetadataRoute } from 'next'
import { getAllPosts, getAllCases } from '@/lib/content'
import { getServiceLocationParams, getServicesData, getIndustriesData } from '@/lib/seo'

const BASE_URL = 'https://modulardigital.pt'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/sobre`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/industrias`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/casos-de-estudo`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/artigos`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contactos`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/ferramentas`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Service pages
  const services = getServicesData()
  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${BASE_URL}/servicos/${service.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Industry pages
  const industries = getIndustriesData()
  const industryPages: MetadataRoute.Sitemap = industries.map((industry) => ({
    url: `${BASE_URL}/industrias/${industry.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Case study pages
  const cases = getAllCases()
  const casePages: MetadataRoute.Sitemap = cases.map((caseStudy) => ({
    url: `${BASE_URL}/casos-de-estudo/${caseStudy.slug}`,
    lastModified: caseStudy.year ? new Date(caseStudy.year, 0, 1) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Blog/article pages
  const posts = getAllPosts()
  const articlePages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/artigos/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Programmatic SEO pages (service x location)
  const serviceLocationParams = getServiceLocationParams()
  const programmaticPages: MetadataRoute.Sitemap = serviceLocationParams.map(
    ({ service, location }) => ({
      url: `${BASE_URL}/${service}/${location}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  )

  // Tools pages
  const tools = [
    'gerador-link-whatsapp',
    'calculadora-roas',
    'gerador-utm',
    'og-meta-preview',
    'gerador-qr-code',
    'gerador-schema-local-business',
    'checklist-acessibilidade',
    'conversor-webp',
    'redimensionador-imagens',
    'gerador-politica-privacidade',
  ]
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${BASE_URL}/ferramentas/${tool}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...casePages,
    ...articlePages,
    ...programmaticPages,
    ...toolPages,
  ]
}
