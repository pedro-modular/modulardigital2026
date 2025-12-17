'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CopyToClipboard } from '@/components/tools'

const weekDays = [
  { key: 'monday', label: 'Segunda-feira', abbr: 'Monday' },
  { key: 'tuesday', label: 'Terça-feira', abbr: 'Tuesday' },
  { key: 'wednesday', label: 'Quarta-feira', abbr: 'Wednesday' },
  { key: 'thursday', label: 'Quinta-feira', abbr: 'Thursday' },
  { key: 'friday', label: 'Sexta-feira', abbr: 'Friday' },
  { key: 'saturday', label: 'Sábado', abbr: 'Saturday' },
  { key: 'sunday', label: 'Domingo', abbr: 'Sunday' },
]

const businessTypes = [
  { value: 'LocalBusiness', label: 'Negócio Local (Genérico)' },
  { value: 'Restaurant', label: 'Restaurante' },
  { value: 'Store', label: 'Loja' },
  { value: 'ProfessionalService', label: 'Serviços Profissionais' },
  { value: 'HealthAndBeautyBusiness', label: 'Saúde e Beleza' },
  { value: 'LegalService', label: 'Serviços Jurídicos' },
  { value: 'FinancialService', label: 'Serviços Financeiros' },
  { value: 'RealEstateAgent', label: 'Imobiliária' },
  { value: 'Dentist', label: 'Dentista' },
  { value: 'Physician', label: 'Médico' },
  { value: 'AutoRepair', label: 'Oficina Auto' },
]

interface DayHours {
  enabled: boolean
  open: string
  close: string
}

type WeekHours = Record<string, DayHours>

const defaultHours: WeekHours = {
  monday: { enabled: true, open: '09:00', close: '18:00' },
  tuesday: { enabled: true, open: '09:00', close: '18:00' },
  wednesday: { enabled: true, open: '09:00', close: '18:00' },
  thursday: { enabled: true, open: '09:00', close: '18:00' },
  friday: { enabled: true, open: '09:00', close: '18:00' },
  saturday: { enabled: false, open: '10:00', close: '13:00' },
  sunday: { enabled: false, open: '10:00', close: '13:00' },
}

export function SchemaGenerator() {
  const [businessType, setBusinessType] = useState('LocalBusiness')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [locality, setLocality] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [telephone, setTelephone] = useState('')
  const [email, setEmail] = useState('')
  const [url, setUrl] = useState('')
  const [logoUrl, setLogoUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [nif, setNif] = useState('')
  const [priceRange, setPriceRange] = useState('€€')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const [hours, setHours] = useState<WeekHours>(defaultHours)

  const [facebook, setFacebook] = useState('')
  const [instagram, setInstagram] = useState('')
  const [linkedin, setLinkedin] = useState('')

  const updateHours = (day: string, field: keyof DayHours, value: boolean | string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }))
  }

  const generatedSchema = useMemo(() => {
    if (!name) return null

    const openingHoursSpec = weekDays
      .filter((day) => hours[day.key].enabled)
      .map((day) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: day.abbr,
        opens: hours[day.key].open,
        closes: hours[day.key].close,
      }))

    const sameAs = [facebook, instagram, linkedin].filter(Boolean)

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': businessType,
      name,
    }

    if (description) schema.description = description
    if (url) schema.url = url
    if (telephone) schema.telephone = telephone
    if (email) schema.email = email
    if (priceRange) schema.priceRange = priceRange

    if (streetAddress || locality || postalCode) {
      schema.address = {
        '@type': 'PostalAddress',
        ...(streetAddress && { streetAddress }),
        ...(locality && { addressLocality: locality }),
        ...(postalCode && { postalCode }),
        addressCountry: 'PT',
      }
    }

    if (latitude && longitude) {
      schema.geo = {
        '@type': 'GeoCoordinates',
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      }
    }

    if (logoUrl) schema.logo = logoUrl
    if (imageUrl) schema.image = imageUrl
    if (nif) schema.taxID = nif

    if (openingHoursSpec.length > 0) {
      schema.openingHoursSpecification = openingHoursSpec
    }

    if (sameAs.length > 0) {
      schema.sameAs = sameAs
    }

    return schema
  }, [
    businessType, name, description, streetAddress, locality, postalCode,
    telephone, email, url, logoUrl, imageUrl, nif, priceRange,
    latitude, longitude, hours, facebook, instagram, linkedin,
  ])

  const schemaString = generatedSchema
    ? JSON.stringify(generatedSchema, null, 2)
    : ''

  const scriptTag = generatedSchema
    ? `<script type="application/ld+json">\n${schemaString}\n</script>`
    : ''

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Informações Básicas</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Tipo de Negócio <span className="text-[#e72f3f]">*</span>
            </label>
            <select
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            >
              {businessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Nome da Empresa <span className="text-[#e72f3f]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Modular Digital"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="Agência de marketing digital especializada em..."
              className="w-full resize-none rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">NIF</label>
            <input
              type="text"
              value={nif}
              onChange={(e) => setNif(e.target.value)}
              placeholder="PT123456789"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Gama de Preços</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            >
              <option value="€">€ (Económico)</option>
              <option value="€€">€€ (Moderado)</option>
              <option value="€€€">€€€ (Premium)</option>
              <option value="€€€€">€€€€ (Luxo)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Contacto</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Telefone</label>
            <input
              type="tel"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              placeholder="+351 912 345 678"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@empresa.pt"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Website URL</label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.empresa.pt"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Morada</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Morada</label>
            <input
              type="text"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              placeholder="Rua das Flores, 123"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Cidade</label>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              placeholder="Lisboa"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Código Postal</label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="1000-001"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="38.7223"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="-9.1393"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Imagens</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">URL do Logo</label>
            <input
              type="url"
              value={logoUrl}
              onChange={(e) => setLogoUrl(e.target.value)}
              placeholder="https://empresa.pt/logo.png"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">URL da Imagem</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://empresa.pt/fachada.jpg"
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Horário de Funcionamento</h2>

        <div className="mt-6 space-y-3">
          {weekDays.map((day) => (
            <div
              key={day.key}
              className={`flex flex-wrap items-center gap-3 rounded-lg border p-3 transition-colors ${
                hours[day.key].enabled ? 'border-[#e5e5e5] bg-white' : 'border-[#f0f0f0] bg-[#fafafa]'
              }`}
            >
              <label className="flex w-36 shrink-0 cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={hours[day.key].enabled}
                  onChange={(e) => updateHours(day.key, 'enabled', e.target.checked)}
                  className="h-4 w-4 rounded border-[#d1d5db] text-[#e72f3f] focus:ring-[#e72f3f]"
                />
                <span className={`text-sm ${hours[day.key].enabled ? 'text-[#1a1a1a]' : 'text-[#737373]'}`}>
                  {day.label}
                </span>
              </label>

              {hours[day.key].enabled && (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={hours[day.key].open}
                    onChange={(e) => updateHours(day.key, 'open', e.target.value)}
                    className="rounded border border-[#e5e5e5] px-2 py-1 text-sm text-[#1a1a1a] focus:border-[#e72f3f] focus:outline-none"
                  />
                  <span className="text-[#737373]">—</span>
                  <input
                    type="time"
                    value={hours[day.key].close}
                    onChange={(e) => updateHours(day.key, 'close', e.target.value)}
                    className="rounded border border-[#e5e5e5] px-2 py-1 text-sm text-[#1a1a1a] focus:border-[#e72f3f] focus:outline-none"
                  />
                </div>
              )}

              {!hours[day.key].enabled && (
                <span className="text-sm text-[#737373]">Fechado</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8">
        <h2 className="text-lg font-bold text-[#1a1a1a]">Redes Sociais</h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Facebook</label>
            <input
              type="url"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="https://facebook.com/..."
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">Instagram</label>
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/..."
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1a1a1a] mb-2">LinkedIn</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/company/..."
              className="w-full rounded-lg border border-[#e5e5e5] bg-white px-4 py-3 text-[#1a1a1a] placeholder-[#a3a3a3] transition-colors focus:border-[#e72f3f] focus:outline-none focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* Output */}
      <AnimatePresence>
        {name && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="rounded-2xl border border-[#e5e5e5] bg-white p-6 lg:p-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1a1a1a]">Código JSON-LD</h2>
              <span className="flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Válido
              </span>
            </div>

            <div className="mt-4 overflow-hidden rounded-lg bg-[#1a1a1a]">
              <pre className="max-h-[400px] overflow-auto p-4 text-sm">
                <code className="text-green-400">{scriptTag}</code>
              </pre>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <CopyToClipboard text={scriptTag} label="Copiar Código" />
              <a
                href="https://search.google.com/test/rich-results"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic inline-flex items-center gap-2 rounded-full border-2 border-[#1a1a1a] bg-transparent px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#1a1a1a] hover:text-white"
              >
                <span>Validar no Google</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!name && (
        <div className="rounded-2xl border-2 border-dashed border-[#e5e5e5] bg-white/50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f5]">
            <svg className="h-6 w-6 text-[#737373]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>
          <p className="mt-4 text-sm text-[#737373]">
            Introduza o nome da empresa para gerar o código
          </p>
        </div>
      )}
    </div>
  )
}
