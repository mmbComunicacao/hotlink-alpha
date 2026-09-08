'use client'

import React, { useState, useRef, useEffect } from 'react'

export default function ShareButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fecha o menu se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Pega a URL atual da página
  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = 'Conheça o portfólio da Alpha Proteções'

  // Links de compartilhamento direto
  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        `${shareTitle} - ${currentUrl}`
      )}`,
      color: 'hover:bg-emerald-50 text-emerald-600'
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      color: 'hover:bg-blue-50 text-blue-600'
    },
    {
      name: 'LinkedIn',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
      color: 'hover:bg-sky-50 text-sky-700'
    },
    {
      name: 'Twitter / X',
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        currentUrl
      )}&text=${encodeURIComponent(shareTitle)}`,
      color: 'hover:bg-slate-100 text-slate-900'
    },
    {
      name: 'E-mail',
      url: `mailto:?subject=${encodeURIComponent(
        shareTitle
      )}&body=${encodeURIComponent(`Confira este link: ${currentUrl}`)}`,
      color: 'hover:bg-slate-100 text-slate-600'
    }
  ]

  // Função para copiar o link para a área de transferência
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar link', err)
    }
  }

  // Tenta usar a API nativa de compartilhar do celular. Se não suportar, abre o menu customizado
  const handleMainShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: currentUrl
        })
      } catch (err) {
        // Se o usuário cancelar ou falhar, abre o menu
        setIsOpen(!isOpen)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* Botão Principal */}
      <button
        onClick={handleMainShareClick}
        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-xs transition-all hover:bg-slate-50 hover:text-slate-900 active:scale-95 cursor-pointer"
        aria-label="Compartilhar"
      >
        <svg
          className="h-4 w-4 text-slate-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Compartilhar
      </button>

      {/* Menu Dropdown de Redes Sociais */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl ring-1 ring-black/5 z-50">
          <div className="mb-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Compartilhar via
          </div>

          <div className="space-y-0.5">
            {shareLinks.map(social => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center px-3 py-2 text-xs font-medium rounded-xl transition-colors ${social.color}`}
              >
                {social.name}
              </a>
            ))}

            <button
              onClick={handleCopyLink}
              className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <span>{copied ? 'Copiado!' : 'Copiar Link'}</span>
              <span className="text-[10px] text-slate-400">🔗</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
