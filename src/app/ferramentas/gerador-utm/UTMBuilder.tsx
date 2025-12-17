'use client'

import { useState, useMemo, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyToClipboard } from '@/components/tools'

interface UTMParams {
  url: string
  source: string
  medium: string
  campaign: string
  term: string
  content: string
}

const commonSources = [
  { value: 'google', label: 'Google' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter/X' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'email', label: 'Email' },
]

const commonMediums = [
  { value: 'cpc', label: 'CPC (Paid Search)' },
  { value: 'social', label: 'Social' },
  { value: 'email', label: 'Email' },
  { value: 'display', label: 'Display' },
  { value: 'affiliate', label: 'Afiliado' },
  { value: 'referral', label: 'Referral' },
  { value: 'organic', label: 'Orgânico' },
]

function InputField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  required,
  suggestions,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  hint?: string
  required?: boolean
  suggestions?: { value: string; label: string }[]
}) {
  const [showSuggestions, setShowSuggestions] = useState(false)

  return (
    <div>
      <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
        {label} {required && <span className="text-[#e72f3f]">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
        />
        {suggestions && showSuggestions && (
          <div className="absolute left-0 right-0 top-full z-10 mt-1 rounded-lg border border-[#e5e5e5] bg-white py-2 shadow-lg">
            {suggestions.map((s) => (
              <button
                key={s.value}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault()
                  onChange(s.value)
                  setShowSuggestions(false)
                }}
                className="w-full px-4 py-2 text-left text-sm text-[#525252] hover:bg-[#f5f5f5]"
              >
                <span className="font-medium text-[#1a1a1a]">{s.value}</span>
                <span className="ml-2 text-[#737373]">({s.label})</span>
              </button>
            ))}
          </div>
        )}
      </div>
      {hint && <p className="mt-1.5 text-xs text-[#737373]">{hint}</p>}
    </div>
  )
}

export function UTMBuilder() {
  const [params, setParams] = useState<UTMParams>({
    url: '',
    source: '',
    medium: '',
    campaign: '',
    term: '',
    content: '',
  })
  const [showQR, setShowQR] = useState(false)
  const qrRef = useRef<HTMLDivElement>(null)

  const updateParam = (key: keyof UTMParams, value: string) => {
    setParams((prev) => ({ ...prev, [key]: value }))
  }

  const generatedURL = useMemo(() => {
    if (!params.url) return ''

    let baseURL = params.url.trim()

    // Add https:// if no protocol
    if (!baseURL.match(/^https?:\/\//)) {
      baseURL = 'https://' + baseURL
    }

    try {
      const url = new URL(baseURL)

      if (params.source) url.searchParams.set('utm_source', params.source.toLowerCase().replace(/\s+/g, '_'))
      if (params.medium) url.searchParams.set('utm_medium', params.medium.toLowerCase().replace(/\s+/g, '_'))
      if (params.campaign) url.searchParams.set('utm_campaign', params.campaign.toLowerCase().replace(/\s+/g, '_'))
      if (params.term) url.searchParams.set('utm_term', params.term.toLowerCase().replace(/\s+/g, '_'))
      if (params.content) url.searchParams.set('utm_content', params.content.toLowerCase().replace(/\s+/g, '_'))

      return url.toString()
    } catch {
      return ''
    }
  }, [params])

  const isValid = params.url && params.source && params.medium && params.campaign

  const downloadQRCode = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = 512
      canvas.height = 512
      ctx?.drawImage(img, 0, 0, 512, 512)

      const link = document.createElement('a')
      link.download = `utm-qr-${params.campaign || 'link'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }

    const base64 = btoa(
      encodeURIComponent(svgData).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    )
    img.src = 'data:image/svg+xml;base64,' + base64
  }

  const clearAll = () => {
    setParams({
      url: '',
      source: '',
      medium: '',
      campaign: '',
      term: '',
      content: '',
    })
    setShowQR(false)
  }

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-[#1a1a1a]">Parâmetros UTM</h2>
          <button
            onClick={clearAll}
            className="text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors"
          >
            Limpar tudo
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* URL */}
          <InputField
            label="URL de Destino"
            value={params.url}
            onChange={(v) => updateParam('url', v)}
            placeholder="https://modulardigital.pt/servicos"
            hint="O URL da página que pretende rastrear"
            required
          />

          {/* Source & Medium */}
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              label="Origem (utm_source)"
              value={params.source}
              onChange={(v) => updateParam('source', v)}
              placeholder="google, facebook, newsletter"
              hint="Identifica de onde vem o tráfego"
              required
              suggestions={commonSources}
            />
            <InputField
              label="Meio (utm_medium)"
              value={params.medium}
              onChange={(v) => updateParam('medium', v)}
              placeholder="cpc, email, social"
              hint="Tipo de canal de marketing"
              required
              suggestions={commonMediums}
            />
          </div>

          {/* Campaign */}
          <InputField
            label="Campanha (utm_campaign)"
            value={params.campaign}
            onChange={(v) => updateParam('campaign', v)}
            placeholder="black_friday_2024, lancamento_produto"
            hint="Nome da campanha específica"
            required
          />

          {/* Term & Content (Optional) */}
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              label="Termo (utm_term)"
              value={params.term}
              onChange={(v) => updateParam('term', v)}
              placeholder="web design portugal"
              hint="Palavras-chave pagas (opcional)"
            />
            <InputField
              label="Conteúdo (utm_content)"
              value={params.content}
              onChange={(v) => updateParam('content', v)}
              placeholder="banner_header, cta_rodape"
              hint="Diferencia anúncios/links (opcional)"
            />
          </div>
        </div>
      </div>

      {/* Generated URL Output */}
      <AnimatePresence>
        {isValid && generatedURL && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Generated Link */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Link Gerado</h2>

              <div className="mt-4 rounded-lg bg-[#f5f5f5] p-4">
                <code className="break-all text-sm text-[#525252]">{generatedURL}</code>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <CopyToClipboard text={generatedURL} label="Copiar Link" />
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="magnetic inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-transparent px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                  </svg>
                  <span>{showQR ? 'Ocultar QR Code' : 'Gerar QR Code'}</span>
                </button>
              </div>
            </div>

            {/* QR Code */}
            <AnimatePresence>
              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
                    <h2 className="text-lg font-bold text-[#1a1a1a]">QR Code</h2>

                    <div className="mt-4 flex flex-col items-center">
                      <div ref={qrRef} className="rounded-2xl bg-white p-4">
                        <QRCodeSVG
                          value={generatedURL}
                          size={200}
                          bgColor="#ffffff"
                          fgColor="#1a1a1a"
                          level="H"
                          includeMargin={false}
                        />
                      </div>

                      <button
                        onClick={downloadQRCode}
                        className="magnetic mt-6 inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <span>Download PNG</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* UTM Parameters Breakdown */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Parâmetros Aplicados</h2>
              <div className="mt-4 space-y-3">
                {[
                  { key: 'utm_source', value: params.source, label: 'Origem' },
                  { key: 'utm_medium', value: params.medium, label: 'Meio' },
                  { key: 'utm_campaign', value: params.campaign, label: 'Campanha' },
                  { key: 'utm_term', value: params.term, label: 'Termo' },
                  { key: 'utm_content', value: params.content, label: 'Conteúdo' },
                ]
                  .filter((p) => p.value)
                  .map((param) => (
                    <div
                      key={param.key}
                      className="flex items-center justify-between rounded-lg bg-[#f5f5f5] px-4 py-3"
                    >
                      <div>
                        <span className="text-xs text-[#737373]">{param.label}</span>
                        <p className="font-mono text-sm font-medium text-[#1a1a1a]">{param.key}</p>
                      </div>
                      <code className="rounded bg-white px-3 py-1 text-sm text-[#525252]">
                        {param.value.toLowerCase().replace(/\s+/g, '_')}
                      </code>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!isValid && (
        <div className="rounded-2xl border-2 border-dashed border-[#e5e5e5] bg-white/50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
            <svg className="h-6 w-6 text-[#737373]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </div>
          <p className="mt-4 text-sm text-[#737373]">
            Preencha o URL, origem, meio e campanha para gerar o link rastreável
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-6">
        <h3 className="font-bold text-[#1a1a1a]">Como usar parâmetros UTM</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">utm_source</p>
            <p className="mt-1 text-xs text-[#737373]">
              Identifica o site ou plataforma (ex: google, facebook, newsletter)
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">utm_medium</p>
            <p className="mt-1 text-xs text-[#737373]">
              Tipo de canal de marketing (ex: cpc, email, social, display)
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">utm_campaign</p>
            <p className="mt-1 text-xs text-[#737373]">
              Nome da campanha específica (ex: black_friday_2024)
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">utm_term</p>
            <p className="mt-1 text-xs text-[#737373]">
              Palavras-chave pagas (útil para Google Ads)
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-[#1a1a1a]">utm_content</p>
            <p className="mt-1 text-xs text-[#737373]">
              Diferencia anúncios ou links (ex: banner_header, link_rodape)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
