import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCasesByIndustry } from '@/lib/content'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const industries: Record<string, {
  title: string
  tagline: string
  description: string
  heroText: string
  stats: { value: string; label: string }[]
  challenges: { title: string; description: string }[]
  solutions: { title: string; description: string }[]
  services: string[]
  whyUs: string
  clients: string[]
  faq: { question: string; answer: string }[]
}> = {
  'escolas': {
    title: 'Instituições de Ensino',
    tagline: 'Tecnologia que Educa',
    description: 'Soluções digitais para escolas, universidades e centros de formação que transformam a comunicação e simplificam a gestão.',
    heroText: 'De escolas primárias a universidades, compreendemos as necessidades únicas do setor educativo. Não vendemos software — construímos pontes digitais entre instituições, alunos, encarregados de educação e comunidade. Websites que informam, plataformas que simplificam, soluções que libertam tempo para o que realmente importa: ensinar.',
    stats: [
      { value: '15+', label: 'Instituições de ensino transformadas' },
      { value: '50K+', label: 'Alunos servidos pelas nossas plataformas' },
      { value: '70%', label: 'Redução em tempo de gestão administrativa' },
      { value: '100%', label: 'Taxa de satisfação em projetos educativos' },
    ],
    challenges: [
      {
        title: 'Comunicação Fragmentada',
        description: 'Emails perdidos, circulares não lidas, informação que não chega aos encarregados. A comunicação dispersa gera confusão e frustração.',
      },
      {
        title: 'Processos Manuais Ineficientes',
        description: 'Inscrições em papel, listas em Excel, confirmações por telefone. Processos que consomem horas que deveriam ser dedicadas ao ensino.',
      },
      {
        title: 'Websites Desatualizados',
        description: 'Sites estáticos que não refletem a dinâmica da instituição. Difíceis de atualizar, impossíveis de gerir sem ajuda técnica.',
      },
      {
        title: 'Falta de Autonomia Digital',
        description: 'Dependência de fornecedores externos para qualquer alteração. Custos recorrentes que drenam orçamentos já apertados.',
      },
    ],
    solutions: [
      {
        title: 'Portais Institucionais Inteligentes',
        description: 'Websites que a sua equipa consegue atualizar em minutos, não em dias. Calendários, notícias, eventos — tudo integrado e acessível.',
      },
      {
        title: 'Plataformas de Inscrições Online',
        description: 'Do pré-escolar ao ensino superior. Formulários personalizados, pagamentos integrados, confirmações automáticas.',
      },
      {
        title: 'Sistemas de Gestão de Eventos',
        description: 'Festas de final de ano, reuniões de pais, jornadas pedagógicas. Inscrições, check-in e comunicação — tudo automatizado.',
      },
      {
        title: 'Portais para Encarregados',
        description: 'Acesso seguro a informação relevante. Pagamentos, autorizações, comunicação direta com professores.',
      },
    ],
    services: ['Desenvolvimento Web', 'Web Design', 'Consultoria Digital', 'Automação', 'Formação de Equipas'],
    whyUs: 'Conhecemos o setor educativo por dentro. Trabalhamos com agrupamentos de escolas, faculdades e centros de formação há mais de uma década. Sabemos que cada euro do orçamento conta, que as equipas têm pouco tempo disponível, e que a tecnologia tem de servir — nunca complicar. Por isso entregamos soluções que funcionam desde o primeiro dia e que a sua equipa consegue gerir sem depender de nós.',
    clients: ['Universidade de Lisboa', 'Faculdade de Letras', 'Agrupamento de Escolas Henriques Nogueira'],
    faq: [
      {
        question: 'Conseguem integrar com os sistemas que já usamos?',
        answer: 'Sim. Trabalhamos com os principais sistemas de gestão escolar portugueses (GIAE, Inovar, Place) e plataformas como Moodle. Garantimos que os dados fluem sem duplicação de trabalho.',
      },
      {
        question: 'Quanto tempo demora a implementar uma plataforma de inscrições?',
        answer: 'Um sistema básico de inscrições pode estar operacional em 2-3 semanas. Plataformas mais complexas com múltiplos ciclos e pagamentos integrados requerem 4-6 semanas.',
      },
      {
        question: 'A nossa equipa não é técnica. Conseguiremos gerir o site?',
        answer: 'Absolutamente. Desenvolvemos interfaces simples e intuitivas, e incluímos formação prática em todos os projetos. Se sabe usar email, consegue gerir o seu novo website.',
      },
    ],
  },
  'saude': {
    title: 'Organizações de Saúde',
    tagline: 'Digital ao Serviço da Saúde',
    description: 'Plataformas digitais para clínicas, hospitais e centros de saúde que respeitam a privacidade e melhoram a experiência do paciente.',
    heroText: 'Na saúde, não há margem para erro. Cada plataforma que desenvolvemos respeita os mais elevados padrões de segurança e privacidade, ao mesmo tempo que simplifica a vida de pacientes e profissionais. Desde websites clínicos que transmitem confiança até sistemas de marcação que eliminam filas de espera, criamos soluções que fazem a diferença na vida das pessoas.',
    stats: [
      { value: '25+', label: 'Clínicas e centros de saúde' },
      { value: '100%', label: 'Conformidade RGPD garantida' },
      { value: '80%', label: 'Redução em chamadas de marcação' },
      { value: '4.9/5', label: 'Satisfação média dos pacientes' },
    ],
    challenges: [
      {
        title: 'Conformidade RGPD',
        description: 'Dados de saúde são dados sensíveis. Qualquer falha de segurança pode significar multas pesadas e perda de confiança dos pacientes.',
      },
      {
        title: 'Experiência do Paciente',
        description: 'Websites confusos, marcações por telefone em horário limitado. Pacientes frustrados antes mesmo da primeira consulta.',
      },
      {
        title: 'Gestão de Marcações',
        description: 'Agendas em papel, faltas não comunicadas, overbooking. Tempo perdido que se traduz em consultas perdidas.',
      },
      {
        title: 'Imagem Digital Desatualizada',
        description: 'Websites que não refletem a qualidade dos serviços prestados. Primeira impressão online que afasta potenciais pacientes.',
      },
    ],
    solutions: [
      {
        title: 'Websites Clínicos Profissionais',
        description: 'Design que transmite credibilidade e competência. Informação clara sobre especialidades, equipa médica e serviços.',
      },
      {
        title: 'Marcações Online 24/7',
        description: 'Pacientes marcam consultas a qualquer hora, de qualquer dispositivo. Confirmações automáticas reduzem faltas em 40%.',
      },
      {
        title: 'Portais de Pacientes Seguros',
        description: 'Acesso a resultados, histórico e documentação. Comunicação encriptada com a equipa médica.',
      },
      {
        title: 'Integração com Software Clínico',
        description: 'Ligação aos principais sistemas de gestão clínica portugueses. Dados sincronizados, sem duplicação de trabalho.',
      },
    ],
    services: ['Desenvolvimento Web', 'Web Design', 'Consultoria Digital', 'CRM', 'Automação'],
    whyUs: 'Compreendemos que na saúde a confiança é tudo. Por isso, cada projeto começa por um diagnóstico rigoroso das necessidades e termina com formação completa da equipa. Não deixamos a clínica dependente de nós — entregamos autonomia total para gerir a presença digital, com suporte disponível quando necessário. E sim, garantimos conformidade RGPD desde o primeiro dia.',
    clients: ['Instituto de Retina de Lisboa', 'Derma360', 'Clínicas privadas'],
    faq: [
      {
        question: 'Como garantem a conformidade RGPD?',
        answer: 'Seguimos as diretrizes da CNPD e melhores práticas europeias. Consentimento explícito, encriptação de dados, políticas de retenção claras. Fornecemos também a documentação necessária para auditorias.',
      },
      {
        question: 'Integram com o software de gestão que já usamos?',
        answer: 'Trabalhamos com os principais sistemas de gestão clínica em Portugal: MedicineOne, CGM, Glintt, e outros. Garantimos sincronização de agendas e dados de pacientes.',
      },
      {
        question: 'Os pacientes conseguem marcar consultas pelo telemóvel?',
        answer: 'Absolutamente. Todas as nossas soluções são mobile-first. O paciente marca, remarcar ou cancela consultas do telemóvel em menos de 2 minutos.',
      },
    ],
  },
  'setor-publico': {
    title: 'Setor Público',
    tagline: 'Serviço Público, Excelência Digital',
    description: 'Soluções acessíveis para câmaras municipais, juntas de freguesia e organismos públicos que servem todos os cidadãos.',
    heroText: 'O setor público tem uma responsabilidade especial: servir todos os cidadãos, sem exceção. Por isso, cada plataforma que desenvolvemos cumpre as normas WCAG de acessibilidade e as diretrizes europeias de transparência. Criamos portais que o cidadão comum consegue usar, que funcionam em qualquer dispositivo, e que a sua equipa consegue atualizar sem conhecimentos técnicos.',
    stats: [
      { value: '10+', label: 'Municípios e organismos' },
      { value: 'AA', label: 'Conformidade WCAG garantida' },
      { value: '60%', label: 'Aumento em serviços online' },
      { value: '95%', label: 'Taxa de acessibilidade' },
    ],
    challenges: [
      {
        title: 'Conformidade WCAG Obrigatória',
        description: 'Desde 2019, todos os websites públicos devem cumprir normas de acessibilidade. Muitos ainda falham nas auditorias.',
      },
      {
        title: 'Transparência e Acesso à Informação',
        description: 'Legislação exige publicação de atos, contratos, orçamentos. Informação dispersa que cidadãos não conseguem encontrar.',
      },
      {
        title: 'Serviços Online Inexistentes',
        description: 'Cidadãos obrigados a deslocações presenciais para tarefas simples. Filas de espera que podiam ser evitadas.',
      },
      {
        title: 'Equipas Sem Formação Digital',
        description: 'Funcionários dependentes de fornecedores externos para atualizar uma notícia. Custos e demoras desnecessários.',
      },
    ],
    solutions: [
      {
        title: 'Portais Municipais Acessíveis',
        description: 'Conformidade WCAG AA garantida. Design inclusivo que serve todos os cidadãos, incluindo pessoas com deficiência.',
      },
      {
        title: 'Plataformas de Transparência',
        description: 'Publicação automatizada de atos, contratos e orçamentos. Pesquisa fácil para cidadãos e jornalistas.',
      },
      {
        title: 'Serviços Online Integrados',
        description: 'Requerimentos, pagamentos, marcações — tudo online. Integração com sistemas de back-office existentes.',
      },
      {
        title: 'Gestão de Conteúdos Simplificada',
        description: 'Interfaces intuitivas que qualquer funcionário consegue usar. Formação incluída em todos os projetos.',
      },
    ],
    services: ['Desenvolvimento Web', 'Web Design', 'Consultoria Digital', 'Acessibilidade', 'Formação'],
    whyUs: 'Trabalhamos com o setor público há mais de uma década. Conhecemos os procedimentos de contratação, os constrangimentos orçamentais e as exigências legais. Entregamos projetos dentro do prazo e do orçamento, com documentação completa e formação que capacita as equipas. E quando a auditoria de acessibilidade chegar, o seu portal estará preparado.',
    clients: ['Município de Torres Vedras', 'Município de Leiria', 'Juntas de Freguesia'],
    faq: [
      {
        question: 'Garantem conformidade WCAG AA?',
        answer: 'Sim, todos os nossos projetos para o setor público cumprem WCAG 2.1 nível AA. Realizamos testes de acessibilidade durante o desenvolvimento e fornecemos relatório de conformidade no final.',
      },
      {
        question: 'Trabalham com contratação pública?',
        answer: 'Sim, estamos habilitados e familiarizados com os procedimentos de contratação pública portuguesa. Ajuste direto, consulta prévia ou concurso público — conhecemos os requisitos de cada modalidade.',
      },
      {
        question: 'Conseguem integrar com os sistemas de back-office?',
        answer: 'Trabalhamos com os principais fornecedores de software para autarquias: Medidata, Airc, SIGMA. Garantimos que os dados fluem entre o portal e os sistemas internos.',
      },
    ],
  },
  'b2b': {
    title: 'Negócios B2B',
    tagline: 'Digital que Fecha Negócios',
    description: 'Plataformas e websites para empresas B2B que transformam processos comerciais e aceleram vendas.',
    heroText: 'No B2B, cada cliente vale milhares de euros. O seu website não é uma brochura — é a sua melhor ferramenta de vendas. Desenvolvemos plataformas que qualificam leads automaticamente, catálogos digitais que substituem representantes comerciais, e sistemas de e-commerce B2B que processam encomendas 24 horas por dia. Tecnologia que trabalha enquanto a sua equipa descansa.',
    stats: [
      { value: '30+', label: 'Empresas B2B transformadas' },
      { value: '150%', label: 'Aumento médio em leads qualificados' },
      { value: '40%', label: 'Redução em tempo de processamento' },
      { value: '24/7', label: 'Encomendas a qualquer hora' },
    ],
    challenges: [
      {
        title: 'Processos de Venda Complexos',
        description: 'Múltiplos contactos, aprovações internas, negociações demoradas. Vendas que podiam ser simplificadas.',
      },
      {
        title: 'Catálogos Imensos',
        description: 'Milhares de referências impossíveis de apresentar em PDF. Atualizações de preços que demoram semanas.',
      },
      {
        title: 'Dependência de Representantes',
        description: 'Clientes que só conseguem encomendar quando o comercial está disponível. Vendas perdidas fora de horas.',
      },
      {
        title: 'Falta de Integração',
        description: 'Website desligado do ERP, encomendas processadas manualmente. Erros e duplicações que custam tempo e dinheiro.',
      },
    ],
    solutions: [
      {
        title: 'E-commerce B2B Profissional',
        description: 'Preços por cliente, quantidades mínimas, aprovações multi-nível. Tudo o que o B2B exige, nada que não precise.',
      },
      {
        title: 'Catálogos Digitais Interativos',
        description: 'Pesquisa avançada, fichas técnicas, comparação de produtos. Atualizações em tempo real a partir do ERP.',
      },
      {
        title: 'Portais de Clientes',
        description: 'Histórico de encomendas, faturas, tracking. Self-service que liberta a sua equipa comercial.',
      },
      {
        title: 'Integração com ERP/CRM',
        description: 'Ligação bidirecional com SAP, PHC, Primavera, Salesforce. Dados sincronizados, zero trabalho manual.',
      },
    ],
    services: ['Desenvolvimento Web', 'E-commerce', 'CRM', 'Automação', 'Integração de Sistemas'],
    whyUs: 'Compreendemos que no B2B cada detalhe conta. Preços diferenciados por cliente, condições de pagamento específicas, aprovações hierárquicas — já resolvemos estes desafios dezenas de vezes. Entregamos plataformas que se integram com os seus sistemas existentes e que a sua equipa consegue gerir. E medimos o sucesso em encomendas processadas, não em páginas entregues.',
    clients: ['Lacrilar', 'Empresas industriais', 'Distribuidores'],
    faq: [
      {
        question: 'Conseguem integrar com o nosso ERP?',
        answer: 'Sim. Temos experiência com os principais ERPs em Portugal: SAP, PHC, Primavera, Sage. Desenvolvemos integrações bidirecionais que sincronizam produtos, preços, stocks e encomendas.',
      },
      {
        question: 'E se tivermos preços diferentes para cada cliente?',
        answer: 'É o cenário mais comum no B2B. A nossa plataforma suporta tabelas de preços por cliente, descontos por volume, condições de pagamento específicas e aprovações multi-nível.',
      },
      {
        question: 'Os clientes conseguem ver o stock em tempo real?',
        answer: 'Sim, desde que o ERP disponibilize essa informação. O cliente vê disponibilidade atualizada e pode decidir se aguarda ou procura alternativas.',
      },
    ],
  },
  'ipss': {
    title: 'IPSS & Misericórdias',
    tagline: 'Solidariedade com Soluções',
    description: 'Soluções para instituições de solidariedade social que servem a comunidade com dignidade e eficiência.',
    heroText: 'As IPSS e Misericórdias fazem um trabalho essencial, muitas vezes com recursos limitados. Por isso, desenvolvemos soluções que maximizam cada euro investido. Websites acessíveis que chegam a todos os públicos, plataformas de comunicação com famílias de utentes, sistemas que automatizam tarefas repetitivas. Tecnologia ao serviço da missão social.',
    stats: [
      { value: '20+', label: 'IPSS e Misericórdias' },
      { value: '100%', label: 'Projetos com formação incluída' },
      { value: '50%', label: 'Redução em tarefas administrativas' },
      { value: 'AA', label: 'Acessibilidade WCAG' },
    ],
    challenges: [
      {
        title: 'Múltiplos Públicos',
        description: 'Utentes, famílias, voluntários, doadores, entidades públicas. Comunicação que tem de chegar a todos.',
      },
      {
        title: 'Recursos Técnicos Escassos',
        description: 'Equipas pequenas sem formação digital. Dependência de voluntários ou fornecedores externos.',
      },
      {
        title: 'Acessibilidade Essencial',
        description: 'Utentes idosos, pessoas com deficiência. Plataformas que têm de ser usáveis por todos.',
      },
      {
        title: 'Serviços Diversificados',
        description: 'Lar de idosos, creche, centro de dia, apoio domiciliário. Cada valência com necessidades específicas.',
      },
    ],
    solutions: [
      {
        title: 'Websites Institucionais Acessíveis',
        description: 'Design inclusivo, texto legível, navegação simples. Informação organizada por público-alvo.',
      },
      {
        title: 'Portais para Famílias',
        description: 'Acesso seguro a informação sobre utentes. Comunicação direta com equipas técnicas.',
      },
      {
        title: 'Gestão de Voluntariado',
        description: 'Inscrição de voluntários, gestão de horários, comunicação centralizada.',
      },
      {
        title: 'Automação Administrativa',
        description: 'Faturas, recibos, comunicações periódicas. Tarefas repetitivas que passam a ser automáticas.',
      },
    ],
    services: ['Desenvolvimento Web', 'Web Design', 'Consultoria Digital', 'Formação', 'Automação'],
    whyUs: 'Trabalhamos com IPSS e Misericórdias há mais de uma década. Compreendemos os desafios orçamentais, as exigências de conformidade e a necessidade de soluções simples que equipas não-técnicas consigam gerir. Cada projeto inclui formação prática e documentação clara. E oferecemos condições especiais para o setor social, porque acreditamos que a tecnologia deve estar ao alcance de quem mais precisa.',
    clients: ['Santa Casa Torres Vedras', 'Misericórdias', 'IPSS regionais'],
    faq: [
      {
        question: 'Têm condições especiais para IPSS?',
        answer: 'Sim. Compreendemos os constrangimentos orçamentais do setor social e oferecemos condições adaptadas. Contacte-nos para discutirmos uma solução adequada ao seu orçamento.',
      },
      {
        question: 'A nossa equipa não tem formação técnica. É problema?',
        answer: 'De todo. Desenvolvemos interfaces simples e intuitivas, e incluímos formação presencial em todos os projetos. Deixamos também manuais práticos para consulta futura.',
      },
      {
        question: 'Conseguem ajudar com candidaturas a financiamento?',
        answer: 'Sim, temos experiência com candidaturas ao Portugal 2030 e outros programas de financiamento. Podemos ajudar a estruturar a componente digital da candidatura.',
      },
    ],
  },
}

const industriesSlugs = Object.keys(industries)

export async function generateStaticParams() {
  return industriesSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const industry = industries[slug]

  if (!industry) {
    return { title: 'Indústria não encontrada' }
  }

  return {
    title: `${industry.title} | Modular Digital`,
    description: industry.description,
    openGraph: {
      title: `${industry.title} | Modular Digital`,
      description: industry.description,
      type: 'website',
    },
  }
}

export default async function IndustryPage({ params }: PageProps) {
  const { slug } = await params
  const industry = industries[slug]

  if (!industry) {
    notFound()
  }

  const relatedCases = getCasesByIndustry(slug).slice(0, 3)

  return (
    <>
      {/* Hero - Dark with Stats */}
      <section className="relative bg-[#32373c] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Início</Link>
            <span>/</span>
            <Link href="/industrias" className="hover:text-white">Indústrias</Link>
            <span>/</span>
            <span className="text-white">{industry.title}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-block rounded-full bg-[#e72f3f] px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {industry.tagline}
              </span>

              <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {industry.title}
              </h1>

              <p className="mt-6 text-xl leading-relaxed text-gray-300">
                {industry.heroText}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contactos"
                  className="rounded-full bg-white px-8 py-4 text-center text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
                >
                  Agendar Consultoria Gratuita →
                </Link>
                <a
                  href="tel:+351914663553"
                  className="rounded-full border border-white px-8 py-4 text-center text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  +351 914 663 553
                </a>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {industry.stats.map((stat, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/10 p-6 backdrop-blur"
                >
                  <p className="text-4xl font-bold text-[#e72f3f]">{stat.value}</p>
                  <p className="mt-2 text-sm text-gray-300">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#32373c] sm:text-4xl">
              Desafios que Conhecemos Bem
            </h2>
            <p className="mt-4 text-lg text-[#6b7280]">
              Trabalhamos com {industry.title.toLowerCase()} há mais de uma década. Sabemos o que tira o sono às equipas.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {industry.challenges.map((challenge, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-xl border border-[#e5e7eb] bg-white p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e72f3f]/10 text-[#e72f3f]">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#32373c]">{challenge.title}</h3>
                  <p className="mt-2 text-[#6b7280]">{challenge.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="bg-[#f8f9fa] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#32373c] sm:text-4xl">
              Soluções que Funcionam
            </h2>
            <p className="mt-4 text-lg text-[#6b7280]">
              Não vendemos tecnologia — resolvemos problemas. Cada solução é desenhada para o contexto específico do setor.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {industry.solutions.map((solution, i) => (
              <div
                key={i}
                className="rounded-xl bg-white p-8 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#32373c] text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#32373c]">{solution.title}</h3>
                <p className="mt-3 text-[#6b7280]">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#32373c] sm:text-4xl">
                Porquê a Modular Digital?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-[#6b7280]">
                {industry.whyUs}
              </p>

              <div className="mt-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                  Serviços para {industry.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {industry.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full bg-[#f8f9fa] px-4 py-2 text-sm font-medium text-[#32373c]"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Clients */}
            <div className="rounded-2xl bg-[#f8f9fa] p-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#6b7280]">
                Clientes neste setor
              </h3>
              <div className="mt-6 space-y-4">
                {industry.clients.map((client) => (
                  <div
                    key={client}
                    className="flex items-center gap-3 rounded-lg bg-white p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#32373c] text-sm font-bold text-white">
                      {client.charAt(0)}
                    </div>
                    <span className="font-medium text-[#32373c]">{client}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {relatedCases.length > 0 && (
        <section className="bg-[#32373c] py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">
                Projetos em {industry.title}
              </h2>
              <Link
                href="/casos-de-estudo"
                className="text-sm font-medium text-[#e72f3f] hover:underline"
              >
                Ver todos →
              </Link>
            </div>

            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {relatedCases.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  href={`/casos-de-estudo/${caseStudy.slug}`}
                  className="group rounded-2xl bg-white/10 p-8 backdrop-blur transition-all hover:bg-white/20"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#e72f3f]">
                    {caseStudy.industry}
                  </span>
                  <h3 className="mt-4 text-xl font-bold text-white group-hover:text-[#e72f3f]">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-2 text-gray-300">
                    {caseStudy.client}
                  </p>
                  <div className="mt-6 flex items-center text-sm font-medium text-white">
                    Ver projeto
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-bold text-[#32373c] sm:text-4xl">
              Perguntas Frequentes
            </h2>

            <div className="mt-12 space-y-8">
              {industry.faq.map((item, i) => (
                <div key={i} className="border-b border-[#e5e7eb] pb-8 last:border-0">
                  <h3 className="text-lg font-bold text-[#32373c]">{item.question}</h3>
                  <p className="mt-4 text-[#6b7280]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Industries */}
      <section className="bg-[#f8f9fa] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#32373c]">
            Outras Indústrias
          </h2>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {industriesSlugs
              .filter((s) => s !== slug)
              .map((industrySlug) => (
                <Link
                  key={industrySlug}
                  href={`/industrias/${industrySlug}`}
                  className="rounded-full border border-[#e5e7eb] bg-white px-6 py-3 text-sm font-medium text-[#32373c] transition-colors hover:border-[#e72f3f] hover:text-[#e72f3f]"
                >
                  {industries[industrySlug].title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#32373c] py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Pronto para transformar a sua instituição?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            Agende uma consultoria estratégica gratuita. Sem compromisso, sem pressão — apenas uma conversa honesta sobre os seus desafios e como podemos ajudar.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contactos"
              className="rounded-full bg-white px-8 py-4 text-sm font-medium text-[#32373c] transition-colors hover:bg-gray-100"
            >
              Agendar Consultoria Estratégica →
            </Link>
            <a
              href="tel:+351914663553"
              className="rounded-full border border-white px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Ligar Agora: +351 914 663 553
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
