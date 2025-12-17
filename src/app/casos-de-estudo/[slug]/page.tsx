import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllCases, getCaseBySlug } from '@/lib/content'

// Map service names to their corresponding service page slugs
const serviceToSlug: Record<string, string> = {
  'Web Development': 'desenvolvimento-web',
  'Consultoria Digital': 'consultoria-digital',
  'Capacitação': 'capacitacao-tecnica',
  'SEO': 'seo',
  'E-commerce': 'ecommerce',
  'UX/UI Design': 'web-design',
  'Shopify': 'ecommerce',
  'Sistema de Gestão': 'desenvolvimento-web',
  'Sistema de Pagamentos': 'desenvolvimento-web',
  'Migração de Dados': 'desenvolvimento-web',
  'Integração ERP': 'desenvolvimento-web',
  'Integração': 'desenvolvimento-web',
}

function getServiceSlug(serviceName: string): string | null {
  return serviceToSlug[serviceName] || null
}

const mdxComponents = {
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-8">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...props}
        alt={props.alt || ''}
        className="w-full rounded-lg"
      />
    </span>
  ),
}

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const cases = getAllCases()
  return cases.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = getCaseBySlug(slug)

  if (!caseStudy) {
    return { title: 'Caso de estudo não encontrado' }
  }

  return {
    title: caseStudy.title,
    description: `Caso de estudo: ${caseStudy.client} - ${caseStudy.industry}`,
    openGraph: {
      title: caseStudy.title,
      description: `Projeto ${caseStudy.title} para ${caseStudy.client}`,
      type: 'article',
    },
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = getCaseBySlug(slug)

  if (!caseStudy) {
    notFound()
  }

  const allCases = getAllCases().filter(c => c.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Hero - Full Width */}
      <section className="relative bg-[#32373c] py-24 lg:py-32 overflow-hidden">
        {/* Background Image */}
        {caseStudy.featured_image && (
          <div className="absolute inset-0">
            <Image
              src={caseStudy.featured_image}
              alt={caseStudy.title}
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#32373c]/80 via-[#32373c]/60 to-transparent" />
          </div>
        )}
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
                <Link href="/" className="hover:text-white">Início</Link>
                <span>/</span>
                <Link href="/casos-de-estudo" className="hover:text-white">Casos de Estudo</Link>
              </nav>

              <span className="inline-block rounded-full bg-[#e72f3f] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {caseStudy.industry}
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {caseStudy.title}
              </h1>

              <p className="mt-6 text-xl text-gray-300">
                {caseStudy.client}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {caseStudy.services.map((service) => {
                  const slug = getServiceSlug(service)
                  return slug ? (
                    <Link
                      key={service}
                      href={`/servicos/${slug}`}
                      className="rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-white hover:text-white"
                    >
                      {service}
                    </Link>
                  ) : (
                    <span
                      key={service}
                      className="rounded-full border border-gray-600 px-4 py-2 text-sm text-gray-300"
                    >
                      {service}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Results Cards */}
            {caseStudy.results && caseStudy.results.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {caseStudy.results.map((result, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-white/10 p-6 backdrop-blur"
                  >
                    <p className="text-4xl font-bold text-[#e72f3f]">{result.value}</p>
                    <p className="mt-2 text-sm text-gray-300">{result.metric}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Info Bar */}
      <section className="border-b border-[#e5e7eb] bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">Cliente</p>
              <p className="mt-2 text-lg font-medium text-[#32373c]">{caseStudy.client}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">Indústria</p>
              <p className="mt-2 text-lg font-medium text-[#32373c]">{caseStudy.industry}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">Ano</p>
              <p className="mt-2 text-lg font-medium text-[#32373c]">{caseStudy.year}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#6b7280]">Serviços</p>
              <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                {caseStudy.services.map((service, i) => {
                  const slug = getServiceSlug(service)
                  return (
                    <span key={service} className="text-lg font-medium text-[#32373c]">
                      {slug ? (
                        <Link href={`/servicos/${slug}`} className="hover:text-[#e72f3f]">
                          {service}
                        </Link>
                      ) : (
                        service
                      )}
                      {i < caseStudy.services.length - 1 ? ',' : ''}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content - Two Column Layout */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-[#32373c] prose-h4:text-2xl prose-p:text-[#6b7280] prose-p:leading-relaxed prose-strong:text-[#32373c] prose-a:text-[#e72f3f] prose-img:rounded-lg">
                <MDXRemote source={caseStudy.content} components={mdxComponents} />
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Quick Stats */}
                {caseStudy.results && caseStudy.results.length > 0 && (
                  <div className="rounded-2xl bg-[#f8f9fa] p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                      Resultados
                    </h3>
                    <div className="mt-4 space-y-4">
                      {caseStudy.results.map((result, i) => (
                        <div key={i} className="flex items-baseline justify-between border-b border-[#e5e7eb] pb-4 last:border-0 last:pb-0">
                          <span className="text-sm text-[#6b7280]">{result.metric}</span>
                          <span className="text-xl font-bold text-[#e72f3f]">{result.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA Card */}
                <div className="rounded-2xl bg-[#32373c] p-6 text-center">
                  <h3 className="text-lg font-bold text-white">
                    Quer resultados semelhantes?
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    Vamos conversar sobre o seu projeto.
                  </p>
                  <Link
                    href="/contactos"
                    className="mt-4 inline-block w-full rounded-full bg-white px-6 py-3 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
                  >
                    Iniciar Conversa →
                  </Link>
                </div>

                {/* Services Used */}
                <div className="rounded-2xl border border-[#e5e7eb] p-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                    Serviços Utilizados
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {caseStudy.services.map((service) => {
                      const slug = getServiceSlug(service)
                      return slug ? (
                        <Link
                          key={service}
                          href={`/servicos/${slug}`}
                          className="rounded-full bg-[#f8f9fa] px-3 py-1 text-sm text-[#32373c] transition-colors hover:bg-[#e72f3f] hover:text-white"
                        >
                          {service}
                        </Link>
                      ) : (
                        <span
                          key={service}
                          className="rounded-full bg-[#f8f9fa] px-3 py-1 text-sm text-[#32373c]"
                        >
                          {service}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Projects */}
      {allCases.length > 0 && (
        <section className="bg-[#f8f9fa] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#32373c]">
                Mais Projetos
              </h2>
              <Link
                href="/casos-de-estudo"
                className="text-sm font-medium text-[#e72f3f] hover:underline"
              >
                Ver todos →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {allCases.map((project) => (
                <Link
                  key={project.slug}
                  href={`/casos-de-estudo/${project.slug}`}
                  className="group relative overflow-hidden rounded-2xl bg-[#32373c] p-8 transition-all hover:scale-[1.02]"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e72f3f]">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#e72f3f]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-400">
                    {project.client}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-white">
                    Ver projeto
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-[#32373c] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Vamos criar algo extraordinário juntos?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Cada projeto é uma oportunidade de transformar a presença digital da sua instituição.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contactos"
              className="rounded-full bg-white px-8 py-4 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
            >
              Agendar Consultoria Estratégica →
            </Link>
            <Link
              href="/casos-de-estudo"
              className="rounded-full border border-white px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Ver Mais Projetos
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
