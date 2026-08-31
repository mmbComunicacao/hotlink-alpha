import React from 'react'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-200/70 bg-white/65 px-5 py-8 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p className="font-medium">
          Uma conexão{' '}
          <span className="font-semibold text-[#008CEE]">Alpha Proteções</span>{' '}
          para relações mais seguras.
        </p>
        <p>
          © {new Date().getFullYear()} Alpha Proteções. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  )
}
