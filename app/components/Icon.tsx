import React from 'react'

export type IconName = 'whatsapp' | 'telegram' | 'arrow' | 'close' | 'check'

interface IconProps {
  name: IconName
  size?: number
  className?: string
}

export default function Icon({ name, size = 20, className = '' }: IconProps) {
  switch (name) {
    case 'whatsapp':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M12.012 2c-5.508 0-9.989 4.478-9.99 9.984 0 1.763.459 3.483 1.332 5.001l-1.416 5.169 5.289-1.387c1.468.8 3.127 1.222 4.783 1.223h.004c5.507 0 9.988-4.478 9.989-9.984 0-2.668-1.038-5.176-2.925-7.062a9.923 9.923 0 0 0-7.056-2.947zm0 1.666c4.587 0 8.318 3.731 8.319 8.318 0 2.221-.865 4.308-2.437 5.879-1.571 1.57-3.657 2.435-5.882 2.435h-.003c-1.42 0-2.813-.377-4.045-1.09l-.29-.168-3.003.787.801-2.926-.188-.299a8.271 8.271 0 0 1-1.267-4.388c.001-4.587 3.733-8.318 8.32-8.318z" />
        </svg>
      )
    case 'telegram':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
        >
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )
    case 'arrow':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={className}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      )
    default:
      return null
  }
}
