import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import products from '@/data/products.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = products.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    return { title: 'Produto não encontrado | Modular Digital' }
  }

  return {
    title: `${product.name} | ${product.tagline} | Zapp by Modular`,
    description: product.longDescription,
    keywords: [product.name, product.category, 'software português', 'SaaS Portugal', ...product.features.map(f => f.title)],
    alternates: { canonical: `https://modulardigital.pt/produtos/${product.slug}` },
    openGraph: {
      title: `${product.name} - ${product.tagline}`,
      description: product.description,
      url: `https://modulardigital.pt/produtos/${product.slug}`,
      siteName: 'Modular Digital',
      locale: 'pt_PT',
      type: 'website',
      images: [product.screenshot],
    },
  }
}

const icons: Record<string, React.ReactNode> = {
  wallet: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
    </svg>
  ),
  clipboard: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  document: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  users: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
}

function formatUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = products.find((p) => p.slug === resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const otherProducts = products.filter((p) => p.slug !== product.slug)

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1a1a1a] grain">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#e72f3f] opacity-5 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[#e72f3f] opacity-5 blur-3xl" />
        <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#e72f3f] via-[#e72f3f]/50 to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-eyebrow text-white/60">ZAPP BY MODULAR</span>
                <span className="inline-flex items-center rounded-full bg-[#e72f3f]/20 px-3 py-1 text-xs font-medium text-[#e72f3f]">
                  {product.category}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-white lg:text-5xl xl:text-6xl">
                {product.headline}
              </h1>
              <p className="mt-6 text-xl text-white/70 leading-relaxed">
                {product.longDescription}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic inline-flex items-center gap-2 rounded-full bg-[#e72f3f] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[#c92636]"
                >
                  <span>{product.ctaText}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link
                  href="/contactos"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  <span>Falar com Especialista</span>
                </Link>
              </div>
              <div className="mt-6">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  <span className="underline">{formatUrl(product.externalUrl)}</span>
                </a>
              </div>
            </div>
            <div>
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all hover:border-[#e72f3f]/50"
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={product.screenshot}
                    alt={`Screenshot de ${product.name}`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 1400px) 100vw, 700px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#1a1a1a]">
                    <span>Ver {product.name}</span>
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="bg-[#fafafa] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-eyebrow text-[#e72f3f]">O DESAFIO</span>
            <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
              {product.problem.title}
            </h2>
            <p className="mt-6 text-lg text-[#525252] leading-relaxed">
              {product.problem.description}
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.problem.painPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-4 rounded-xl border border-[#e5e5e5] bg-white p-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-[#e72f3f]">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </span>
                <p className="text-[#525252]">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <span className="text-eyebrow text-[#e72f3f]">A SOLUÇÃO</span>
              <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
                {product.solution.title}
              </h2>
              <p className="mt-6 text-lg text-[#525252] leading-relaxed">
                {product.solution.description}
              </p>
              <div className="mt-8">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-black"
                >
                  <span>{product.ctaText}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {product.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-6 transition-all hover:border-[#e72f3f] hover:shadow-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e72f3f]/10 text-[#e72f3f] mb-4">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1a1a1a] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#525252]">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-[#1a1a1a] py-16 lg:py-24 grain">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-[#e72f3f]">COMO FUNCIONA</span>
            <h2 className="mt-4 text-3xl font-bold text-white lg:text-4xl">
              Simples de começar, poderoso para crescer
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-{product.howItWorks.length > 4 ? '5' : product.howItWorks.length}">
            {product.howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xl font-bold text-white">
                    {step.step}
                  </span>
                  {index < product.howItWorks.length - 1 && (
                    <div className="hidden lg:block h-0.5 flex-1 bg-white/20" />
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-[#e72f3f]">CASOS DE USO</span>
            <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
              Para quem é o {product.name}?
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {product.useCases.map((useCase, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#e5e5e5] p-8 transition-all hover:border-[#e72f3f] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f3f0] text-[#1a1a1a] mb-6">
                  {icons[product.icon] || icons.document}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-3">{useCase.title}</h3>
                <p className="text-[#525252] leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {product.testimonial && (
        <section className="bg-[#fafafa] py-16 lg:py-24">
          <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <svg className="h-12 w-12 mx-auto text-[#e72f3f]/20 mb-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="text-2xl font-medium text-[#1a1a1a] lg:text-3xl leading-relaxed">
                "{product.testimonial.quote}"
              </blockquote>
              <div className="mt-8">
                <p className="font-bold text-[#1a1a1a]">{product.testimonial.author}</p>
                <p className="text-[#737373]">{product.testimonial.role}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Comparison Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-[#e72f3f]">COMPARAÇÃO</span>
            <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
              {product.comparison.title}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {product.comparison.points.map((point, index) => (
              <div
                key={index}
                className="rounded-2xl border border-[#e5e5e5] p-8 transition-all hover:border-[#e72f3f]"
              >
                <p className="text-sm font-medium text-[#737373] mb-2">vs</p>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">{point.vs}</h3>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 mt-0.5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </span>
                  <p className="text-[#525252]">{point.advantage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-[#fafafa] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-eyebrow text-[#e72f3f]">FUNCIONALIDADES</span>
            <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
              Tudo o que precisa, nada que não precise
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.features.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl bg-white border border-[#e5e5e5] p-6 transition-all hover:border-[#e72f3f] hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e72f3f] text-white mb-4">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-bold text-[#1a1a1a] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#525252]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="text-eyebrow text-[#e72f3f]">FAQ</span>
              <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
                Perguntas Frequentes
              </h2>
              <p className="mt-6 text-lg text-[#525252]">
                Não encontra a resposta que procura? Fale connosco diretamente.
              </p>
              <div className="mt-8">
                <Link
                  href="/contactos"
                  className="inline-flex items-center gap-2 text-[#e72f3f] font-medium hover:underline"
                >
                  <span>Contactar suporte</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {product.faq.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[#e5e5e5] p-6"
                >
                  <h3 className="font-bold text-[#1a1a1a] mb-3">{item.question}</h3>
                  <p className="text-[#525252] leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-[#1a1a1a] py-16 lg:py-24 grain">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white lg:text-4xl">
                Pronto para experimentar o {product.name}?
              </h2>
              <p className="mt-6 text-lg text-white/70">
                {product.pricing.type === 'freemium' && `Comece grátis com ${product.pricing.free}. Faça upgrade quando precisar.`}
                {product.pricing.type === 'trial' && `${product.pricing.trial}. ${product.pricing.note}. Sem compromisso.`}
                {product.pricing.type === 'license' && `${product.pricing.highlight}. ${product.pricing.note}. Peça uma demonstração.`}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={product.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic inline-flex items-center gap-2 rounded-full bg-[#e72f3f] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-[#c92636]"
                >
                  <span>{product.ctaText}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <Link
                  href="/contactos"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#f5f5f5]"
                >
                  <span>Falar Connosco</span>
                </Link>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e72f3f] text-white">
                  {icons[product.icon] || icons.document}
                </div>
                <div>
                  <p className="text-xl font-bold text-white">{product.name}</p>
                  <p className="text-white/60">{product.category}</p>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Suporte em português</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Dados em Portugal / RGPD</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Sem custos ocultos</span>
                </div>
              </div>
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span>{formatUrl(product.externalUrl)}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other Products */}
      <section className="bg-[#fafafa] py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1a1a1a] lg:text-3xl">
              Outros produtos <span className="text-[#e72f3f]">Zapp</span>
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {otherProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/produtos/${p.slug}`}
                className="group rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f] hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a1a1a] text-white transition-colors group-hover:bg-[#e72f3f] mb-4">
                  {icons[p.icon] || icons.document}
                </div>
                <h3 className="text-lg font-bold text-[#1a1a1a] group-hover:text-[#e72f3f] transition-colors">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-[#525252]">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: product.name,
            description: product.longDescription,
            url: `https://modulardigital.pt/produtos/${product.slug}`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            image: `https://modulardigital.pt${product.screenshot}`,
            offers: { '@type': 'Offer', url: product.externalUrl },
            author: { '@type': 'Organization', name: 'Modular Digital', url: 'https://modulardigital.pt' },
            featureList: product.features.map(f => f.title).join(', '),
            review: product.testimonial ? {
              '@type': 'Review',
              reviewBody: product.testimonial.quote,
              author: { '@type': 'Person', name: product.testimonial.author }
            } : undefined,
          })
        }}
      />
    </>
  )
}
