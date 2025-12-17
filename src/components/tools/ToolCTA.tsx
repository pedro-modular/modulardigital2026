import Link from 'next/link'

interface ToolCTAProps {
  title: string
  description: string
  serviceSlug?: string
  serviceName?: string
}

export function ToolCTA({
  title,
  description,
  serviceSlug = 'consultoria-digital',
  serviceName = 'Consultoria Digital'
}: ToolCTAProps) {
  return (
    <section className="pb-16 lg:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] p-8 grain lg:p-10">
            {/* Decorative gradient */}
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#e72f3f] opacity-10 blur-2xl" />

            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white lg:text-2xl">{title}</h3>
              <p className="mt-3 text-white/70 leading-relaxed">{description}</p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contactos"
                  className="magnetic inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[#1a1a1a] transition-all hover:bg-[#f5f5f5]"
                >
                  <span>Agendar Consultoria Gratuita</span>
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1a1a1a]/10">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>

                <Link
                  href={`/servicos/${serviceSlug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  <span>Ver {serviceName}</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
