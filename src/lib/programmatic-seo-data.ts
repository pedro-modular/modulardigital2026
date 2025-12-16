// Comprehensive data for programmatic SEO pages
// Each service has unique FAQs, process steps, pricing indicators, and content variations

export interface ServiceSEOData {
  heroVariations: {
    title: (location: string) => string
    subtitle: (location: string, region: string, businessContext?: string) => string
  }[]
  benefits: { stat: string; label: string; description: string }[]
  deliverables: { title: string; description: string; icon: string }[]
  process: { step: number; title: string; description: string; duration: string }[]
  faqs: { question: string; answer: string }[]
  pricing: {
    starter: { label: string; from: string; features: string[] }
    professional: { label: string; from: string; features: string[] }
    enterprise: { label: string; from: string; features: string[] }
  }
  localBenefits: (location: string, region: string, characteristics?: string[], industries?: string[]) => string[]
  trustSignals: string[]
  relatedSearches: string[]
}

export const serviceSEOData: Record<string, ServiceSEOData> = {
  'web-design': {
    heroVariations: [
      {
        title: (location) => `Web Design Profissional em ${location}`,
        subtitle: (location, region, businessContext) =>
          `Criamos websites que convertem para empresas e instituições em ${location}. ${businessContext ? `Na região de ${region}, ${businessContext}, por isso entendemos as necessidades específicas do seu negócio.` : `Design moderno e funcional para a região ${region}.`}`,
      },
      {
        title: (location) => `Agência de Web Design em ${location}`,
        subtitle: (location, region) =>
          `Especialistas em design de websites para ${region}. Interfaces modernas, responsivas e otimizadas para SEO que destacam a sua presença digital em ${location}.`,
      },
    ],
    benefits: [
      { stat: 'WCAG AA', label: 'Acessibilidade', description: 'Todos os sites são desenvolvidos seguindo as diretrizes WCAG 2.1 nível AA, garantindo acessibilidade universal.' },
      { stat: '+40%', label: 'Conversões', description: 'Os nossos clientes registam em média um aumento de 40% nas conversões após o redesign.' },
      { stat: '100%', label: 'Responsivo', description: 'Design mobile-first que funciona perfeitamente em todos os dispositivos e tamanhos de ecrã.' },
      { stat: '<3s', label: 'Carregamento', description: 'Otimização de performance para garantir tempos de carregamento inferiores a 3 segundos.' },
    ],
    deliverables: [
      { title: 'Análise UX', description: 'Estudo do seu público-alvo, concorrência e melhores práticas do setor para fundamentar todas as decisões de design.', icon: 'search' },
      { title: 'Design System', description: 'Criação de uma biblioteca de componentes reutilizáveis que garantem consistência visual em todo o website.', icon: 'palette' },
      { title: 'Protótipos', description: 'Protótipos interativos no Figma para validação antes do desenvolvimento, evitando retrabalho.', icon: 'layout' },
      { title: 'Responsividade', description: 'Adaptação perfeita a todos os dispositivos: desktop, tablet e mobile.', icon: 'smartphone' },
      { title: 'Acessibilidade', description: 'Conformidade WCAG AA para que todas as pessoas possam usar o seu website.', icon: 'accessibility' },
      { title: 'Otimização SEO', description: 'Estrutura otimizada para motores de busca desde a fase de design.', icon: 'trending-up' },
    ],
    process: [
      { step: 1, title: 'Descoberta', description: 'Reunião inicial para entender os objetivos, público-alvo e requisitos do projeto.', duration: '1 semana' },
      { step: 2, title: 'Pesquisa', description: 'Análise de concorrência, benchmarking e definição da estratégia de design.', duration: '1-2 semanas' },
      { step: 3, title: 'Wireframes', description: 'Esboços estruturais de todas as páginas para validação da arquitetura de informação.', duration: '1 semana' },
      { step: 4, title: 'Design Visual', description: 'Criação do design final com identidade visual aplicada e componentes interativos.', duration: '2-3 semanas' },
      { step: 5, title: 'Revisão', description: 'Ciclo de feedback e ajustes até aprovação final do cliente.', duration: '1 semana' },
      { step: 6, title: 'Entrega', description: 'Exportação de assets e especificações para desenvolvimento.', duration: '3 dias' },
    ],
    faqs: [
      {
        question: 'Quanto custa criar um website profissional?',
        answer: 'O investimento varia conforme a complexidade do projeto. Websites institucionais começam nos 2.500€, enquanto plataformas mais complexas podem ultrapassar os 15.000€. Oferecemos sempre um orçamento detalhado após análise dos requisitos.',
      },
      {
        question: 'Quanto tempo demora a criar um website?',
        answer: 'Um website institucional típico demora 6-8 semanas desde o briefing até ao lançamento. Projetos mais complexos podem levar 3-4 meses. Trabalhamos com sprints semanais para manter o progresso visível.',
      },
      {
        question: 'O website será responsivo e funcionar em telemóveis?',
        answer: 'Sim, todos os nossos websites são desenvolvidos com abordagem mobile-first, garantindo uma experiência perfeita em qualquer dispositivo. Testamos em múltiplos browsers e tamanhos de ecrã.',
      },
      {
        question: 'Posso gerir o conteúdo do website depois de entregue?',
        answer: 'Absolutamente. Implementamos sistemas de gestão de conteúdo (CMS) como WordPress ou Statamic que permitem à sua equipa atualizar textos, imagens e páginas de forma autónoma, sem conhecimentos técnicos.',
      },
      {
        question: 'O que está incluído na manutenção do website?',
        answer: 'Os nossos planos de manutenção incluem atualizações de segurança, backups automáticos, monitorização de uptime, pequenas alterações de conteúdo e suporte técnico por email. Planos a partir de 99€/mês.',
      },
      {
        question: 'Trabalham com empresas de qualquer dimensão?',
        answer: 'Sim, trabalhamos com PMEs, instituições públicas, organizações sem fins lucrativos e grandes empresas. Adaptamos a nossa abordagem às necessidades e orçamento de cada cliente.',
      },
    ],
    pricing: {
      starter: {
        label: 'Site Essencial',
        from: '2.500€',
        features: ['Até 5 páginas', 'Design responsivo', 'CMS WordPress', 'SEO básico', 'Formulário de contacto'],
      },
      professional: {
        label: 'Site Profissional',
        from: '5.000€',
        features: ['Até 15 páginas', 'Design personalizado', 'CMS avançado', 'SEO otimizado', 'Integrações', 'Blog'],
      },
      enterprise: {
        label: 'Plataforma Custom',
        from: '15.000€',
        features: ['Páginas ilimitadas', 'Design exclusivo', 'Funcionalidades custom', 'Multi-idioma', 'Área de cliente', 'API'],
      },
    },
    localBenefits: (location, region, characteristics, industries) => {
      const benefits = [
        `Conhecemos o mercado de ${location} e as especificidades das empresas da região ${region}.`,
        `Design adaptado às expectativas e comportamentos do público-alvo local.`,
      ]
      if (characteristics?.includes('turismo')) {
        benefits.push(`Experiência em websites para o setor turístico, fundamental em ${location}.`)
      }
      if (characteristics?.includes('indústria') || characteristics?.includes('indústria')) {
        benefits.push(`Entendemos as necessidades de comunicação B2B típicas do tecido empresarial de ${region}.`)
      }
      if (industries?.includes('educação')) {
        benefits.push(`Especialistas em websites para instituições de ensino na região.`)
      }
      if (industries?.includes('saúde')) {
        benefits.push(`Experiência em websites para organizações de saúde com requisitos de acessibilidade.`)
      }
      return benefits
    },
    trustSignals: [
      'Mais de 50 projetos entregues',
      'Clientes satisfeitos em todo o país',
      '10+ anos de experiência',
      'Equipa multidisciplinar',
    ],
    relatedSearches: [
      'criação de websites',
      'redesign de site',
      'web designer',
      'agência de design',
      'site institucional',
      'design de landing pages',
    ],
  },

  'seo': {
    heroVariations: [
      {
        title: (location) => `SEO em ${location} — Posicione-se no Google`,
        subtitle: (location, region, businessContext) =>
          `Otimização para motores de busca que coloca o seu negócio nos primeiros resultados em ${location}. ${businessContext ? `Conhecemos o ${businessContext} e sabemos como destacar a sua empresa na região.` : ''}`,
      },
      {
        title: (location) => `Agência de SEO em ${location}`,
        subtitle: (location, region) =>
          `Tráfego orgânico qualificado para empresas em ${region}. Mais visibilidade, mais clientes, sem pagar por clique.`,
      },
    ],
    benefits: [
      { stat: '+200%', label: 'Tráfego Orgânico', description: 'Os nossos clientes registam em média um aumento de 200% no tráfego orgânico nos primeiros 12 meses.' },
      { stat: 'Top 10', label: 'Rankings', description: 'Posicionamos as suas páginas nas primeiras posições para as palavras-chave mais relevantes.' },
      { stat: '0€/clique', label: 'Custo', description: 'Ao contrário do PPC, o tráfego orgânico não tem custo por clique. ROI sustentável a longo prazo.' },
      { stat: '+150%', label: 'Leads', description: 'Mais tráfego qualificado traduz-se em mais leads e oportunidades de negócio.' },
    ],
    deliverables: [
      { title: 'Auditoria SEO', description: 'Análise completa do seu website, identificando todos os problemas técnicos e oportunidades de melhoria.', icon: 'search' },
      { title: 'Pesquisa de Keywords', description: 'Identificação das palavras-chave mais relevantes e com melhor potencial de conversão para o seu negócio.', icon: 'key' },
      { title: 'SEO On-Page', description: 'Otimização de títulos, meta descriptions, headers, conteúdo e estrutura de URLs.', icon: 'file-text' },
      { title: 'SEO Técnico', description: 'Correção de problemas de crawling, indexação, velocidade e mobile-friendliness.', icon: 'settings' },
      { title: 'SEO Local', description: 'Otimização do Google Business Profile e citações locais para pesquisas geográficas.', icon: 'map-pin' },
      { title: 'Link Building', description: 'Construção de backlinks de qualidade através de conteúdo e parcerias estratégicas.', icon: 'link' },
    ],
    process: [
      { step: 1, title: 'Auditoria', description: 'Análise completa do website e presença digital atual.', duration: '1-2 semanas' },
      { step: 2, title: 'Estratégia', description: 'Definição de keywords, prioridades e plano de ação.', duration: '1 semana' },
      { step: 3, title: 'Otimização Técnica', description: 'Correção de problemas técnicos que afetam o ranking.', duration: '2-4 semanas' },
      { step: 4, title: 'Conteúdo', description: 'Otimização e criação de conteúdo para as keywords target.', duration: 'Contínuo' },
      { step: 5, title: 'Link Building', description: 'Construção de autoridade através de backlinks de qualidade.', duration: 'Contínuo' },
      { step: 6, title: 'Monitorização', description: 'Tracking de rankings, tráfego e conversões. Relatórios mensais.', duration: 'Contínuo' },
    ],
    faqs: [
      {
        question: 'Quanto tempo demora a ver resultados de SEO?',
        answer: 'O SEO é uma estratégia de médio-longo prazo. Tipicamente, os primeiros resultados começam a aparecer após 3-6 meses, com resultados mais significativos após 6-12 meses. A velocidade depende da concorrência e do estado atual do website.',
      },
      {
        question: 'O SEO funciona para empresas locais?',
        answer: 'Absolutamente. O SEO local é uma das estratégias mais eficazes para negócios que servem uma área geográfica específica. Otimizamos o Google Business Profile, citações locais e conteúdo geo-targetado.',
      },
      {
        question: 'Quanto custa um serviço de SEO?',
        answer: 'Os nossos serviços de SEO começam nos 500€/mês para PMEs e vão até 2.500€/mês para projetos empresariais complexos. O investimento depende da concorrência do setor e dos objetivos definidos.',
      },
      {
        question: 'Qual a diferença entre SEO e Google Ads?',
        answer: 'O SEO foca em tráfego orgânico (gratuito) através da otimização do website, enquanto o Google Ads é publicidade paga. O SEO demora mais a dar resultados mas tem ROI sustentável. Idealmente, as duas estratégias complementam-se.',
      },
      {
        question: 'Posso fazer SEO sozinho?',
        answer: 'É possível aprender SEO básico, mas para resultados profissionais é recomendável trabalhar com especialistas. O SEO envolve componentes técnicas, de conteúdo e de autoridade que requerem experiência e ferramentas específicas.',
      },
      {
        question: 'Como medem os resultados de SEO?',
        answer: 'Monitorizamos rankings de keywords, tráfego orgânico, impressões no Google Search Console, taxa de cliques (CTR), e conversões. Enviamos relatórios mensais detalhados com a evolução de todos os indicadores.',
      },
    ],
    pricing: {
      starter: {
        label: 'SEO Local',
        from: '500€/mês',
        features: ['Até 10 keywords', 'Google Business Profile', 'SEO on-page básico', 'Relatório mensal', 'Suporte email'],
      },
      professional: {
        label: 'SEO Profissional',
        from: '1.200€/mês',
        features: ['Até 30 keywords', 'SEO técnico completo', 'Estratégia de conteúdo', 'Link building', 'Relatórios semanais'],
      },
      enterprise: {
        label: 'SEO Enterprise',
        from: '2.500€/mês',
        features: ['Keywords ilimitadas', 'Multi-domínio', 'SEO internacional', 'Consultoria dedicada', 'Integração analytics'],
      },
    },
    localBenefits: (location, region, characteristics, industries) => {
      const benefits = [
        `SEO local otimizado para pesquisas em "${location}" e região ${region}.`,
        `Google Business Profile configurado para máxima visibilidade local.`,
        `Citações em diretórios relevantes para ${region}.`,
      ]
      if (characteristics?.includes('turismo')) {
        benefits.push(`Otimização para pesquisas turísticas em múltiplos idiomas.`)
      }
      return benefits
    },
    trustSignals: [
      '+500 keywords no top 10',
      'Parceiro Google certificado',
      'ROI médio de 400%',
      'Clientes há mais de 5 anos',
    ],
    relatedSearches: [
      'consultoria SEO',
      'SEO para empresas',
      'otimização Google',
      'agência SEO',
      'posicionamento orgânico',
      'SEO local',
    ],
  },

  'desenvolvimento-web': {
    heroVariations: [
      {
        title: (location) => `Desenvolvimento Web em ${location}`,
        subtitle: (location, region, businessContext) =>
          `Websites e aplicações web robustas para empresas em ${location}. Desenvolvemos com tecnologias abertas para que nunca fique dependente de um fornecedor.`,
      },
      {
        title: (location) => `Programação Web em ${location}`,
        subtitle: (location, region) =>
          `Soluções de desenvolvimento web personalizadas para a região ${region}. WordPress, Next.js, APIs e integrações à medida.`,
      },
    ],
    benefits: [
      { stat: '95+', label: 'PageSpeed', description: 'Websites otimizados para máxima performance, com scores acima de 95 no Google PageSpeed.' },
      { stat: '99.9%', label: 'Uptime', description: 'Infraestrutura robusta que garante o seu website sempre disponível.' },
      { stat: '0', label: 'Dependência', description: 'Código aberto e documentado. O website é seu, sem vendor lock-in.' },
      { stat: '24h', label: 'Suporte', description: 'Suporte técnico de emergência disponível para clientes com contrato.' },
    ],
    deliverables: [
      { title: 'Sites WordPress', description: 'Desenvolvimento WordPress profissional com temas custom e plugins otimizados.', icon: 'wordpress' },
      { title: 'Aplicações Next.js', description: 'Desenvolvimento de aplicações web modernas com React e Next.js.', icon: 'code' },
      { title: 'APIs & Integrações', description: 'Desenvolvimento de APIs REST e integrações com sistemas externos.', icon: 'plug' },
      { title: 'Migrações', description: 'Migração de websites antigos preservando SEO e conteúdo.', icon: 'refresh-cw' },
      { title: 'E-commerce', description: 'Lojas online com WooCommerce ou Shopify customizado.', icon: 'shopping-cart' },
      { title: 'Performance', description: 'Otimização de velocidade e Core Web Vitals.', icon: 'zap' },
    ],
    process: [
      { step: 1, title: 'Análise', description: 'Levantamento de requisitos técnicos e funcionais.', duration: '1 semana' },
      { step: 2, title: 'Arquitetura', description: 'Definição da stack tecnológica e estrutura do projeto.', duration: '1 semana' },
      { step: 3, title: 'Setup', description: 'Configuração de ambientes, repositórios e CI/CD.', duration: '3-5 dias' },
      { step: 4, title: 'Desenvolvimento', description: 'Desenvolvimento iterativo com entregas semanais.', duration: '4-12 semanas' },
      { step: 5, title: 'Testing', description: 'Testes funcionais, de performance e de segurança.', duration: '1-2 semanas' },
      { step: 6, title: 'Deploy', description: 'Lançamento em produção e monitorização inicial.', duration: '1 semana' },
    ],
    faqs: [
      {
        question: 'Que tecnologias utilizam para desenvolver websites?',
        answer: 'Trabalhamos principalmente com WordPress para sites de gestão de conteúdo, Next.js/React para aplicações web mais complexas, e Shopify/WooCommerce para e-commerce. A escolha depende dos requisitos do projeto.',
      },
      {
        question: 'Consigo fazer alterações ao website depois de entregue?',
        answer: 'Sim, todos os websites incluem um sistema de gestão de conteúdo (CMS) que permite à sua equipa atualizar textos, imagens e páginas. Oferecemos formação incluída no projeto.',
      },
      {
        question: 'O website vai ser rápido?',
        answer: 'A performance é uma prioridade. Otimizamos imagens, código e infraestrutura para garantir tempos de carregamento inferiores a 3 segundos e scores acima de 90 no Google PageSpeed.',
      },
      {
        question: 'Incluem alojamento e domínio?',
        answer: 'Podemos gerir o alojamento e domínio por si, ou configurar a infraestrutura na sua conta. Recomendamos sempre soluções que garantam que mantém o controlo total.',
      },
      {
        question: 'Trabalham com metodologias ágeis?',
        answer: 'Sim, utilizamos sprints semanais ou quinzenais com entregas incrementais. Isto permite validar o progresso regularmente e ajustar prioridades conforme necessário.',
      },
      {
        question: 'Oferecem manutenção após o lançamento?',
        answer: 'Sim, oferecemos contratos de manutenção que incluem atualizações de segurança, backups, monitorização e pequenas alterações. Planos a partir de 150€/mês.',
      },
    ],
    pricing: {
      starter: {
        label: 'Site WordPress',
        from: '3.000€',
        features: ['WordPress customizado', 'Até 10 páginas', 'Responsivo', 'SEO básico', 'Formação incluída'],
      },
      professional: {
        label: 'Plataforma Web',
        from: '8.000€',
        features: ['Funcionalidades custom', 'Integrações', 'Área reservada', 'Multi-idioma', 'Performance otimizada'],
      },
      enterprise: {
        label: 'Aplicação Web',
        from: '20.000€',
        features: ['Next.js/React', 'API personalizada', 'Dashboard admin', 'Escalabilidade', 'Documentação técnica'],
      },
    },
    localBenefits: (location, region, characteristics, industries) => {
      const benefits = [
        `Equipa disponível para reuniões presenciais em ${location}.`,
        `Suporte técnico adaptado ao fuso horário português.`,
        `Conhecemos os fornecedores de hosting e domínios mais fiáveis para ${region}.`,
      ]
      return benefits
    },
    trustSignals: [
      '+100 projetos entregues',
      'WordPress experts',
      'Next.js certified',
      'Código 100% documentado',
    ],
    relatedSearches: [
      'programador web',
      'criação de websites',
      'WordPress developer',
      'desenvolvimento de apps',
      'website empresarial',
      'plataforma web',
    ],
  },

  'ecommerce': {
    heroVariations: [
      {
        title: (location) => `E-commerce em ${location}`,
        subtitle: (location, region) =>
          `Lojas online que vendem para empresas em ${location}. Shopify ou WooCommerce configurados para o mercado português com MB Way, Multibanco e transportadoras locais.`,
      },
    ],
    benefits: [
      { stat: '99.9%', label: 'Uptime', description: 'Infraestrutura que garante a sua loja sempre disponível, mesmo em picos de tráfego.' },
      { stat: '+25%', label: 'Conversão', description: 'Otimização do checkout e UX que aumenta a taxa de conversão.' },
      { stat: 'MB Way', label: 'Pagamentos PT', description: 'Integração com os métodos de pagamento preferidos dos portugueses.' },
      { stat: '24h', label: 'Suporte', description: 'Suporte técnico prioritário para lojas em produção.' },
    ],
    deliverables: [
      { title: 'Loja Shopify', description: 'A plataforma mais fiável do mercado, ideal para escalar.', icon: 'shopping-bag' },
      { title: 'WooCommerce', description: 'Controlo total sobre a sua loja com WordPress.', icon: 'shopping-cart' },
      { title: 'Pagamentos', description: 'MB Way, Multibanco, PayPal, Stripe configurados.', icon: 'credit-card' },
      { title: 'Logística', description: 'Integração com CTT, DPD, GLS e outros transportadores.', icon: 'truck' },
      { title: 'Stock', description: 'Gestão de inventário e integração com ERP.', icon: 'package' },
      { title: 'Marketing', description: 'Email marketing, abandoned cart, upsells.', icon: 'mail' },
    ],
    process: [
      { step: 1, title: 'Estratégia', description: 'Definição do modelo de negócio e requisitos.', duration: '1 semana' },
      { step: 2, title: 'Plataforma', description: 'Escolha entre Shopify, WooCommerce ou custom.', duration: '1 semana' },
      { step: 3, title: 'Design', description: 'Design da loja e experiência de compra.', duration: '2-3 semanas' },
      { step: 4, title: 'Desenvolvimento', description: 'Setup técnico, integrações e catálogo.', duration: '3-6 semanas' },
      { step: 5, title: 'Testes', description: 'Testes de checkout, pagamentos e logística.', duration: '1 semana' },
      { step: 6, title: 'Lançamento', description: 'Go-live e monitorização inicial.', duration: '1 semana' },
    ],
    faqs: [
      {
        question: 'Shopify ou WooCommerce — qual devo escolher?',
        answer: 'Shopify é ideal se quer uma solução chave-na-mão, escalável e com menos manutenção técnica. WooCommerce é melhor se precisa de customização total e já tem WordPress. Ajudamos a decidir conforme o seu caso.',
      },
      {
        question: 'Como funciona a integração com métodos de pagamento portugueses?',
        answer: 'Configuramos MB Way, Multibanco, PayPal e cartões através de gateways como SIBS, Easypay ou Stripe. O processo é transparente para o cliente e os fundos são depositados na sua conta.',
      },
      {
        question: 'Podem integrar com o meu sistema de faturação?',
        answer: 'Sim, integramos com os principais softwares de faturação portugueses como PHC, Primavera, Sage, Moloni, InvoiceXpress e outros. A faturação pode ser automática.',
      },
      {
        question: 'Quanto custa criar uma loja online?',
        answer: 'Lojas Shopify básicas começam nos 3.000€, WooCommerce nos 4.000€. Projetos com integrações complexas, marketplace ou B2B podem ultrapassar os 20.000€.',
      },
      {
        question: 'Como funciona o envio de encomendas?',
        answer: 'Integramos com os principais transportadores (CTT, DPD, GLS, etc.) para cálculo automático de portes, geração de etiquetas e tracking. Também configuramos pontos de recolha.',
      },
      {
        question: 'A loja vai estar otimizada para mobile?',
        answer: 'Absolutamente. Mais de 60% das compras online são feitas em mobile. As nossas lojas são 100% responsivas e otimizadas para a experiência de compra em smartphone.',
      },
    ],
    pricing: {
      starter: {
        label: 'Loja Starter',
        from: '3.000€',
        features: ['Shopify básico', 'Até 50 produtos', 'Pagamentos PT', 'Tema standard', 'Formação'],
      },
      professional: {
        label: 'Loja Pro',
        from: '7.000€',
        features: ['Design custom', 'Produtos ilimitados', 'Integrações', 'Email marketing', 'SEO avançado'],
      },
      enterprise: {
        label: 'E-commerce B2B',
        from: '15.000€',
        features: ['Multistore', 'Preços por cliente', 'Integração ERP', 'Marketplace', 'API personalizada'],
      },
    },
    localBenefits: (location, region) => [
      `Pagamentos configurados para clientes portugueses (MB Way, Multibanco).`,
      `Integração com transportadores nacionais para entregas em ${region}.`,
      `Conhecemos os hábitos de compra online dos consumidores em ${location}.`,
    ],
    trustSignals: [
      '+50 lojas lançadas',
      'Shopify Partners',
      'WooCommerce experts',
      '€2M+ em vendas processadas',
    ],
    relatedSearches: [
      'criar loja online',
      'loja Shopify',
      'WooCommerce Portugal',
      'vender online',
      'e-commerce B2B',
      'loja virtual',
    ],
  },

  'consultoria-digital': {
    heroVariations: [
      {
        title: (location) => `Consultoria Digital em ${location}`,
        subtitle: (location, region, businessContext) =>
          `Estratégia digital para empresas e instituições em ${location}. Diagnosticamos, planeamos e orientamos a transformação digital da sua organização na região ${region}.`,
      },
    ],
    benefits: [
      { stat: '30%', label: 'Redução Custos', description: 'Identificamos redundâncias e otimizamos o investimento em tecnologia.' },
      { stat: '50%', label: 'Menos Ferramentas', description: 'Consolidamos o stack tecnológico para maior eficiência.' },
      { stat: '100%', label: 'Decisões Informadas', description: 'Relatórios e recomendações baseadas em dados, não em opiniões.' },
      { stat: '0', label: 'Conflito de Interesses', description: 'Consultoria independente, sem comissões de fornecedores.' },
    ],
    deliverables: [
      { title: 'Diagnóstico', description: 'Mapeamento completo de ferramentas, processos e competências digitais.', icon: 'clipboard-check' },
      { title: 'Benchmarking', description: 'Análise competitiva e identificação de melhores práticas do setor.', icon: 'bar-chart' },
      { title: 'Arquitetura', description: 'Definição do ecossistema digital ideal para a organização.', icon: 'layers' },
      { title: 'Roadmap', description: 'Plano faseado com prioridades, timelines e orçamentos.', icon: 'map' },
      { title: 'Seleção', description: 'Avaliação independente de fornecedores e propostas.', icon: 'check-square' },
      { title: 'Governance', description: 'Definição de políticas e processos de gestão digital.', icon: 'shield' },
    ],
    process: [
      { step: 1, title: 'Kickoff', description: 'Alinhamento de expectativas e objetivos do projeto.', duration: '1 dia' },
      { step: 2, title: 'Descoberta', description: 'Entrevistas, análise de sistemas e processos atuais.', duration: '2-3 semanas' },
      { step: 3, title: 'Análise', description: 'Processamento de dados e identificação de gaps.', duration: '1-2 semanas' },
      { step: 4, title: 'Estratégia', description: 'Definição de recomendações e plano de ação.', duration: '1-2 semanas' },
      { step: 5, title: 'Apresentação', description: 'Entrega de relatório e discussão com stakeholders.', duration: '1 dia' },
      { step: 6, title: 'Acompanhamento', description: 'Suporte na implementação das recomendações.', duration: 'Opcional' },
    ],
    faqs: [
      {
        question: 'O que é consultoria digital?',
        answer: 'Consultoria digital ajuda organizações a utilizar tecnologia de forma estratégica. Inclui diagnóstico do estado atual, definição de objetivos, seleção de ferramentas e planeamento da implementação.',
      },
      {
        question: 'Quanto custa uma consultoria digital?',
        answer: 'Projetos de diagnóstico e estratégia começam nos 3.000€ para PMEs. Transformações digitais completas para organizações maiores podem ultrapassar os 30.000€, dependendo do âmbito.',
      },
      {
        question: 'Quanto tempo demora um projeto de consultoria?',
        answer: 'Um diagnóstico digital típico demora 4-6 semanas. Projetos de transformação digital mais abrangentes podem durar 3-6 meses. Oferecemos também modelos de consultoria contínua.',
      },
      {
        question: 'Implementam as recomendações?',
        answer: 'Podemos acompanhar a implementação de duas formas: gestão de projeto onde coordenamos fornecedores externos, ou implementação direta dos serviços que oferecemos (web, SEO, etc.).',
      },
      {
        question: 'Trabalham com que tipo de organizações?',
        answer: 'Trabalhamos com PMEs, instituições públicas, organizações do terceiro setor e grandes empresas. A nossa especialidade são instituições que procuram autonomia tecnológica.',
      },
      {
        question: 'Como garantem independência nas recomendações?',
        answer: 'Não recebemos comissões de fornecedores de software. As nossas recomendações são baseadas exclusivamente nas necessidades da organização e nas melhores práticas do mercado.',
      },
    ],
    pricing: {
      starter: {
        label: 'Diagnóstico',
        from: '3.000€',
        features: ['Auditoria digital', 'Relatório de gaps', 'Recomendações prioritárias', '1 sessão de apresentação'],
      },
      professional: {
        label: 'Estratégia',
        from: '8.000€',
        features: ['Diagnóstico completo', 'Benchmarking setor', 'Roadmap detalhado', 'Seleção de fornecedores', 'Acompanhamento 3 meses'],
      },
      enterprise: {
        label: 'Transformação',
        from: '25.000€',
        features: ['Estratégia completa', 'Gestão de mudança', 'Implementação assistida', 'Formação equipas', 'Acompanhamento 12 meses'],
      },
    },
    localBenefits: (location, region, characteristics, industries) => {
      const benefits = [
        `Conhecemos o tecido empresarial de ${location} e as suas especificidades.`,
        `Recomendamos soluções adequadas à realidade da região ${region}.`,
        `Disponibilidade para workshops e reuniões presenciais.`,
      ]
      return benefits
    },
    trustSignals: [
      '+30 organizações transformadas',
      'Metodologia proprietária',
      'Independência garantida',
      'NPS > 90',
    ],
    relatedSearches: [
      'consultoria tecnológica',
      'transformação digital',
      'estratégia digital',
      'digitalização empresas',
      'consultoria IT',
      'auditoria digital',
    ],
  },

  'crm': {
    heroVariations: [
      {
        title: (location) => `Implementação de CRM em ${location}`,
        subtitle: (location, region) =>
          `CRM para empresas em ${location}. Centralize a gestão de clientes, automatize processos comerciais e nunca mais perca uma oportunidade de negócio na região ${region}.`,
      },
    ],
    benefits: [
      { stat: '+35%', label: 'Produtividade', description: 'Equipas comerciais mais eficientes com processos automatizados.' },
      { stat: '360°', label: 'Visão Cliente', description: 'Toda a informação do cliente num único local, acessível a toda a equipa.' },
      { stat: '0', label: 'Leads Perdidos', description: 'Follow-ups automáticos garantem que nenhuma oportunidade é esquecida.' },
      { stat: '+50%', label: 'Conversão', description: 'Melhor qualificação de leads traduz-se em mais vendas fechadas.' },
    ],
    deliverables: [
      { title: 'Seleção CRM', description: 'Escolha do CRM ideal: HubSpot, Pipedrive, Salesforce ou alternativas.', icon: 'search' },
      { title: 'Configuração', description: 'Setup completo de pipelines, campos e permissões.', icon: 'settings' },
      { title: 'Migração', description: 'Importação de dados de sistemas anteriores ou Excel.', icon: 'upload' },
      { title: 'Automações', description: 'Workflows que poupam tempo: follow-ups, tarefas, notificações.', icon: 'zap' },
      { title: 'Integrações', description: 'Ligação com email, website, faturação e outras ferramentas.', icon: 'plug' },
      { title: 'Formação', description: 'Capacitação da equipa para uso autónomo do CRM.', icon: 'users' },
    ],
    process: [
      { step: 1, title: 'Análise', description: 'Mapeamento do processo comercial e requisitos.', duration: '1 semana' },
      { step: 2, title: 'Seleção', description: 'Escolha da plataforma CRM mais adequada.', duration: '1 semana' },
      { step: 3, title: 'Configuração', description: 'Setup de pipelines, campos e automações.', duration: '2-3 semanas' },
      { step: 4, title: 'Migração', description: 'Importação e limpeza de dados existentes.', duration: '1-2 semanas' },
      { step: 5, title: 'Formação', description: 'Treino da equipa comercial e administrativa.', duration: '1 semana' },
      { step: 6, title: 'Acompanhamento', description: 'Suporte pós-implementação e otimização.', duration: '1-3 meses' },
    ],
    faqs: [
      {
        question: 'Que CRM recomendam?',
        answer: 'Depende das necessidades. HubSpot é excelente para PMEs com foco em marketing. Pipedrive é simples e focado em vendas. Salesforce para empresas grandes com requisitos complexos. Analisamos o seu caso e recomendamos.',
      },
      {
        question: 'Quanto custa implementar um CRM?',
        answer: 'A implementação começa nos 2.000€ para setups simples e pode ultrapassar os 15.000€ para projetos complexos com muitas integrações. Depois há custos mensais de licença do software.',
      },
      {
        question: 'Quanto tempo demora a implementar?',
        answer: 'Uma implementação típica demora 4-8 semanas, incluindo configuração, migração de dados e formação. Projetos mais complexos podem demorar 2-3 meses.',
      },
      {
        question: 'Os nossos dados ficam seguros?',
        answer: 'Os CRMs que implementamos (HubSpot, Pipedrive, etc.) cumprem RGPD e têm certificações de segurança. Os dados são encriptados e com backups automáticos.',
      },
      {
        question: 'Pode integrar com o nosso email e website?',
        answer: 'Sim, a integração com email (Gmail, Outlook) é standard. Também integramos com formulários do website para captura automática de leads.',
      },
      {
        question: 'Oferecem suporte após a implementação?',
        answer: 'Sim, oferecemos pacotes de suporte e otimização contínua. Também formamos um "power user" interno que pode dar suporte de primeiro nível à equipa.',
      },
    ],
    pricing: {
      starter: {
        label: 'CRM Essencial',
        from: '2.000€',
        features: ['Setup básico', 'Até 3 pipelines', 'Importação dados', 'Formação 2h', 'Suporte 30 dias'],
      },
      professional: {
        label: 'CRM Profissional',
        from: '5.000€',
        features: ['Setup completo', 'Automações', 'Integrações email', 'Formação equipa', 'Suporte 90 dias'],
      },
      enterprise: {
        label: 'CRM Enterprise',
        from: '12.000€',
        features: ['Multi-pipeline', 'Integrações custom', 'Relatórios avançados', 'Migração complexa', 'Suporte 12 meses'],
      },
    },
    localBenefits: (location, region) => [
      `Implementação e formação presencial disponível em ${location}.`,
      `Conhecemos os processos comerciais típicos das empresas da região ${region}.`,
      `Suporte em português, no fuso horário local.`,
    ],
    trustSignals: [
      'HubSpot Partner',
      'Pipedrive Partner',
      '+40 implementações',
      '95% taxa de adoção',
    ],
    relatedSearches: [
      'software CRM',
      'gestão de clientes',
      'HubSpot Portugal',
      'Pipedrive implementação',
      'CRM para PMEs',
      'automatizar vendas',
    ],
  },

  'manutencao-web': {
    heroVariations: [
      {
        title: (location) => `Manutenção de Websites em ${location}`,
        subtitle: (location, region) =>
          `Suporte técnico para websites de empresas em ${location}. Atualizações, segurança, backups e pequenas alterações para que o seu site funcione sempre.`,
      },
    ],
    benefits: [
      { stat: '24h', label: 'Resposta', description: 'Resposta a pedidos urgentes em menos de 24 horas úteis.' },
      { stat: '99.9%', label: 'Uptime', description: 'Monitorização contínua e ação proativa para máxima disponibilidade.' },
      { stat: '0', label: 'Preocupações', description: 'Gerimos a parte técnica para que se foque no seu negócio.' },
      { stat: 'Diário', label: 'Backups', description: 'Cópias de segurança diárias com retenção de 30 dias.' },
    ],
    deliverables: [
      { title: 'Atualizações', description: 'WordPress, plugins e temas sempre na última versão.', icon: 'refresh-cw' },
      { title: 'Segurança', description: 'Monitorização de ameaças e proteção contra hackers.', icon: 'shield' },
      { title: 'Backups', description: 'Cópias de segurança automáticas diárias com restauro rápido.', icon: 'database' },
      { title: 'Performance', description: 'Otimização contínua de velocidade e Core Web Vitals.', icon: 'zap' },
      { title: 'Alterações', description: 'Pequenas alterações de conteúdo e layout incluídas.', icon: 'edit' },
      { title: 'Relatórios', description: 'Relatório mensal de atividades e estado do website.', icon: 'file-text' },
    ],
    process: [
      { step: 1, title: 'Auditoria', description: 'Análise do estado atual do website.', duration: '1-2 dias' },
      { step: 2, title: 'Cleanup', description: 'Correção de problemas identificados.', duration: '1 semana' },
      { step: 3, title: 'Setup', description: 'Configuração de backups e monitorização.', duration: '1-2 dias' },
      { step: 4, title: 'Documentação', description: 'Registo de acessos e procedimentos.', duration: '1 dia' },
      { step: 5, title: 'Manutenção', description: 'Início do serviço de manutenção regular.', duration: 'Contínuo' },
      { step: 6, title: 'Relatórios', description: 'Envio de relatórios mensais.', duration: 'Mensal' },
    ],
    faqs: [
      {
        question: 'O que está incluído na manutenção?',
        answer: 'Atualizações de WordPress, plugins e temas; monitorização de uptime e segurança; backups diários; até 2 horas de pequenas alterações por mês; e suporte técnico por email.',
      },
      {
        question: 'Quanto custa a manutenção de website?',
        answer: 'Os planos de manutenção começam nos 99€/mês para sites simples e vão até 299€/mês para sites complexos com múltiplas integrações ou e-commerce.',
      },
      {
        question: 'Trabalham com sites que não fizeram?',
        answer: 'Sim, podemos assumir a manutenção de qualquer website WordPress, independentemente de quem o desenvolveu. Fazemos uma auditoria inicial para conhecer o projeto.',
      },
      {
        question: 'O que acontece se o site for hackeado?',
        answer: 'A limpeza de malware está incluída nos nossos planos. Removemos o código malicioso, identificamos a vulnerabilidade e implementamos proteções adicionais.',
      },
      {
        question: 'Posso pedir alterações maiores?',
        answer: 'Alterações que excedam as horas incluídas são orçamentadas separadamente com desconto para clientes de manutenção. Também oferecemos pacotes de horas pré-pagas.',
      },
      {
        question: 'Como funciona o suporte de emergência?',
        answer: 'Para situações urgentes (site em baixo, hackeado, etc.) temos linha de emergência com resposta em menos de 4 horas, 7 dias por semana.',
      },
    ],
    pricing: {
      starter: {
        label: 'Essencial',
        from: '99€/mês',
        features: ['Atualizações mensais', 'Backups semanais', 'Monitorização', '1h alterações/mês', 'Suporte email'],
      },
      professional: {
        label: 'Profissional',
        from: '199€/mês',
        features: ['Atualizações semanais', 'Backups diários', 'Segurança avançada', '2h alterações/mês', 'Suporte prioritário'],
      },
      enterprise: {
        label: 'Premium',
        from: '299€/mês',
        features: ['Atualizações contínuas', 'Backups em tempo real', 'WAF dedicado', '4h alterações/mês', 'Suporte 24/7'],
      },
    },
    localBenefits: (location, region) => [
      `Suporte presencial disponível em ${location} quando necessário.`,
      `Conhecemos as infraestruturas de hosting mais utilizadas em ${region}.`,
      `Equipa local com resposta rápida no fuso horário português.`,
    ],
    trustSignals: [
      '+80 sites em manutenção',
      '99.9% uptime médio',
      '<4h resposta emergências',
      '0 perdas de dados',
    ],
    relatedSearches: [
      'manutenção WordPress',
      'suporte website',
      'atualização site',
      'segurança WordPress',
      'backup website',
      'técnico WordPress',
    ],
  },

  'automacao': {
    heroVariations: [
      {
        title: (location) => `Automação Digital em ${location}`,
        subtitle: (location, region) =>
          `Automatize processos repetitivos na sua empresa em ${location}. Integre ferramentas, elimine tarefas manuais e liberte a equipa para trabalho de valor.`,
      },
    ],
    benefits: [
      { stat: '10h', label: 'Poupadas/Semana', description: 'Em média, as nossas automações poupam 10 horas semanais às equipas.' },
      { stat: '0', label: 'Erros Manuais', description: 'Automações eliminam erros de copy-paste e esquecimentos.' },
      { stat: '∞', label: 'Escalabilidade', description: 'Processos automatizados escalam sem aumentar a equipa.' },
      { stat: '24/7', label: 'Funcionamento', description: 'Automações trabalham fora de horas, fins de semana e feriados.' },
    ],
    deliverables: [
      { title: 'Integrações', description: 'Conectamos as ferramentas que já usa: CRM, email, faturação, etc.', icon: 'link' },
      { title: 'Workflows', description: 'Automações que executam tarefas sequenciais automaticamente.', icon: 'git-branch' },
      { title: 'Notificações', description: 'Alertas automáticos quando eventos importantes acontecem.', icon: 'bell' },
      { title: 'Dados', description: 'Sincronização automática de dados entre sistemas.', icon: 'database' },
      { title: 'APIs', description: 'Desenvolvimento de integrações custom quando necessário.', icon: 'code' },
      { title: 'Formação', description: 'Capacitação para criar e manter automações simples.', icon: 'book' },
    ],
    process: [
      { step: 1, title: 'Mapeamento', description: 'Identificação de processos a automatizar.', duration: '1 semana' },
      { step: 2, title: 'Priorização', description: 'Seleção das automações com maior impacto.', duration: '2-3 dias' },
      { step: 3, title: 'Design', description: 'Desenho dos workflows e lógica de automação.', duration: '1 semana' },
      { step: 4, title: 'Implementação', description: 'Configuração em Zapier, Make ou código custom.', duration: '2-4 semanas' },
      { step: 5, title: 'Testes', description: 'Validação com casos reais antes de ir para produção.', duration: '1 semana' },
      { step: 6, title: 'Documentação', description: 'Manual de funcionamento e troubleshooting.', duration: '2-3 dias' },
    ],
    faqs: [
      {
        question: 'Que tipo de tarefas posso automatizar?',
        answer: 'Praticamente qualquer tarefa repetitiva: entrada de dados, envio de emails, criação de tarefas, sincronização entre sistemas, geração de relatórios, notificações, e muito mais.',
      },
      {
        question: 'Que ferramentas usam para automatizar?',
        answer: 'Usamos Zapier e Make.com para a maioria dos casos. Para automações mais complexas, desenvolvemos código custom com Node.js ou Python.',
      },
      {
        question: 'Quanto custa implementar automações?',
        answer: 'Automações simples custam a partir de 500€. Projetos de automação mais complexos, com múltiplas integrações e lógica condicional, podem ultrapassar os 10.000€.',
      },
      {
        question: 'Quanto tempo poupa uma automação típica?',
        answer: 'Depende do processo, mas automações típicas poupam entre 2 e 10 horas semanais. O ROI é geralmente positivo em menos de 3 meses.',
      },
      {
        question: 'E se uma automação falhar?',
        answer: 'Configuramos alertas para falhas e logs detalhados. Oferecemos suporte para resolução de problemas e otimização contínua das automações.',
      },
      {
        question: 'Posso modificar as automações depois?',
        answer: 'Sim, entregamos acesso total às automações. Também oferecemos formação para que a sua equipa possa fazer ajustes simples de forma autónoma.',
      },
    ],
    pricing: {
      starter: {
        label: 'Automação Simples',
        from: '500€',
        features: ['1 workflow', 'Até 3 apps conectadas', 'Documentação básica', 'Suporte 30 dias'],
      },
      professional: {
        label: 'Pack Automação',
        from: '2.500€',
        features: ['Até 5 workflows', 'Apps ilimitadas', 'Lógica condicional', 'Formação incluída', 'Suporte 90 dias'],
      },
      enterprise: {
        label: 'Automação Enterprise',
        from: '8.000€',
        features: ['Workflows ilimitados', 'APIs custom', 'Dashboard de monitorização', 'SLA garantido', 'Suporte anual'],
      },
    },
    localBenefits: (location, region) => [
      `Conhecemos as ferramentas mais usadas pelas empresas de ${location}.`,
      `Integramos com softwares de faturação portugueses (PHC, Sage, etc.).`,
      `Suporte no fuso horário de ${region}, em português.`,
    ],
    trustSignals: [
      '+200 automações criadas',
      'Zapier Certified',
      'Make Partner',
      '500h+ poupadas/mês',
    ],
    relatedSearches: [
      'automatizar processos',
      'Zapier Portugal',
      'integrar sistemas',
      'workflow automation',
      'RPA',
      'conectar apps',
    ],
  },

  'gestao-eventos': {
    heroVariations: [
      {
        title: (location) => `Gestão de Eventos em ${location}`,
        subtitle: (location, region) =>
          `Plataformas digitais para eventos em ${location}. Inscrições, pagamentos, credenciação e comunicação numa única plataforma para a região ${region}.`,
      },
    ],
    benefits: [
      { stat: '-70%', label: 'Tempo Admin', description: 'Automatização de processos administrativos de eventos.' },
      { stat: '100%', label: 'Online', description: 'Inscrições, pagamentos e certificados totalmente digitais.' },
      { stat: '0', label: 'Papel', description: 'Credenciação digital e materiais em formato eletrónico.' },
      { stat: 'Real-time', label: 'Dados', description: 'Dashboard com estatísticas de inscrições em tempo real.' },
    ],
    deliverables: [
      { title: 'Inscrições', description: 'Formulários customizados com validação e quotas.', icon: 'user-plus' },
      { title: 'Pagamentos', description: 'Processamento de pagamentos online com faturação automática.', icon: 'credit-card' },
      { title: 'Credenciação', description: 'Check-in digital com QR codes e impressão de badges.', icon: 'check-square' },
      { title: 'Comunicação', description: 'Emails automáticos, lembretes e notificações push.', icon: 'mail' },
      { title: 'Certificados', description: 'Geração e envio automático de certificados personalizados.', icon: 'award' },
      { title: 'Relatórios', description: 'Dashboard com métricas e exportação de dados.', icon: 'bar-chart' },
    ],
    process: [
      { step: 1, title: 'Requisitos', description: 'Levantamento das necessidades do evento.', duration: '1 semana' },
      { step: 2, title: 'Configuração', description: 'Setup da plataforma e formulários.', duration: '1-2 semanas' },
      { step: 3, title: 'Integração', description: 'Pagamentos, email marketing, etc.', duration: '1 semana' },
      { step: 4, title: 'Testes', description: 'Validação do fluxo completo de inscrição.', duration: '3-5 dias' },
      { step: 5, title: 'Lançamento', description: 'Abertura de inscrições e promoção.', duration: '1 dia' },
      { step: 6, title: 'Suporte', description: 'Acompanhamento durante o evento.', duration: 'Durante evento' },
    ],
    faqs: [
      {
        question: 'Que plataformas de gestão de eventos utilizam?',
        answer: 'Trabalhamos com Eventbrite, Ticket Tailor, ou soluções custom em WordPress. A escolha depende da escala do evento e requisitos específicos.',
      },
      {
        question: 'Quanto custa uma plataforma de eventos?',
        answer: 'Para eventos simples, o setup começa nos 1.500€. Eventos complexos com múltiplas sessões, categorias de bilhetes e integrações podem ultrapassar os 10.000€.',
      },
      {
        question: 'Posso aceitar pagamentos online?',
        answer: 'Sim, configuramos pagamentos por MB Way, Multibanco, cartão de crédito e PayPal. A faturação pode ser automática com integração ao seu software.',
      },
      {
        question: 'Como funciona o check-in digital?',
        answer: 'Cada participante recebe um QR code único. No dia do evento, basta fazer scan com tablet ou smartphone para registar a presença e imprimir o badge.',
      },
      {
        question: 'Posso enviar certificados automáticos?',
        answer: 'Sim, geramos certificados personalizados com nome, dados do evento e código de validação. São enviados automaticamente por email após o evento.',
      },
      {
        question: 'Oferecem suporte no dia do evento?',
        answer: 'Sim, podemos disponibilizar suporte técnico presencial ou remoto durante o evento para resolver qualquer problema em tempo real.',
      },
    ],
    pricing: {
      starter: {
        label: 'Evento Simples',
        from: '1.500€',
        features: ['1 tipo de bilhete', 'Inscrições online', 'Pagamentos', 'Emails automáticos', 'Check-in QR'],
      },
      professional: {
        label: 'Evento Profissional',
        from: '4.000€',
        features: ['Múltiplos bilhetes', 'Early bird pricing', 'Sessões paralelas', 'Certificados', 'App mobile'],
      },
      enterprise: {
        label: 'Conferência',
        from: '10.000€',
        features: ['Multi-evento', 'Submissão abstracts', 'Área sponsors', 'Networking', 'Livestream'],
      },
    },
    localBenefits: (location, region) => [
      `Experiência em eventos institucionais na região ${region}.`,
      `Suporte presencial disponível em ${location} no dia do evento.`,
      `Conhecemos os espaços e fornecedores de eventos locais.`,
    ],
    trustSignals: [
      '+100 eventos geridos',
      '50.000+ inscrições processadas',
      '€500k+ em pagamentos',
      '99% satisfação organizadores',
    ],
    relatedSearches: [
      'plataforma eventos',
      'gestão de inscrições',
      'software conferências',
      'venda de bilhetes',
      'credenciação digital',
      'organização eventos',
    ],
  },

  'acessibilidade-web': {
    heroVariations: [
      {
        title: (location) => `Acessibilidade Web em ${location}`,
        subtitle: (location, region) =>
          `Tornamos websites acessíveis a todos em ${location}. Conformidade WCAG, auditorias e remediação para instituições públicas e privadas na região ${region}.`,
      },
    ],
    benefits: [
      { stat: 'WCAG AA', label: 'Conformidade', description: 'Garantimos conformidade com as diretrizes WCAG 2.1 nível AA.' },
      { stat: '+15%', label: 'Audiência', description: 'Websites acessíveis alcançam mais 15% de utilizadores potenciais.' },
      { stat: '100%', label: 'Legal', description: 'Cumprimento da legislação de acessibilidade digital.' },
      { stat: 'Score A', label: 'Certificação', description: 'Preparação para obter selo de acessibilidade.' },
    ],
    deliverables: [
      { title: 'Auditoria', description: 'Análise completa de conformidade WCAG 2.1 AA.', icon: 'clipboard-check' },
      { title: 'Relatório', description: 'Documento detalhado com todos os problemas e soluções.', icon: 'file-text' },
      { title: 'Remediação', description: 'Correção de problemas de acessibilidade identificados.', icon: 'tool' },
      { title: 'Testes', description: 'Validação com tecnologias assistivas e utilizadores reais.', icon: 'users' },
      { title: 'Declaração', description: 'Declaração de acessibilidade conforme a lei.', icon: 'file-check' },
      { title: 'Formação', description: 'Capacitação da equipa para manter acessibilidade.', icon: 'book' },
    ],
    process: [
      { step: 1, title: 'Auditoria Automática', description: 'Análise com ferramentas especializadas.', duration: '2-3 dias' },
      { step: 2, title: 'Auditoria Manual', description: 'Revisão humana de critérios WCAG.', duration: '1-2 semanas' },
      { step: 3, title: 'Relatório', description: 'Documentação de problemas e prioridades.', duration: '3-5 dias' },
      { step: 4, title: 'Remediação', description: 'Correção dos problemas identificados.', duration: '2-8 semanas' },
      { step: 5, title: 'Validação', description: 'Testes com screen readers e utilizadores.', duration: '1 semana' },
      { step: 6, title: 'Certificação', description: 'Emissão de declaração de conformidade.', duration: '2-3 dias' },
    ],
    faqs: [
      {
        question: 'A minha organização é obrigada a ter um site acessível?',
        answer: 'Sim, se for uma entidade pública ou fornecer serviços essenciais. O Decreto-Lei 83/2018 obriga organismos públicos a cumprir WCAG 2.1 AA. Muitas organizações privadas também adotam por responsabilidade social.',
      },
      {
        question: 'O que são as diretrizes WCAG?',
        answer: 'WCAG (Web Content Accessibility Guidelines) são normas internacionais que definem como tornar conteúdo web acessível. O nível AA é o standard exigido por lei na maior parte dos casos.',
      },
      {
        question: 'Quanto custa uma auditoria de acessibilidade?',
        answer: 'Auditorias básicas começam nos 800€. Auditorias completas com testes manuais e relatório detalhado custam a partir de 2.500€, dependendo do tamanho do website.',
      },
      {
        question: 'Quanto tempo demora a tornar um site acessível?',
        answer: 'Depende do estado atual e da complexidade. Um site simples pode ficar conforme em 2-4 semanas. Sites complexos ou com muitos problemas podem levar 2-3 meses.',
      },
      {
        question: 'Preciso de refazer o site todo?',
        answer: 'Na maioria dos casos, não. Muitos problemas de acessibilidade podem ser corrigidos com alterações no código existente. Só em casos extremos recomendamos redesign.',
      },
      {
        question: 'Como mantenho a acessibilidade após a remediação?',
        answer: 'Oferecemos formação à equipa, checklist de publicação de conteúdo, e auditorias periódicas. É importante que a acessibilidade seja considerada em todas as atualizações.',
      },
    ],
    pricing: {
      starter: {
        label: 'Auditoria',
        from: '2.500€',
        features: ['Análise WCAG 2.1 AA', 'Relatório detalhado', 'Priorização de correções', 'Reunião de apresentação'],
      },
      professional: {
        label: 'Auditoria + Remediação',
        from: '6.000€',
        features: ['Auditoria completa', 'Correção de problemas', 'Testes com utilizadores', 'Declaração conformidade', 'Formação equipa'],
      },
      enterprise: {
        label: 'Programa Contínuo',
        from: '12.000€/ano',
        features: ['Auditorias trimestrais', 'Suporte contínuo', 'Formação avançada', 'Consultoria design inclusivo', 'Certificação'],
      },
    },
    localBenefits: (location, region) => [
      `Conhecemos a legislação portuguesa de acessibilidade.`,
      `Experiência com instituições públicas da região ${region}.`,
      `Workshops presenciais disponíveis em ${location}.`,
    ],
    trustSignals: [
      '+30 sites certificados',
      'IAAP certified',
      'Parceiros da AMA',
      'Formadores certificados',
    ],
    relatedSearches: [
      'acessibilidade digital',
      'WCAG Portugal',
      'auditoria acessibilidade',
      'sites para cegos',
      'conformidade DL 83/2018',
      'inclusão digital',
    ],
  },
}

// Helper function to get SEO data with fallback
export function getServiceSEOData(slug: string): ServiceSEOData | null {
  return serviceSEOData[slug] || null
}

// Helper to format population numbers
export function formatPopulation(pop: number): string {
  if (pop >= 1000000) {
    return `${(pop / 1000000).toFixed(1)}M`
  }
  if (pop >= 1000) {
    return `${Math.round(pop / 1000)}k`
  }
  return pop.toString()
}

// Generate unique intro paragraph based on location characteristics
export function generateLocalIntro(
  serviceName: string,
  location: { name: string; region: string; population?: number; type?: string; business_context?: string; characteristics?: string[] }
): string {
  const size = location.type === 'capital' ? 'a capital' :
               location.type === 'major_city' ? 'uma das maiores cidades' :
               location.type === 'city' ? 'uma cidade dinâmica' : 'uma localidade'

  const pop = location.population ? ` com ${formatPopulation(location.population)} habitantes` : ''

  let intro = `${location.name} é ${size} da região ${location.region}${pop}. `

  if (location.business_context) {
    intro += `Como ${location.business_context}, a procura por serviços de ${serviceName.toLowerCase()} tem crescido significativamente. `
  }

  intro += `A Modular Digital oferece serviços especializados de ${serviceName.toLowerCase()} para empresas e instituições em ${location.name}, combinando expertise técnica com conhecimento do mercado local.`

  return intro
}
