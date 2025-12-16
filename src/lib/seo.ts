import fs from 'fs'
import path from 'path'
import type { Location, ServiceData, IndustryData } from './types'

const dataDirectory = path.join(process.cwd(), 'src/data')

// Load JSON data files
function loadJsonData<T>(filename: string): T {
  const filePath = path.join(dataDirectory, filename)
  if (!fs.existsSync(filePath)) {
    return [] as T
  }
  const content = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(content)
}

// Locations
export function getLocations(): Location[] {
  const data = loadJsonData<{ locations: Location[] }>('locations.json')
  return data.locations || []
}

export function getLocation(slug: string): Location | undefined {
  return getLocations().find(l => l.slug === slug)
}

// Services for SEO
export function getServicesData(): ServiceData[] {
  const data = loadJsonData<{ services: ServiceData[] }>('services.json')
  return data.services || []
}

export function getServiceData(slug: string): ServiceData | undefined {
  return getServicesData().find(s => s.slug === slug)
}

// Industries for SEO
export function getIndustriesData(): IndustryData[] {
  const data = loadJsonData<{ industries: IndustryData[] }>('industries.json')
  return data.industries || []
}

export function getIndustryData(slug: string): IndustryData | undefined {
  return getIndustriesData().find(i => i.slug === slug)
}

// Generate all service x location combinations
export function getServiceLocationParams(): { service: string; location: string }[] {
  const services = getServicesData()
  const locations = getLocations()

  return services.flatMap(service =>
    locations.map(location => ({
      service: service.slug,
      location: location.slug
    }))
  )
}

// Generate all industry x solution combinations
export function getIndustrySolutionParams(): { industry: string; solution: string }[] {
  const industries = getIndustriesData()
  const services = getServicesData()

  return industries.flatMap(industry =>
    services.map(service => ({
      industry: industry.slug,
      solution: service.slug
    }))
  )
}

// SEO metadata generators
export function generateServiceLocationMeta(service: ServiceData, location: Location) {
  return {
    title: `${service.name} em ${location.name} | Modular Digital`,
    description: `Serviços profissionais de ${service.name} em ${location.name}. ${service.description}`,
    keywords: [...service.keywords, location.name, location.region, 'agência digital', 'Portugal']
  }
}

export function generateIndustrySolutionMeta(industry: IndustryData, solution: ServiceData) {
  return {
    title: `${solution.name} para ${industry.name} | Modular Digital`,
    description: `Soluções de ${solution.name} especializadas para ${industry.name}. ${industry.description}`,
    keywords: [...industry.keywords, ...solution.keywords, 'soluções digitais', 'Portugal']
  }
}
