import React from 'react'
import Icon from '@/app/components/Icon'
import ContactRow from '@/app/components/ContactRow'
import type { Consultant } from '@/app/lib/consultant'
import CatalogCard from './CatalogCard'

export interface HeroSectionProps {
  consultant: Consultant
  whatsappUrl: string
}

export default function HeroSection({
  consultant,
  whatsappUrl
}: HeroSectionProps) {
  // Lista de itens de vantagens para reaproveitar e duplicar
  const advantages = [
    {
      title: 'PROTEÇÃO VEICULAR',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        </svg>
      )
    },
    {
      title: 'ASSISTÊNCIA 24 HORAS',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 6v6l4 2" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      )
    },
    {
      title: 'SEM CONSULTA SPC / SERASA',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21.801 10A10 10 0 1 1 17 3.335" />
          <path d="m9 11 3 3L22 4" />
        </svg>
      )
    },
    {
      title: 'COBERTURA EM TODO BRASIL',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
      )
    },
    {
      title: 'APROVAÇÃO IMEDIATA',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
        </svg>
      )
    },
    {
      title: 'GUINCHO E CHAVEIRO',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 2a9 9 0 0 1 9 9" />
          <path d="M13 6a5 5 0 0 1 5 5" />
          <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384" />
        </svg>
      )
    }
  ]

  // Duplicamos a lista para criar a rolagem infinita contínua sem saltos
  const marqueeItems = [...advantages, ...advantages]

  return (
    <section id="about" className="about-area py-10 font-sans text-slate-900">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* BENTO GRID PRINCIPAL */}
        <div className="grid gap-4 lg:grid-cols-12 lg:items-stretch">
          {/* LADO ESQUERDO: CARD ÚNICO UNIFICADO */}
          <div className="lg:col-span-4 flex">
            <div className="flex flex-col justify-between w-full rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-center pt-2">
                <div className="relative mx-auto flex h-52 w-52 items-center justify-center overflow-hidden rounded-full bg-[#008CEE]">
                  <img
                    src={consultant.avatarUrl}
                    alt={consultant.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-8 rounded-xl border border-slate-100 bg-slate-50/60 p-5 text-center">
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {consultant.name}
                </h2>
                <p className="mt-1 text-xs font-normal text-[#7A838C]">
                  {consultant.role}
                </p>

                <div className="mt-5 border-t border-slate-200/60 pt-4">
                  <ul className="flex justify-center gap-2">
                    {consultant.instagramUrl && (
                      <li>
                        <a
                          href={consultant.instagramUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/70 text-[#7A838C] transition duration-200 hover:bg-[#008CEE] hover:text-white"
                          title="Instagram"
                        >
                          <Icon name="instagram" size={18} />
                        </a>
                      </li>
                    )}
                    {consultant.email && (
                      <li>
                        <a
                          href={`mailto:${consultant.email}`}
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/70 text-[#7A838C] transition duration-200 hover:bg-[#008CEE] hover:text-white"
                          title="E-mail"
                        >
                          <Icon name="mail" size={18} />
                        </a>
                      </li>
                    )}
                    {consultant.websiteUrl && (
                      <li>
                        <a
                          href={consultant.websiteUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-200/70 text-[#7A838C] transition duration-200 hover:bg-[#008CEE] hover:text-white"
                          title="Website"
                        >
                          <Icon name="globe" size={18} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* LADO DIREITO */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-8">
            {/* CARD SUPERIOR DIREITO: APRESENTAÇÃO */}
            <div className="about-content-part flex flex-1 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm sm:p-10">
              <div>
                <p className="text-xs font-medium text-[#7A838C]">Olá!</p>
                <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
                  Sou <span className="text-[#008CEE]">{consultant.name}</span>,{' '}
                  {consultant.tagline}
                </h2>

                <div className="adress-field mt-6">
                  <ul className="flex items-center gap-2 text-xs font-medium text-slate-600">
                    <li className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008CEE] opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#008CEE]"></span>
                      </span>
                      Disponível para atendimento online
                    </li>
                  </ul>
                </div>
              </div>

              <div className="hero-btns mt-8">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-b from-[#00A3FF] via-[#008CEE] to-[#0070C8] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#008CEE]/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-[#008CEE]/40 active:scale-95"
                >
                  <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent rounded-t-xl" />
                  <span className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 ease-out group-hover:left-full" />

                  {/* Conteúdo do Botão */}
                  <span className="relative z-10 flex items-center gap-2 drop-shadow-sm">
                    Falar no WhatsApp <Icon name="whatsapp" size={18} />
                  </span>
                </a>
              </div>
            </div>

            {/* CARD INFERIOR DIREITO: MARQUEE EM MOVIMENTO CONTÍNUO */}
            <div className="about-content-part-bottom rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#7A838C] mb-3">
                VANTAGENS ALPHA PROTEÇÕES
              </h2>
              <div className="company-list">
                <div className="scroller overflow-hidden rounded-lg bg-slate-50 py-3.5 border border-slate-100">
                  <div className="scroller__inner flex w-max animate-marquee items-center gap-10 whitespace-nowrap px-4">
                    {marqueeItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 group cursor-default"
                      >
                        <h3 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-wider group-hover:text-[#008CEE] transition-colors uppercase">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-center p-1.5 rounded-full bg-[#008CEE]/10 border border-[#008CEE]/20 text-[#008CEE]">
                          {item.icon}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD SOBRE O ATENDIMENTO */}
        <aside className="mt-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-sm font-bold tracking-tight text-slate-900">
              Sobre este atendimento
            </h3>
            <span className="rounded-md bg-[#008CEE]/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#008CEE]">
              Ativo
            </span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#7A838C]">
            {consultant.description}
          </p>
          <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-xs text-slate-600">
            <ContactRow icon="clock">{consultant.hours}</ContactRow>
            <ContactRow icon="map">
              {consultant.address} · {consultant.location}
            </ContactRow>
          </div>
        </aside>
        <section
          id="portfolio"
          className="portfolio-area mt-12"
          aria-labelledby="catalog-title"
        >
          <div className="mb-6 flex items-center justify-between border-b border-slate-200/60 pb-4">
            <div>
              <h2
                id="catalog-title"
                className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl"
              >
                Soluções Alpha Proteções
              </h2>
              <p className="mt-1 text-xs text-[#7A838C]">
                Conheça nossos planos e serviços desenvolvidos sob medida para
                sua segurança.
              </p>
            </div>
            <a
              href={consultant.websiteUrl ?? 'https://alphaprotecoes.com.br'}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-semibold text-[#008CEE] hover:underline"
            >
              Ver todas →
            </a>
          </div>

          <div className="row project-masonry-active grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {consultant.catalog.map(item => (
              <CatalogCard key={`${consultant.id}-${item.title}`} item={item} />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}
