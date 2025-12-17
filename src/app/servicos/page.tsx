import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Serviços de Web Design, Desenvolvimento e SEO | Modular Digital',
  description: 'Serviços profissionais de web design, desenvolvimento web, SEO, e-commerce e consultoria digital para instituições em Portugal.',
  alternates: {
    canonical: 'https://modulardigital.pt/servicos',
  },
  openGraph: {
    title: 'Serviços de Web Design, Desenvolvimento e SEO',
    description: 'Serviços profissionais de web design, desenvolvimento web, SEO, e-commerce e consultoria digital para instituições em Portugal.',
    url: 'https://modulardigital.pt/servicos',
    type: 'website',
  },
}

const services = [
  {
    title: 'Consultoria Digital Estratégica',
    slug: 'consultoria-digital',
    description: 'Avaliamos necessidades tecnológicas, planeamos ecossistemas digitais sustentáveis. Aconselhamos sobre workflows e ferramentas digitais otimizadas para a sua organização.',
    features: [
      'Diagnóstico tecnológico completo',
      'Planeamento de ecossistema digital',
      'Otimização de workflows',
      'Seleção de ferramentas adequadas',
    ],
  },
  {
    title: 'Capacitação Técnica Profissional',
    slug: 'capacitacao-tecnica',
    description: 'Transferência de conhecimento através de programas personalizados. Sessões práticas e documentação técnica adaptada à sua equipa para garantir autonomia.',
    features: [
      'Formação personalizada',
      'Documentação técnica',
      'Sessões práticas hands-on',
      'Suporte pós-formação',
    ],
  },
  {
    title: 'Implementação Técnica Especializada',
    slug: 'desenvolvimento-web',
    description: 'Websites institucionais seguros, implementações CMS (Statamic, WordPress) e soluções personalizadas para necessidades específicas da sua instituição.',
    features: [
      'Websites institucionais',
      'Implementação CMS',
      'Soluções personalizadas',
      'Integrações de sistemas',
    ],
  },
  {
    title: 'Web Design',
    slug: 'web-design',
    description: 'Design de interfaces modernas, acessíveis e focadas na experiência do utilizador. Criamos websites que comunicam a identidade da sua instituição.',
    features: [
      'Design responsivo',
      'Acessibilidade WCAG',
      'UX/UI otimizado',
      'Identidade visual digital',
    ],
  },
  {
    title: 'E-commerce',
    slug: 'ecommerce',
    description: 'Lojas online robustas e escaláveis. Soluções de comércio eletrónico adaptadas às necessidades específicas do seu negócio.',
    features: [
      'Lojas Shopify',
      'WooCommerce',
      'Integrações de pagamento',
      'Gestão de inventário',
    ],
  },
  {
    title: 'SEO',
    slug: 'seo',
    description: 'Otimização para motores de busca que aumenta a visibilidade da sua instituição online. Estratégias comprovadas para melhorar o posicionamento.',
    features: [
      'Auditoria SEO',
      'Otimização on-page',
      'Estratégia de conteúdo',
      'Relatórios de performance',
    ],
  },
]

export default function ServicosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Serviços
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Soluções completas para a transformação digital sustentável da sua instituição.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/servicos/${service.slug}`}
                className="group rounded-xl bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <h2 className="text-xl font-bold text-[#32373c] group-hover:text-[#e72f3f]">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm text-[#6b7280]">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-[#6b7280]">
                      <svg className="h-4 w-4 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="mt-6 inline-flex items-center text-sm font-medium text-[#e72f3f]">
                  Saiba mais
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32373c] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Não sabe por onde começar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Agende uma consultoria estratégica gratuita e descubra a solução ideal para a sua instituição.
          </p>
          <Link
            href="/contactos"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
          >
            Agendar Consultoria Estratégica →
          </Link>
        </div>
      </section>
    </>
  )
}
