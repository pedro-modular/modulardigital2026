import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Script from 'next/script'
import {
  getServiceLocationParams,
  getServiceData,
  getLocation,
  generateServiceLocationMeta,
  getServicesData,
  getLocations
} from '@/lib/seo'
import { getCasesByService } from '@/lib/content'
import {
  getServiceSEOData,
  generateLocalIntro,
  formatPopulation
} from '@/lib/programmatic-seo-data'

interface PageProps {
  params: Promise<{
    service: string
    location: string
  }>
}

export async function generateStaticParams() {
  return getServiceLocationParams()
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service, location } = await params
  const serviceData = getServiceData(service)
  const locationData = getLocation(location)

  if (!serviceData || !locationData) {
    return { title: 'Página não encontrada' }
  }

  const seoData = getServiceSEOData(service)
  const meta = generateServiceLocationMeta(serviceData, locationData)

  return {
    title: meta.title,
    description: meta.description,
    keywords: seoData?.relatedSearches ? [...meta.keywords, ...seoData.relatedSearches] : meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: 'pt_PT',
    },
    alternates: {
      canonical: `https://modulardigital.pt/${service}/${location}`,
    },
  }
}

export default async function ServiceLocationPage({ params }: PageProps) {
  const { service, location } = await params
  const serviceData = getServiceData(service)
  const locationData = getLocation(location)

  if (!serviceData || !locationData) {
    notFound()
  }

  const seoData = getServiceSEOData(service)
  const relatedCases = getCasesByService(service).slice(0, 3)
  const otherServices = getServicesData().filter(s => s.slug !== service).slice(0, 4)
  const nearbyLocations = getLocations()
    .filter(l => l.region === locationData.region && l.slug !== location)
    .slice(0, 8)
  const otherRegions = getLocations()
    .filter(l => l.region !== locationData.region)
    .slice(0, 6)

  // Generate unique content
  const heroVariation = seoData?.heroVariations[0]
  const heroTitle = heroVariation?.title(locationData.name) || `${serviceData.name} em ${locationData.name}`
  const heroSubtitle = heroVariation?.subtitle(locationData.name, locationData.region, locationData.business_context) ||
    `Serviços profissionais de ${serviceData.name.toLowerCase()} para empresas em ${locationData.name} e região ${locationData.region}.`

  const localIntro = generateLocalIntro(serviceData.name, locationData)
  const localBenefits = seoData?.localBenefits(locationData.name, locationData.region, locationData.characteristics, locationData.industries) || []

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://modulardigital.pt' },
          { '@type': 'ListItem', position: 2, name: 'Serviços', item: 'https://modulardigital.pt/servicos' },
          { '@type': 'ListItem', position: 3, name: serviceData.name, item: `https://modulardigital.pt/servicos/${service}` },
          { '@type': 'ListItem', position: 4, name: locationData.name, item: `https://modulardigital.pt/${service}/${location}` },
        ],
      },
      // LocalBusiness
      {
        '@type': 'LocalBusiness',
        '@id': 'https://modulardigital.pt/#organization',
        name: 'Modular Digital',
        description: `Agência de ${serviceData.name} em ${locationData.name}. ${serviceData.description}`,
        url: `https://modulardigital.pt/${service}/${location}`,
        telephone: '+351914663553',
        email: 'hello@modulardigital.pt',
        areaServed: {
          '@type': 'City',
          name: locationData.name,
          containedInPlace: {
            '@type': 'AdministrativeArea',
            name: locationData.region,
          },
        },
        priceRange: '€€-€€€',
        image: 'https://modulardigital.pt/images/og-image.jpg',
      },
      // Service
      {
        '@type': 'Service',
        name: `${serviceData.name} em ${locationData.name}`,
        description: heroSubtitle,
        provider: { '@id': 'https://modulardigital.pt/#organization' },
        areaServed: { '@type': 'City', name: locationData.name },
        serviceType: serviceData.name,
      },
      // FAQPage
      ...(seoData?.faqs ? [{
        '@type': 'FAQPage',
        mainEntity: seoData.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }] : []),
    ],
  }

  return (
    <>
      {/* Schema.org JSON-LD */}
      <Script
        id="schema-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-[#1a1a1a] py-24 lg:py-32 overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Início</Link>
            <span>/</span>
            <Link href="/servicos" className="hover:text-white transition-colors">Serviços</Link>
            <span>/</span>
            <Link href={`/servicos/${service}`} className="hover:text-white transition-colors">{serviceData.name}</Link>
            <span>/</span>
            <span className="text-white/70">{locationData.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              {/* Region badge */}
              <span className="inline-block rounded-full bg-[#e72f3f] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {locationData.region}
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-lufga)' }}>
                {heroTitle}
              </h1>

              <p className="mt-6 text-xl leading-relaxed text-white/70">
                {heroSubtitle}
              </p>

              {/* Location stats */}
              {locationData.population && (
                <div className="mt-6 flex items-center gap-6 text-sm text-white/50">
                  <span className="flex items-center gap-2">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                    </svg>
                    {formatPopulation(locationData.population)} habitantes
                  </span>
                  {locationData.metro_population && (
                    <span className="flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                      {formatPopulation(locationData.metro_population)} área metro
                    </span>
                  )}
                </div>
              )}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contactos"
                  className="magnetic group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#e72f3f] hover:text-white"
                >
                  <span>Pedir Orçamento Gratuito</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1a1a1a]/10 transition-transform group-hover:translate-x-0.5 group-hover:bg-white/20">
                    <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
                <a
                  href="tel:+351914663553"
                  className="rounded-full border border-white/30 px-8 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  +351 914 663 553
                </a>
              </div>
            </div>

            {/* Benefits Stats */}
            {seoData?.benefits && (
              <div className="grid gap-4 sm:grid-cols-2">
                {seoData.benefits.map((benefit, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 p-6 backdrop-blur border border-white/10">
                    <p className="text-3xl font-bold text-[#e72f3f]">{benefit.stat}</p>
                    <p className="mt-1 font-medium text-white">{benefit.label}</p>
                    <p className="mt-2 text-sm text-white/50">{benefit.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Local Introduction */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-[#737373]">
              {localIntro}
            </p>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      {seoData?.deliverables && (
        <section className="bg-[#fafafa] py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e72f3f]">
                Serviços
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-lufga)' }}>
                O que entregamos em {locationData.name}
              </h2>
            </div>
            <div className="mx-auto mt-12 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {seoData.deliverables.map((item, i) => (
                <div key={i} className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e72f3f]/10">
                    <div className="h-6 w-6 rounded bg-[#e72f3f]" />
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-[#1a1a1a]">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#737373] leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {seoData?.process && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e72f3f]">
                Metodologia
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-lufga)' }}>
                O nosso processo
              </h2>
              <p className="mt-4 text-[#737373]">
                Abordagem estruturada para garantir resultados previsíveis e qualidade consistente.
              </p>
            </div>
            <div className="mx-auto mt-12 max-w-4xl">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-[#e5e5e5] lg:left-1/2" />

                {seoData.process.map((step, i) => (
                  <div key={i} className={`relative mb-8 lg:mb-12 ${i % 2 === 0 ? 'lg:pr-[50%]' : 'lg:pl-[50%] lg:text-left'}`}>
                    {/* Step number */}
                    <div className={`absolute left-0 flex h-16 w-16 items-center justify-center rounded-full bg-[#1a1a1a] text-xl font-bold text-white lg:left-1/2 lg:-translate-x-1/2`}>
                      {step.step}
                    </div>

                    {/* Content */}
                    <div className={`ml-24 lg:ml-0 ${i % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div className="rounded-xl bg-[#fafafa] p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-[#1a1a1a]">{step.title}</h3>
                          <span className="text-xs font-medium text-[#e72f3f]">{step.duration}</span>
                        </div>
                        <p className="mt-2 text-sm text-[#737373]">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Indicators */}
      {seoData?.pricing && (
        <section className="bg-[#1a1a1a] py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e72f3f]">
                Investimento
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: 'var(--font-lufga)' }}>
                Planos de {serviceData.name}
              </h2>
              <p className="mt-4 text-white/60">
                Preços indicativos. Cada projeto é orçamentado conforme os requisitos específicos.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3">
              {Object.entries(seoData.pricing).map(([key, plan], i) => (
                <div
                  key={key}
                  className={`rounded-2xl p-8 ${i === 1 ? 'bg-white text-[#1a1a1a] ring-4 ring-[#e72f3f]' : 'bg-white/5 text-white border border-white/10'}`}
                >
                  <h3 className={`text-lg font-bold ${i === 1 ? 'text-[#1a1a1a]' : 'text-white'}`}>
                    {plan.label}
                  </h3>
                  <p className="mt-4">
                    <span className={`text-xs ${i === 1 ? 'text-[#737373]' : 'text-white/50'}`}>a partir de</span>
                    <span className={`ml-2 text-3xl font-bold ${i === 1 ? 'text-[#1a1a1a]' : 'text-white'}`}>
                      {plan.from}
                    </span>
                  </p>
                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, j) => (
                      <li key={j} className={`flex items-center gap-3 text-sm ${i === 1 ? 'text-[#737373]' : 'text-white/70'}`}>
                        <svg className={`h-4 w-4 ${i === 1 ? 'text-[#e72f3f]' : 'text-[#e72f3f]'}`} fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contactos"
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-medium transition-colors ${
                      i === 1
                        ? 'bg-[#1a1a1a] text-white hover:bg-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Pedir Orçamento
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Local */}
      {localBenefits.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e72f3f]">
                  Vantagem Local
                </span>
                <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-lufga)' }}>
                  Porquê a Modular Digital em {locationData.name}?
                </h2>
                <div className="mt-8 space-y-4">
                  {localBenefits.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e72f3f]">
                        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <p className="text-[#737373]">{benefit}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href="/sobre"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#e72f3f] hover:underline"
                >
                  Conhecer a nossa equipa
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {seoData?.trustSignals?.map((signal, i) => (
                  <div key={i} className="rounded-xl bg-[#fafafa] p-6">
                    <svg className="h-8 w-8 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                    <p className="mt-4 font-medium text-[#1a1a1a]">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {seoData?.faqs && (
        <section className="bg-[#fafafa] py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#e72f3f]">
                FAQ
              </span>
              <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-lufga)' }}>
                Perguntas Frequentes sobre {serviceData.name}
              </h2>
            </div>
            <div className="mx-auto mt-12 max-w-3xl">
              <div className="space-y-4">
                {seoData.faqs.map((faq, i) => (
                  <details key={i} className="group rounded-xl bg-white p-6 shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between font-medium text-[#1a1a1a]">
                      {faq.question}
                      <svg className="h-5 w-5 shrink-0 text-[#737373] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </summary>
                    <p className="mt-4 text-[#737373] leading-relaxed">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#e72f3f]">
                  Portfólio
                </span>
                <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-lufga)' }}>
                  Projetos de {serviceData.name}
                </h2>
              </div>
              <Link href="/casos-de-estudo" className="hidden sm:flex items-center gap-2 text-sm font-medium text-[#e72f3f] hover:underline">
                Ver todos
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {relatedCases.map((project) => (
                <Link
                  key={project.slug}
                  href={`/casos-de-estudo/${project.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 transition-all hover:scale-[1.02]"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e72f3f]">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#e72f3f] transition-colors">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-white/60">{project.client}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Services in Location */}
      <section className="bg-[#fafafa] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-lufga)' }}>
            Outros serviços em {locationData.name}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/${location}`}
                className="group rounded-xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f] hover:shadow-md"
              >
                <h3 className="font-bold text-[#1a1a1a] group-hover:text-[#e72f3f] transition-colors">{s.name}</h3>
                <p className="mt-2 text-sm text-[#737373]">em {locationData.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Locations */}
      {nearbyLocations.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-lufga)' }}>
              {serviceData.name} na região {locationData.region}
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {nearbyLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${service}/${loc.slug}`}
                  className="rounded-full border border-[#e5e5e5] bg-white px-5 py-2.5 text-sm font-medium text-[#1a1a1a] transition-all hover:border-[#e72f3f] hover:text-[#e72f3f]"
                >
                  {loc.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other Regions */}
      <section className="border-t border-[#e5e5e5] bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-lufga)' }}>
            {serviceData.name} noutras cidades
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {otherRegions.map((loc) => (
              <Link
                key={loc.slug}
                href={`/${service}/${loc.slug}`}
                className="rounded-full border border-[#e5e5e5] px-5 py-2.5 text-sm font-medium text-[#737373] transition-all hover:border-[#e72f3f] hover:text-[#e72f3f]"
              >
                {loc.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1a1a1a] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl" style={{ fontFamily: 'var(--font-lufga)' }}>
            Precisa de {serviceData.name.toLowerCase()} em {locationData.name}?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60">
            Contacte-nos para uma consultoria gratuita e sem compromisso. Respondemos em menos de 24 horas.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contactos"
              className="magnetic group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#e72f3f] hover:text-white"
            >
              <span>Pedir Orçamento Gratuito</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1a1a1a]/10 transition-transform group-hover:translate-x-0.5 group-hover:bg-white/20">
                <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
            <a
              href="tel:+351914663553"
              className="rounded-full border border-white/30 px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              +351 914 663 553
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
