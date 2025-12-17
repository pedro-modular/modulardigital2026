import { Metadata } from 'next'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contactos | Agende uma Consultoria Gratuita | Modular Digital',
  description: 'Entre em contacto para uma consultoria estratégica gratuita. Ligue +351 914 663 553 ou envie mensagem. Resposta em 24h.',
  alternates: {
    canonical: 'https://modulardigital.pt/contactos',
  },
  openGraph: {
    title: 'Contactos | Agende uma Consultoria Gratuita',
    description: 'Entre em contacto para uma consultoria estratégica gratuita. Transformamos a presença digital da sua organização.',
    url: 'https://modulardigital.pt/contactos',
    type: 'website',
  },
}

export default function ContactosPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════════════
          HERO — Split Dramatic Layout
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[70vh] overflow-hidden bg-[#1a1a1a] grain">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute -left-40 top-20 h-[600px] w-[600px] rounded-full bg-[#e72f3f] opacity-[0.03] blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-[#e72f3f] opacity-[0.05] blur-3xl" />
        </div>

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="container-asymmetric relative z-10 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
            {/* Left - Content */}
            <div className="lg:col-span-7">
              <div className="will-animate animate-fade-in">
                <span className="text-eyebrow">Contactos</span>
              </div>

              <h1 className="mt-6 text-display text-white will-animate animate-slide-up delay-100">
                <span className="block">Vamos</span>
                <span className="block text-[#e72f3f]">conversar.</span>
              </h1>

              <p className="mt-8 max-w-lg text-xl text-white/70 leading-relaxed will-animate animate-slide-up delay-200">
                O primeiro passo para transformar a sua instituição começa aqui.
                Sem compromissos, apenas uma conversa honesta sobre os seus desafios.
              </p>

              {/* Quick contact options */}
              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-8 will-animate animate-slide-up delay-300">
                <a
                  href="tel:+351914663553"
                  data-umami-event="phone_click"
                  data-umami-event-location="contact_hero"
                  className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#e72f3f] transition-all group-hover:bg-[#e72f3f] group-hover:text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <span className="font-medium">+351 914 663 553</span>
                </a>
                <a
                  href="mailto:hello@modulardigital.pt"
                  data-umami-event="email_click"
                  data-umami-event-location="contact_hero"
                  className="group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[#e72f3f] transition-all group-hover:bg-[#e72f3f] group-hover:text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <span className="font-medium">hello@modulardigital.pt</span>
                </a>
              </div>
            </div>

            {/* Right - Stats/Trust indicators */}
            <div className="lg:col-span-5 lg:flex lg:items-end lg:justify-end will-animate animate-fade-in delay-400">
              <div className="grid grid-cols-3 gap-4 lg:gap-6">
                <div className="text-center lg:text-right">
                  <span className="block text-4xl font-bold text-white lg:text-5xl">50+</span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-white/50">Projetos</span>
                </div>
                <div className="text-center lg:text-right">
                  <span className="block text-4xl font-bold text-[#e72f3f] lg:text-5xl">10+</span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-white/50">Anos</span>
                </div>
                <div className="text-center lg:text-right">
                  <span className="block text-4xl font-bold text-white lg:text-5xl">24h</span>
                  <span className="mt-1 block text-xs uppercase tracking-widest text-white/50">Resposta</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 will-animate animate-fade-in delay-600">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-white/40">Scroll</span>
            <div className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          CONTACT FORM + INFO — Asymmetric Split
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#fafafa] py-24 lg:py-32 mesh-gradient">
        <div className="container-asymmetric">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            {/* Form Column */}
            <div className="lg:col-span-7 lg:pr-8">
              <div className="relative">
                {/* Corner accent */}
                <div className="absolute -left-4 -top-4 h-12 w-12 border-l-2 border-t-2 border-[#e72f3f] opacity-50" />

                <span className="text-eyebrow">Formulário</span>
                <h2 className="mt-4 text-headline text-[#1a1a1a]">
                  Agende uma<br />consultoria gratuita.
                </h2>
                <p className="mt-4 max-w-md text-[#737373]">
                  Preencha o formulário e entraremos em contacto consigo dentro de 24 horas úteis.
                </p>

                <div className="mt-10">
                  <ContactForm />
                </div>
              </div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-5">
              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Address Card */}
                <div className="group hover-lift rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fafafa] text-[#1a1a1a] transition-all group-hover:bg-[#e72f3f] group-hover:text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">Escritório</h3>
                      <p className="mt-2 text-[#737373] leading-relaxed">
                        Rua Dr. Gomes Leal, n3A<br />
                        2560-297 Torres Vedras<br />
                        Portugal
                      </p>
                      <a
                        href="https://maps.google.com/?q=Rua+Dr+Gomes+Leal+3A+Torres+Vedras"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#e72f3f] hover:underline"
                      >
                        Ver no mapa
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone Card */}
                <div className="group hover-lift rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fafafa] text-[#1a1a1a] transition-all group-hover:bg-[#e72f3f] group-hover:text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">Telefone</h3>
                      <a
                        href="tel:+351914663553"
                        data-umami-event="phone_click"
                        data-umami-event-location="contact_card"
                        className="mt-2 block text-lg font-medium text-[#1a1a1a] hover:text-[#e72f3f] transition-colors"
                      >
                        +351 914 663 553
                      </a>
                      <p className="mt-1 text-sm text-[#737373]">
                        Seg — Sex, 9h — 18h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Email Card */}
                <div className="group hover-lift rounded-2xl border border-[#e5e5e5] bg-white p-6 transition-all hover:border-[#e72f3f]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fafafa] text-[#1a1a1a] transition-all group-hover:bg-[#e72f3f] group-hover:text-white">
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a1a1a]">Email</h3>
                      <a
                        href="mailto:hello@modulardigital.pt"
                        data-umami-event="email_click"
                        data-umami-event-location="contact_card"
                        className="mt-2 block text-lg font-medium text-[#1a1a1a] hover:text-[#e72f3f] transition-colors"
                      >
                        hello@modulardigital.pt
                      </a>
                      <p className="mt-1 text-sm text-[#737373]">
                        Resposta em menos de 24h
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links Card */}
                <div className="rounded-2xl border border-[#e5e5e5] bg-white p-6">
                  <h3 className="font-bold text-[#1a1a1a]">Redes Sociais</h3>
                  <div className="mt-4 flex gap-3">
                    <a
                      href="https://www.linkedin.com/company/modulardigitalagency/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="social_click"
                      data-umami-event-network="linkedin"
                      className="group flex h-12 w-12 items-center justify-center rounded-xl bg-[#fafafa] text-[#737373] transition-all hover:bg-[#0077b5] hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/modulardigitalagency"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-umami-event="social_click"
                      data-umami-event-network="facebook"
                      className="group flex h-12 w-12 items-center justify-center rounded-xl bg-[#fafafa] text-[#737373] transition-all hover:bg-[#1877f2] hover:text-white"
                      aria-label="Facebook"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Why Contact Us */}
              <div className="mt-8 rounded-2xl bg-[#1a1a1a] p-8 grain relative overflow-hidden">
                {/* Decorative accent */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#e72f3f] opacity-10 blur-2xl" />

                <h3 className="relative z-10 font-bold text-white text-lg">
                  Porquê contactar-nos?
                </h3>
                <ul className="relative z-10 mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">Consultoria gratuita</strong> — sem compromisso ou pressão de vendas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">10+ anos de experiência</strong> — em instituições de ensino, saúde e setor público
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white">
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                    <span className="text-sm text-white/80">
                      <strong className="text-white">Soluções sustentáveis</strong> — construímos autonomia, não dependência
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FAQ — Common Questions
          ════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#f5f3f0] py-24 lg:py-32 grain">
        <div className="container-asymmetric">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <span className="text-eyebrow">FAQ</span>
              <h2 className="mt-4 text-headline text-[#1a1a1a]">
                Perguntas<br />frequentes.
              </h2>
              <p className="mt-4 text-[#737373]">
                Não encontrou a resposta? Entre em contacto connosco diretamente.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="space-y-4">
                {[
                  {
                    question: 'A consultoria inicial é mesmo gratuita?',
                    answer: 'Sim, a primeira reunião é totalmente gratuita e sem compromisso. Queremos perceber os seus desafios antes de propor qualquer solução.'
                  },
                  {
                    question: 'Qual é o prazo típico de um projeto?',
                    answer: 'Depende da complexidade do projeto. Um website institucional pode ficar pronto em 4-6 semanas, enquanto projetos de transformação digital mais complexos podem demorar alguns meses.'
                  },
                  {
                    question: 'Oferecem suporte após a entrega do projeto?',
                    answer: 'Sim, todos os nossos projetos incluem um período de suporte e formação. Também oferecemos planos de manutenção contínua para quem pretender.'
                  }
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group rounded-2xl border border-[#e5e5e5] bg-white transition-all hover:border-[#1a1a1a]"
                  >
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-bold text-[#1a1a1a] [&::-webkit-details-marker]:hidden">
                      {faq.question}
                      <span className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f5f3f0] text-[#1a1a1a] transition-all group-open:rotate-45 group-open:bg-[#e72f3f] group-open:text-white">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-6 pb-6 text-[#737373] leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          FINAL CTA — Bold
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#1a1a1a] py-20 lg:py-28 grain overflow-hidden">
        {/* Background accent */}
        <div className="absolute -right-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#e72f3f] opacity-10 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#e72f3f] opacity-5 blur-3xl" />

        <div className="container-asymmetric relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-headline text-white">
              Pronto para o próximo passo?
            </h2>
            <p className="mt-6 text-xl text-white/70">
              Transforme a presença digital da sua instituição com uma equipa que
              constrói competências, não dependências.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
              <a
                href="#name"
                data-umami-event="cta_click"
                data-umami-event-cta="contact_footer_form"
                className="magnetic group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#f0f0f0]"
              >
                <span>Preencher Formulário</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1a1a1a] text-white transition-transform group-hover:-translate-y-1">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                  </svg>
                </span>
              </a>
              <span className="text-white/50">ou</span>
              <a
                href="tel:+351914663553"
                data-umami-event="phone_click"
                data-umami-event-location="contact_footer"
                className="text-sm font-medium text-white hover:text-[#e72f3f] transition-colors"
              >
                Ligue +351 914 663 553
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
