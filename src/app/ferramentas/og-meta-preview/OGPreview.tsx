'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyToClipboard } from '@/components/tools'

interface OGMeta {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  type: string
  twitterCard: 'summary' | 'summary_large_image'
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  hint,
  multiline,
  maxLength,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  hint?: string
  multiline?: boolean
  maxLength?: number
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-[#1a1a1a]">{label}</label>
        {maxLength && (
          <span className={`text-xs ${value.length > maxLength ? 'text-[#e72f3f]' : 'text-[#737373]'}`}>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full resize-none rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-[#737373]">{hint}</p>}
    </div>
  )
}

function FacebookPreview({ meta }: { meta: OGMeta }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#dddfe2] bg-white">
      {meta.image && (
        <div className="relative aspect-[1.91/1] bg-[#f0f2f5]">
          <img
            src={meta.image}
            alt="OG Preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="border-t border-[#dddfe2] bg-[#f0f2f5] p-3">
        <p className="text-xs uppercase text-[#606770]">{meta.url ? new URL(meta.url).hostname : 'modulardigital.pt'}</p>
        <p className="mt-1 text-base font-semibold text-[#1d2129] line-clamp-2">{meta.title || 'Título da Página'}</p>
        <p className="mt-1 text-sm text-[#606770] line-clamp-2">{meta.description || 'Descrição da página...'}</p>
      </div>
    </div>
  )
}

function TwitterPreview({ meta }: { meta: OGMeta }) {
  const isLargeCard = meta.twitterCard === 'summary_large_image'

  if (isLargeCard) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#cfd9de]">
        {meta.image && (
          <div className="relative aspect-[2/1] bg-[#f7f9f9]">
            <img
              src={meta.image}
              alt="OG Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
        <div className="border-t border-[#cfd9de] bg-white p-3">
          <p className="text-sm text-[#536471]">{meta.url ? new URL(meta.url).hostname : 'modulardigital.pt'}</p>
          <p className="mt-0.5 text-sm font-bold text-[#0f1419] line-clamp-2">{meta.title || 'Título da Página'}</p>
          <p className="mt-0.5 text-sm text-[#536471] line-clamp-2">{meta.description || 'Descrição da página...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex overflow-hidden rounded-2xl border border-[#cfd9de]">
      {meta.image && (
        <div className="relative h-32 w-32 shrink-0 bg-[#f7f9f9]">
          <img
            src={meta.image}
            alt="OG Preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="flex flex-col justify-center border-l border-[#cfd9de] bg-white p-3">
        <p className="text-sm text-[#536471]">{meta.url ? new URL(meta.url).hostname : 'modulardigital.pt'}</p>
        <p className="mt-0.5 text-sm font-bold text-[#0f1419] line-clamp-2">{meta.title || 'Título da Página'}</p>
        <p className="mt-0.5 text-sm text-[#536471] line-clamp-2">{meta.description || 'Descrição da página...'}</p>
      </div>
    </div>
  )
}

function LinkedInPreview({ meta }: { meta: OGMeta }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e0dfdc] bg-white">
      {meta.image && (
        <div className="relative aspect-[1.91/1] bg-[#f3f2ef]">
          <img
            src={meta.image}
            alt="OG Preview"
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </div>
      )}
      <div className="border-t border-[#e0dfdc] bg-[#eef3f8] p-3">
        <p className="text-sm font-semibold text-[#000000e6] line-clamp-2">{meta.title || 'Título da Página'}</p>
        <p className="mt-1 text-xs text-[#00000099]">{meta.url ? new URL(meta.url).hostname : 'modulardigital.pt'}</p>
      </div>
    </div>
  )
}

function WhatsAppPreview({ meta }: { meta: OGMeta }) {
  return (
    <div className="overflow-hidden rounded-lg bg-[#dcf8c6]">
      <div className="rounded-lg bg-white m-1 overflow-hidden">
        {meta.image && (
          <div className="relative aspect-[1.91/1] bg-[#f0f0f0]">
            <img
              src={meta.image}
              alt="OG Preview"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          </div>
        )}
        <div className="p-2">
          <p className="text-xs text-[#027eb5]">{meta.url ? new URL(meta.url).hostname : 'modulardigital.pt'}</p>
          <p className="mt-0.5 text-sm font-medium text-[#303030] line-clamp-2">{meta.title || 'Título da Página'}</p>
          <p className="mt-0.5 text-xs text-[#8a8a8a] line-clamp-2">{meta.description || 'Descrição da página...'}</p>
        </div>
      </div>
    </div>
  )
}

export function OGPreview() {
  const [meta, setMeta] = useState<OGMeta>({
    title: '',
    description: '',
    image: '',
    url: '',
    siteName: '',
    type: 'website',
    twitterCard: 'summary_large_image',
  })
  const [activePreview, setActivePreview] = useState<'facebook' | 'twitter' | 'linkedin' | 'whatsapp'>('facebook')

  const updateMeta = (key: keyof OGMeta, value: string) => {
    setMeta((prev) => ({ ...prev, [key]: value }))
  }

  const generatedCode = useMemo(() => {
    const tags: string[] = [
      '<!-- Open Graph Meta Tags -->',
    ]

    if (meta.title) tags.push(`<meta property="og:title" content="${meta.title}" />`)
    if (meta.description) tags.push(`<meta property="og:description" content="${meta.description}" />`)
    if (meta.image) tags.push(`<meta property="og:image" content="${meta.image}" />`)
    if (meta.url) tags.push(`<meta property="og:url" content="${meta.url}" />`)
    if (meta.siteName) tags.push(`<meta property="og:site_name" content="${meta.siteName}" />`)
    tags.push(`<meta property="og:type" content="${meta.type}" />`)

    tags.push('')
    tags.push('<!-- Twitter Card Meta Tags -->')
    tags.push(`<meta name="twitter:card" content="${meta.twitterCard}" />`)
    if (meta.title) tags.push(`<meta name="twitter:title" content="${meta.title}" />`)
    if (meta.description) tags.push(`<meta name="twitter:description" content="${meta.description}" />`)
    if (meta.image) tags.push(`<meta name="twitter:image" content="${meta.image}" />`)

    return tags.join('\n')
  }, [meta])

  const isValid = meta.title || meta.description || meta.image

  const previewTabs = [
    { id: 'facebook' as const, label: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z' },
    { id: 'twitter' as const, label: 'X/Twitter', icon: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
    { id: 'linkedin' as const, label: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    { id: 'whatsapp' as const, label: 'WhatsApp', icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' },
  ]

  return (
    <div className="space-y-6">
      {/* Input Form */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Meta Tags</h2>

        <div className="mt-6 space-y-6">
          <InputField
            label="og:title"
            value={meta.title}
            onChange={(v) => updateMeta('title', v)}
            placeholder="Título da Página | Nome do Site"
            hint="O título que aparece quando partilhado (ideal: 60-70 caracteres)"
            maxLength={70}
          />
          <InputField
            label="og:description"
            value={meta.description}
            onChange={(v) => updateMeta('description', v)}
            placeholder="Uma breve descrição do conteúdo da página..."
            hint="Descrição que aparece abaixo do título (ideal: 155-160 caracteres)"
            multiline
            maxLength={160}
          />
          <InputField
            label="og:image"
            value={meta.image}
            onChange={(v) => updateMeta('image', v)}
            placeholder="https://exemplo.pt/imagem-og.jpg"
            hint="URL da imagem (1200x630 pixels para melhor resultado)"
          />
          <div className="grid gap-6 sm:grid-cols-2">
            <InputField
              label="og:url"
              value={meta.url}
              onChange={(v) => updateMeta('url', v)}
              placeholder="https://exemplo.pt/pagina"
              hint="URL canónico da página"
            />
            <InputField
              label="og:site_name"
              value={meta.siteName}
              onChange={(v) => updateMeta('siteName', v)}
              placeholder="Nome do Site"
              hint="Nome do website"
            />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">og:type</label>
              <select
                value={meta.type}
                onChange={(e) => updateMeta('type', e.target.value)}
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              >
                <option value="website">website</option>
                <option value="article">article</option>
                <option value="product">product</option>
                <option value="profile">profile</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">twitter:card</label>
              <select
                value={meta.twitterCard}
                onChange={(e) => updateMeta('twitterCard', e.target.value as 'summary' | 'summary_large_image')}
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              >
                <option value="summary_large_image">summary_large_image</option>
                <option value="summary">summary</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Live Previews */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Preview</h2>

        {/* Platform Tabs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {previewTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePreview(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activePreview === tab.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'bg-[#f5f5f5] text-[#525252] hover:bg-[#e5e5e5]'
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d={tab.icon} />
              </svg>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview Content */}
        <div className="mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePreview}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-md"
            >
              {activePreview === 'facebook' && <FacebookPreview meta={meta} />}
              {activePreview === 'twitter' && <TwitterPreview meta={meta} />}
              {activePreview === 'linkedin' && <LinkedInPreview meta={meta} />}
              {activePreview === 'whatsapp' && <WhatsAppPreview meta={meta} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Generated Code */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Código HTML</h2>
              <CopyToClipboard text={generatedCode} label="Copiar Código" />
            </div>

            <div className="mt-4 rounded-lg bg-[#1a1a1a] p-4 overflow-x-auto">
              <pre className="text-sm text-[#a3a3a3]">
                <code>{generatedCode}</code>
              </pre>
            </div>

            <p className="mt-4 text-xs text-[#737373]">
              Cole este código dentro da tag <code className="rounded bg-[#f5f5f5] px-1">&lt;head&gt;</code> do seu HTML
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recommendations */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-6">
        <h3 className="font-bold text-[#1a1a1a]">Recomendações</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg bg-white p-4">
            <p className="text-sm font-medium text-[#1a1a1a]">Tamanho de Imagem</p>
            <p className="mt-1 text-xs text-[#737373]">
              1200x630 pixels para Facebook/LinkedIn, 1200x675 para Twitter
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-sm font-medium text-[#1a1a1a]">Título</p>
            <p className="mt-1 text-xs text-[#737373]">
              60-70 caracteres para evitar truncamento
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-sm font-medium text-[#1a1a1a]">Descrição</p>
            <p className="mt-1 text-xs text-[#737373]">
              155-160 caracteres para mostrar completa
            </p>
          </div>
          <div className="rounded-lg bg-white p-4">
            <p className="text-sm font-medium text-[#1a1a1a]">Formato de Imagem</p>
            <p className="mt-1 text-xs text-[#737373]">
              JPG ou PNG, máximo 5MB de tamanho
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
