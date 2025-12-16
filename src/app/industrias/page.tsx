import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Indústrias',
  description: 'Soluções digitais especializadas para instituições de ensino, saúde, setor público e organizações B2B.',
}

const industries = [
  {
    title: 'Instituições de Ensino',
    slug: 'escolas',
    description: 'Soluções digitais para escolas, universidades e centros de formação. Websites institucionais, plataformas de eventos e sistemas de gestão académica.',
    clients: ['Universidade de Lisboa', 'Faculdade de Letras', 'Agrupamento de Escolas'],
    solutions: ['Websites institucionais', 'Plataformas de eventos', 'Portais de alunos', 'Gestão de inscrições'],
  },
  {
    title: 'Organizações de Saúde',
    slug: 'saude',
    description: 'Plataformas digitais para clínicas, hospitais e centros de saúde. Conformidade com RGPD e foco na experiência do paciente.',
    clients: ['Instituto de Retina de Lisboa', 'Derma360', 'Clínicas privadas'],
    solutions: ['Websites clínicos', 'Marcação online', 'Portais de pacientes', 'Conformidade RGPD'],
  },
  {
    title: 'Setor Público',
    slug: 'setor-publico',
    description: 'Soluções para câmaras municipais, juntas de freguesia e organismos públicos. Acessibilidade WCAG e transparência.',
    clients: ['Município de Torres Vedras', 'Município de Leiria', 'Juntas de Freguesia'],
    solutions: ['Portais municipais', 'Acessibilidade WCAG', 'Transparência', 'Serviços online'],
  },
  {
    title: 'Negócios B2B',
    slug: 'b2b',
    description: 'Plataformas e websites para empresas B2B. E-commerce, catálogos digitais e sistemas de gestão de clientes.',
    clients: ['Lacrilar', 'Empresas industriais', 'Distribuidores'],
    solutions: ['E-commerce B2B', 'Catálogos digitais', 'CRM', 'Portais de clientes'],
  },
  {
    title: 'IPSS & Misericórdias',
    slug: 'ipss',
    description: 'Soluções para instituições de solidariedade social e Misericórdias. Websites acessíveis e gestão de serviços.',
    clients: ['Santa Casa Torres Vedras', 'Misericórdias', 'IPSS'],
    solutions: ['Websites institucionais', 'Gestão de utentes', 'Portais de famílias', 'Comunicação interna'],
  },
]

export default function IndustriasPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Indústrias
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Especialização por setor para soluções verdadeiramente adaptadas às suas necessidades.
            </p>
          </div>
        </div>
      </section>

      {/* Industries List */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-12">
            {industries.map((industry, index) => (
              <div
                key={industry.slug}
                className={`flex flex-col gap-8 rounded-2xl bg-[#f8f9fa] p-8 lg:flex-row lg:items-center lg:p-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-[#32373c]">
                    {industry.title}
                  </h2>
                  <p className="mt-4 text-[#6b7280]">
                    {industry.description}
                  </p>
                  <div className="mt-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                      Soluções
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {industry.solutions.map((solution) => (
                        <span
                          key={solution}
                          className="rounded-full bg-white px-3 py-1 text-sm text-[#32373c]"
                        >
                          {solution}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Link
                    href={`/industrias/${industry.slug}`}
                    className="mt-6 inline-flex items-center text-sm font-medium text-[#e72f3f]"
                  >
                    Ver soluções para {industry.title}
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
                <div className="flex-1">
                  <div className="rounded-xl bg-white p-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                      Clientes nesta indústria
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {industry.clients.map((client) => (
                        <li key={client} className="flex items-center gap-2 text-[#32373c]">
                          <svg className="h-4 w-4 text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                          {client}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32373c] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            A sua indústria não está listada?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contacte-nos - trabalhamos com diversos setores e adaptamos as nossas soluções às suas necessidades específicas.
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
