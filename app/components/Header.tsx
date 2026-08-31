import React from 'react'
import Image from 'next/image'
import ShareButton from '@/app/components/ShareButton'

interface HeaderProps {
  profileUrl: string
  source: string
}

export default function Header({ profileUrl, source }: HeaderProps) {
  return (
    <header className="relative z-10 border-b border-slate-200/70 bg-white/65 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a
          href={profileUrl}
          className="flex items-center gap-3"
          aria-label="Alpha Proteções - início"
        >
          <Image
            src="/logo.svg"
            alt="Alpha Proteções"
            sizes="100vw"
            width={0}
            height={0}
            className="h-8 w-auto"
          />
        </a>
        <div className="flex items-center gap-2">
          {source === 'demo' && (
            <span className="hidden rounded-full bg-[#008CEE]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#008CEE] sm:inline-flex">
              Perfil demonstrativo
            </span>
          )}
          <ShareButton />
        </div>
      </div>
    </header>
  )
}
