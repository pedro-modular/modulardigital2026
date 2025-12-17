'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyToClipboard } from '@/components/tools'

interface PolicyData {
  companyName: string
  companyAddress: string
  companyEmail: string
  companyPhone: string
  websiteUrl: string
  nif: string
  dpoEmail: string
  // Data collection
  collectsContactForm: boolean
  collectsNewsletter: boolean
  collectsAnalytics: boolean
  collectsMarketing: boolean
  collectsEcommerce: boolean
  collectsUserAccounts: boolean
  // Third parties
  usesGoogleAnalytics: boolean
  usesFacebookPixel: boolean
  usesHotjar: boolean
  usesMailchimp: boolean
  usesStripe: boolean
  usesOtherThirdParty: string
  // Cookies
  usesCookies: boolean
  cookieTypes: ('necessary' | 'functional' | 'analytics' | 'marketing')[]
}

const defaultData: PolicyData = {
  companyName: '',
  companyAddress: '',
  companyEmail: '',
  companyPhone: '',
  websiteUrl: '',
  nif: '',
  dpoEmail: '',
  collectsContactForm: true,
  collectsNewsletter: false,
  collectsAnalytics: true,
  collectsMarketing: false,
  collectsEcommerce: false,
  collectsUserAccounts: false,
  usesGoogleAnalytics: true,
  usesFacebookPixel: false,
  usesHotjar: false,
  usesMailchimp: false,
  usesStripe: false,
  usesOtherThirdParty: '',
  usesCookies: true,
  cookieTypes: ['necessary', 'analytics'],
}

function Checkbox({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 rounded border-[#d1d5db] text-[#e72f3f] focus:ring-[#e72f3f]"
      />
      <div>
        <span className="text-sm font-medium text-[#1a1a1a]">{label}</span>
        {description && <p className="text-xs text-[#737373]">{description}</p>}
      </div>
    </label>
  )
}

export function PrivacyPolicyGenerator() {
  const [data, setData] = useState<PolicyData>(defaultData)
  const [step, setStep] = useState(1)
  const [showPolicy, setShowPolicy] = useState(false)

  const updateData = <K extends keyof PolicyData>(key: K, value: PolicyData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  const toggleCookieType = (type: 'necessary' | 'functional' | 'analytics' | 'marketing') => {
    setData((prev) => ({
      ...prev,
      cookieTypes: prev.cookieTypes.includes(type)
        ? prev.cookieTypes.filter((t) => t !== type)
        : [...prev.cookieTypes, type],
    }))
  }

  const isStep1Valid = data.companyName && data.websiteUrl && data.companyEmail
  const isStep2Valid = true // Optional fields
  const isStep3Valid = true // Optional fields

  const policy: string = useMemo(() => {
    const date = new Date().toLocaleDateString('pt-PT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const thirdParties: string[] = []
    if (data.usesGoogleAnalytics) thirdParties.push('Google Analytics (Google LLC, EUA)')
    if (data.usesFacebookPixel) thirdParties.push('Facebook Pixel (Meta Platforms Inc., EUA)')
    if (data.usesHotjar) thirdParties.push('Hotjar (Hotjar Ltd., Malta)')
    if (data.usesMailchimp) thirdParties.push('Mailchimp (Intuit Inc., EUA)')
    if (data.usesStripe) thirdParties.push('Stripe (Stripe Inc., EUA)')
    if (data.usesOtherThirdParty) thirdParties.push(data.usesOtherThirdParty)

    const dataTypes: string[] = []
    if (data.collectsContactForm) dataTypes.push('Nome, email e mensagem através de formulários de contacto')
    if (data.collectsNewsletter) dataTypes.push('Email para envio de newsletter')
    if (data.collectsAnalytics) dataTypes.push('Dados de navegação e estatísticas de utilização')
    if (data.collectsMarketing) dataTypes.push('Dados para personalização de publicidade')
    if (data.collectsEcommerce) dataTypes.push('Dados de faturação e envio para processamento de encomendas')
    if (data.collectsUserAccounts) dataTypes.push('Dados de registo e perfil de utilizador')

    return `# Política de Privacidade

**Última atualização:** ${date}

## 1. Identificação do Responsável pelo Tratamento

${data.companyName}${data.nif ? `\nNIF: ${data.nif}` : ''}${data.companyAddress ? `\nMorada: ${data.companyAddress}` : ''}
Email: ${data.companyEmail}${data.companyPhone ? `\nTelefone: ${data.companyPhone}` : ''}
Website: ${data.websiteUrl}${data.dpoEmail ? `\n\n**Encarregado de Proteção de Dados (DPO):** ${data.dpoEmail}` : ''}

## 2. Âmbito e Finalidade

A presente Política de Privacidade aplica-se ao website ${data.websiteUrl} e descreve como recolhemos, utilizamos e protegemos os seus dados pessoais, em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) - Regulamento (UE) 2016/679.

## 3. Dados Pessoais Recolhidos

Recolhemos os seguintes tipos de dados pessoais:

${dataTypes.map((d) => `- ${d}`).join('\n')}

## 4. Base Legal para o Tratamento

O tratamento dos seus dados pessoais baseia-se nas seguintes bases legais:

- **Consentimento:** Quando nos fornece explicitamente os seus dados (ex: formulários, newsletter)
- **Execução de contrato:** Quando necessário para fornecer serviços solicitados
- **Interesse legítimo:** Para análise estatística e melhoria dos nossos serviços
- **Obrigação legal:** Quando exigido por lei portuguesa ou europeia

## 5. Finalidades do Tratamento

Utilizamos os seus dados para as seguintes finalidades:

- Responder a pedidos de contacto e solicitações
${data.collectsNewsletter ? '- Enviar newsletters e comunicações de marketing (mediante consentimento)' : ''}
${data.collectsAnalytics ? '- Análise estatística de utilização do website' : ''}
${data.collectsEcommerce ? '- Processamento e entrega de encomendas' : ''}
${data.collectsUserAccounts ? '- Gestão de contas de utilizador' : ''}
- Cumprir obrigações legais e regulamentares

## 6. Partilha de Dados com Terceiros

${thirdParties.length > 0 ? `Os seus dados podem ser partilhados com os seguintes prestadores de serviços:

${thirdParties.map((t) => `- ${t}`).join('\n')}

Estes prestadores estão vinculados por acordos de processamento de dados e comprometem-se a proteger os seus dados de acordo com o RGPD.` : 'Não partilhamos os seus dados pessoais com terceiros, exceto quando legalmente exigido.'}

${thirdParties.some((t) => t.includes('EUA')) ? `
### Transferências Internacionais

Alguns dos nossos prestadores de serviços estão localizados nos Estados Unidos da América. Estas transferências são realizadas ao abrigo de cláusulas contratuais-tipo aprovadas pela Comissão Europeia ou outros mecanismos de transferência válidos.` : ''}

## 7. Período de Conservação

Conservamos os seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram recolhidos:

- Dados de contacto: 2 anos após a última interação
${data.collectsNewsletter ? '- Dados de newsletter: Até cancelamento da subscrição' : ''}
${data.collectsEcommerce ? '- Dados de faturação: 10 anos (obrigação fiscal)' : ''}
${data.collectsUserAccounts ? '- Dados de conta: Até eliminação da conta pelo utilizador' : ''}
- Dados de navegação: 26 meses

## 8. Os Seus Direitos

Nos termos do RGPD, tem os seguintes direitos sobre os seus dados pessoais:

- **Direito de acesso:** Obter confirmação e acesso aos seus dados
- **Direito de retificação:** Corrigir dados inexatos ou incompletos
- **Direito ao apagamento:** Solicitar a eliminação dos seus dados ("direito a ser esquecido")
- **Direito à limitação:** Restringir o tratamento dos seus dados
- **Direito de portabilidade:** Receber os seus dados em formato estruturado
- **Direito de oposição:** Opor-se ao tratamento para marketing direto
- **Direito de retirar o consentimento:** A qualquer momento, sem afetar a licitude do tratamento anterior

Para exercer estes direitos, contacte-nos através de: ${data.companyEmail}${data.dpoEmail ? ` ou ${data.dpoEmail}` : ''}

## 9. Reclamações

Se considerar que o tratamento dos seus dados viola o RGPD, tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD):

**Comissão Nacional de Proteção de Dados**
Av. D. Carlos I, 134 - 1.º
1200-651 Lisboa
Website: www.cnpd.pt

${data.usesCookies ? `## 10. Política de Cookies

### O que são Cookies?

Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita o nosso website. Permitem-nos reconhecer o seu browser e melhorar a sua experiência de navegação.

### Tipos de Cookies Utilizados

${data.cookieTypes.includes('necessary') ? `**Cookies Necessários (Obrigatórios)**
Essenciais para o funcionamento do website. Não podem ser desativados.
- Sessão de utilizador
- Preferências de cookies

` : ''}${data.cookieTypes.includes('functional') ? `**Cookies Funcionais**
Permitem funcionalidades melhoradas e personalização.
- Preferências de idioma
- Dados de formulários guardados

` : ''}${data.cookieTypes.includes('analytics') ? `**Cookies Analíticos**
Ajudam-nos a compreender como os visitantes interagem com o website.
${data.usesGoogleAnalytics ? '- Google Analytics (_ga, _gid, _gat)' : ''}
${data.usesHotjar ? '- Hotjar (_hjid, _hjSessionUser)' : ''}

` : ''}${data.cookieTypes.includes('marketing') ? `**Cookies de Marketing**
Utilizados para publicidade personalizada.
${data.usesFacebookPixel ? '- Facebook Pixel (_fbp)' : ''}

` : ''}
### Gestão de Cookies

Pode gerir as suas preferências de cookies a qualquer momento através das definições do seu browser ou através do nosso banner de cookies. Note que a desativação de alguns cookies pode afetar a funcionalidade do website.

` : ''}## ${data.usesCookies ? '11' : '10'}. Segurança

Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição, incluindo:

- Encriptação SSL/TLS
- Controlos de acesso
- Backups regulares
- Monitorização de segurança

## ${data.usesCookies ? '12' : '11'}. Alterações à Política de Privacidade

Reservamos o direito de atualizar esta política de privacidade. Quaisquer alterações significativas serão comunicadas através do nosso website. Recomendamos a consulta regular desta página.

## ${data.usesCookies ? '13' : '12'}. Contacto

Para questões relacionadas com esta política ou o tratamento dos seus dados, contacte-nos:

**${data.companyName}**
Email: ${data.companyEmail}${data.companyPhone ? `\nTelefone: ${data.companyPhone}` : ''}${data.companyAddress ? `\nMorada: ${data.companyAddress}` : ''}

---

*Esta política de privacidade foi gerada como modelo base. Recomendamos a revisão por um profissional jurídico para garantir adequação às especificidades do seu negócio.*`

    return policy
  }, [data])

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Nome da Empresa / Titular *
        </label>
        <input
          type="text"
          value={data.companyName}
          onChange={(e) => updateData('companyName', e.target.value)}
          placeholder="Empresa, Lda"
          className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            URL do Website *
          </label>
          <input
            type="text"
            value={data.websiteUrl}
            onChange={(e) => updateData('websiteUrl', e.target.value)}
            placeholder="https://empresa.pt"
            className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">NIF</label>
          <input
            type="text"
            value={data.nif}
            onChange={(e) => updateData('nif', e.target.value)}
            placeholder="123456789"
            className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Morada</label>
        <input
          type="text"
          value={data.companyAddress}
          onChange={(e) => updateData('companyAddress', e.target.value)}
          placeholder="Rua Exemplo 123, 1000-001 Lisboa"
          className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
            Email de Contacto *
          </label>
          <input
            type="email"
            value={data.companyEmail}
            onChange={(e) => updateData('companyEmail', e.target.value)}
            placeholder="privacidade@empresa.pt"
            className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Telefone</label>
          <input
            type="tel"
            value={data.companyPhone}
            onChange={(e) => updateData('companyPhone', e.target.value)}
            placeholder="+351 912 345 678"
            className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
          Email do DPO (Encarregado de Proteção de Dados)
        </label>
        <input
          type="email"
          value={data.dpoEmail}
          onChange={(e) => updateData('dpoEmail', e.target.value)}
          placeholder="dpo@empresa.pt"
          className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
        />
        <p className="mt-1 text-xs text-[#737373]">Opcional - obrigatório para algumas organizações</p>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-[#1a1a1a] mb-4">Que tipos de dados recolhe no seu website?</p>
        <div className="space-y-4">
          <Checkbox
            label="Formulário de Contacto"
            description="Nome, email e mensagem de visitantes"
            checked={data.collectsContactForm}
            onChange={(v) => updateData('collectsContactForm', v)}
          />
          <Checkbox
            label="Newsletter"
            description="Email para envio de comunicações"
            checked={data.collectsNewsletter}
            onChange={(v) => updateData('collectsNewsletter', v)}
          />
          <Checkbox
            label="Estatísticas de Navegação"
            description="Dados anónimos de utilização do site"
            checked={data.collectsAnalytics}
            onChange={(v) => updateData('collectsAnalytics', v)}
          />
          <Checkbox
            label="Marketing e Publicidade"
            description="Dados para personalização de anúncios"
            checked={data.collectsMarketing}
            onChange={(v) => updateData('collectsMarketing', v)}
          />
          <Checkbox
            label="E-commerce"
            description="Dados de faturação e envio"
            checked={data.collectsEcommerce}
            onChange={(v) => updateData('collectsEcommerce', v)}
          />
          <Checkbox
            label="Contas de Utilizador"
            description="Registo e perfis de utilizador"
            checked={data.collectsUserAccounts}
            onChange={(v) => updateData('collectsUserAccounts', v)}
          />
        </div>
      </div>

      <div className="border-t border-[#e5e5e5] pt-6">
        <p className="text-sm font-medium text-[#1a1a1a] mb-4">Que serviços de terceiros utiliza?</p>
        <div className="space-y-4">
          <Checkbox
            label="Google Analytics"
            description="Análise de tráfego e comportamento"
            checked={data.usesGoogleAnalytics}
            onChange={(v) => updateData('usesGoogleAnalytics', v)}
          />
          <Checkbox
            label="Facebook Pixel"
            description="Rastreamento de conversões e remarketing"
            checked={data.usesFacebookPixel}
            onChange={(v) => updateData('usesFacebookPixel', v)}
          />
          <Checkbox
            label="Hotjar"
            description="Mapas de calor e gravações de sessão"
            checked={data.usesHotjar}
            onChange={(v) => updateData('usesHotjar', v)}
          />
          <Checkbox
            label="Mailchimp"
            description="Gestão de newsletters"
            checked={data.usesMailchimp}
            onChange={(v) => updateData('usesMailchimp', v)}
          />
          <Checkbox
            label="Stripe"
            description="Processamento de pagamentos"
            checked={data.usesStripe}
            onChange={(v) => updateData('usesStripe', v)}
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Outros serviços</label>
          <input
            type="text"
            value={data.usesOtherThirdParty}
            onChange={(e) => updateData('usesOtherThirdParty', e.target.value)}
            placeholder="Ex: HubSpot, Zendesk, etc."
            className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <Checkbox
        label="O website utiliza cookies"
        checked={data.usesCookies}
        onChange={(v) => updateData('usesCookies', v)}
      />

      {data.usesCookies && (
        <div className="ml-8 space-y-4">
          <p className="text-sm font-medium text-[#1a1a1a]">Tipos de cookies utilizados:</p>
          <Checkbox
            label="Cookies Necessários"
            description="Essenciais para o funcionamento básico"
            checked={data.cookieTypes.includes('necessary')}
            onChange={() => toggleCookieType('necessary')}
          />
          <Checkbox
            label="Cookies Funcionais"
            description="Melhoram a experiência (ex: idioma)"
            checked={data.cookieTypes.includes('functional')}
            onChange={() => toggleCookieType('functional')}
          />
          <Checkbox
            label="Cookies Analíticos"
            description="Estatísticas de utilização"
            checked={data.cookieTypes.includes('analytics')}
            onChange={() => toggleCookieType('analytics')}
          />
          <Checkbox
            label="Cookies de Marketing"
            description="Publicidade personalizada"
            checked={data.cookieTypes.includes('marketing')}
            onChange={() => toggleCookieType('marketing')}
          />
        </div>
      )}
    </div>
  )

  const copyAsPlainText = () => {
    navigator.clipboard.writeText(policy)
  }

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => setStep(s)}
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  step === s
                    ? 'bg-[#e72f3f] text-white'
                    : step > s
                    ? 'bg-[#1a1a1a] text-white'
                    : 'bg-[#f5f5f5] text-[#737373]'
                }`}
              >
                {step > s ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  s
                )}
              </button>
              {s < 3 && (
                <div
                  className={`mx-2 h-1 w-16 sm:w-24 lg:w-32 rounded ${
                    step > s ? 'bg-[#1a1a1a]' : 'bg-[#e5e5e5]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between text-xs text-[#737373]">
          <span>Dados da Empresa</span>
          <span>Recolha de Dados</span>
          <span>Cookies</span>
        </div>
      </div>

      {/* Form Content */}
      {!showPolicy && (
        <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
          <h2 className="text-lg font-bold text-[#1a1a1a]">
            {step === 1 && 'Dados da Empresa'}
            {step === 2 && 'Recolha de Dados'}
            {step === 3 && 'Política de Cookies'}
          </h2>

          <div className="mt-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          <div className="mt-8 flex justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#e5e5e5] bg-white px-6 py-3 text-sm font-medium text-[#525252] transition-all hover:border-[#1a1a1a]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Anterior
              </button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !isStep1Valid}
                className="magnetic inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                Seguinte
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setShowPolicy(true)}
                className="magnetic inline-flex items-center gap-2 rounded-full bg-[#e72f3f] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#c4262f]"
              >
                Gerar Política
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Generated Policy */}
      <AnimatePresence>
        {showPolicy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#1a1a1a]">Política de Privacidade Gerada</h2>
                <button
                  onClick={() => setShowPolicy(false)}
                  className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors"
                >
                  Editar dados
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <CopyToClipboard text={policy} label="Copiar Markdown" />
                <button
                  onClick={copyAsPlainText}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-transparent px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  Copiar Texto
                </button>
              </div>

              <div className="mt-6 max-h-[600px] overflow-y-auto rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-6">
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm text-[#525252] font-sans">{policy}</pre>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
              <div className="flex gap-3">
                <svg className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                <div>
                  <p className="text-sm font-medium text-amber-800">Aviso Legal</p>
                  <p className="mt-1 text-sm text-amber-700">
                    Este documento foi gerado como modelo base e não constitui aconselhamento jurídico.
                    Recomendamos a revisão por um advogado especializado para garantir adequação às
                    especificidades do seu negócio e conformidade total com o RGPD.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
