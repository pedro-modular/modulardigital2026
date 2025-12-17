import { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { PrivacyPolicyGenerator } from './PrivacyPolicyGenerator'

export const metadata: Metadata = {
  title: 'Gerador de Política de Privacidade RGPD | Modular Digital',
  description: 'Gere uma política de privacidade personalizada e compatível com RGPD para o seu website. Ferramenta gratuita para empresas portuguesas.',
  keywords: ['política de privacidade', 'rgpd', 'gdpr', 'política privacidade portugal', 'gerador política privacidade', 'cookies rgpd'],
  openGraph: {
    title: 'Gerador de Política de Privacidade RGPD | Modular Digital',
    description: 'Gere uma política de privacidade compatível com RGPD para o seu website.',
    type: 'website',
  },
}

export default function PrivacyPolicyGeneratorPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Gerador de Política de Privacidade"
        highlightWord="Privacidade"
        description="Crie uma política de privacidade personalizada e compatível com o RGPD para o seu website. Responda a algumas perguntas e obtenha o documento pronto a usar."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <PrivacyPolicyGenerator />
          </div>
        </div>
      </section>

      <ToolCTA
        title="Precisa de apoio jurídico para RGPD?"
        description="Além da política de privacidade, a sua empresa pode precisar de DPO, avaliação de impacto e outras medidas. Podemos ajudar a implementar."
        serviceSlug="consultoria-digital"
        serviceName="Consultoria Digital"
      />
    </>
  )
}
