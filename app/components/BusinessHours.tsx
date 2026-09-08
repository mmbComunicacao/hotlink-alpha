'use client'

import React, { useState } from 'react'
import type { BusinessHourItem } from '@/app/lib/consultant'

interface BusinessHoursProps {
  hoursList?: BusinessHourItem[]
  currentHours?: string
}

export default function BusinessHours({
  hoursList = [],
  currentHours = '08:00 - 18:00'
}: BusinessHoursProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full rounded-2xl bg-slate-50 p-4 font-sans text-slate-700 border border-slate-100">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-hidden cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-600 text-sm">
            Aberta agora
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm font-semibold text-slate-800">
            {currentHours}
          </span>
          <svg
            className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && hoursList.length > 0 && (
        <div className="mt-3 space-y-2 pt-3 border-t border-slate-200/60 text-xs">
          {hoursList.map((item, idx) => (
            <div key={idx} className="flex justify-between text-slate-500">
              <span>{item.day}</span>
              <span
                className={
                  item.hours === 'Fechada'
                    ? 'text-slate-400'
                    : 'text-slate-700 font-medium'
                }
              >
                {item.hours}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
