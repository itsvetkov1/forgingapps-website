interface EmberFlameIconProps {
  className?: string
  small?: boolean
}

export default function EmberFlameIcon({ className = '', small = false }: EmberFlameIconProps) {
  const size = small ? 18 : 24

  return (
    <>
      <span
        aria-hidden="true"
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-orange-500/30 ember-flame-shell ${small ? 'h-9 w-9' : 'h-14 w-14'} ${className}`}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ember-flame-core"
        >
          <path
            d="M12.7 2.5c.2 2-1 3.4-2.3 4.9-1.7 1.9-3.6 4-3.6 7 0 3.7 2.4 6.6 5.5 6.6 3.4 0 5.7-2.8 5.7-6.3 0-3.2-1.8-5.1-3.2-6.6-.9-1-1.7-1.8-2-3.2-.8.8-1.4 1.7-1.8 2.8-.6-.9-.8-2.2-.6-5.2.1-.2-.6-.2-.7 0Z"
            fill="url(#ember-flame-gradient)"
          />
          <path
            d="M12.2 9.8c.1 1-.5 1.8-1.1 2.5-.8.9-1.7 1.9-1.7 3.4 0 1.8 1.2 3.3 2.8 3.3 1.7 0 2.9-1.4 2.9-3.1 0-1.5-.9-2.5-1.6-3.3-.4-.5-.8-.9-1-1.6-.4.4-.7.8-.9 1.4-.2-.4-.3-1.1-.2-2.5 0-.1-.3-.1-.3-.1Z"
            fill="rgba(255,245,230,0.92)"
          />
          <defs>
            <linearGradient id="ember-flame-gradient" x1="7" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FCD34D" />
              <stop offset="0.45" stopColor="#F59E0B" />
              <stop offset="1" stopColor="#EA580C" />
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
