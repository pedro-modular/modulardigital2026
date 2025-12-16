import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contactos',
  description: 'Entre em contacto connosco para uma consultoria estratégica gratuita.',
}

export default function ContactosPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[#32373c] sm:text-5xl">
              Contactos
            </h1>
            <p className="mt-6 text-lg leading-8 text-[#6b7280]">
              Pronto para transformar a sua instituição? Agende uma consultoria
              estratégica gratuita.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#32373c]">
                Agendar Consultoria
              </h2>
              <p className="mt-4 text-[#6b7280]">
                Preencha o formulário e entraremos em contacto consigo em breve.
              </p>

              <form className="mt-8 space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#32373c]"
                  >
                    Nome *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-2 block w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#32373c] placeholder-[#6b7280] focus:border-[#e72f3f] focus:outline-none focus:ring-1 focus:ring-[#e72f3f]"
                    placeholder="O seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#32373c]"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-2 block w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#32373c] placeholder-[#6b7280] focus:border-[#e72f3f] focus:outline-none focus:ring-1 focus:ring-[#e72f3f]"
                    placeholder="email@exemplo.pt"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-sm font-medium text-[#32373c]"
                  >
                    Organização
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="mt-2 block w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#32373c] placeholder-[#6b7280] focus:border-[#e72f3f] focus:outline-none focus:ring-1 focus:ring-[#e72f3f]"
                    placeholder="Nome da sua organização"
                  />
                </div>

                <div>
                  <label
                    htmlFor="industry"
                    className="block text-sm font-medium text-[#32373c]"
                  >
                    Tipo de organização
                  </label>
                  <select
                    id="industry"
                    name="industry"
                    className="mt-2 block w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#32373c] focus:border-[#e72f3f] focus:outline-none focus:ring-1 focus:ring-[#e72f3f]"
                  >
                    <option value="">Selecione...</option>
                    <option value="educacao">Instituição de Ensino</option>
                    <option value="saude">Organização de Saúde</option>
                    <option value="setor-publico">Setor Público</option>
                    <option value="ipss">IPSS / Misericórdia</option>
                    <option value="empresa">Empresa</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[#32373c]"
                  >
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="mt-2 block w-full rounded-lg border border-[#e5e7eb] bg-white px-4 py-3 text-[#32373c] placeholder-[#6b7280] focus:border-[#e72f3f] focus:outline-none focus:ring-1 focus:ring-[#e72f3f]"
                    placeholder="Descreva brevemente o seu projeto ou necessidade..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#32373c] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#23272b]"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-2xl font-bold text-[#32373c]">
                Informações de Contacto
              </h2>

              <div className="mt-8 space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#e72f3f]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#32373c]">Morada</h3>
                    <p className="mt-1 text-[#6b7280]">
                      Rua Dr. Gomes Leal, n3A<br />
                      Torres Vedras, Portugal
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#e72f3f]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#32373c]">Email</h3>
                    <a
                      href="mailto:hello@modulardigital.pt"
                      className="mt-1 block text-[#e72f3f] hover:underline"
                    >
                      hello@modulardigital.pt
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#e72f3f]">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#32373c]">Telefone</h3>
                    <a
                      href="tel:+351914663553"
                      className="mt-1 block text-[#e72f3f] hover:underline"
                    >
                      +351 914 663 553
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12 border-t border-[#e5e7eb] pt-8">
                <h3 className="font-bold text-[#32373c]">Redes Sociais</h3>
                <div className="mt-4 flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/modulardigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#6b7280] transition-colors hover:bg-[#e72f3f] hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/modulardigital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f8f9fa] text-[#6b7280] transition-colors hover:bg-[#e72f3f] hover:text-white"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
