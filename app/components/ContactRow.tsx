import React from 'react'
import Icon, { type IconName } from './Icon'

interface ContactRowProps {
  icon: Extract<IconName, 'mail' | 'map' | 'clock' | 'instagram' | 'globe'>
  children: React.ReactNode
  href?: string
}

export default function ContactRow({ icon, children, href }: ContactRowProps) {
  const content = (
    <>
      <span className="mt-0.5 text-teal-700">
        <Icon name={icon} size={17} />
      </span>
      <span className="min-w-0 flex-1 wrap-break-word">{children}</span>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="flex items-start gap-3 text-sm leading-6 text-slate-600 transition hover:text-teal-700"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-start gap-3 text-sm leading-6 text-slate-600">
      {content}
    </div>
  )
}
