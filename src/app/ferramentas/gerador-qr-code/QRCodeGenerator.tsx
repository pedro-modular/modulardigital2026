'use client'

import { useState, useRef, useMemo } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyToClipboard } from '@/components/tools'

type QRType = 'url' | 'vcard' | 'wifi' | 'email' | 'phone' | 'sms'

interface QRTypeConfig {
  id: QRType
  label: string
  icon: string
  description: string
}

const qrTypes: QRTypeConfig[] = [
  { id: 'url', label: 'URL / Link', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244', description: 'Website ou link direto' },
  { id: 'vcard', label: 'vCard', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z', description: 'Cartão de contacto' },
  { id: 'wifi', label: 'WiFi', icon: 'M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z', description: 'Dados de rede WiFi' },
  { id: 'email', label: 'Email', icon: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75', description: 'Enviar email' },
  { id: 'phone', label: 'Telefone', icon: 'M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z', description: 'Ligar por telefone' },
  { id: 'sms', label: 'SMS', icon: 'M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z', description: 'Enviar mensagem SMS' },
]

const presetColors = [
  { fg: '#1a1a1a', bg: '#ffffff', name: 'Clássico' },
  { fg: '#e72f3f', bg: '#ffffff', name: 'Vermelho' },
  { fg: '#1d4ed8', bg: '#ffffff', name: 'Azul' },
  { fg: '#059669', bg: '#ffffff', name: 'Verde' },
  { fg: '#7c3aed', bg: '#ffffff', name: 'Roxo' },
  { fg: '#ffffff', bg: '#1a1a1a', name: 'Invertido' },
]

const sizeOptions = [
  { value: 128, label: 'Pequeno (128px)' },
  { value: 256, label: 'Médio (256px)' },
  { value: 512, label: 'Grande (512px)' },
  { value: 1024, label: 'Extra Grande (1024px)' },
]

export function QRCodeGenerator() {
  const [qrType, setQrType] = useState<QRType>('url')
  const [fgColor, setFgColor] = useState('#1a1a1a')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [size, setSize] = useState(256)
  const qrRef = useRef<HTMLDivElement>(null)

  // Form data
  const [url, setUrl] = useState('')
  // vCard
  const [vcard, setVcard] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    website: '',
    address: '',
  })
  // WiFi
  const [wifi, setWifi] = useState({
    ssid: '',
    password: '',
    encryption: 'WPA' as 'WPA' | 'WEP' | 'nopass',
    hidden: false,
  })
  // Email
  const [email, setEmail] = useState({
    address: '',
    subject: '',
    body: '',
  })
  // Phone/SMS
  const [phone, setPhone] = useState('')
  const [smsBody, setSmsBody] = useState('')

  const qrContent = useMemo(() => {
    switch (qrType) {
      case 'url':
        let finalUrl = url.trim()
        if (finalUrl && !finalUrl.match(/^https?:\/\//)) {
          finalUrl = 'https://' + finalUrl
        }
        return finalUrl
      case 'vcard':
        if (!vcard.name) return ''
        return [
          'BEGIN:VCARD',
          'VERSION:3.0',
          `FN:${vcard.name}`,
          vcard.company && `ORG:${vcard.company}`,
          vcard.phone && `TEL:${vcard.phone}`,
          vcard.email && `EMAIL:${vcard.email}`,
          vcard.website && `URL:${vcard.website}`,
          vcard.address && `ADR:;;${vcard.address}`,
          'END:VCARD',
        ].filter(Boolean).join('\n')
      case 'wifi':
        if (!wifi.ssid) return ''
        return `WIFI:T:${wifi.encryption};S:${wifi.ssid};P:${wifi.password};H:${wifi.hidden ? 'true' : 'false'};;`
      case 'email':
        if (!email.address) return ''
        const emailUrl = new URL(`mailto:${email.address}`)
        if (email.subject) emailUrl.searchParams.set('subject', email.subject)
        if (email.body) emailUrl.searchParams.set('body', email.body)
        return emailUrl.toString()
      case 'phone':
        return phone ? `tel:${phone}` : ''
      case 'sms':
        if (!phone) return ''
        return smsBody ? `sms:${phone}?body=${encodeURIComponent(smsBody)}` : `sms:${phone}`
      default:
        return ''
    }
  }, [qrType, url, vcard, wifi, email, phone, smsBody])

  const isValid = qrContent.length > 0

  const downloadQRCode = (downloadSize: number) => {
    if (!qrRef.current || !qrContent) return

    const svg = qrRef.current.querySelector('svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = downloadSize
      canvas.height = downloadSize
      ctx?.drawImage(img, 0, 0, downloadSize, downloadSize)

      const link = document.createElement('a')
      link.download = `qr-code-${qrType}-${downloadSize}px.png`
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

  const renderForm = () => {
    switch (qrType) {
      case 'url':
        return (
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">URL / Link</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://modulardigital.pt"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>
        )
      case 'vcard':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Nome Completo *</label>
              <input
                type="text"
                value={vcard.name}
                onChange={(e) => setVcard({ ...vcard, name: e.target.value })}
                placeholder="João Silva"
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Empresa</label>
                <input
                  type="text"
                  value={vcard.company}
                  onChange={(e) => setVcard({ ...vcard, company: e.target.value })}
                  placeholder="Empresa, Lda"
                  className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Telefone</label>
                <input
                  type="tel"
                  value={vcard.phone}
                  onChange={(e) => setVcard({ ...vcard, phone: e.target.value })}
                  placeholder="+351 912 345 678"
                  className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Email</label>
                <input
                  type="email"
                  value={vcard.email}
                  onChange={(e) => setVcard({ ...vcard, email: e.target.value })}
                  placeholder="joao@empresa.pt"
                  className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Website</label>
                <input
                  type="text"
                  value={vcard.website}
                  onChange={(e) => setVcard({ ...vcard, website: e.target.value })}
                  placeholder="https://empresa.pt"
                  className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Morada</label>
              <input
                type="text"
                value={vcard.address}
                onChange={(e) => setVcard({ ...vcard, address: e.target.value })}
                placeholder="Rua Exemplo 123, Lisboa"
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        )
      case 'wifi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Nome da Rede (SSID) *</label>
              <input
                type="text"
                value={wifi.ssid}
                onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                placeholder="MinhaRedeWiFi"
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Password</label>
                <input
                  type="text"
                  value={wifi.password}
                  onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Encriptação</label>
                <select
                  value={wifi.encryption}
                  onChange={(e) => setWifi({ ...wifi, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })}
                  className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Sem password</option>
                </select>
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={wifi.hidden}
                onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                className="h-4 w-4 rounded border-[#d1d5db] text-[#e72f3f] focus:ring-[#e72f3f]"
              />
              <span className="text-sm text-[#525252]">Rede oculta</span>
            </label>
          </div>
        )
      case 'email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Email de Destino *</label>
              <input
                type="email"
                value={email.address}
                onChange={(e) => setEmail({ ...email, address: e.target.value })}
                placeholder="contacto@empresa.pt"
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Assunto</label>
              <input
                type="text"
                value={email.subject}
                onChange={(e) => setEmail({ ...email, subject: e.target.value })}
                placeholder="Pedido de informação"
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Mensagem</label>
              <textarea
                value={email.body}
                onChange={(e) => setEmail({ ...email, body: e.target.value })}
                placeholder="Olá, gostaria de mais informações..."
                rows={3}
                className="w-full resize-none rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        )
      case 'phone':
        return (
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Número de Telefone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+351 912 345 678"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>
        )
      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Número de Telefone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+351 912 345 678"
                className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Mensagem Pré-definida</label>
              <textarea
                value={smsBody}
                onChange={(e) => setSmsBody(e.target.value)}
                placeholder="Olá! Vi o vosso anúncio..."
                rows={3}
                className="w-full resize-none rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Type Selection */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Tipo de QR Code</h2>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {qrTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setQrType(type.id)}
              className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                qrType === type.id
                  ? 'border-[#e72f3f] bg-[#fef2f2]'
                  : 'border-[#e5e5e5] bg-white hover:border-[#a3a3a3]'
              }`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                qrType === type.id ? 'bg-[#e72f3f]' : 'bg-[#f5f5f5]'
              }`}>
                <svg
                  className={`h-5 w-5 ${qrType === type.id ? 'text-white' : 'text-[#737373]'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={type.icon} />
                </svg>
              </div>
              <div>
                <p className="font-medium text-[#1a1a1a]">{type.label}</p>
                <p className="text-xs text-[#737373]">{type.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Conteúdo</h2>
        <div className="mt-4">{renderForm()}</div>
      </div>

      {/* Customization */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Personalização</h2>

        <div className="mt-4 space-y-6">
          {/* Color Presets */}
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Esquema de Cores</label>
            <div className="flex flex-wrap gap-2">
              {presetColors.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setFgColor(preset.fg)
                    setBgColor(preset.bg)
                  }}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-all ${
                    fgColor === preset.fg && bgColor === preset.bg
                      ? 'border-[#e72f3f] bg-[#fef2f2]'
                      : 'border-[#e5e5e5] hover:border-[#a3a3a3]'
                  }`}
                >
                  <span
                    className="h-4 w-4 rounded-full border border-[#e5e5e5]"
                    style={{ backgroundColor: preset.fg }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Cor do QR Code</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-[#e5e5e5]"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="flex-1 rounded-lg border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#1a1a1a] uppercase"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Cor de Fundo</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded border border-[#e5e5e5]"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 rounded-lg border border-[#e5e5e5] bg-white px-4 py-2 text-sm text-[#1a1a1a] uppercase"
                />
              </div>
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Tamanho de Download</label>
            <select
              value={size}
              onChange={(e) => setSize(parseInt(e.target.value))}
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            >
              {sizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* QR Code Preview */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8"
          >
            <h2 className="text-lg font-bold text-[#1a1a1a]">QR Code Gerado</h2>

            <div className="mt-4 flex flex-col items-center">
              <div
                ref={qrRef}
                className="rounded-2xl p-6"
                style={{ backgroundColor: bgColor }}
              >
                <QRCodeSVG
                  value={qrContent}
                  size={200}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => downloadQRCode(size)}
                  className="magnetic inline-flex items-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  <span>Download PNG ({size}px)</span>
                </button>
                <CopyToClipboard text={qrContent} label="Copiar Conteúdo" />
              </div>
            </div>

            {/* Content Preview */}
            <div className="mt-6 rounded-lg bg-[#f5f5f5] p-4">
              <p className="text-xs text-[#737373] mb-1">Conteúdo codificado:</p>
              <code className="break-all text-sm text-[#525252]">{qrContent}</code>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!isValid && (
        <div className="rounded-2xl border-2 border-dashed border-[#e5e5e5] bg-white/50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
            <svg className="h-6 w-6 text-[#737373]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
            </svg>
          </div>
          <p className="mt-4 text-sm text-[#737373]">
            Preencha os campos acima para gerar o QR Code
          </p>
        </div>
      )}
    </div>
  )
}
