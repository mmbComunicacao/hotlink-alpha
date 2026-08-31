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
  avatarUrl: string
  isVerified?: boolean
  catalog: CatalogItem[]
}

type UnknownRecord = Record<string, unknown>

const demoCatalog: CatalogItem[] = [
  {
    title: 'Alpha Proteções',
    description:
      'Soluções para proteger seu veículo, sua família e seu patrimônio.',
    imageUrl:
      'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=900&q=85',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Proteção'
  },
  {
    title: 'Parceria Comercial',
    description:
      'Uma oportunidade para consultores ampliarem sua atuação com suporte.',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=85',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Oportunidade'
  },
  {
    title: 'Movimento Mais Seguro',
    description:
      'Informação e orientação para escolhas mais seguras em todos os momentos.',
    imageUrl:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Conteúdo'
  },
  {
    title: 'Grupo MMB',
    description:
      'Experiência, inovação e compromisso para desenvolver negócios sólidos.',
    imageUrl:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Grupo'
  },
  {
    title: 'Potere Consórcio',
    description:
      'Planeje suas conquistas com acompanhamento para escolher o melhor caminho.',
    imageUrl:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=85',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Planejamento'
  },
  {
    title: 'Juntos Pod+',
    description:
      'Conversas que informam, inspiram e conectam pessoas e negócios.',
    imageUrl:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=900&q=85',
    href: 'https://alphaprotecoes.com.br',
    tag: 'Podcast'
  }
]

const demoConsultant: Consultant = {
  id: 'demo',
  name: 'Consultor Alpha',
  role: 'Consultor de negócios e proteção',
  tagline: 'Conectando você às melhores soluções para proteger o que importa.',
  phone: '+55 (62) 00000-0000',
  whatsappNumber: '5562000000000',
  email: 'contato@alphaprotecoes.com.br',
  location: 'Goiânia - GO',
  address: 'Atendimento online e presencial',
  description:
    'Meu papel é entender o seu momento e apresentar caminhos seguros, claros e personalizados. Conte comigo para encontrar a solução mais adequada para você, sua família ou seu negócio.',
  instagramHandle: '@alphaprotecoes',
  instagramUrl: 'https://instagram.com/alphaprotecoes',
  websiteUrl: 'https://alphaprotecoes.com.br',
  hours: 'Segunda a sexta, das 8h às 18h',
  avatarUrl:
    'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=85',
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
          demoCatalog[0].imageUrl
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
    avatarUrl: asString(
      nested.avatarUrl ?? nested.avatar ?? nested.photo ?? nested.foto,
      demoConsultant.avatarUrl
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
    // url.searchParams.set('id', normalizedId)
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
