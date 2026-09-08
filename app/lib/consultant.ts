export type BusinessHourItem = {
  day: string
  hours: string
}

export type CatalogItem = {
  title: string
  description: string
  imageUrl: string
  href: string
  tag?: string
}

export type Consultant = {
  id: string
  name: string
  role: string
  tagline: string
  phone: string
  whatsappNumber: string
  email: string
  location: string
  address: string
  description: string
  instagramHandle?: string
  instagramUrl?: string
  websiteUrl?: string
  hours: string
  businessHoursList: BusinessHourItem[]
  avatarUrl: string
  isVerified?: boolean
  catalog: CatalogItem[]
}

type UnknownRecord = Record<string, unknown>

const demoBusinessHours: BusinessHourItem[] = [
  { day: 'Segunda', hours: '08:00 - 18:00' },
  { day: 'Terça', hours: '08:00 - 18:00' },
  { day: 'Quarta', hours: '08:00 - 18:00' },
  { day: 'Quinta', hours: '08:00 - 18:00' },
  { day: 'Sexta', hours: '08:00 - 18:00' },
  { day: 'Sábado', hours: 'Fechada' },
  { day: 'Domingo', hours: 'Fechada' }
]

const demoCatalog: CatalogItem[] = [
  {
    title: 'Proteção Veicular',
    description:
      'Seu carro 100% protegido. Cobertura total contra roubo, colisão e guincho 24h ilimitado em todo o Brasil.',
    imageUrl: '/cards/protecao-veicular.jpg',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Alpha Auto'
  },
  {
    title: 'Proteção Residencial',
    description:
      'Durma tranquilo. Proteção para seu lar contra incêndio, roubo e assistência emergenciais completas',
    imageUrl: '/cards/protecao-residencial.jpg',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Alpha Lar'
  },
  {
    title: 'Vida e Família',
    description:
      'Garanta o futuro de quem você ama. Proteção financeira para sua família em caso de imprevistos.',
    imageUrl: '/cards/seguro-vida.jpg',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Alpha Vida'
  },
  {
    title: 'Proteção Empresarial',
    description:
      'Blindagem para seu negócio. Proteção contra processos, danos ao patrimônio e lucros cessantes.',
    imageUrl: '/cards/protecao-empresarial.jpg',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Ativa em 24H'
  },
  {
    title: 'Máquinas e Equipamentos',
    description:
      'Não para sua obra. Proteção completa para maquinário pesado, agrícola e equipamentos portáteis.',
    imageUrl: '/cards/protecao-equipamentos.jpg',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Alpha Equipamentos'
  },
  {
    title: 'Soluções Sob Medida',
    description:
      'Não achou o que procura? Fale com um consultor e montaremos uma proteção exclusiva para você.',
    imageUrl: '/cards/solucoes-sob-medida.jpg',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Ativação Imediata'
  }
]

const demoConsultant: Consultant = {
  id: 'demo',
  name: 'Consultor Alpha',
  role: 'Consultor de negócios e proteção',
  tagline: 'Soluções completas para proteger o que importa.',
  phone: '+55 (62) 00000-0000',
  whatsappNumber: '5562000000000',
  email: 'contato@alphaprotecoes.com.br',
  location: 'Goiânia - GO',
  address: 'Rua 82, 633 - Setor Sul, Goiânia - GO, 74083-010, Brasil',
  description:
    'Meu papel é entender o seu momento e apresentar caminhos seguros, claros e personalizados. Conte comigo para encontrar a solução mais adequada para você, sua família ou seu negócio.',
  instagramHandle: '@alpha.protecoes',
  instagramUrl: 'https://instagram.com/alpha.protecoes',
  websiteUrl: 'https://alphaprotecoes.com.br',
  hours: '08:00 - 18:00',
  businessHoursList: demoBusinessHours,
  avatarUrl: '/logos/logo-alpha.png',
  isVerified: true,
  catalog: demoCatalog
}

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback
}

function asBoolean(value: unknown, fallback = false) {
  return typeof value === 'boolean' ? value : fallback
}

function mapCatalog(value: unknown): CatalogItem[] {
  if (!Array.isArray(value)) return demoCatalog

  const mapped = value
    .map((item): CatalogItem | null => {
      if (!item || typeof item !== 'object') return null
      const source = item as UnknownRecord
      const title = asString(source.title ?? source.name)
      if (!title) return null

      return {
        title,
        description: asString(
          source.description ?? source.summary,
          'Conheça esta solução da Alpha.'
        ),
        imageUrl: asString(
          source.imageUrl ?? source.image ?? source.thumbnail,
          '/logos/logo-alpha.png'
        ),
        href: asString(
          source.href ?? source.url ?? source.link,
          'https://alphaprotecoes.com.br'
        ),
        tag: asString(source.tag ?? source.category)
      }
    })
    .filter((item): item is CatalogItem => item !== null)

  return mapped.length > 0 ? mapped : demoCatalog
}

function mapBusinessHours(value: unknown): BusinessHourItem[] {
  if (!Array.isArray(value)) return demoBusinessHours

  const mapped = value
    .map((item): BusinessHourItem | null => {
      if (!item || typeof item !== 'object') return null
      const source = item as UnknownRecord
      const day = asString(source.day ?? source.dia)
      const hours = asString(source.hours ?? source.horario)
      if (!day || !hours) return null

      return { day, hours }
    })
    .filter((item): item is BusinessHourItem => item !== null)

  return mapped.length > 0 ? mapped : demoBusinessHours
}

export function normalizeConsultant(payload: unknown, id: string): Consultant {
  const source = (
    payload && typeof payload === 'object' ? payload : {}
  ) as UnknownRecord
  const nested = (
    source.consultant && typeof source.consultant === 'object'
      ? source.consultant
      : source.data && typeof source.data === 'object'
        ? source.data
        : source
  ) as UnknownRecord
  const phone = asString(
    nested.phone ?? nested.telephone ?? nested.mobile,
    demoConsultant.phone
  )
  const whatsappNumber = asString(
    nested.whatsappNumber ?? nested.whatsapp ?? nested.whatsapp_phone,
    phone.replace(/\D/g, '') || demoConsultant.whatsappNumber
  )

  return {
    id: asString(nested.id ?? nested.code ?? nested.codigo, id),
    name: asString(nested.name ?? nested.nome, demoConsultant.name),
    role: asString(
      nested.role ?? nested.title ?? nested.cargo,
      demoConsultant.role
    ),
    tagline: asString(
      nested.tagline ?? nested.headline ?? nested.slogan,
      demoConsultant.tagline
    ),
    phone,
    whatsappNumber,
    email: asString(nested.email, demoConsultant.email),
    location: asString(
      nested.location ?? nested.city ?? nested.cidade,
      demoConsultant.location
    ),
    address: asString(
      nested.address ?? nested.endereco,
      demoConsultant.address
    ),
    description: asString(
      nested.description ?? nested.bio ?? nested.sobre,
      demoConsultant.description
    ),
    instagramHandle: asString(
      nested.instagramHandle ?? nested.instagram ?? nested.instagram_handle,
      demoConsultant.instagramHandle
    ),
    instagramUrl: asString(
      nested.instagramUrl ?? nested.instagram_url,
      demoConsultant.instagramUrl
    ),
    websiteUrl: asString(
      nested.websiteUrl ?? nested.website ?? nested.site,
      demoConsultant.websiteUrl
    ),
    hours: asString(
      nested.hours ?? nested.businessHours ?? nested.horario,
      demoConsultant.hours
    ),
    businessHoursList: mapBusinessHours(
      nested.businessHoursList ?? nested.schedule ?? nested.horarios
    ),
    avatarUrl: asString(
      nested.avatarUrl ?? nested.avatar ?? nested.photo ?? nested.foto,
      '/logo-alpha.png'
    ),
    isVerified: asBoolean(
      nested.isVerified ?? nested.verified,
      demoConsultant.isVerified
    ),
    catalog: mapCatalog(
      nested.catalog ?? nested.catalogue ?? nested.products ?? nested.servicos
    )
  }
}

export function getDemoConsultant(id: string) {
  return normalizeConsultant({ ...demoConsultant, id }, id)
}

export async function getConsultant(id: string) {
  const normalizedId = id.trim()
  const apiUrl = process.env.CONSULTANT_API_URL?.trim()

  if (!apiUrl || !normalizedId) {
    return {
      consultant: getDemoConsultant(normalizedId || 'demo'),
      source: 'demo' as const
    }
  }

  try {
    const url = apiUrl + '/' + normalizedId
    console.log('URL', url.toString())
    const response = await fetch(url, {
      headers: { Accept: 'application/json' },
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      throw new Error(`Consultant API returned ${response.status}`)
    }

    const payload: unknown = await response.json()
    return {
      consultant: normalizeConsultant(payload, normalizedId),
      source: 'api' as const
    }
  } catch (error) {
    console.error('Failed to load consultant from API', error)
    return {
      consultant: getDemoConsultant(normalizedId),
      source: 'demo' as const
    }
  }
}

export function getWhatsAppUrl(number: string, consultantName: string) {
  const cleanNumber = number.replace(/\D/g, '')
  const message = encodeURIComponent(
    `Olá, ${consultantName}! Gostaria de conhecer melhor as soluções da Alpha.`
  )
  return `https://wa.me/${cleanNumber}?text=${message}`
}
