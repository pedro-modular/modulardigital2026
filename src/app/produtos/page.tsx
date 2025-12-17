import type { Metadata } from 'next'
import Link from 'next/link'
import { ProductHero, ProductCard } from '@/components/products'
import products from '@/data/products.json'

export const metadata: Metadata = {
  title: 'Produtos SaaS Zapp by Modular | Software Português',
  description: 'Suite de produtos SaaS desenvolvidos em Portugal: ZappExpense, ZappService, ZappPropostas e ZappInscrições. Suporte em português, dados em Portugal, conformidade RGPD.',
  keywords: ['software português', 'SaaS Portugal', 'ZappExpense', 'ZappService', 'ZappPropostas', 'ZappInscrições', 'gestão de equipas', 'CRM português'],
  alternates: {
    canonical: 'https://modulardigital.pt/produtos',
  },
  openGraph: {
    title: 'Zapp by Modular | Software Português para Problemas Reais',
    description: 'Desenvolvemos ferramentas SaaS que simplificam a gestão do seu negócio. Suporte em português, dados em Portugal.',
    url: 'https://modulardigital.pt/produtos',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

const benefits = [
  {
    title: '100% Português',
    description: 'Suporte técnico em português europeu e documentação localizada.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.893 13.393l-1.135-1.135a2.252 2.252 0 01-.421-.585l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 01-1.383-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.411-2.353a2.25 2.25 0 00.286-.76m11.928 9.869A9 9 0 008.965 3.525m11.928 9.868A9 9 0 118.965 3.525" />
      </svg>
    ),
  },
  {
    title: 'Dados em Portugal',
    description: 'Servidores nacionais com conformidade total RGPD garantida.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Sem Comissões Ocultas',
    description: 'Preços transparentes e previsíveis, sem surpresas mensais.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Integração PT',
    description: 'Multibanco, MB Way e faturação certificada AT integrados.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
]

export default function ProdutosPage() {
  return (
    <>
      <ProductHero
        eyebrow="ZAPP BY MODULAR"
        title="Software português para problemas reais"
        highlightWord="problemas reais"
        description="Desenvolvemos ferramentas SaaS que simplificam a gestão do seu negócio e da sua vida pessoal. Suporte em português, dados em Portugal, conformidade RGPD garantida."
        badge="Made in Portugal"
      />

      {/* Products Grid */}
      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
              Os nossos <span className="text-[#e72f3f]">produtos</span>
            </h2>
            <p className="mt-4 text-lg text-[#525252]">
              Cada produto nasceu de problemas reais que encontrámos nos nossos clientes.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                name={product.name}
                tagline={product.tagline}
                description={product.description}
                category={product.category}
                audience={product.audience}
                icon={product.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <span className="text-eyebrow text-[#e72f3f]">PORQUÊ ZAPP?</span>
            <h2 className="mt-4 text-3xl font-bold text-[#1a1a1a] lg:text-4xl">
              Vantagens de escolher software português
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f5f3f0] text-[#1a1a1a]">
                  {benefit.icon}
                </div>
                <h3 className="mt-6 text-lg font-bold text-[#1a1a1a]">{benefit.title}</h3>
                <p className="mt-2 text-sm text-[#525252] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a1a1a] py-16 lg:py-24 grain">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full bg-[#e72f3f]/20 px-4 py-1.5 text-sm font-medium text-[#e72f3f] mb-6">
            Zapp by Modular
          </span>
          <h2 className="text-headline text-white">
            Precisa de uma solução <span className="text-[#e72f3f]">à medida</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Além dos nossos produtos, desenvolvemos software personalizado para automatizar processos específicos do seu negócio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contactos"
              className="magnetic inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#f5f5f5]"
            >
              <span>Falar Connosco</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a]/10">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/servicos/desenvolvimento-web"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              <span>Ver Serviços de Desenvolvimento</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Produtos SaaS Zapp by Modular',
            description: 'Suite de produtos SaaS desenvolvidos em Portugal pela Modular Digital',
            url: 'https://modulardigital.pt/produtos',
            provider: {
              '@type': 'Organization',
              name: 'Modular Digital',
              url: 'https://modulardigital.pt'
            },
            hasPart: products.map((product) => ({
              '@type': 'SoftwareApplication',
              name: product.name,
              description: product.description,
              url: `https://modulardigital.pt/produtos/${product.slug}`,
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              author: {
                '@type': 'Organization',
                name: 'Modular Digital'
              }
            }))
          })
        }}
      />
    </>
  )
}
