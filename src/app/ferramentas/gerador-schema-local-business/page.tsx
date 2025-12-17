import type { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { SchemaGenerator } from './SchemaGenerator'

export const metadata: Metadata = {
  title: 'Gerador Schema JSON-LD Local Business | Ferramenta Gratuita | Modular Digital',
  description: 'Gere código Schema.org JSON-LD para o seu negócio local. Melhore a visibilidade no Google com dados estruturados. Ferramenta gratuita para empresas portuguesas.',
  keywords: ['Gerador Schema', 'JSON-LD Portugal', 'Schema.org Local Business', 'Dados Estruturados', 'SEO técnico'],
  openGraph: {
    title: 'Gerador Schema JSON-LD | Modular Digital',
    description: 'Gere código de dados estruturados para o seu negócio. Ferramenta gratuita.',
    url: 'https://modulardigital.pt/ferramentas/gerador-schema-local-business',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function SchemaGeneratorPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Gerador de Schema JSON-LD"
        highlightWord="Schema"
        description="Crie código de dados estruturados Schema.org para melhorar a visibilidade do seu negócio local nos resultados do Google."
      />

      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Generator - Takes 2 columns */}
            <div className="lg:col-span-2">
              <SchemaGenerator />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* What is Schema */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">O que é Schema.org?</h2>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  <strong>Schema.org</strong> é um vocabulário de dados estruturados que ajuda os motores de busca a compreender melhor o conteúdo do seu website.
                </p>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  Com dados estruturados, o Google pode mostrar <strong>rich snippets</strong> com estrelas, endereço, horários e outras informações diretamente nos resultados de pesquisa.
                </p>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Benefícios</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Maior visibilidade nos resultados do Google</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Rich snippets com endereço, telefone e horários</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Melhor CTR (taxa de cliques) nos resultados</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Compatibilidade com Google Business Profile</span>
                  </li>
                </ul>
              </div>

              {/* How to use */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Como usar o código</h2>
                <ol className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xs font-bold text-white">1</span>
                    <span className="text-[#525252]">Copie o código JSON-LD gerado</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xs font-bold text-white">2</span>
                    <span className="text-[#525252]">Cole no &lt;head&gt; do seu website ou através do Google Tag Manager</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xs font-bold text-white">3</span>
                    <span className="text-[#525252]">
                      Valide em{' '}
                      <a
                        href="https://search.google.com/test/rich-results"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#e72f3f] underline hover:no-underline"
                      >
                        Rich Results Test
                      </a>
                    </span>
                  </li>
                </ol>
              </div>

              {/* CTA */}
              <ToolCTA
                title="Código parece complicado?"
                description="A nossa equipa gere o SEO técnico completo do seu website, incluindo dados estruturados, velocidade e indexação."
                serviceSlug="seo"
                serviceName="SEO"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org WebApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Gerador Schema JSON-LD',
            description: 'Ferramenta gratuita para gerar código Schema.org JSON-LD para negócios locais',
            url: 'https://modulardigital.pt/ferramentas/gerador-schema-local-business',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR'
            },
            provider: {
              '@type': 'Organization',
              name: 'Modular Digital',
              url: 'https://modulardigital.pt'
            }
          })
        }}
      />
    </>
  )
}
