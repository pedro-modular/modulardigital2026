import { Metadata } from 'next'
import { ToolHero, ToolCTA } from '@/components/tools'
import { QRCodeGenerator } from './QRCodeGenerator'

export const metadata: Metadata = {
  title: 'Gerador de QR Code Avançado Gratuito | Modular Digital',
  description: 'Crie QR Codes personalizados para URLs, vCards, WiFi, email e mais. Personalize cores e tamanho. Ferramenta gratuita.',
  keywords: ['gerador qr code', 'qr code gratis', 'criar qr code', 'qr code portugal', 'qr code wifi', 'qr code vcard'],
  openGraph: {
    title: 'Gerador de QR Code Avançado Gratuito | Modular Digital',
    description: 'Crie QR Codes personalizados para URLs, vCards, WiFi e mais.',
    type: 'website',
  },
}

export default function QRCodeGeneratorPage() {
  return (
    <>
      <ToolHero
        eyebrow="Ferramenta Gratuita"
        title="Gerador de QR Code Avançado"
        highlightWord="QR Code"
        description="Crie QR Codes para URLs, contactos vCard, redes WiFi, emails, telefone e mais. Personalize as cores e faça download em alta resolução."
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <QRCodeGenerator />
          </div>
        </div>
      </section>

      <ToolCTA
        title="Precisa de QR Codes com branding?"
        description="Criamos QR Codes personalizados com o logótipo da sua empresa, integrados em materiais de marketing físico e digital."
        serviceSlug="web-design"
        serviceName="Web Design"
      />
    </>
  )
}
