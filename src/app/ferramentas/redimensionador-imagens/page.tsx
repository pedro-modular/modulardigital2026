import { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { ImageResizer } from './ImageResizer'

export const metadata: Metadata = {
  title: 'Redimensionador de Imagens para Redes Sociais | Modular Digital',
  description: 'Redimensione imagens para Facebook, Instagram, LinkedIn, Twitter e YouTube. Ferramenta gratuita com tamanhos pré-definidos para cada plataforma.',
  keywords: ['redimensionar imagem', 'tamanho facebook', 'tamanho instagram', 'imagem linkedin', 'social media image size', 'resize image'],
  openGraph: {
    title: 'Redimensionador de Imagens para Redes Sociais | Modular Digital',
    description: 'Redimensione imagens para todas as plataformas sociais.',
    type: 'website',
  },
}

export default function ImageResizerPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Redimensionador de Imagens"
        highlightWord="Imagens"
        description="Redimensione imagens para os tamanhos corretos de cada rede social. Suporte para Facebook, Instagram, LinkedIn, Twitter, YouTube e muito mais."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <ImageResizer />
          </div>
        </div>
      </section>

      <ToolCTA
        title="Precisa de branding consistente para as redes sociais?"
        description="Criamos kits de identidade visual completos, incluindo templates para todas as plataformas e guidelines de uso."
        serviceSlug="web-design"
        serviceName="Web Design"
      />
    </>
  )
}
