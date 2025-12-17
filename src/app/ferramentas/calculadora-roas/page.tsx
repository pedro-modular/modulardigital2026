import type { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { ROASCalculator } from './ROASCalculator'

export const metadata: Metadata = {
  title: 'Calculadora ROAS e ROI Marketing Digital | Ferramenta Gratuita | Modular Digital',
  description: 'Calcule o ROAS, ROI e ponto de break-even das suas campanhas de marketing digital. Ferramenta gratuita com gráficos visuais para empresas portuguesas.',
  keywords: ['Calculadora ROAS', 'ROI Marketing Digital', 'Break-even publicidade', 'Retorno Investimento Publicidade', 'ROAS Portugal'],
  openGraph: {
    title: 'Calculadora ROAS e ROI | Modular Digital',
    description: 'Calcule o retorno das suas campanhas de marketing. Ferramenta gratuita.',
    url: 'https://modulardigital.pt/ferramentas/calculadora-roas',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function ROASCalculatorPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Calculadora de ROAS"
        highlightWord="ROAS"
        description="Calcule o retorno sobre o investimento em publicidade (ROAS), ROI e o ponto de break-even das suas campanhas de marketing digital."
      />

      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Calculator - Takes 2 columns */}
            <div className="lg:col-span-2">
              <ROASCalculator />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* What is ROAS */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">O que é ROAS?</h2>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  <strong>ROAS (Return on Ad Spend)</strong> mede a receita gerada por cada euro investido em publicidade.
                </p>
                <div className="mt-4 rounded-lg bg-[#f5f5f5] p-3">
                  <code className="text-sm text-[#1a1a1a]">ROAS = Receita ÷ Investimento</code>
                </div>
                <p className="mt-3 text-sm text-[#737373]">
                  Um ROAS de 4x significa que ganha 4€ por cada 1€ investido.
                </p>
              </div>

              {/* Benchmarks */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Benchmarks por Setor</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-[#525252]">E-commerce</span>
                    <span className="font-medium text-[#1a1a1a]">4x - 6x</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-[#525252]">B2B / Serviços</span>
                    <span className="font-medium text-[#1a1a1a]">3x - 5x</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-[#525252]">Imobiliário</span>
                    <span className="font-medium text-[#1a1a1a]">5x - 10x</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-[#525252]">SaaS</span>
                    <span className="font-medium text-[#1a1a1a]">3x - 4x</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-[#737373]">
                  Valores indicativos. O ROAS ideal depende da sua margem de lucro.
                </p>
              </div>

              {/* CTA */}
              <ToolCTA
                title="Não está a atingir estes números?"
                description="Fazemos uma auditoria gratuita às suas campanhas para identificar oportunidades de melhoria na taxa de conversão."
                serviceSlug="consultoria-digital"
                serviceName="Consultoria Digital"
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
            name: 'Calculadora ROAS e ROI',
            description: 'Ferramenta gratuita para calcular ROAS, ROI e break-even de campanhas de marketing',
            url: 'https://modulardigital.pt/ferramentas/calculadora-roas',
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
