'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { umamiEvents } from '@/components/analytics'

const navigation = [
  { label: 'Sobre', href: '/sobre' },
  {
    label: 'Indústrias',
    href: '/industrias',
    children: [
      { label: 'Instituições de Ensino', href: '/industrias/escolas' },
      { label: 'Organizações de Saúde', href: '/industrias/saude' },
      { label: 'Setor Público', href: '/industrias/setor-publico' },
      { label: 'IPSS & Misericórdias', href: '/industrias/ipss' },
    ],
  },
  {
    label: 'Serviços',
    href: '/servicos',
    children: [
      { label: 'Consultoria Digital', href: '/servicos/consultoria-digital' },
      { label: 'Desenvolvimento Web', href: '/servicos/desenvolvimento-web' },
      { label: 'Web Design', href: '/servicos/web-design' },
      { label: 'E-commerce', href: '/servicos/ecommerce' },
      { label: 'SEO', href: '/servicos/seo' },
    ],
  },
  { label: 'Casos de Estudo', href: '/casos-de-estudo' },
  { label: 'Artigos', href: '/artigos' },
  {
    label: 'Ferramentas',
    href: '/ferramentas',
    children: [
      { label: 'Gerador Link WhatsApp', href: '/ferramentas/gerador-link-whatsapp' },
      { label: 'Calculadora ROAS', href: '/ferramentas/calculadora-roas' },
      { label: 'Gerador Links UTM', href: '/ferramentas/gerador-utm' },
      { label: 'Preview Meta Tags OG', href: '/ferramentas/og-meta-preview' },
      { label: 'Gerador QR Code', href: '/ferramentas/gerador-qr-code' },
      { label: 'Gerador Schema JSON-LD', href: '/ferramentas/gerador-schema-local-business' },
      { label: 'Checklist Acessibilidade', href: '/ferramentas/checklist-acessibilidade' },
      { label: 'Conversor WebP', href: '/ferramentas/conversor-webp' },
      { label: 'Redimensionador Imagens', href: '/ferramentas/redimensionador-imagens' },
      { label: 'Política de Privacidade', href: '/ferramentas/gerador-politica-privacidade' },
    ],
  },
  { label: 'Contactos', href: '/contactos' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      {/* Header Bar - Always on top */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/uploads/2024/06/logo-v2.png"
              alt="Modular Digital"
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-10">
            {navigation.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="text-sm font-medium text-[#1a1a1a] transition-colors hover:text-[#e72f3f]"
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="absolute left-1/2 top-full hidden -translate-x-1/2 pt-4 group-hover:block">
                    <div className="min-w-[240px] rounded-2xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block rounded-xl px-4 py-3 text-sm text-[#1a1a1a] transition-all hover:bg-[#fafafa] hover:text-[#e72f3f]"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contactos"
              onClick={() => umamiEvents.ctaClick('header_cta_desktop')}
              className="magnetic group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#1a1a1a] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-black"
            >
              <span>Agendar Consultoria</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-0.5">
                <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <span className="sr-only">{mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 h-0.5 w-full bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-full bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay - Separate from header */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl animate-slide-in-from-right">
            {/* Mobile Header with Logo and Close */}
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <img
                  src="/uploads/2024/06/logo-v2.png"
                  alt="Modular Digital"
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Fechar menu"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex h-[calc(100%-73px)] flex-col overflow-y-auto pb-8 px-6 sm:px-8">
              <nav className="space-y-1 pt-6">
                {navigation.map((item, i) => (
                  <div
                    key={item.href}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 text-xl font-bold text-[#1a1a1a] transition-colors hover:text-[#e72f3f] sm:text-2xl sm:py-4"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <div className="ml-4 space-y-1 pb-3">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block py-2 text-sm text-[#737373] transition-colors hover:text-[#e72f3f] sm:text-base"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <div className="mt-auto pt-8 space-y-4">
                <Link
                  href="/contactos"
                  className="block w-full rounded-full bg-[#1a1a1a] py-4 text-center text-sm font-medium text-white transition-all hover:bg-black active:scale-[0.98]"
                  onClick={() => {
                    umamiEvents.ctaClick('header_cta_mobile')
                    setMobileMenuOpen(false)
                  }}
                >
                  Agendar Consultoria Estratégica →
                </Link>
                <a
                  href="tel:+351914663553"
                  onClick={() => umamiEvents.phoneClick()}
                  className="flex items-center justify-center gap-2 text-sm text-[#737373] hover:text-[#1a1a1a] transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  +351 914 663 553
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
