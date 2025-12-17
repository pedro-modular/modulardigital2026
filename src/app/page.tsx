import { Metadata } from 'next'
import Link from "next/link"
import Image from "next/image"
import { getAllCases, getAllPosts } from "@/lib/content"
import { formatDateShort } from "@/lib/utils"
import products from "@/data/products.json"

export const metadata: Metadata = {
  title: 'Modular Digital | Agência de Web Design e Desenvolvimento em Portugal',
  description: 'Agência digital especializada em web design, desenvolvimento web, SEO e consultoria digital para instituições de ensino, saúde e setor público em Portugal.',
  keywords: ['agência digital portugal', 'web design', 'desenvolvimento web', 'SEO portugal', 'consultoria digital'],
  alternates: {
    canonical: 'https://modulardigital.pt',
  },
  openGraph: {
    title: 'Modular Digital | Agência de Web Design e Desenvolvimento',
    description: 'Consultoria e implementação digital para instituições que exigem autonomia e resultados sustentáveis.',
    url: 'https://modulardigital.pt',
    type: 'website',
  },
}

const clients = [
  { name: "Universidade de Lisboa", logo: "/uploads/2024/06/u-lisboa-1.png", href: "https://www.ulisboa.pt/" },
  { name: "Faculdade de Letras", logo: "/uploads/2024/06/flul.png", href: "https://www.letras.ulisboa.pt/" },
  { name: "Município de Leiria", logo: "/uploads/2024/06/cmleiria.png", href: "https://www.cm-leiria.pt/" },
  { name: "Município de Torres Vedras", logo: "/uploads/2024/06/cmtv-1.png", href: "https://www.cm-tvedras.pt/" },
  { name: "Instituto de Retina", logo: "/uploads/2024/06/irl.png", href: "https://institutoretinalisboa.com/" },
  { name: "FPAS", logo: "/uploads/2025/04/Logo_Fpas-500x500.png", href: "https://fpas.pt/" },
]

const services = [
  {
    number: "01",
    title: "Consultoria Estratégica",
    description: "Diagnóstico tecnológico. Arquitetura digital. Roadmaps claros. Decisões informadas antes de qualquer linha de código.",
    href: "/servicos/consultoria-digital",
  },
  {
    number: "02",
    title: "Implementação Técnica",
    description: "WordPress. Statamic. Next.js. Soluções robustas com tecnologias abertas que garantem independência total.",
    href: "/servicos/desenvolvimento-web",
  },
  {
    number: "03",
    title: "Capacitação de Equipas",
    description: "Formação prática. Documentação clara. Transferência de conhecimento real para autonomia permanente.",
    href: "/servicos/capacitacao-tecnica",
  },
]

const industries = [
  { name: "Educação", href: "/industrias/escolas", count: "15+" },
  { name: "Saúde", href: "/industrias/saude", count: "25+" },
  { name: "Setor Público", href: "/industrias/setor-publico", count: "10+" },
  { name: "B2B", href: "/industrias/b2b", count: "30+" },
]

const testimonials = [
  {
    quote: "Têm apresentado as melhores soluções às necessidades da nossa organização.",
    author: "Rui Penetra",
    role: "Administração Promotores EM",
  },
  {
    quote: "The most innovative partner to create our platform. Highly recommended.",
    author: "Ana Miranda",
    role: "RHIThink Founder",
  },
  {
    quote: "Têm nos ajudado bastante, com sugestões e muita proatividade no desenvolvimento.",
    author: "Flávia Silva",
    role: "Click2Clean Director",
  },
]

const productIcons: Record<string, React.ReactNode> = {
  wallet: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
    </svg>
  ),
  clipboard: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  document: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  users: (
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
}

export default function Home() {
  const cases = getAllCases().slice(0, 4)
  const posts = getAllPosts().slice(0, 3)
  const featuredCase = cases[0]
  const otherCases = cases.slice(1, 4)

  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO — Dramatic, Asymmetric, Memorable
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] overflow-hidden bg-[#fafafa] grain mesh-gradient">
        <div className="container-asymmetric relative z-10 py-24 lg:py-32">
          {/* Eyebrow */}
          <div className="will-animate animate-fade-in">
            <span className="text-eyebrow">Consultoria & Implementação Digital</span>
          </div>

          {/* Main Heading - Massive Typography */}
          <div className="mt-8 max-w-5xl">
            <h1 className="text-display will-animate animate-slide-up delay-100">
              <span className="block">Transformamos</span>
              <span className="block text-[#e72f3f]">instituições</span>
              <span className="block">digitalmente.</span>
            </h1>
          </div>

          {/* Subtext - Offset for asymmetry */}
          <div className="mt-12 ml-auto max-w-xl lg:mr-24 will-animate animate-slide-up delay-300">
            <p className="text-body-large">
              Não vendemos dependência. Construímos competências internas para instituições
              que exigem autonomia e resultados sustentáveis.
            </p>
          </div>

          {/* CTA Group */}
          <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center will-animate animate-slide-up delay-500">
            <Link
              href="/contactos"
              className="magnetic group relative inline-flex items-center gap-3 rounded-full bg-[#1a1a1a] px-8 py-4 text-sm font-medium text-white transition-all hover:bg-black"
            >
              <span>Agendar Consultoria</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:translate-x-1">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
            <Link
              href="/casos-de-estudo"
              className="link-underline text-sm font-medium text-[#1a1a1a]"
            >
              Ver Casos de Estudo
            </Link>
          </div>

          {/* Decorative Stats - Floating */}
          <div className="absolute right-8 top-1/2 hidden -translate-y-1/2 lg:block will-animate animate-fade-in delay-700">
            <div className="flex flex-col gap-8">
              <div className="text-right">
                <span className="block text-5xl font-bold text-[#1a1a1a]">50+</span>
                <span className="text-xs uppercase tracking-widest text-[#737373]">Instituições</span>
              </div>
              <div className="text-right">
                <span className="block text-5xl font-bold text-[#1a1a1a]">10+</span>
                <span className="text-xs uppercase tracking-widest text-[#737373]">Anos</span>
              </div>
              <div className="text-right">
                <span className="block text-5xl font-bold text-[#e72f3f]">100%</span>
                <span className="text-xs uppercase tracking-widest text-[#737373]">Autonomia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 will-animate animate-fade-in delay-800">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#737373]">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-[#1a1a1a] to-transparent" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CLIENT MARQUEE — Continuous Motion
          ════════════════════════════════════════════════════════════════════ */}
      <section className="border-y border-[#e5e5e5] bg-white py-8 overflow-hidden">
        <div className="flex animate-marquee items-center">
          {[...clients, ...clients].map((client, i) => (
            <a
              key={i}
              href={client.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex shrink-0 items-center px-10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          INDUSTRIES — Horizontal Scroll Cards
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#1a1a1a] py-20 lg:py-28 grain">
        <div className="container-asymmetric">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <span className="text-eyebrow">Especialização</span>
              <h2 className="mt-4 text-headline text-white">
                Setores onde<br />fazemos a diferença.
              </h2>
            </div>
            <Link
              href="/industrias"
              className="link-underline text-sm font-medium text-white"
            >
              Ver todas as indústrias
            </Link>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((industry, i) => (
              <Link
                key={industry.href}
                href={industry.href}
                className="group relative overflow-hidden rounded-2xl bg-white/5 p-8 backdrop-blur transition-all hover:bg-white/10"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-4xl font-bold text-[#e72f3f]">{industry.count}</span>
                <span className="mt-4 block text-xl font-bold text-white">{industry.name}</span>
                <span className="mt-2 block text-sm text-white/60">instituições transformadas</span>
                <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white opacity-0 transition-all group-hover:opacity-100">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          SERVICES — Asymmetric Grid
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-24 lg:py-32 mesh-gradient">
        <div className="container-asymmetric">
          <div className="mb-16 max-w-2xl">
            <span className="text-eyebrow">Metodologia</span>
            <h2 className="mt-4 text-headline text-[#1a1a1a]">
              Três pilares.<br />Zero dependência.
            </h2>
          </div>

          <div className="grid gap-px bg-[#e5e5e5] lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group relative bg-white p-10 transition-colors hover:bg-[#fafafa]"
              >
                {/* Number */}
                <span className="text-sm font-bold text-[#e72f3f]">{service.number}</span>

                {/* Title */}
                <h3 className="mt-6 text-2xl font-bold text-[#1a1a1a] group-hover:text-[#e72f3f] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-4 text-[#737373] leading-relaxed">
                  {service.description}
                </p>

                {/* Arrow */}
                <div className="mt-8 flex items-center text-sm font-medium text-[#1a1a1a]">
                  <span className="opacity-0 transition-opacity group-hover:opacity-100">Explorar</span>
                  <svg className="ml-2 h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>

                {/* Corner accent on hover */}
                <div className="absolute right-0 top-0 h-12 w-12 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="absolute right-4 top-4 h-3 w-3 border-r-2 border-t-2 border-[#e72f3f]" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          ZAPP PRODUCTS — The Workshop (Our Own Creations)
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-24 lg:py-32" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #1a1a1a 100%)' }}>
        {/* Decorative dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}
        />

        {/* Accent glows */}
        <div className="absolute -left-32 top-1/4 h-80 w-80 rounded-full bg-[#e72f3f] opacity-20 blur-[100px]" />
        <div className="absolute -right-32 bottom-1/4 h-64 w-64 rounded-full bg-[#e72f3f] opacity-10 blur-[80px]" />

        {/* Grain overlay */}
        <div className="absolute inset-0 grain opacity-50" />

        <div className="container-asymmetric relative z-10">
          {/* Header */}
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between mb-16">
            <div>
              {/* Live badge */}
              <span className="inline-flex items-center gap-2 rounded-full bg-[#e72f3f]/20 px-4 py-1.5 text-sm font-medium text-[#e72f3f] mb-6 backdrop-blur-sm border border-[#e72f3f]/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e72f3f] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#e72f3f]"></span>
                </span>
                Zapp by Modular
              </span>
              <h2 className="text-headline text-white">
                Software que construímos.<br/>
                <span className="text-white/40">Para problemas que conhecemos.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/60 leading-relaxed">
                Não somos apenas consultores. Desenvolvemos produtos SaaS próprios,
                testados em produção, com suporte em português.
              </p>
            </div>
            <Link
              href="/produtos"
              className="link-underline text-sm font-medium text-white shrink-0"
            >
              Ver todos os produtos
            </Link>
          </div>

          {/* Products Grid - 2x2 */}
          <div className="grid gap-4 sm:grid-cols-2">
            {products.map((product, i) => (
              <Link
                key={product.slug}
                href={`/produtos/${product.slug}`}
                className="group relative overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  animationDelay: `${i * 100}ms`
                }}
              >
                {/* Hover glow effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: 'inset 0 0 80px rgba(231, 47, 63, 0.15)' }}
                />

                {/* Hover border glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-[#e72f3f]/30" />

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#e72f3f] to-[#c92636] text-white shadow-lg shadow-[#e72f3f]/20 mb-5">
                    {productIcons[product.icon] || productIcons.document}
                  </div>

                  {/* Category badge */}
                  <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/60 mb-4">
                    {product.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-white group-hover:text-[#e72f3f] transition-colors">
                    {product.name}
                  </h3>

                  {/* Tagline */}
                  <p className="mt-3 text-white/50 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* CTA */}
                  <div className="mt-6 flex items-center text-sm font-medium text-white/40 group-hover:text-[#e72f3f] transition-colors">
                    <span>Saber mais</span>
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="absolute top-4 right-4 w-3 h-3 border-t-2 border-r-2 border-[#e72f3f]/50" />
                </div>
              </Link>
            ))}
          </div>

          {/* Trust badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-6 lg:gap-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 text-sm text-white/40">
              <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span>RGPD Compliant</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              <span>Made in Portugal</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
              </svg>
              <span>Suporte PT-PT</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white/40">
              <svg className="h-5 w-5 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
              </svg>
              <span>Multibanco & MB Way</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FEATURED CASE STUDY — Visual Prominence
          ════════════════════════════════════════════════════════════════════ */}
      {featuredCase && (
        <section className="bg-white py-24 lg:py-32">
          <div className="container-asymmetric">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="text-eyebrow">Casos de Estudo</span>
                <h2 className="mt-4 text-headline text-[#1a1a1a]">
                  Trabalho recente.
                </h2>
              </div>
              <Link
                href="/casos-de-estudo"
                className="link-underline hidden text-sm font-medium text-[#1a1a1a] lg:inline-block"
              >
                Ver todos os projetos
              </Link>
            </div>

            {/* Featured Project - Large */}
            <Link
              href={`/casos-de-estudo/${featuredCase.slug}`}
              className="group relative block overflow-hidden rounded-3xl bg-[#1a1a1a]"
            >
              {/* Background Image */}
              {featuredCase.featured_image && (
                <div className="absolute inset-0">
                  <Image
                    src={featuredCase.featured_image}
                    alt={featuredCase.title}
                    fill
                    className="object-cover opacity-30 transition-transform group-hover:scale-105"
                  />
                </div>
              )}

              <div className="relative z-10 p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                  <div className="max-w-xl">
                    <span className="inline-block rounded-full bg-[#e72f3f] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                      {featuredCase.industry}
                    </span>
                    <h3 className="mt-6 text-3xl font-bold text-white lg:text-4xl group-hover:text-[#e72f3f] transition-colors">
                      {featuredCase.title}
                    </h3>
                    {featuredCase.client !== featuredCase.title && (
                      <p className="mt-4 text-lg text-white/70">
                        {featuredCase.client}
                      </p>
                    )}
                  </div>

                  {featuredCase.results && featuredCase.results.length > 0 && (
                    <div className="mt-8 flex gap-8 lg:mt-0">
                      {featuredCase.results.slice(0, 2).map((result, i) => (
                        <div key={i} className="text-right">
                          <span className="block text-3xl font-bold text-[#e72f3f]">{result.value}</span>
                          <span className="mt-1 block text-sm text-white/60">{result.metric}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Hover arrow */}
              <div className="absolute bottom-8 right-8 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#1a1a1a] opacity-0 transition-all group-hover:opacity-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>

              {/* Background gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#1a1a1a]/80 to-[#1a1a1a]/90" />
            </Link>

            {/* Other Projects - Grid */}
            {otherCases.length > 0 && (
              <div className="mt-6 grid gap-6 lg:grid-cols-3">
                {otherCases.map((caseStudy) => (
                  <Link
                    key={caseStudy.slug}
                    href={`/casos-de-estudo/${caseStudy.slug}`}
                    className="group hover-lift rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden"
                  >
                    {caseStudy.featured_image && (
                      <div className="aspect-[4/3] overflow-hidden relative">
                        {/* Blurred background layer */}
                        <div className="absolute inset-0">
                          <Image
                            src={caseStudy.featured_image}
                            alt=""
                            fill
                            className="object-cover scale-110 blur-2xl opacity-40"
                            aria-hidden="true"
                          />
                          <div className="absolute inset-0 bg-gradient-to-b from-[#f8f9fa]/80 to-[#f8f9fa]/95" />
                        </div>
                        {/* Main image - contained, not cropped */}
                        <div className="absolute inset-0 flex items-center justify-center p-6">
                          <Image
                            src={caseStudy.featured_image}
                            alt={caseStudy.title}
                            width={400}
                            height={300}
                            className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105 drop-shadow-lg"
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#e72f3f]">
                        {caseStudy.industry}
                      </span>
                      <h3 className="mt-3 text-xl font-bold text-[#1a1a1a] group-hover:text-[#e72f3f] transition-colors">
                        {caseStudy.title}
                      </h3>
                      {caseStudy.client !== caseStudy.title && (
                        <p className="mt-2 text-sm text-[#737373]">
                          {caseStudy.client}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-8 lg:hidden">
              <Link
                href="/casos-de-estudo"
                className="link-underline text-sm font-medium text-[#1a1a1a]"
              >
                Ver todos os projetos
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TESTIMONIAL — Editorial Treatment
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f3f0] py-24 lg:py-32 grain">
        <div className="container-asymmetric">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Quote mark - Large */}
            <div className="lg:col-span-2">
              <svg className="h-24 w-24 text-[#e72f3f]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            {/* Testimonials */}
            <div className="lg:col-span-10 space-y-16">
              {testimonials.map((testimonial, i) => (
                <div key={i} className="border-l-2 border-[#1a1a1a] pl-8">
                  <blockquote className="text-2xl font-medium text-[#1a1a1a] lg:text-3xl" style={{ lineHeight: 1.4 }}>
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white font-bold">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-[#1a1a1a]">{testimonial.author}</p>
                      <p className="text-sm text-[#737373]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          BLOG PREVIEW — Clean Grid
          ════════════════════════════════════════════════════════════════════ */}
      {posts.length > 0 && (
        <section className="bg-white py-24 lg:py-32">
          <div className="container-asymmetric">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="text-eyebrow">Insights</span>
                <h2 className="mt-4 text-headline text-[#1a1a1a]">
                  Artigos recentes.
                </h2>
              </div>
              <Link
                href="/artigos"
                className="link-underline hidden text-sm font-medium text-[#1a1a1a] lg:inline-block"
              >
                Ver todos os artigos
              </Link>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/artigos/${post.slug}`}
                  className="group"
                >
                  <article className="h-full rounded-2xl border border-[#e5e5e5] bg-white overflow-hidden transition-all hover:border-[#1a1a1a]">
                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#3a3a3a] relative">
                      {post.featured_image ? (
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          width={400}
                          height={225}
                          className="h-full w-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src="/uploads/2019/08/modular_icon_branco.png"
                            alt="Modular Digital"
                            width={60}
                            height={60}
                            className="opacity-20"
                          />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <time className="text-xs uppercase tracking-widest text-[#737373]">
                        {formatDateShort(post.date)}
                      </time>
                      <h3 className="mt-4 text-xl font-bold text-[#1a1a1a] group-hover:text-[#e72f3f] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-[#737373] line-clamp-3">
                        {post.description}
                      </p>
                      <div className="mt-6 flex items-center text-sm font-medium text-[#e72f3f]">
                        <span>Ler artigo</span>
                        <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>

            <div className="mt-8 lg:hidden">
              <Link
                href="/artigos"
                className="link-underline text-sm font-medium text-[#1a1a1a]"
              >
                Ver todos os artigos
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          CTA — Bold, Confident
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#1a1a1a] py-24 lg:py-32 grain overflow-hidden">
        {/* Background accent */}
        <div className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#e72f3f] opacity-10 blur-3xl" />

        <div className="container-asymmetric relative z-10">
          <div className="max-w-3xl">
            <h2 className="text-headline text-white">
              Pronto para transformar<br />a sua instituição?
            </h2>
            <p className="mt-6 text-xl text-white/70">
              Agende uma consultoria estratégica gratuita. Sem compromisso,
              sem pressão — apenas uma conversa honesta sobre os seus desafios.
            </p>

            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center">
              <Link
                href="/contactos"
                className="magnetic group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#f0f0f0]"
              >
                <span>Agendar Consultoria</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition-transform group-hover:translate-x-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
              <a
                href="tel:+351914663553"
                className="text-sm font-medium text-white/80 hover:text-white transition-colors"
              >
                ou ligue +351 914 663 553
              </a>
            </div>
          </div>

          {/* Decorative element */}
          <div className="absolute bottom-0 right-0 hidden lg:block opacity-[0.03]">
            <Image
              src="/uploads/2019/08/modular_icon_branco.png"
              alt=""
              width={300}
              height={300}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </>
  )
}
