import Link from "next/link"
import Image from "next/image"
import { getAllCases, getAllPosts } from "@/lib/content"
import { formatDateShort } from "@/lib/utils"

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
