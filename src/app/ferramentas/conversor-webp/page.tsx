import type { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { WebPConverter } from './WebPConverter'

export const metadata: Metadata = {
  title: 'Conversor WebP Online Gratuito | Converter Imagem para WebP | Modular Digital',
  description: 'Converta imagens JPG, PNG e GIF para WebP diretamente no browser. Sem upload para servidor, 100% privado. Compressão ajustável e conversão em lote.',
  keywords: ['Conversor WebP', 'Converter Imagem WebP', 'JPG para WebP', 'PNG para WebP', 'comprimir imagens online', 'otimizar imagens web'],
  openGraph: {
    title: 'Conversor WebP Gratuito | Modular Digital',
    description: 'Converta imagens para WebP sem upload. Processamento local, 100% privado.',
    url: 'https://modulardigital.pt/ferramentas/conversor-webp',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function WebPConverterPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Conversor de Imagens para WebP"
        highlightWord="WebP"
        description="Converta imagens JPG, PNG e GIF para o formato WebP diretamente no seu browser. Sem upload para servidores, 100% privado e seguro."
      />

      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
            {/* Converter - Takes 2 columns */}
            <div className="lg:col-span-2">
              <WebPConverter />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* What is WebP */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">O que é WebP?</h2>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  <strong>WebP</strong> é um formato de imagem moderno desenvolvido pela Google que oferece compressão superior a JPEG e PNG.
                </p>
                <p className="mt-3 text-sm text-[#525252] leading-relaxed">
                  Imagens WebP podem ser até <strong>30% mais pequenas</strong> que JPEGs com qualidade equivalente, melhorando significativamente a velocidade do seu website.
                </p>
              </div>

              {/* Benefits */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Benefícios do WebP</h2>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Ficheiros até 30% mais pequenos que JPEG</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Suporte para transparência (como PNG)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Melhoria no Core Web Vitals (LCP)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 shrink-0 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#525252]">Suportado em todos os browsers modernos</span>
                  </li>
                </ul>
              </div>

              {/* Privacy */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">100% Privado</h2>
                <div className="mt-4 flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[#525252] leading-relaxed">
                      As suas imagens <strong>nunca são enviadas</strong> para nenhum servidor. Todo o processamento acontece localmente no seu browser.
                    </p>
                    <p className="mt-2 text-sm text-[#525252] leading-relaxed">
                      Conformidade total com <strong>RGPD</strong> garantida.
                    </p>
                  </div>
                </div>
              </div>

              {/* Browser support */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Compatibilidade</h2>
                <p className="mt-3 text-sm text-[#525252]">WebP é suportado em:</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'].map((browser) => (
                    <span
                      key={browser}
                      className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                    >
                      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {browser}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#737373]">
                  97%+ dos utilizadores globais podem ver imagens WebP
                </p>
              </div>

              {/* CTA */}
              <ToolCTA
                title="Imagens otimizadas mas site ainda lento?"
                description="O código do seu website pode ser o problema. Fazemos auditorias de performance completas com relatórios detalhados."
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
            name: 'Conversor WebP',
            description: 'Ferramenta gratuita para converter imagens JPG, PNG e GIF para WebP no browser',
            url: 'https://modulardigital.pt/ferramentas/conversor-webp',
            applicationCategory: 'MultimediaApplication',
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
