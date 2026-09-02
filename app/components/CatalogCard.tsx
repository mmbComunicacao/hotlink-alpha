import React from 'react'
import type { CatalogItem } from '@/app/lib/consultant'

export default function CatalogCard({ item }: { item: CatalogItem }) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col overflow-hidden rounded-none border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#008CEE]"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <span className="text-xs font-normal text-[#7A838C]">
            {item.tag ?? 'Alpha Proteções'}
          </span>

          <h3 className="mt-1 text-lg font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#008CEE]">
            {item.title}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </a>
  )
}
