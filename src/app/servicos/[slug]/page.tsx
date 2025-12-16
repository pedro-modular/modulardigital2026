import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCasesByService } from '@/lib/content'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const services: Record<string, {
  title: string
  tagline: string
  description: string
  heroText: string
  whatWeDo: {
    title: string
    description: string
  }[]
  process: {
    step: string
    title: string
    description: string
  }[]
  benefits: {
    stat: string
    label: string
  }[]
  faq: {
    question: string
    answer: string
  }[]
}> = {
  'consultoria-digital': {
    title: 'Consultoria Digital Estratégica',
    tagline: 'Estratégia antes de execução',
    description: 'Diagnóstico tecnológico e planeamento de ecossistemas digitais sustentáveis.',
    heroText: 'Muitas organizações investem em tecnologia sem estratégia. O resultado? Ferramentas dispersas, processos ineficientes e orçamentos desperdiçados. Nós invertemos esta lógica: primeiro entendemos, depois recomendamos.',
    whatWeDo: [
      {
        title: 'Diagnóstico Tecnológico',
        description: 'Mapeamos todas as ferramentas, processos e fluxos de trabalho da sua organização. Identificamos redundâncias, gaps e oportunidades de otimização.',
      },
      {
        title: 'Arquitetura de Ecossistema',
        description: 'Desenhamos o ecossistema digital ideal para a sua organização. Não vendemos ferramentas - recomendamos as que fazem sentido para o seu contexto.',
      },
      {
        title: 'Roadmap de Implementação',
        description: 'Criamos um plano de ação faseado, com prioridades claras e orçamentos definidos. Sem surpresas, sem scope creep.',
      },
      {
        title: 'Seleção de Fornecedores',
        description: 'Ajudamos a avaliar propostas, negociar contratos e selecionar os parceiros certos. Representamos os seus interesses, não os dos vendedores.',
      },
    ],
    process: [
      { step: '01', title: 'Descoberta', description: 'Entrevistas com stakeholders, análise de processos e levantamento tecnológico.' },
      { step: '02', title: 'Diagnóstico', description: 'Relatório detalhado com estado atual, problemas identificados e oportunidades.' },
      { step: '03', title: 'Estratégia', description: 'Proposta de ecossistema digital com arquitetura, ferramentas e integrações.' },
      { step: '04', title: 'Roadmap', description: 'Plano de implementação faseado com timeline, responsabilidades e orçamento.' },
    ],
    benefits: [
      { stat: '30%', label: 'Redução média de custos operacionais' },
      { stat: '50%', label: 'Menos ferramentas redundantes' },
      { stat: '3x', label: 'Mais clareza nas decisões tecnológicas' },
    ],
    faq: [
      { question: 'Quanto tempo demora uma consultoria?', answer: 'Depende da complexidade da organização. Um diagnóstico básico demora 2-3 semanas. Projetos mais complexos podem ir até 8 semanas.' },
      { question: 'Implementam as recomendações?', answer: 'Podemos. Mas o nosso papel principal é aconselhar. Se preferir implementar internamente ou com outros parceiros, entregamos toda a documentação necessária.' },
      { question: 'E se já tivermos ferramentas implementadas?', answer: 'Analisamos o que existe e recomendamos otimizações. Nem sempre a solução é mudar - às vezes é configurar melhor o que já têm.' },
    ],
  },
  'capacitacao-tecnica': {
    title: 'Capacitação Técnica',
    tagline: 'Autonomia é o objetivo',
    description: 'Formação e transferência de conhecimento para equipas que querem independência.',
    heroText: 'A pior dependência é a tecnológica. Quando a sua equipa não sabe gerir as ferramentas que usa, fica refém de fornecedores. Nós formamos pessoas para que a sua organização nunca fique parada à espera de ninguém.',
    whatWeDo: [
      {
        title: 'Formação Personalizada',
        description: 'Programas desenhados à medida da sua equipa. Não damos cursos genéricos - ensinamos a usar as vossas ferramentas, com os vossos dados, para os vossos processos.',
      },
      {
        title: 'Documentação Técnica',
        description: 'Manuais, guias e vídeos específicos para a sua organização. Quando alguém novo entra, tem tudo o que precisa para começar.',
      },
      {
        title: 'Workshops Práticos',
        description: 'Sessões hands-on onde a equipa aprende fazendo. Menos teoria, mais prática com casos reais da organização.',
      },
      {
        title: 'Suporte Pós-Formação',
        description: 'Não desaparecemos depois da formação. Ficamos disponíveis para dúvidas e acompanhamento durante a fase de adaptação.',
      },
    ],
    process: [
      { step: '01', title: 'Avaliação', description: 'Identificamos o nível atual da equipa e os gaps de conhecimento.' },
      { step: '02', title: 'Programa', description: 'Desenhamos um programa de formação adaptado às necessidades específicas.' },
      { step: '03', title: 'Formação', description: 'Sessões práticas com exercícios baseados em casos reais da organização.' },
      { step: '04', title: 'Documentação', description: 'Entrega de manuais, guias e materiais de referência personalizados.' },
    ],
    benefits: [
      { stat: '100%', label: 'Autonomia na gestão de ferramentas' },
      { stat: '80%', label: 'Redução de pedidos de suporte' },
      { stat: '0€', label: 'Custos de dependência externa' },
    ],
    faq: [
      { question: 'A formação é presencial ou online?', answer: 'Ambas as modalidades. Presencial é ideal para workshops práticos. Online funciona bem para sessões de follow-up e equipas distribuídas.' },
      { question: 'Quantas pessoas podem participar?', answer: 'Recomendamos grupos de 4-8 pessoas para formações práticas. Para sessões teóricas, pode ser mais.' },
      { question: 'E se a equipa mudar depois?', answer: 'A documentação fica convosco. E podemos fazer sessões de refresh para novos elementos sempre que necessário.' },
    ],
  },
  'desenvolvimento-web': {
    title: 'Desenvolvimento Web',
    tagline: 'Tecnologia que trabalha para si',
    description: 'Websites e plataformas construídos para durar, não para criar dependência.',
    heroText: 'Um website não é um projeto - é uma ferramenta de trabalho. Construímos plataformas robustas, seguras e fáceis de gerir. Usamos tecnologias abertas para que nunca fique preso a um fornecedor.',
    whatWeDo: [
      {
        title: 'Websites Institucionais',
        description: 'Sites que representam a sua organização com profissionalismo. Rápidos, acessíveis e otimizados para motores de busca.',
      },
      {
        title: 'Plataformas Personalizadas',
        description: 'Quando as soluções standard não chegam, construímos à medida. Portais de cliente, sistemas de gestão, intranets.',
      },
      {
        title: 'Implementação CMS',
        description: 'WordPress, Statamic ou outras plataformas. Configuramos para que a sua equipa possa gerir conteúdos sem conhecimentos técnicos.',
      },
      {
        title: 'Migrações e Redesign',
        description: 'Atualizamos sites antigos sem perder SEO nem conteúdo. Redesenhamos mantendo o que funciona, melhorando o que não funciona.',
      },
    ],
    process: [
      { step: '01', title: 'Descoberta', description: 'Entendemos objetivos, público-alvo e requisitos técnicos.' },
      { step: '02', title: 'Arquitetura', description: 'Definimos estrutura, funcionalidades e tecnologias a usar.' },
      { step: '03', title: 'Desenvolvimento', description: 'Construímos iterativamente com validações frequentes.' },
      { step: '04', title: 'Lançamento', description: 'Deploy, formação da equipa e período de acompanhamento.' },
    ],
    benefits: [
      { stat: '95+', label: 'Score médio no Google PageSpeed' },
      { stat: 'AA', label: 'Conformidade WCAG garantida' },
      { stat: '24h', label: 'Tempo de resposta a incidentes' },
    ],
    faq: [
      { question: 'Que tecnologias usam?', answer: 'WordPress e Statamic para CMS. Next.js para aplicações. Sempre tecnologias abertas e bem documentadas.' },
      { question: 'Quanto custa um website?', answer: 'Depende da complexidade. Sites institucionais começam nos 3.000€. Plataformas personalizadas são orçamentadas caso a caso.' },
      { question: 'Fazem manutenção?', answer: 'Oferecemos planos de manutenção, mas desenhamos para que possam gerir internamente. A escolha é vossa.' },
    ],
  },
  'web-design': {
    title: 'Web Design',
    tagline: 'Design com propósito',
    description: 'Interfaces que comunicam, convertem e respeitam todos os utilizadores.',
    heroText: 'Design bonito não chega. Precisa de funcionar. Criamos interfaces que guiam o utilizador, comunicam a mensagem certa e funcionam para toda a gente - incluindo pessoas com deficiência.',
    whatWeDo: [
      {
        title: 'UI/UX Design',
        description: 'Interfaces intuitivas baseadas em pesquisa de utilizadores. Menos cliques, menos confusão, mais conversões.',
      },
      {
        title: 'Design de Acessibilidade',
        description: 'Websites que funcionam para todos. Conformidade WCAG AA/AAA, testes com utilizadores reais, não apenas checkboxes.',
      },
      {
        title: 'Identidade Digital',
        description: 'Traduzimos a identidade da sua organização para o digital. Cores, tipografia, iconografia - tudo coerente.',
      },
      {
        title: 'Prototipagem',
        description: 'Protótipos interativos para validar antes de desenvolver. Errar no protótipo é barato. Errar no código é caro.',
      },
    ],
    process: [
      { step: '01', title: 'Research', description: 'Análise de utilizadores, concorrência e melhores práticas do setor.' },
      { step: '02', title: 'Wireframes', description: 'Estrutura e hierarquia de informação sem distração visual.' },
      { step: '03', title: 'Design', description: 'Interface visual completa com todos os estados e interações.' },
      { step: '04', title: 'Protótipo', description: 'Versão interativa para testes e validação antes do desenvolvimento.' },
    ],
    benefits: [
      { stat: 'WCAG', label: 'Conformidade AA garantida' },
      { stat: '+40%', label: 'Aumento médio de conversões' },
      { stat: '100%', label: 'Responsivo em todos os dispositivos' },
    ],
    faq: [
      { question: 'Fazem só design ou também desenvolvimento?', answer: 'Ambos. Podemos entregar só o design para a vossa equipa desenvolver, ou fazer o projeto completo.' },
      { question: 'Como funciona a acessibilidade?', answer: 'Não é um extra - está incluída em todo o processo. Desenhamos acessível desde o início, não corrigimos no fim.' },
      { question: 'Quantas revisões estão incluídas?', answer: 'Trabalhamos iterativamente. Revisões ilimitadas dentro do scope acordado. Alterações de scope são orçamentadas à parte.' },
    ],
  },
  'ecommerce': {
    title: 'E-commerce',
    tagline: 'Lojas que vendem',
    description: 'Plataformas de comércio eletrónico pensadas para converter e escalar.',
    heroText: 'Uma loja online não é um catálogo com carrinho de compras. É uma máquina de vendas que precisa de funcionar 24/7. Construímos lojas que convertem visitantes em clientes e clientes em fãs.',
    whatWeDo: [
      {
        title: 'Lojas Shopify',
        description: 'A plataforma mais fiável para e-commerce. Configuramos, personalizamos e otimizamos para o mercado português.',
      },
      {
        title: 'WooCommerce',
        description: 'Para quem quer controlo total. Integração perfeita com WordPress, extensível e sem custos de plataforma.',
      },
      {
        title: 'Otimização de Conversão',
        description: 'Checkout simplificado, recuperação de carrinhos abandonados, upsells inteligentes. Cada detalhe conta.',
      },
      {
        title: 'Integrações',
        description: 'Pagamentos, logística, ERP, CRM. Automatizamos tudo o que pode ser automatizado.',
      },
    ],
    process: [
      { step: '01', title: 'Estratégia', description: 'Definimos modelo de negócio, canais e métricas de sucesso.' },
      { step: '02', title: 'Plataforma', description: 'Escolhemos e configuramos a tecnologia certa para o seu caso.' },
      { step: '03', title: 'Lançamento', description: 'Loja online, testes de pagamento e formação da equipa.' },
      { step: '04', title: 'Otimização', description: 'Análise de dados e melhorias contínuas baseadas em resultados.' },
    ],
    benefits: [
      { stat: '99.9%', label: 'Uptime garantido' },
      { stat: '+25%', label: 'Aumento médio de conversão' },
      { stat: '3s', label: 'Tempo máximo de carregamento' },
    ],
    faq: [
      { question: 'Shopify ou WooCommerce?', answer: 'Shopify para simplicidade e fiabilidade. WooCommerce para controlo e personalização. Analisamos o vosso caso e recomendamos.' },
      { question: 'Tratam dos pagamentos?', answer: 'Configuramos gateways de pagamento (Stripe, PayPal, MB Way, Multibanco). A conta é vossa, nós só configuramos.' },
      { question: 'E a logística?', answer: 'Integramos com os principais operadores portugueses (CTT, DPD, GLS). Automação de envios e tracking incluídos.' },
    ],
  },
  'seo': {
    title: 'SEO',
    tagline: 'Visibilidade orgânica',
    description: 'Estratégias de otimização que trazem tráfego qualificado sem pagar por clique.',
    heroText: 'Estar na primeira página do Google não é sorte - é estratégia. Trabalhamos os fundamentos técnicos, o conteúdo e a autoridade do seu site para que seja encontrado por quem procura o que oferece.',
    whatWeDo: [
      {
        title: 'Auditoria SEO',
        description: 'Análise técnica completa do seu site. Identificamos problemas que estão a prejudicar o posicionamento.',
      },
      {
        title: 'SEO Técnico',
        description: 'Velocidade, estrutura, mobile-first, schema markup. Os fundamentos que o Google valoriza.',
      },
      {
        title: 'Estratégia de Conteúdo',
        description: 'Pesquisa de palavras-chave, planeamento editorial e otimização de páginas existentes.',
      },
      {
        title: 'Link Building',
        description: 'Construção de autoridade através de backlinks de qualidade. Sem spam, sem atalhos arriscados.',
      },
    ],
    process: [
      { step: '01', title: 'Auditoria', description: 'Análise técnica, de conteúdo e de backlinks do estado atual.' },
      { step: '02', title: 'Estratégia', description: 'Definição de keywords alvo, prioridades e plano de ação.' },
      { step: '03', title: 'Implementação', description: 'Correções técnicas, otimização de conteúdo e link building.' },
      { step: '04', title: 'Monitorização', description: 'Relatórios mensais com evolução de rankings e tráfego.' },
    ],
    benefits: [
      { stat: '+200%', label: 'Aumento médio de tráfego orgânico' },
      { stat: 'Top 10', label: 'Posicionamento para keywords alvo' },
      { stat: '0€', label: 'Custo por clique após otimização' },
    ],
    faq: [
      { question: 'Quanto tempo demora a ver resultados?', answer: 'SEO é um investimento a médio prazo. Resultados começam a aparecer em 3-6 meses. Resultados sólidos em 6-12 meses.' },
      { question: 'Garantem primeira posição?', answer: 'Não. Quem garante está a mentir. Garantimos trabalho sério, metodologia comprovada e relatórios transparentes.' },
      { question: 'Fazem Google Ads também?', answer: 'Focamo-nos em SEO orgânico. Para Ads, recomendamos parceiros especializados. Podemos fazer a ponte.' },
    ],
  },
}

const servicesSlugs = Object.keys(services)

export async function generateStaticParams() {
  return servicesSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const service = services[slug]

  if (!service) {
    return { title: 'Serviço não encontrado' }
  }

  return {
    title: service.title,
    description: service.description,
  }
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = services[slug]

  if (!service) {
    notFound()
  }

  const relatedCases = getCasesByService(slug).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="bg-[#32373c] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <nav className="mb-6 flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">Início</Link>
              <span>/</span>
              <Link href="/servicos" className="hover:text-white">Serviços</Link>
            </nav>

            <p className="text-sm font-bold uppercase tracking-wider text-[#e72f3f]">
              {service.tagline}
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {service.title}
            </h1>

            <p className="mt-8 text-xl leading-relaxed text-gray-300">
              {service.heroText}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contactos"
                className="rounded-full bg-white px-8 py-4 text-center text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
              >
                Pedir Proposta →
              </Link>
              <Link
                href="/casos-de-estudo"
                className="rounded-full border border-white px-8 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                Ver Projetos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-[#e5e7eb] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-[#e72f3f]">{benefit.stat}</p>
                <p className="mt-2 text-sm text-[#6b7280]">{benefit.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[#32373c] sm:text-4xl">
              O que fazemos
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-8 sm:grid-cols-2">
            {service.whatWeDo.map((item, i) => (
              <div key={i} className="rounded-2xl bg-[#f8f9fa] p-8">
                <h3 className="text-xl font-bold text-[#32373c]">{item.title}</h3>
                <p className="mt-4 leading-relaxed text-[#6b7280]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-[#f8f9fa] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-[#32373c] sm:text-4xl">
              Como trabalhamos
            </h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <div key={i} className="relative">
                <div className="text-6xl font-bold text-[#e72f3f]/20">{step.step}</div>
                <h3 className="mt-2 text-lg font-bold text-[#32373c]">{step.title}</h3>
                <p className="mt-2 text-sm text-[#6b7280]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {relatedCases.length > 0 && (
        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-[#32373c]">
                Projetos com este serviço
              </h2>
              <Link href="/casos-de-estudo" className="text-sm font-medium text-[#e72f3f] hover:underline">
                Ver todos →
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {relatedCases.map((project) => (
                <Link
                  key={project.slug}
                  href={`/casos-de-estudo/${project.slug}`}
                  className="group rounded-2xl bg-[#32373c] p-8 transition-all hover:scale-[1.02]"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e72f3f]">
                    {project.industry}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#e72f3f]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-gray-400">{project.client}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-[#f8f9fa] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-[#32373c] sm:text-4xl">
              Perguntas Frequentes
            </h2>
            <div className="mt-10 space-y-8">
              {service.faq.map((item, i) => (
                <div key={i} className="border-b border-[#e5e7eb] pb-8 last:border-0">
                  <h3 className="text-lg font-bold text-[#32373c]">{item.question}</h3>
                  <p className="mt-3 text-[#6b7280]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations - Programmatic SEO Internal Linking */}
      <section className="bg-white py-16 lg:py-24 border-t border-[#e5e7eb]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#32373c]">
            {service.title} em Portugal
          </h2>
          <p className="mt-4 text-[#6b7280]">
            Oferecemos serviços de {service.title.toLowerCase()} em todo o país. Selecione a sua localização:
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'Lisboa', slug: 'lisboa' },
              { name: 'Porto', slug: 'porto' },
              { name: 'Braga', slug: 'braga' },
              { name: 'Coimbra', slug: 'coimbra' },
              { name: 'Leiria', slug: 'leiria' },
              { name: 'Aveiro', slug: 'aveiro' },
              { name: 'Faro', slug: 'faro' },
              { name: 'Setúbal', slug: 'setubal' },
            ].map((location) => (
              <Link
                key={location.slug}
                href={`/${slug}/${location.slug}`}
                className="group flex items-center justify-between rounded-xl border border-[#e5e7eb] bg-white px-6 py-4 transition-all hover:border-[#e72f3f] hover:shadow-md"
              >
                <span className="font-medium text-[#32373c] group-hover:text-[#e72f3f]">
                  {service.title} em {location.name}
                </span>
                <svg className="h-4 w-4 text-[#6b7280] transition-transform group-hover:translate-x-1 group-hover:text-[#e72f3f]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              'Torres Vedras', 'Cascais', 'Sintra', 'Almada', 'Amadora', 'Oeiras',
              'Vila Nova de Gaia', 'Matosinhos', 'Guimarães', 'Viseu', 'Évora', 'Santarém'
            ].map((city) => (
              <Link
                key={city}
                href={`/${slug}/${city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, '-')}`}
                className="rounded-full border border-[#e5e7eb] px-4 py-2 text-sm text-[#6b7280] transition-colors hover:border-[#e72f3f] hover:text-[#e72f3f]"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#32373c] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Vamos trabalhar juntos?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Conte-nos o seu desafio. Respondemos em 24 horas com uma proposta de abordagem.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contactos"
              className="rounded-full bg-white px-8 py-4 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
            >
              Agendar Consultoria Estratégica →
            </Link>
            <Link
              href="/servicos"
              className="rounded-full border border-white px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Ver Outros Serviços
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
