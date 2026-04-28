import { useId } from 'react'

interface EmberFlameIconProps {
  className?: string
  small?: boolean
}

export default function EmberFlameIcon({ className = '', small = false }: EmberFlameIconProps) {
  const size = small ? 24 : 36
  const gradientId = useId()
  const bubbleGradientId = `ember-bubble-flame-${gradientId}`
  const innerGradientId = `ember-inner-flame-${gradientId}`
  const emberCoreGradientId = `ember-core-flame-${gradientId}`
  const highlightGradientId = `ember-flame-highlight-${gradientId}`

  return (
    <>
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30 ember-flame-shell ${small ? 'h-9 w-9' : 'h-14 w-14'} ${className}`}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ember-flame-core"
        >
          <path
            d="M25.9 16.4c0 6-4.5 10.6-10.3 10.6-1.6 0-3.1-.3-4.4-1l-4.7 1.3 1.2-4.2a10.1 10.1 0 0 1-2.3-6.5c0-4.6 2.7-7.7 5.1-10.4 1.8-2 3.4-3.9 3.2-6.6 2.5 1.3 4.1 3.5 4.7 6.3.8-1 1.3-2.2 1.5-3.5 3.7 3.2 6 7.2 6 14Z"
            fill={`url(#${bubbleGradientId})`}
            stroke="#FFF2B8"
            strokeWidth="0.8"
          />
          <path
            d="M21 16.5c0 3.7-2.3 6.6-5.5 6.6-3 0-5.2-2.6-5.2-5.9 0-2.7 1.6-4.4 3-6 1-1.2 2-2.2 1.9-3.8 1.4.8 2.2 2.1 2.5 3.8.6-.6 1-1.4 1.1-2.3 1.5 1.7 2.2 4.1 2.2 7.6Z"
            fill={`url(#${innerGradientId})`}
          />
          <path
            d="M17.7 18c0 1.8-1.2 3.2-2.8 3.2-1.5 0-2.7-1.3-2.7-3 0-1.4.8-2.3 1.5-3 .5-.6 1-1.1 1-1.9.8.5 1.3 1.2 1.5 2.2.3-.4.5-.8.6-1.4.6.9.9 2.1.9 3.9Z"
            fill={`url(#${emberCoreGradientId})`}
          />
          <path
            d="M21.7 8.8c1.2 1.9 1.9 4.2 1.9 7.1 0 3.8-1.8 6.9-4.6 8.3"
            stroke={`url(#${highlightGradientId})`}
            strokeWidth="2.3"
            strokeLinecap="round"
            opacity="0.72"
          />
          <path
            d="M9.1 21.8c.9.9 2.1 1.6 3.5 1.9"
            stroke="#FFF7CC"
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.55"
          />
          <path
            d="M8.7 24.2 6.5 27.3l3.8-1.1"
            fill="#B51A00"
            opacity="0.42"
          />
          <defs>
            <linearGradient id={bubbleGradientId} x1="8" y1="27" x2="23" y2="3" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF7A00" />
              <stop offset="0.32" stopColor="#FFD84A" />
              <stop offset="0.72" stopColor="#FFF4A3" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
            <linearGradient id={innerGradientId} x1="12" y1="23" x2="19" y2="8" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FF5A00" />
              <stop offset="0.5" stopColor="#FFD84A" />
              <stop offset="1" stopColor="#FFF8B8" />
            </linearGradient>
            <linearGradient id={emberCoreGradientId} x1="13" y1="21" x2="17" y2="14" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9B1600" />
              <stop offset="0.48" stopColor="#FF7A00" />
              <stop offset="1" stopColor="#FFF6A6" />
            </linearGradient>
            <linearGradient id={highlightGradientId} x1="20" y1="24" x2="24" y2="9" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.42" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#FFF4A3" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <style jsx global>{`
        @keyframes ember-flame-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 18px rgba(249, 115, 22, 0.35); }
          50% { transform: scale(1.03); box-shadow: 0 0 28px rgba(251, 191, 36, 0.45); }
        }

        @keyframes ember-flame-flicker {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px); }
        }

        .ember-flame-shell {
          animation: ember-flame-pulse 2.8s ease-in-out infinite;
        }

        .ember-flame-core {
          animation: ember-flame-flicker 1.8s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
