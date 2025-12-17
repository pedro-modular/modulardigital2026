import type { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { WhatsAppGenerator } from './WhatsAppGenerator'

export const metadata: Metadata = {
  title: 'Gerador de Link WhatsApp Business | Ferramenta Gratuita | Modular Digital',
  description: 'Crie links wa.me personalizados para WhatsApp Business com mensagem pré-definida. Gere QR codes instantaneamente. Ferramenta gratuita para empresas portuguesas.',
  keywords: ['Link WhatsApp Business', 'Gerador Link WhatsApp', 'wa.me Portugal', 'QR Code WhatsApp', 'WhatsApp marketing'],
  openGraph: {
    title: 'Gerador de Link WhatsApp Business | Modular Digital',
    description: 'Crie links wa.me personalizados com QR codes. Ferramenta gratuita.',
    url: 'https://modulardigital.pt/ferramentas/gerador-link-whatsapp',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

export default function WhatsAppLinkGeneratorPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Gerador de Link WhatsApp"
        highlightWord="WhatsApp"
        description="Crie links wa.me personalizados com mensagens pré-definidas e QR codes para as suas campanhas de marketing e atendimento ao cliente."
      />

      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Generator */}
            <div>
              <WhatsAppGenerator />
            </div>

            {/* Info & CTA */}
            <div className="space-y-8">
              {/* How it works */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Como funciona?</h2>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xs font-bold text-white">1</span>
                    <span className="text-[#525252]">Introduza o número de telefone do WhatsApp Business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xs font-bold text-white">2</span>
                    <span className="text-[#525252]">Escreva a mensagem pré-definida (opcional)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-xs font-bold text-white">3</span>
                    <span className="text-[#525252]">Copie o link ou faça download do QR code</span>
                  </li>
                </ul>
              </div>

              {/* Use cases */}
              <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Casos de uso</h2>
                <ul className="mt-4 space-y-2 text-[#525252]">
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Botões de contacto em landing pages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Campanhas de Facebook e Instagram Ads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>QR codes em materiais impressos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Assinaturas de email e newsletters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="h-4 w-4 text-[#e72f3f]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Suporte ao cliente em e-commerce</span>
                  </li>
                </ul>
              </div>

              {/* CTA */}
              <ToolCTA
                title="Precisa de integrar WhatsApp no seu negócio?"
                description="Desenvolvemos automações personalizadas com WhatsApp Business API, chatbots e integração com CRM."
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
            name: 'Gerador de Link WhatsApp',
            description: 'Ferramenta gratuita para criar links wa.me personalizados com QR codes',
            url: 'https://modulardigital.pt/ferramentas/gerador-link-whatsapp',
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
