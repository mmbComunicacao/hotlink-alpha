import React from 'react'

export type IconName =
  | 'arrow'
  | 'chevron'
  | 'mail'
  | 'map'
  | 'clock'
  | 'instagram'
  | 'globe'
  | 'whatsapp'

interface IconProps {
  name: IconName
  size?: number
}

export default function Icon({ name, size = 18 }: IconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true
  }

  if (name === 'arrow')
    return (
      <svg {...common}>
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    )
  if (name === 'chevron')
    return (
      <svg {...common}>
        <path d="m7 9 5 5 5-5" />
      </svg>
    )
  if (name === 'mail')
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  if (name === 'map')
    return (
      <svg {...common}>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  if (name === 'clock')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    )
  if (name === 'instagram')
    return (
      <svg {...common}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </svg>
    )
  if (name === 'globe')
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    )
  return (
    <svg {...common}>
      <path d="M20.5 11.2a8.6 8.6 0 0 1-12.4 7.7L4 20l1.1-3.9A8.6 8.6 0 1 1 20.5 11.2Z" />
      <path d="M8.2 8.7c.2-.4.5-.4.8-.4h.5c.2 0 .4.1.5.4l.8 1.8c.1.2.1.4-.1.6l-.6.7c.7 1.2 1.7 2.1 3 2.7l.6-.7c.2-.2.4-.2.7-.1l1.7.8c.3.1.4.3.4.6v.5c0 .3-.1.6-.4.8-.5.4-1.1.5-1.7.4-3.8-.7-6.5-3.4-7.2-7.1-.1-.6 0-1.2.4-1.8Z" />
    </svg>
  )
}
