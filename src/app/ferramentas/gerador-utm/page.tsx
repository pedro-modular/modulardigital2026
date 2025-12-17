import { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { UTMBuilder } from './UTMBuilder'

export const metadata: Metadata = {
  title: 'Gerador de Links UTM Gratuito | Modular Digital',
  description: 'Crie URLs rastreáveis com parâmetros UTM para campanhas de marketing. Ferramenta gratuita para monitorizar tráfego no Google Analytics.',
  keywords: ['gerador utm', 'utm builder', 'link utm', 'google analytics', 'rastrear campanhas', 'utm portugal'],
  openGraph: {
    title: 'Gerador de Links UTM Gratuito | Modular Digital',
    description: 'Crie URLs rastreáveis com parâmetros UTM para campanhas de marketing.',
    type: 'website',
  },
}

export default function GeradorUTMPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Gerador de Links UTM"
        highlightWord="UTM"
        description="Crie URLs rastreáveis para campanhas de marketing. Monitorize a origem do tráfego no Google Analytics com parâmetros UTM corretamente formatados."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <UTMBuilder />
          </div>
        </div>
      </section>

      <ToolCTA
        title="Precisa de dashboards de analytics personalizados?"
        description="Configuramos o Google Analytics 4, Google Tag Manager e dashboards de reporting para a sua equipa de marketing tomar decisões baseadas em dados."
        serviceSlug="consultoria-digital"
        serviceName="Consultoria Digital"
      />
    </>
  )
}
