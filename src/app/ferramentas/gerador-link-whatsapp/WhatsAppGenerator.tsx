'use client'

import { useState, useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyToClipboard } from '@/components/tools'

const countryCodes = [
  { code: '+351', country: 'Portugal', flag: '🇵🇹' },
  { code: '+55', country: 'Brasil', flag: '🇧🇷' },
  { code: '+34', country: 'Espanha', flag: '🇪🇸' },
  { code: '+33', country: 'França', flag: '🇫🇷' },
  { code: '+44', country: 'Reino Unido', flag: '🇬🇧' },
  { code: '+1', country: 'EUA/Canadá', flag: '🇺🇸' },
  { code: '+49', country: 'Alemanha', flag: '🇩🇪' },
  { code: '+39', country: 'Itália', flag: '🇮🇹' },
]

export function WhatsAppGenerator() {
  const [countryCode, setCountryCode] = useState('+351')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')
  const qrRef = useRef<HTMLDivElement>(null)

  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '')
  const fullNumber = `${countryCode.replace('+', '')}${cleanPhoneNumber}`
  const encodedMessage = encodeURIComponent(message)
  const waLink = message
    ? `https://wa.me/${fullNumber}?text=${encodedMessage}`
    : `https://wa.me/${fullNumber}`

  const isValid = cleanPhoneNumber.length >= 9

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
      link.download = `whatsapp-qr-${cleanPhoneNumber}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }

    // Convert SVG to base64 without deprecated unescape()
    const base64 = btoa(
      encodeURIComponent(svgData).replace(/%([0-9A-F]{2})/g, (_, p1) =>
        String.fromCharCode(parseInt(p1, 16))
      )
    )
    img.src = 'data:image/svg+xml;base64,' + base64
  }

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Configurar Link</h2>

        <div className="mt-6 space-y-6">
          {/* Phone number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Número de Telefone <span className="text-[#e72f3f]">*</span>
            </label>
            <div className="flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-32 shrink-0 rounded-lg border border-[#e5e5e5] bg-white px-3 py-3 text-sm text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code}
                  </option>
                ))}
              </select>
              <input
                type="tel"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="912 345 678"
                className="flex-1 rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
              />
            </div>
            <p className="mt-2 text-xs text-[#737373]">
              Introduza o número sem espaços ou traços
            </p>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Mensagem Pré-definida <span className="text-[#737373] font-normal">(opcional)</span>
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Olá! Vi o vosso anúncio e gostaria de saber mais informações..."
              className="w-full resize-none rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
            <p className="mt-2 text-xs text-[#737373]">
              Esta mensagem será pré-preenchida quando o utilizador clicar no link
            </p>
          </div>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Generated link */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Link Gerado</h2>

              <div className="mt-4 rounded-lg bg-[#f5f5f5] p-4">
                <code className="break-all text-sm text-[#525252]">{waLink}</code>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <CopyToClipboard text={waLink} label="Copiar Link" />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="magnetic inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-transparent px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
                >
                  <span>Testar Link</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            </div>

            {/* QR Code */}
            <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
              <h2 className="text-lg font-bold text-[#1a1a1a]">QR Code</h2>

              <div className="mt-4 flex flex-col items-center">
                <div ref={qrRef} className="rounded-2xl bg-white p-4">
                  <QRCodeSVG
                    value={waLink}
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

      {/* Empty state */}
      {!isValid && (
        <div className="rounded-2xl border-2 border-dashed border-[#e5e5e5] bg-white/50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
            <svg className="h-6 w-6 text-[#737373]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>
          <p className="mt-4 text-sm text-[#737373]">
            Introduza um número de telefone válido para gerar o link
          </p>
        </div>
      )}
    </div>
  )
}
