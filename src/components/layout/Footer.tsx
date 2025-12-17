import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  servicos: [
    { label: 'Consultoria Digital', href: '/servicos/consultoria-digital' },
    { label: 'Desenvolvimento Web', href: '/servicos/desenvolvimento-web' },
    { label: 'Web Design', href: '/servicos/web-design' },
    { label: 'E-commerce', href: '/servicos/ecommerce' },
    { label: 'SEO', href: '/servicos/seo' },
  ],
  produtos: [
    { label: 'ZappExpense', href: '/produtos/zappexpense' },
    { label: 'ZappService', href: '/produtos/zappservice' },
    { label: 'ZappPropostas', href: '/produtos/zapppropostas' },
    { label: 'ZappInscrições', href: '/produtos/zappinscricoes' },
    { label: 'Ver Todos →', href: '/produtos' },
  ],
  industrias: [
    { label: 'Instituições de Ensino', href: '/industrias/escolas' },
    { label: 'Organizações de Saúde', href: '/industrias/saude' },
    { label: 'Setor Público', href: '/industrias/setor-publico' },
    { label: 'IPSS & Misericórdias', href: '/industrias/ipss' },
  ],
  ferramentas: [
    { label: 'Gerador Link WhatsApp', href: '/ferramentas/gerador-link-whatsapp' },
    { label: 'Calculadora ROAS', href: '/ferramentas/calculadora-roas' },
    { label: 'Gerador Links UTM', href: '/ferramentas/gerador-utm' },
    { label: 'Preview Meta Tags OG', href: '/ferramentas/og-meta-preview' },
    { label: 'Gerador QR Code', href: '/ferramentas/gerador-qr-code' },
    { label: 'Conversor WebP', href: '/ferramentas/conversor-webp' },
    { label: 'Ver Todas →', href: '/ferramentas' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Casos de Estudo', href: '/casos-de-estudo' },
    { label: 'Artigos', href: '/artigos' },
    { label: 'Contactos', href: '/contactos' },
  ],
}

// Featured locations for programmatic SEO internal linking
const featuredLocations = [
  { name: 'Lisboa', slug: 'lisboa' },
  { name: 'Porto', slug: 'porto' },
  { name: 'Braga', slug: 'braga' },
  { name: 'Coimbra', slug: 'coimbra' },
  { name: 'Leiria', slug: 'leiria' },
  { name: 'Faro', slug: 'faro' },
  { name: 'Aveiro', slug: 'aveiro' },
  { name: 'Setúbal', slug: 'setubal' },
]

const featuredServices = [
  { name: 'Web Design', slug: 'web-design' },
  { name: 'SEO', slug: 'seo' },
  { name: 'Desenvolvimento Web', slug: 'desenvolvimento-web' },
]

export function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-[1400px] px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-3">
            <Link href="/" className="inline-block">
              <Image
                src="/uploads/2024/06/logo-v2.png"
                alt="Modular Digital"
                width={140}
                height={38}
                className="h-9 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-6 max-w-xs text-base text-white/60 leading-relaxed">
              Consultoria e implementação digital para instituições que exigem autonomia e resultados sustentáveis.
            </p>

            {/* Contact Info */}
            <div className="mt-8 space-y-3">
              <a
                href="tel:+351914663553"
                data-umami-event="phone_click"
                data-umami-event-location="footer"
                className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                +351 914 663 553
              </a>
              <a
                href="mailto:hello@modulardigital.pt"
                data-umami-event="email_click"
                data-umami-event-location="footer"
                className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                hello@modulardigital.pt
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-8 flex gap-4">
              <a
                href="https://www.linkedin.com/company/modulardigitalagency/"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="social_click"
                data-umami-event-network="linkedin"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#e72f3f]"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/modulardigitalagency"
                target="_blank"
                rel="noopener noreferrer"
                data-umami-event="social_click"
                data-umami-event-network="facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-[#e72f3f]"
              >
                <span className="sr-only">Facebook</span>
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
            {/* Serviços */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Serviços</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.servicos.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Produtos */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Produtos</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.produtos.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Indústrias */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Indústrias</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.industrias.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ferramentas */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Ferramentas</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.ferramentas.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Empresa</h3>
              <ul className="mt-6 space-y-4">
                {footerLinks.empresa.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Localizações - Programmatic SEO Links */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-white/40">Localizações</h3>
              <ul className="mt-6 space-y-4">
                {featuredLocations.map((location) => (
                  <li key={location.slug}>
                    <Link
                      href={`/web-design/${location.slug}`}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {location.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Programmatic SEO Links Grid */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-6">
            Serviços por Localização
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <div key={service.slug}>
                <h4 className="text-sm font-medium text-white mb-3">{service.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {featuredLocations.slice(0, 6).map((location) => (
                    <Link
                      key={`${service.slug}-${location.slug}`}
                      href={`/${service.slug}/${location.slug}`}
                      className="text-xs text-white/50 hover:text-[#e72f3f] transition-colors"
                    >
                      {location.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Modular Digital. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacidade"
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                Privacidade
              </Link>
              <Link
                href="/termos"
                className="text-sm text-white/40 transition-colors hover:text-white"
              >
                Termos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
