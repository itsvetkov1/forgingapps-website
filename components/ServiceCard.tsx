'use client'

import Link from 'next/link'

interface ServiceCardProps {
  icon: string
  name: string
  description: string
  regularPrice: string
  launchPrice: string
  badge?: string
  href?: string
}

export default function ServiceCard({
  icon,
  name,
  description,
  regularPrice,
  launchPrice,
  badge,
  href = '/services',
}: ServiceCardProps) {
  return (
    <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-6 hover:border-forge-ember/60 card-hover transition-all">
      {badge && (
        <div className="mb-3 inline-block">
          <span className="price-discount bg-forge-ember/20 text-forge-ember px-2 py-1 rounded text-xs font-semibold">
            {badge}
          </span>
        </div>
      )}

      <div className="text-4xl mb-4">{icon}</div>

      <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-2">
        {name}
      </h3>

      <p className="text-gray-400 text-sm mb-4">
        {description}
      </p>

      <div className="mb-6">
        <div className="price-regular text-sm">{regularPrice}</div>
        <div className="flex items-baseline gap-2">
          <span className="price-current">{launchPrice}</span>
          <span className="price-discount text-forge-ember">Launch Discount</span>
        </div>
      </div>

      <Link
        href={href}
        className="inline-block text-forge-gold hover:text-forge-ember transition font-semibold text-sm"
      >
        Learn More →
      </Link>
    </div>
  )
}
