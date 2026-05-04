'use client'

import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import AiOperatedBadge from './AiOperatedBadge'

interface ExhibitTileStat {
  label: string
  value: string | number
  unit?: string
  isLead?: boolean
  color?: 'live' | 'default'
}

interface ExhibitTileAction {
  label: string
  href: string
  variant: 'primary' | 'secondary' | 'ghost'
}

interface ExhibitTileProps {
  exhibitNumber: string
  agentId: string
  agentVersion: string
  title: string
  tagline: string
  isLive: boolean
  stats: ExhibitTileStat[]
  preview: ReactNode
  actions: ExhibitTileAction[]
  defaultCollapsed?: boolean
  badgeLabel: string
  dataTest: string
}

export default function ExhibitTile({ exhibitNumber, agentId, agentVersion, title, tagline, isLive, stats, preview, actions, defaultCollapsed = false, badgeLabel, dataTest }: ExhibitTileProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const apply = () => setCollapsed(media.matches || defaultCollapsed)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [defaultCollapsed])

  return (
    <article className="panel panel-stone tick-corners overflow-hidden" data-test={dataTest}>
      <button type="button" className="w-full p-5 text-left md:cursor-default" onClick={() => setCollapsed(!collapsed)} aria-expanded={!collapsed}>
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="mono text-xs uppercase tracking-[0.28em] text-[var(--forge-ember)]">exhibit {exhibitNumber}</p>
            <h3 className="mt-2 font-cinzel text-2xl text-[var(--forge-gold)]">{title}</h3>
          </div>
          <AiOperatedBadge label={isLive ? badgeLabel : 'idle'} />
        </div>
        <p className="text-sm leading-6 text-[var(--ink-300)]">{tagline}</p>
        <p className="mono mt-4 text-[11px] uppercase tracking-[.16em] text-[var(--ink-400)]">{agentId} · {agentVersion}</p>
      </button>
      <div className={collapsed ? 'hidden md:block' : 'block'}>
        <div className="divider" />
        <div className="grid gap-6 p-5 lg:grid-cols-[1fr_.95fr]">
          <div>
            {stats.map((stat) => (
              <div key={stat.label} className={stat.isLead ? 'stat-row rounded-lg bg-[rgba(216,102,11,.08)] px-3' : 'stat-row'}>
                <span className="stat-label">{stat.label}</span>
                <span className={stat.color === 'live' ? 'stat-value text-[var(--live)]' : 'stat-value'}>{stat.value}<span className="unit">{stat.unit}</span></span>
              </div>
            ))}
            <div className="mt-5 flex flex-wrap gap-3">
              {actions.map((action) => {
                const isExternal = /^https?:\/\//.test(action.href)
                const externalProps = isExternal ? { target: '_blank', rel: 'noopener noreferrer' as const } : {}
                return (
                  <Link key={action.href + action.label} href={action.href} className={`btn btn-${action.variant}`} {...externalProps}>
                    {action.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div>{preview}</div>
        </div>
      </div>
    </article>
  )
}
