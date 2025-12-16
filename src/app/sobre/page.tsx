import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description: 'Conheça a Modular Digital - consultoria e implementação digital especializada para instituições.',
}

const values = [
  {
    title: 'Autonomia',
    description: 'Capacitamos as equipas dos nossos clientes para que possam gerir e evoluir as soluções implementadas de forma independente.',
  },
  {
    title: 'Sustentabilidade',
    description: 'Desenvolvemos soluções pensadas para o longo prazo, evitando dependências tecnológicas e custos recorrentes desnecessários.',
  },
  {
    title: 'Especialização',
    description: 'Focamo-nos em setores específicos para oferecer soluções verdadeiramente adaptadas às necessidades de cada indústria.',
  },
  {
    title: 'Transparência',
    description: 'Comunicação clara e honesta em todas as fases do projeto, sem surpresas nem custos ocultos.',
  },
]

const stats = [
  { value: '50+', label: 'Instituições transformadas' },
  { value: '10+', label: 'Anos de experiência' },
  { value: '100%', label: 'Autonomia garantida' },
  { value: '30%', label: 'Redução média de custos' },
]

export default function SobrePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Sobre a Modular Digital
            </h1>
            <p className="mt-6 text-xl leading-8 text-[#6b7280]">
              Somos uma agência de consultoria e implementação digital especializada em instituições.
              Transformamos desafios digitais em competências internas, garantindo autonomia e resultados sustentáveis.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-[#32373c]">A nossa missão</h2>
            <p className="mt-6 text-lg text-[#6b7280]">
              Acreditamos que a tecnologia deve servir as organizações, não o contrário.
              A nossa missão é capacitar instituições para que possam aproveitar o potencial
              digital de forma autónoma e sustentável.
            </p>
            <p className="mt-4 text-lg text-[#6b7280]">
              Não queremos criar dependência - queremos criar competências. Por isso,
              cada projeto inclui não só a implementação técnica, mas também a formação
              e documentação necessárias para que as equipas dos nossos clientes possam
              gerir e evoluir as soluções de forma independente.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#32373c] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
                <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[#32373c]">Os nossos valores</h2>
            <p className="mt-4 text-lg text-[#6b7280]">
              Princípios que guiam o nosso trabalho e relação com clientes.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title} className="rounded-xl bg-[#f8f9fa] p-8">
                <h3 className="text-xl font-bold text-[#32373c]">{value.title}</h3>
                <p className="mt-4 text-[#6b7280]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[#f8f9fa] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-[#32373c]">A nossa abordagem</h2>
            <div className="mt-8 space-y-8">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#32373c]">Diagnóstico</h3>
                  <p className="mt-2 text-[#6b7280]">
                    Começamos por compreender profundamente a sua organização, processos e objetivos.
                    Sem diagnóstico correto, não há solução adequada.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#32373c]">Planeamento</h3>
                  <p className="mt-2 text-[#6b7280]">
                    Desenhamos uma solução à medida, com roadmap claro e custos definidos.
                    Sem surpresas, sem scope creep.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#32373c]">Implementação</h3>
                  <p className="mt-2 text-[#6b7280]">
                    Desenvolvemos a solução com foco em qualidade, segurança e performance.
                    Comunicação constante durante todo o processo.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e72f3f] text-white font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#32373c]">Capacitação</h3>
                  <p className="mt-2 text-[#6b7280]">
                    Formamos a sua equipa e entregamos documentação completa.
                    O objetivo é garantir autonomia total na gestão da solução.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#32373c]">Onde estamos</h2>
            <p className="mt-6 text-lg text-[#6b7280]">
              Baseados em Torres Vedras, trabalhamos com instituições em todo o país.
              A nossa localização permite-nos servir eficazmente tanto a área metropolitana
              de Lisboa como as regiões Centro e Oeste.
            </p>
            <p className="mt-4 text-[#6b7280]">
              Rua Dr. Gomes Leal, n3A<br />
              Torres Vedras, Portugal
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32373c] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Vamos conversar?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Agende uma consultoria estratégica gratuita e descubra como podemos ajudar
            a sua instituição.
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
