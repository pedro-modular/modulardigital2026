import type { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { AccessibilityChecklist } from './AccessibilityChecklist'

export const metadata: Metadata = {
  title: 'Checklist Acessibilidade Web WCAG 2.1 | Ferramenta Gratuita | Modular Digital',
  description: 'Verifique a acessibilidade do seu website com a nossa checklist WCAG 2.1 interativa. Guarde o progresso localmente e exporte relatórios. Ferramenta gratuita em português.',
  keywords: ['Checklist Acessibilidade Web', 'WCAG Portugal', 'WCAG 2.1 checklist', 'acessibilidade digital', 'verificar acessibilidade website'],
  openGraph: {
    title: 'Checklist Acessibilidade WCAG 2.1 | Modular Digital',
    description: 'Ferramenta gratuita para verificar a acessibilidade do seu website segundo as normas WCAG 2.1',
    url: 'https://modulardigital.pt/ferramentas/checklist-acessibilidade',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function AccessibilityChecklistPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Checklist de Acessibilidade WCAG 2.1"
        highlightWord="Acessibilidade"
        description="Verifique manualmente a conformidade do seu website com as diretrizes WCAG 2.1 nível AA. O progresso é guardado automaticamente no seu browser."
      />

      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Checklist - Takes 2 columns */}
            <div className="lg:col-span-2">
              <AccessibilityChecklist />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* What is WCAG */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">O que são as WCAG?</h2>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  As <strong>Web Content Accessibility Guidelines (WCAG)</strong> são diretrizes internacionais que garantem que websites são acessíveis a pessoas com deficiências.
                </p>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  A versão 2.1 nível AA é o standard recomendado e obrigatório para sites do setor público na UE.
                </p>
              </div>

              {/* Levels */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Níveis de Conformidade</h2>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#1a1a1a] text-xs font-bold text-white">A</span>
                    <div>
                      <p className="font-medium text-[#1a1a1a]">Essencial</p>
                      <p className="text-xs text-[#737373]">Requisitos mínimos básicos</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#e72f3f] text-xs font-bold text-white">AA</span>
                    <div>
                      <p className="font-medium text-[#1a1a1a]">Recomendado</p>
                      <p className="text-xs text-[#737373]">Standard da indústria e legal na UE</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#737373] text-xs font-bold text-white">AAA</span>
                    <div>
                      <p className="font-medium text-[#1a1a1a]">Avançado</p>
                      <p className="text-xs text-[#737373]">Máximo nível de acessibilidade</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Recursos Úteis</h2>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.w3.org/WAI/WCAG21/quickref/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#525252] transition-colors hover:text-[#e72f3f]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span>WCAG 2.1 Quick Reference</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://webaim.org/resources/contrastchecker/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#525252] transition-colors hover:text-[#e72f3f]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span>WebAIM Contrast Checker</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://wave.webaim.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#525252] transition-colors hover:text-[#e72f3f]"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                      <span>WAVE Evaluation Tool</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <ToolCTA
                title="Pontuação abaixo de 80%?"
                description="A nossa equipa faz auditorias completas de acessibilidade com relatórios detalhados e implementação de correções."
                serviceSlug="desenvolvimento-web"
                serviceName="Desenvolvimento Web"
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
            name: 'Checklist Acessibilidade WCAG 2.1',
            description: 'Ferramenta gratuita para verificar a acessibilidade de websites segundo WCAG 2.1',
            url: 'https://modulardigital.pt/ferramentas/checklist-acessibilidade',
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
