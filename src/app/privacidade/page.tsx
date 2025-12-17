import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Modular Digital',
  description: 'Política de privacidade da Modular Digital Agency. Saiba como recolhemos, utilizamos e protegemos os seus dados pessoais.',
}

export default function PrivacidadePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#1a1a1a] pt-32 pb-16 lg:pt-40 lg:pb-20 grain">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-white lg:text-5xl">
              Política de Privacidade
            </h1>
            <p className="mt-6 text-lg text-white/70">
              Última atualização: 17 de Dezembro de 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <div className="space-y-10">

              {/* Section 1 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">1. Identificação do Responsável</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    <strong className="text-[#1a1a1a]">NeverGetOld, Lda</strong> (adiante designada por "Modular Digital" ou "nós"), com sede em Portugal, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através do website <strong className="text-[#1a1a1a]">modulardigital.pt</strong>.
                  </p>
                  <p>
                    Para questões relacionadas com a proteção de dados, pode contactar-nos através do email: <a href="mailto:hello@modulardigital.pt" className="text-[#e72f3f] hover:underline">hello@modulardigital.pt</a>
                  </p>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">2. Dados Pessoais Recolhidos</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Recolhemos apenas os dados pessoais que nos fornece voluntariamente através do nosso formulário de contacto:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nome</li>
                    <li>Endereço de email</li>
                    <li>Número de telefone (opcional)</li>
                    <li>Nome da empresa (opcional)</li>
                    <li>Mensagem</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">3. Finalidade do Tratamento</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Os dados recolhidos são utilizados exclusivamente para:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Responder aos seus pedidos de contacto e solicitações de informação</li>
                    <li>Enviar propostas comerciais quando solicitadas</li>
                    <li>Prestar os serviços contratados</li>
                  </ul>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">4. Base Legal</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    O tratamento dos seus dados pessoais baseia-se no seu consentimento, prestado ao submeter o formulário de contacto, e no nosso interesse legítimo em responder às suas solicitações.
                  </p>
                </div>
              </div>

              {/* Section 5 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">5. Conservação dos Dados</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Os dados pessoais são conservados pelo período necessário para dar resposta ao seu pedido e, posteriormente, pelo prazo máximo de 2 anos, salvo obrigação legal de conservação por período superior.
                  </p>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">6. Partilha de Dados</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Não partilhamos os seus dados pessoais com terceiros, exceto quando necessário para a prestação dos nossos serviços ou quando legalmente obrigados.
                  </p>
                  <p>
                    Utilizamos os seguintes serviços de terceiros:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-[#1a1a1a]">Vercel</strong> - Alojamento do website (EUA, com cláusulas contratuais-tipo)</li>
                    <li><strong className="text-[#1a1a1a]">Umami Analytics</strong> - Análise estatística anónima e sem cookies (ver secção 8)</li>
                  </ul>
                </div>
              </div>

              {/* Section 7 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">7. Os Seus Direitos</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD), tem os seguintes direitos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong className="text-[#1a1a1a]">Direito de acesso</strong> - Obter confirmação sobre o tratamento dos seus dados</li>
                    <li><strong className="text-[#1a1a1a]">Direito de retificação</strong> - Corrigir dados inexatos</li>
                    <li><strong className="text-[#1a1a1a]">Direito ao apagamento</strong> - Solicitar a eliminação dos seus dados</li>
                    <li><strong className="text-[#1a1a1a]">Direito à limitação</strong> - Restringir o tratamento dos dados</li>
                    <li><strong className="text-[#1a1a1a]">Direito de oposição</strong> - Opor-se ao tratamento dos dados</li>
                    <li><strong className="text-[#1a1a1a]">Direito de portabilidade</strong> - Receber os seus dados em formato estruturado</li>
                  </ul>
                  <p>
                    Para exercer qualquer destes direitos, contacte-nos através de <a href="mailto:hello@modulardigital.pt" className="text-[#e72f3f] hover:underline">hello@modulardigital.pt</a>.
                  </p>
                </div>
              </div>

              {/* Section 8 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">8. Cookies e Análise de Tráfego</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    <strong className="text-[#1a1a1a]">Não utilizamos cookies de rastreamento</strong> neste website.
                  </p>
                  <p>
                    Para análise estatística do tráfego, utilizamos o <strong className="text-[#1a1a1a]">Umami Analytics</strong>, uma solução de análise que respeita a privacidade e que:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Não utiliza cookies</li>
                    <li>Não recolhe dados pessoais identificáveis</li>
                    <li>Não rastreia utilizadores entre websites</li>
                    <li>Cumpre totalmente o RGPD sem necessidade de consentimento</li>
                  </ul>
                  <p>
                    Os únicos cookies que podem ser utilizados são cookies estritamente necessários para o funcionamento técnico do website (ex: sessões de formulário), que não requerem consentimento nos termos da legislação europeia.
                  </p>
                </div>
              </div>

              {/* Section 9 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">9. Segurança</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados pessoais contra acesso não autorizado, perda ou destruição, incluindo:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encriptação SSL/TLS em todas as comunicações</li>
                    <li>Acesso restrito aos dados pessoais</li>
                    <li>Alojamento em infraestrutura segura</li>
                  </ul>
                </div>
              </div>

              {/* Section 10 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">10. Reclamações</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Se considerar que o tratamento dos seus dados pessoais viola a legislação aplicável, tem o direito de apresentar reclamação junto da Comissão Nacional de Proteção de Dados (CNPD):
                  </p>
                  <div className="bg-[#fafafa] rounded-lg p-4">
                    <p className="font-medium text-[#1a1a1a]">Comissão Nacional de Proteção de Dados</p>
                    <p>Av. D. Carlos I, 134 - 1.º</p>
                    <p>1200-651 Lisboa</p>
                    <p>
                      Website: <a href="https://www.cnpd.pt" target="_blank" rel="noopener noreferrer" className="text-[#e72f3f] hover:underline">www.cnpd.pt</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 11 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">11. Alterações</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Reservamos o direito de atualizar esta política de privacidade. Quaisquer alterações serão publicadas nesta página com a data de atualização revista.
                  </p>
                </div>
              </div>

              {/* Section 12 */}
              <div>
                <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">12. Contacto</h2>
                <div className="space-y-4 text-[#525252] leading-relaxed">
                  <p>
                    Para questões sobre esta política ou o tratamento dos seus dados:
                  </p>
                  <div className="bg-[#fafafa] rounded-lg p-4">
                    <p className="font-medium text-[#1a1a1a]">Modular Digital</p>
                    <p className="text-sm text-[#737373]">NeverGetOld, Lda</p>
                    <p className="mt-2">
                      Email: <a href="mailto:hello@modulardigital.pt" className="text-[#e72f3f] hover:underline">hello@modulardigital.pt</a>
                    </p>
                    <p>
                      Telefone: <a href="tel:+351914663553" className="text-[#e72f3f] hover:underline">+351 914 663 553</a>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Back link */}
            <div className="mt-12 pt-8 border-t border-[#e5e5e5]">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#737373] transition-colors hover:text-[#1a1a1a]"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Voltar à página inicial
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
