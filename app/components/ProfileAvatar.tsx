'use client'

import React, { useState, useEffect } from 'react'
import type { Consultant } from '@/app/lib/consultant'

export default function ProfileAvatar({
  consultant
}: {
  consultant: Consultant
}) {
  const fallbackLogo = '/logos/logo-alpha.png'
  const [imgSrc, setImgSrc] = useState(consultant.avatarUrl || fallbackLogo)

  // Atualiza caso os dados do consultor mude
  useEffect(() => {
    setImgSrc(consultant.avatarUrl || fallbackLogo)
  }, [consultant.avatarUrl])

  return (
    <div className="relative mx-auto h-28 w-28 sm:h-32 sm:w-32">
      <div className="absolute -inset-2 rounded-full border border-[#008CEE]/20 bg-[#008CEE]/10" />

      <img
        src={imgSrc}
        alt={`Foto de ${consultant.name}`}
        onError={() => {
          // Garante a troca imediata para a logo se a URL falhar
          setImgSrc(fallbackLogo)
        }}
        className="relative h-full w-full rounded-full object-cover shadow-xl shadow-slate-200/70 ring-4 ring-white"
      />

      {consultant.isVerified && (
        <span
          className="absolute bottom-1 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[#008CEE] text-white shadow-md shadow-[#008CEE]/30"
          title="Perfil verificado"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            aria-hidden="true"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </span>
      )}
    </div>
  )
}
