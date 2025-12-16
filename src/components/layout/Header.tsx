'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center">
          <Image
            src="/uploads/2024/06/logo-v2.png"
            alt="Modular Digital"
            width={140}
            height={36}
            className="h-9 w-auto"
            priority
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
          className="relative z-10 lg:hidden flex h-10 w-10 items-center justify-center rounded-full bg-[#1a1a1a] text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="sr-only">Abrir menu</span>
          <div className="relative h-4 w-5">
            <span
              className={`absolute left-0 top-0 h-0.5 w-full bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : ''
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`absolute left-0 bottom-0 h-0.5 w-full bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-md bg-white transition-transform duration-500 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col overflow-y-auto pt-24 pb-8 px-8">
            <nav className="space-y-2">
              {navigation.map((item, i) => (
                <div
                  key={item.href}
                  className="animate-slide-in-right"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    className="block py-4 text-2xl font-bold text-[#1a1a1a] transition-colors hover:text-[#e72f3f]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-2 pb-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block py-2 text-base text-[#737373] transition-colors hover:text-[#e72f3f]"
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
            <div className="mt-auto pt-8">
              <Link
                href="/contactos"
                className="block w-full rounded-full bg-[#1a1a1a] py-4 text-center text-sm font-medium text-white transition-all hover:bg-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                Agendar Consultoria Estratégica →
              </Link>
              <a
                href="tel:+351914663553"
                className="mt-4 block text-center text-sm text-[#737373]"
              >
                +351 914 663 553
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
