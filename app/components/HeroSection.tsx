'use client'

import React from 'react'
import type { Consultant } from '@/app/lib/consultant'
import { getWhatsAppUrl } from '@/app/lib/consultant'
import ProfileAvatar from './ProfileAvatar'
import CatalogCard from './CatalogCard'
import Icon from './Icon'

interface HeroSectionProps {
  consultant: Consultant
}

export default function HeroSection({ consultant }: HeroSectionProps) {
  const whatsappUrl = getWhatsAppUrl(consultant.whatsappNumber, consultant.name)

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

        {/* COLUNA DIREITA - HEADLINE E VANTAGENS */}
        <div className="w-full min-w-0 space-y-6 md:col-span-8">
          <div className="w-full min-w-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
            <span className="text-xs font-semibold text-slate-400">Olá!</span>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-slate-900 break-words sm:text-2xl md:text-3xl">
              Sou <span className="text-[#008CEE]">{consultant.name}</span>,{' '}
              {consultant.tagline}
            </h1>
          </div>

          {/* FAIXA DE VANTAGENS */}
          <div className="relative w-full min-w-0 overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Vantagens Alpha Proteções
            </span>

            <div className="pointer-events-none absolute bottom-0 left-0 top-10 z-10 w-8 bg-linear-to-r from-white to-transparent sm:w-12" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-10 z-10 w-8 bg-linear-to-l from-white to-transparent sm:w-12" />

            <div className="mt-4 flex w-full overflow-hidden">
              <div className="flex animate-marquee space-x-3 whitespace-nowrap sm:space-x-4">
                <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-[11px] font-bold text-slate-800 sm:px-4 sm:py-2.5 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008CEE]/10 text-[#008CEE] sm:h-6 sm:w-6">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  </span>
                  AÇÃO IMEDIATA
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-[11px] font-bold text-slate-800 sm:px-4 sm:py-2.5 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008CEE]/10 text-[#008CEE] sm:h-6 sm:w-6">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </span>
                  GUINCHO E CHAVEIRO
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-[11px] font-bold text-slate-800 sm:px-4 sm:py-2.5 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008CEE]/10 text-[#008CEE] sm:h-6 sm:w-6">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  PROTEÇÃO VEICULAR 24H
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-[11px] font-bold text-slate-800 sm:px-4 sm:py-2.5 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008CEE]/10 text-[#008CEE] sm:h-6 sm:w-6">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </span>
                  PROTEÇÃO PARA TERCEIROS
                </div>

                <div className="flex shrink-0 items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3.5 py-2 text-[11px] font-bold text-slate-800 sm:px-4 sm:py-2.5 sm:text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008CEE]/10 text-[#008CEE] sm:h-6 sm:w-6">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20M2 12h20" />
                    </svg>
                  </span>
                  COBERTURA NACIONAL
                </div>
              </div>
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
          <a
            href={consultant.websiteUrl ?? 'https://alphaprotecoes.com.br'}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-[#008CEE] hover:underline"
          >
            Ver todas →
          </a>
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
