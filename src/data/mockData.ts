// Mock data for the application

export interface Agent {
  id: string;
  name: string;
  niche: string;
  description: string;
  avatar: string;
  tone: string;
  objective: string;
}

export interface Chat {
  id: string;
  title: string;
  agentId: string;
  agentName: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: string;
}

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Marketing Pro',
    niche: 'Marketing Digital',
    description: 'Especialista em estratégias de marketing digital, copywriting e growth hacking.',
    avatar: '📈',
    tone: 'Profissional e estratégico',
    objective: 'Ajudar com estratégias de marketing',
  },
  {
    id: '2',
    name: 'Dev Helper',
    niche: 'Programação',
    description: 'Assistente para desenvolvimento de software, debugging e melhores práticas.',
    avatar: '💻',
    tone: 'Técnico e didático',
    objective: 'Auxiliar em questões de programação',
  },
  {
    id: '3',
    name: 'Sales Expert',
    niche: 'Vendas',
    description: 'Especialista em técnicas de vendas, negociação e fechamento de deals.',
    avatar: '🤝',
    tone: 'Persuasivo e amigável',
    objective: 'Melhorar performance de vendas',
  },
  {
    id: '4',
    name: 'Legal Advisor',
    niche: 'Jurídico',
    description: 'Assistente para questões jurídicas, contratos e compliance.',
    avatar: '⚖️',
    tone: 'Formal e preciso',
    objective: 'Orientar em questões legais',
  },
  {
    id: '5',
    name: 'Finance Guide',
    niche: 'Finanças',
    description: 'Especialista em planejamento financeiro, investimentos e gestão.',
    avatar: '💰',
    tone: 'Analítico e confiável',
    objective: 'Auxiliar em decisões financeiras',
  },
  {
    id: '6',
    name: 'HR Partner',
    niche: 'Recursos Humanos',
    description: 'Assistente para recrutamento, gestão de pessoas e cultura organizacional.',
    avatar: '👥',
    tone: 'Empático e profissional',
    objective: 'Apoiar gestão de pessoas',
  },
];

export const chats: Chat[] = [
  {
    id: '1',
    title: 'Estratégia de lançamento',
    agentId: '1',
    agentName: 'Marketing Pro',
    lastMessage: 'Vamos definir os principais canais de aquisição...',
    timestamp: '10:30',
    unread: true,
  },
  {
    id: '2',
    title: 'Bug no sistema de pagamentos',
    agentId: '2',
    agentName: 'Dev Helper',
    lastMessage: 'O problema está na validação do token...',
    timestamp: 'Ontem',
    unread: false,
  },
  {
    id: '3',
    title: 'Proposta comercial',
    agentId: '3',
    agentName: 'Sales Expert',
    lastMessage: 'Sugiro incluir um desconto progressivo...',
    timestamp: 'Ontem',
    unread: false,
  },
  {
    id: '4',
    title: 'Revisão de contrato',
    agentId: '4',
    agentName: 'Legal Advisor',
    lastMessage: 'A cláusula 5.2 precisa de ajustes...',
    timestamp: '2 dias',
    unread: false,
  },
];

export const messages: Message[] = [
  {
    id: '1',
    content: 'Olá! Preciso de ajuda para criar uma estratégia de lançamento para meu novo produto SaaS.',
    sender: 'user',
    timestamp: '10:25',
  },
  {
    id: '2',
    content: 'Ótimo! Vou te ajudar a criar uma estratégia completa. Primeiro, me conta um pouco sobre seu produto: qual problema ele resolve e quem é seu público-alvo?',
    sender: 'agent',
    timestamp: '10:26',
  },
  {
    id: '3',
    content: 'É uma plataforma de gestão de projetos focada em equipes remotas. O público são startups e PMEs de tecnologia.',
    sender: 'user',
    timestamp: '10:28',
  },
  {
    id: '4',
    content: 'Perfeito! Para startups e PMEs de tecnologia, sugiro uma estratégia de Product-Led Growth combinada com content marketing. Vamos definir os principais canais de aquisição:\n\n1. **LinkedIn** - Para B2B, é essencial\n2. **Content Marketing** - Blog com SEO focado em produtividade\n3. **Product Hunt** - Lançamento com buzz\n4. **Comunidades** - Reddit, Discord, Slack de devs\n\nQuer que eu detalhe algum desses canais?',
    sender: 'agent',
    timestamp: '10:30',
  },
];

export const niches = [
  'Marketing Digital',
  'Programação',
  'Vendas',
  'Jurídico',
  'Finanças',
  'Recursos Humanos',
  'Atendimento ao Cliente',
  'E-commerce',
  'Educação',
  'Saúde',
];

export const tones = [
  'Profissional',
  'Casual',
  'Técnico',
  'Empático',
  'Persuasivo',
  'Didático',
  'Formal',
  'Amigável',
];
