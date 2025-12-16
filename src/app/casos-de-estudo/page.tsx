import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCases } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Casos de Estudo',
  description: 'Projetos de sucesso em web design, desenvolvimento e transformação digital para instituições.',
}

export default function CasosDeEstudoPage() {
  const cases = getAllCases()

  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Casos de Estudo
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Conheça os projetos que realizámos e os resultados que alcançámos
              para os nossos clientes.
            </p>
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {cases.length === 0 ? (
            <div className="text-center">
              <p className="text-[#6b7280]">
                Casos de estudo em breve.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((caseStudy) => (
                <article
                  key={caseStudy.slug}
                  className="group relative flex flex-col rounded-lg border border-[#e5e7eb] bg-white transition-all hover:border-[#e72f3f] hover:shadow-md"
                >
                  {caseStudy.featured_image && (
                    <div className="aspect-[4/3] overflow-hidden rounded-t-lg relative">
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
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#e72f3f]">
                      {caseStudy.industry}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-[#32373c] group-hover:text-[#e72f3f]">
                      <Link href={`/casos-de-estudo/${caseStudy.slug}`}>
                        <span className="absolute inset-0" />
                        {caseStudy.title}
                      </Link>
                    </h2>
                    <p className="mt-2 text-sm text-[#6b7280]">
                      {caseStudy.client}
                    </p>
                    {caseStudy.results && caseStudy.results.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {caseStudy.results.slice(0, 2).map((result, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-[#f8f9fa] px-3 py-1 text-xs font-medium text-[#32373c]"
                          >
                            {result.value}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {caseStudy.services.map((service) => (
                        <span
                          key={service}
                          className="text-xs text-[#6b7280]"
                        >
                          #{service}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32373c] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Quer resultados semelhantes?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
            Contacte-nos para discutir como podemos ajudar a sua instituição.
          </p>
          <Link
            href="/contactos"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
          >
            Agendar Consultoria Estratégica
          </Link>
        </div>
      </section>
    </>
  )
}
