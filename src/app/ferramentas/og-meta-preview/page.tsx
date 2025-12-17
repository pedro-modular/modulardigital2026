import { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { OGPreview } from './OGPreview'

export const metadata: Metadata = {
  title: 'Preview de Meta Tags OG Gratuito | Modular Digital',
  description: 'Visualize como o seu site aparece no Facebook, Twitter, LinkedIn e WhatsApp. Verifique e otimize as meta tags Open Graph.',
  keywords: ['og tags', 'open graph', 'meta tags', 'preview social', 'facebook preview', 'linkedin preview', 'twitter card'],
  openGraph: {
    title: 'Preview de Meta Tags OG Gratuito | Modular Digital',
    description: 'Visualize como o seu site aparece nas redes sociais.',
    type: 'website',
  },
}

export default function OGMetaPreviewPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Preview de Meta Tags OG"
        highlightWord="OG"
        description="Visualize como o seu site aparece quando partilhado no Facebook, Twitter, LinkedIn e WhatsApp. Verifique e otimize as suas meta tags Open Graph."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <OGPreview />
          </div>
        </div>
      </section>

      <ToolCTA
        title="Precisa de ajuda com SEO técnico?"
        description="Otimizamos todas as meta tags, schema markup e elementos técnicos do seu site para melhorar a presença nos motores de busca e redes sociais."
        serviceSlug="seo"
        serviceName="SEO"
      />
    </>
  )
}
