import type { Metadata } from 'next'
import Link from 'next/link'
import { ToolHero } from '@/components/tools'

export const metadata: Metadata = {
  title: 'Ferramentas Gratuitas de Marketing Digital | Modular Digital',
  description: 'Ferramentas gratuitas para profissionais de marketing: gerador de links WhatsApp, calculadora ROAS, gerador Schema JSON-LD, checklist acessibilidade e conversor WebP.',
  keywords: ['ferramentas marketing digital', 'ferramentas SEO gratuitas', 'calculadora ROAS', 'gerador schema', 'conversor WebP'],
  alternates: {
    canonical: 'https://modulardigital.pt/ferramentas',
  },
  openGraph: {
    title: 'Ferramentas Gratuitas | Modular Digital',
    description: 'Suite de ferramentas gratuitas para profissionais de marketing digital em Portugal.',
    url: 'https://modulardigital.pt/ferramentas',
    siteName: 'Modular Digital',
    locale: 'pt_PT',
    type: 'website',
  },
}

const tools = [
  {
    title: 'Gerador de Link WhatsApp',
    slug: 'gerador-link-whatsapp',
    description: 'Crie links wa.me personalizados com mensagens pré-definidas e QR codes para campanhas de marketing.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
      </svg>
    ),
    badge: 'Popular',
    target: 'Vendas & Marketing',
  },
  {
    title: 'Calculadora ROAS',
    slug: 'calculadora-roas',
    description: 'Calcule o ROAS, ROI e ponto de break-even das suas campanhas de marketing digital com gráficos visuais.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    badge: null,
    target: 'E-commerce & Marketing',
  },
  {
    title: 'Gerador de Links UTM',
    slug: 'gerador-utm',
    description: 'Crie URLs rastreáveis com parâmetros UTM para monitorizar campanhas no Google Analytics.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    badge: 'Novo',
    target: 'Analytics & Marketing',
  },
  {
    title: 'Preview Meta Tags OG',
    slug: 'og-meta-preview',
    description: 'Visualize como o seu site aparece quando partilhado no Facebook, Twitter, LinkedIn e WhatsApp.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    badge: 'Novo',
    target: 'Social Media & SEO',
  },
  {
    title: 'Gerador QR Code Avançado',
    slug: 'gerador-qr-code',
    description: 'Crie QR Codes personalizados para URLs, vCards, WiFi, email e mais. Personalize cores e tamanho.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
      </svg>
    ),
    badge: 'Novo',
    target: 'Marketing & Impressão',
  },
  {
    title: 'Gerador Schema JSON-LD',
    slug: 'gerador-schema-local-business',
    description: 'Gere código de dados estruturados Schema.org para melhorar a visibilidade do seu negócio no Google.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    badge: 'SEO',
    target: 'SEO & Desenvolvimento',
  },
  {
    title: 'Checklist Acessibilidade WCAG 2.1',
    slug: 'checklist-acessibilidade',
    description: 'Verifique a conformidade do seu website com as diretrizes WCAG 2.1. Guarde o progresso automaticamente.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    badge: null,
    target: 'Acessibilidade & Compliance',
  },
  {
    title: 'Conversor WebP',
    slug: 'conversor-webp',
    description: 'Converta imagens JPG, PNG e GIF para WebP no browser. 100% privado, sem upload para servidores.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    badge: null,
    target: 'Performance & Design',
  },
  {
    title: 'Redimensionador de Imagens',
    slug: 'redimensionador-imagens',
    description: 'Redimensione imagens para Facebook, Instagram, LinkedIn, Twitter e YouTube com tamanhos pré-definidos.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    ),
    badge: 'Novo',
    target: 'Social Media & Design',
  },
  {
    title: 'Gerador Política de Privacidade',
    slug: 'gerador-politica-privacidade',
    description: 'Crie uma política de privacidade compatível com RGPD para o seu website português.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    badge: 'RGPD',
    target: 'Legal & Compliance',
  },
]

export default function FerramentasPage() {
  return (
    <>
      <ToolHero
        eyebrow="Recursos Gratuitos"
        title="Ferramentas de Marketing Digital"
        highlightWord="Ferramentas"
        description="Suite de ferramentas gratuitas para ajudar profissionais de marketing, SEO e desenvolvimento web em Portugal."
      />

      {/* Tools Grid */}
      <section className="bg-[#fafafa] py-16 lg:py-24 mesh-gradient">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/ferramentas/${tool.slug}`}
                className="group relative flex flex-col rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f] hover:shadow-lg lg:p-8"
              >
                {tool.badge && (
                  <span className="absolute right-4 top-4 rounded-full bg-[#e72f3f] px-3 py-1 text-xs font-medium text-white">
                    {tool.badge}
                  </span>
                )}

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f5f5f5] text-[#1a1a1a] transition-colors group-hover:bg-[#e72f3f] group-hover:text-white">
                  {tool.icon}
                </div>

                <h2 className="mt-6 text-xl font-bold text-[#1a1a1a] transition-colors group-hover:text-[#e72f3f]">
                  {tool.title}
                </h2>

                <p className="mt-3 flex-1 text-sm text-[#525252] leading-relaxed">
                  {tool.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs font-medium text-[#737373]">{tool.target}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f5f5f5] transition-all group-hover:bg-[#e72f3f] group-hover:translate-x-1">
                    <svg
                      className="h-4 w-4 text-[#1a1a1a] group-hover:text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#1a1a1a] py-16 lg:py-24 grain">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-headline text-white">
            Precisa de uma ferramenta <span className="text-[#e72f3f]">personalizada</span>?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
            Desenvolvemos aplicações web personalizadas para automatizar processos e aumentar a produtividade da sua equipa.
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
            name: 'Ferramentas Gratuitas de Marketing Digital',
            description: 'Suite de ferramentas gratuitas para profissionais de marketing digital',
            url: 'https://modulardigital.pt/ferramentas',
            provider: {
              '@type': 'Organization',
              name: 'Modular Digital',
              url: 'https://modulardigital.pt'
            },
            hasPart: tools.map((tool) => ({
              '@type': 'WebApplication',
              name: tool.title,
              description: tool.description,
              url: `https://modulardigital.pt/ferramentas/${tool.slug}`,
              applicationCategory: 'BusinessApplication',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR'
              }
            }))
          })
        }}
      />
    </>
  )
}
