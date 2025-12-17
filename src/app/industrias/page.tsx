import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Soluções Digitais por Indústria | Modular Digital',
  description: 'Soluções digitais especializadas para instituições de ensino, organizações de saúde, setor público, IPSS e empresas B2B em Portugal.',
  alternates: {
    canonical: 'https://modulardigital.pt/industrias',
  },
  openGraph: {
    title: 'Soluções Digitais por Indústria | Modular Digital',
    description: 'Soluções digitais especializadas para instituições de ensino, saúde, setor público e organizações B2B.',
    url: 'https://modulardigital.pt/industrias',
    type: 'website',
  },
}

// Map solutions to their service page slugs
const solutionToService: Record<string, { slug: string; label: string }> = {
  'Websites institucionais': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Plataformas de eventos': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Portais de alunos': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Gestão de inscrições': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Websites clínicos': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Marcação online': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Portais de pacientes': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Conformidade RGPD': { slug: 'consultoria-digital', label: 'Consultoria Digital' },
  'Portais municipais': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Acessibilidade WCAG': { slug: 'web-design', label: 'Web Design' },
  'Transparência': { slug: 'consultoria-digital', label: 'Consultoria Digital' },
  'Serviços online': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'E-commerce B2B': { slug: 'ecommerce', label: 'E-commerce' },
  'Catálogos digitais': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'CRM': { slug: 'consultoria-digital', label: 'Consultoria Digital' },
  'Portais de clientes': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Gestão de utentes': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Portais de famílias': { slug: 'desenvolvimento-web', label: 'Desenvolvimento Web' },
  'Comunicação interna': { slug: 'consultoria-digital', label: 'Consultoria Digital' },
}

// Map clients to their case study page slugs
const clientToCaseStudy: Record<string, string> = {
  'Universidade de Lisboa': 'centro-de-historia-da-universidade-de-lisboa-chul',
  'Faculdade de Letras': 'faculdade-de-letras-eventos-inscricoes',
  'Agrupamento de Escolas': 'agrupamento-de-escolas-henriques-nogueira',
  'Derma360': 'derma360',
  'Lacrilar': 'lacrilar',
  'Santa Casa Torres Vedras': 'santa-casa-da-misericordia',
}

const industries = [
  {
    title: 'Instituições de Ensino',
    slug: 'escolas',
    description: 'Soluções digitais para escolas, universidades e centros de formação. Websites institucionais, plataformas de eventos e sistemas de gestão académica.',
    clients: ['Universidade de Lisboa', 'Faculdade de Letras', 'Agrupamento de Escolas'],
    solutions: ['Websites institucionais', 'Plataformas de eventos', 'Portais de alunos', 'Gestão de inscrições'],
  },
  {
    title: 'Organizações de Saúde',
    slug: 'saude',
    description: 'Plataformas digitais para clínicas, hospitais e centros de saúde. Conformidade com RGPD e foco na experiência do paciente.',
    clients: ['Instituto de Retina de Lisboa', 'Derma360', 'Clínicas privadas'],
    solutions: ['Websites clínicos', 'Marcação online', 'Portais de pacientes', 'Conformidade RGPD'],
  },
  {
    title: 'Setor Público',
    slug: 'setor-publico',
    description: 'Soluções para câmaras municipais, juntas de freguesia e organismos públicos. Acessibilidade WCAG e transparência.',
    clients: ['Município de Torres Vedras', 'Município de Leiria', 'Juntas de Freguesia'],
    solutions: ['Portais municipais', 'Acessibilidade WCAG', 'Transparência', 'Serviços online'],
  },
  {
    title: 'Negócios B2B',
    slug: 'b2b',
    description: 'Plataformas e websites para empresas B2B. E-commerce, catálogos digitais e sistemas de gestão de clientes.',
    clients: ['Lacrilar', 'Empresas industriais', 'Distribuidores'],
    solutions: ['E-commerce B2B', 'Catálogos digitais', 'CRM', 'Portais de clientes'],
  },
  {
    title: 'IPSS & Misericórdias',
    slug: 'ipss',
    description: 'Soluções para instituições de solidariedade social e Misericórdias. Websites acessíveis e gestão de serviços.',
    clients: ['Santa Casa Torres Vedras', 'Misericórdias', 'IPSS'],
    solutions: ['Websites institucionais', 'Gestão de utentes', 'Portais de famílias', 'Comunicação interna'],
  },
]

const locations = [
  { name: 'Lisboa', slug: 'lisboa' },
  { name: 'Porto', slug: 'porto' },
  { name: 'Braga', slug: 'braga' },
  { name: 'Coimbra', slug: 'coimbra' },
  { name: 'Leiria', slug: 'leiria' },
  { name: 'Torres Vedras', slug: 'torres-vedras' },
  { name: 'Setúbal', slug: 'setubal' },
  { name: 'Faro', slug: 'faro' },
]

export default function IndustriasPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Indústrias
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Especialização por setor para soluções verdadeiramente adaptadas às suas necessidades.
            </p>
          </div>
        </div>
      </section>

      {/* Industries List */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-12">
            {industries.map((industry, index) => (
              <div
                key={industry.slug}
                className={`flex flex-col gap-8 rounded-2xl bg-[#f8f9fa] p-8 lg:flex-row lg:items-center lg:p-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#32373c]">
                    {industry.title}
                  </h2>
                  <p className="mt-4 text-[#6b7280]">
                    {industry.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                      Soluções
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {industry.solutions.map((solution) => {
                        const service = solutionToService[solution]
                        if (service) {
                          return (
                            <Link
                              key={solution}
                              href={`/servicos/${service.slug}`}
                              className="rounded-full bg-white px-3 py-1 text-sm text-[#32373c] transition-colors hover:bg-[#e72f3f] hover:text-white"
                            >
                              {solution}
                            </Link>
                          )
                        }
                        return (
                          <span
                            key={solution}
                            className="rounded-full bg-white px-3 py-1 text-sm text-[#32373c]"
                          >
                            {solution}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                  <Link
                    href={`/industrias/${industry.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-medium text-[#e72f3f]"
                  >
                    Ver soluções para {industry.title}
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="rounded-xl bg-white p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                      Clientes nesta indústria
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {industry.clients.map((client) => {
                        const caseStudySlug = clientToCaseStudy[client]
                        return (
                          <li key={client} className="flex items-center gap-2 text-[#32373c]">
                            <svg className="h-4 w-4 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                            {caseStudySlug ? (
                              <Link
                                href={`/casos-de-estudo/${caseStudySlug}`}
                                className="hover:text-[#e72f3f] hover:underline"
                              >
                                {client}
                              </Link>
                            ) : (
                              client
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location-based SEO Links */}
      <section className="border-t border-[#e5e7eb] bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#32373c]">
            Soluções Digitais por Região
          </h2>
          <p className="mt-4 text-[#6b7280]">
            Oferecemos soluções digitais especializadas por indústria em todo o Portugal. Selecione a sua região:
          </p>

          <div className="mt-10 space-y-8">
            {industries.map((industry) => (
              <div key={industry.slug} className="rounded-xl border border-[#e5e7eb] p-6">
                <h3 className="text-lg font-bold text-[#32373c]">
                  <Link href={`/industrias/${industry.slug}`} className="hover:text-[#e72f3f]">
                    {industry.title}
                  </Link>
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Link
                      key={`${industry.slug}-${location.slug}`}
                      href={`/industrias/${industry.slug}/${location.slug}`}
                      className="rounded-full border border-[#e5e7eb] px-4 py-2 text-sm text-[#6b7280] transition-colors hover:border-[#e72f3f] hover:text-[#e72f3f]"
                    >
                      {industry.title} em {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cross-linking to services */}
          <div className="mt-12 rounded-xl bg-[#f8f9fa] p-8">
            <h3 className="text-lg font-bold text-[#32373c]">
              Serviços Relacionados
            </h3>
            <p className="mt-2 text-sm text-[#6b7280]">
              Explore os nossos serviços especializados para cada tipo de organização:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <Link
                href="/servicos/desenvolvimento-web"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-colors hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                  </svg>
                </div>
                <span className="font-medium text-[#32373c]">Desenvolvimento Web</span>
              </Link>
              <Link
                href="/servicos/web-design"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-colors hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.39m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                  </svg>
                </div>
                <span className="font-medium text-[#32373c]">Web Design</span>
              </Link>
              <Link
                href="/servicos/consultoria-digital"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-colors hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                  </svg>
                </div>
                <span className="font-medium text-[#32373c]">Consultoria Digital</span>
              </Link>
              <Link
                href="/servicos/ecommerce"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-colors hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                </div>
                <span className="font-medium text-[#32373c]">E-commerce</span>
              </Link>
              <Link
                href="/servicos/seo"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-colors hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <span className="font-medium text-[#32373c]">SEO</span>
              </Link>
              <Link
                href="/servicos/capacitacao-tecnica"
                className="flex items-center gap-3 rounded-lg bg-white p-4 transition-colors hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-white">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>
                </div>
                <span className="font-medium text-[#32373c]">Capacitação Técnica</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32373c] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            A sua indústria não está listada?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contacte-nos - trabalhamos com diversos setores e adaptamos as nossas soluções às suas necessidades específicas.
          </p>
          <Link
            href="/contactos"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
          >
            Agendar Consultoria Estratégica →
          </Link>
        </div>
      </section>
    </>
  )
}
