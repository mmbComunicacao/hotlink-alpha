import React from 'react'

export default function VantagensMarquee() {
  const vantagens = [
    {
      label: 'AÇÃO IMEDIATA',
      icon: (
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
      )
    },
    {
      label: 'GUINCHO E CHAVEIRO',
      icon: (
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
      )
    },
    {
      label: 'PROTEÇÃO VEICULAR 24H',
      icon: (
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
      )
    },
    {
      label: 'PROTEÇÃO PARA TERCEIROS',
      icon: (
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
      )
    },
    {
      label: 'COBERTURA NACIONAL',
      icon: (
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
      )
    }
  ]

  // Multiplicamos o array para cobrir telas ultra-wide sem buracos no scroll
  const itemsInfinitos = [
    ...vantagens,
    ...vantagens,
    ...vantagens,
    ...vantagens
  ]

  return (
    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden border-y border-slate-200/80 bg-white py-4 shadow-xs">
      {/* Sombreamento lateral de transição (Degradê) */}
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-24" />

      {/* Esteira de Animação */}
      <div className="flex w-full overflow-hidden">
        <div className="flex animate-marquee space-x-6 whitespace-nowrap sm:space-x-10">
          {itemsInfinitos.map((item, index) => (
            <div
              key={index}
              className="flex shrink-0 items-center gap-2 text-[11px] font-bold text-slate-800 sm:text-xs"
            >
              <span className="flex h-5 w-5 items-center justify-center text-[#008CEE] sm:h-6 sm:w-6">
                {item.icon}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
