'use client'

import React from 'react'
import type { Consultant } from '@/app/lib/consultant'
import { getWhatsAppUrl } from '@/app/lib/consultant'
import ProfileAvatar from './ProfileAvatar'
import CatalogCard from './CatalogCard'
import Icon from './Icon'
import BusinessHours from './BusinessHours'

interface HeroSectionProps {
  consultant: Consultant
  whatsappUrl?: string
}

export default function HeroSection({
  consultant,
  whatsappUrl: customWhatsappUrl
}: HeroSectionProps) {
  const whatsappUrl =
    customWhatsappUrl ||
    getWhatsAppUrl(consultant.whatsappNumber, consultant.name)

  return (
    <section className="mx-auto w-full max-w-6xl space-y-6 overflow-hidden px-3 py-4 sm:px-6 lg:px-8">
      {/* GRID SUPERIOR */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* COLUNA ESQUERDA - CARTÃO DO CONSULTOR */}
        <div className="flex w-full min-w-0 flex-col items-center justify-between rounded-3xl border border-slate-200/80 bg-white p-5 text-center shadow-sm sm:p-6 md:col-span-4">
          <div className="flex w-full min-w-0 flex-col items-center">
            <ProfileAvatar consultant={consultant} />

            <h2 className="mt-4 truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
              {consultant.name}
            </h2>
            <p className="mt-1 text-xs font-medium text-slate-500">
              {consultant.role || 'Consultor de negócios e proteção'}
            </p>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-600 sm:text-xs">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#008CEE] opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#008CEE]" />
              </span>
              Disponível para atendimento online
            </div>
          </div>

          {/* BOTÕES DE CONTATO (WHATSAPP + TELEGRAM) */}
          <div className="mt-6 flex w-full items-center justify-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative flex min-w-0 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-b from-[#00A3FF] via-[#008CEE] to-[#0070C8] px-3 py-3 text-xs font-bold text-white shadow-lg shadow-[#008CEE]/30 transition-all duration-300 hover:scale-[1.02] active:scale-95 sm:px-4 sm:py-3.5 sm:text-sm"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-linear-to-b from-white/35 to-transparent" />
              <span className="pointer-events-none absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-all duration-1000 ease-out group-hover:left-full" />

              <span className="relative z-10 flex items-center gap-1.5 truncate drop-shadow-sm sm:gap-2">
                Falar no WhatsApp <Icon name="whatsapp" size={16} />
              </span>
            </a>

            <a
              href="https://t.me/AlphaProtecoesBot"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#24A1DE] shadow-sm transition-all duration-200 hover:border-[#24A1DE] hover:bg-[#24A1DE] hover:text-white active:scale-95 sm:h-12 sm:w-12"
              title="Atendimento via Telegram"
              aria-label="Telegram"
            >
              <Icon name="telegram" size={18} />
            </a>
          </div>
        </div>

        {/* COLUNA DIREITA - HEADLINE, SOBRE E HORÁRIO */}
        <div className="w-full min-w-0 md:col-span-8">
          <div className="flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div>
              <span className="text-xs font-semibold text-slate-400 sm:text-sm">
                Olá!
              </span>

              {/* Título com fonte menor (text-base até text-xl) */}
              <h1 className="mt-1 text-base font-bold tracking-tight text-slate-900 wrap-break-words sm:text-lg">
                Sou <span className="text-[#008CEE]">{consultant.name}</span>,{' '}
                {consultant.tagline}
              </h1>

              {/* Descrição que preenche o espaço em branco */}
              <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                {consultant.description ||
                  'Conectamos corretores e consultores a um portfólio completo de seguros e proteção veicular. Conheça nossa parceria.'}
              </p>
            </div>

            {/* Bloco de Informações de Local e Horário */}
            <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
              {/* Endereço */}
              <div className="flex items-start gap-2 text-xs text-slate-600 sm:text-sm">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{consultant.address}</span>
              </div>

              {/* Componente Dropdown de Horário */}
              <BusinessHours
                hoursList={consultant.businessHoursList}
                currentHours={consultant.hours}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO NOSSAS MARCAS E PARCEIROS */}
      <div className="w-full min-w-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <h3 className="text-base font-bold text-slate-900 sm:text-lg">
            Nossas Marcas e Parceiros
          </h3>
          <p className="mt-1 text-xs text-[#7A838C] sm:text-sm">
            Caminhos seguros e personalizados para você, sua família ou seu
            negócio.
          </p>
        </div>

        <div className="my-5 border-t border-slate-100" />

        {/* CARROSSEL CONTINUO COM LOGOS EM TAMANHO PROPORCIONAL E TEMPO SUAVE */}
        <div className="relative w-full overflow-hidden py-1">
          <div className="flex w-full overflow-hidden">
            <div className="flex animate-marquee items-center space-x-12 whitespace-nowrap [animation-duration:35s] sm:space-x-16">
              {/* PRIMEIRO BLOCO DE LOGOS */}
              <img
                src="/logos/alpha.png"
                alt="Alpha Proteções"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/auto-mensal.png"
                alt="Auto Mensal"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/movimento-mais-seguro.png"
                alt="Movimento Mais Seguro"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/potere-consorcio.png"
                alt="Potere Consórcio"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/solucoes-corretora.png"
                alt="Soluções Corretora"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/movimento-mais-brasil.png"
                alt="Movimento Mais Brasil"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />

              {/* DUPLICAÇÃO PARA EFEITO LOOPING PERFEITO */}
              <img
                src="/logos/alpha.png"
                alt="Alpha Proteções"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/auto-mensal.png"
                alt="Auto Mensal"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/movimento-mais-seguro.png"
                alt="Movimento Mais Seguro"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/potere-consorcio.png"
                alt="Potere Consórcio"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/solucoes-corretora.png"
                alt="Soluções Corretora"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
              <img
                src="/logos/movimento-mais-brasil.png"
                alt="Movimento Mais Brasil"
                className="h-8 w-auto object-contain transition-transform duration-300 hover:scale-105 sm:h-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CATÁLOGO DE SOLUÇÕES */}
      <section
        className="mt-8 w-full min-w-0 sm:mt-10"
        aria-labelledby="catalog-title"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="catalog-title"
            className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl"
          >
            Soluções Alpha Proteções
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {consultant.catalog.map(item => (
            <CatalogCard key={`${consultant.id}-${item.title}`} item={item} />
          ))}
        </div>
      </section>
    </section>
  )
}
