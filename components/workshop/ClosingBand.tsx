import Link from 'next/link'

interface ClosingBandStats {
  fleetUptimePct?: number
  agentsInProduction?: number
  auditLogRetentionDays?: number
  killSwitchState?: 'armed' | 'engaged' | 'partial' | 'unknown'
}

interface ClosingBandProps {
  data: any
  stats?: ClosingBandStats
  contactHref: string
  servicesHref: string
}

export default function ClosingBand({ data, stats, contactHref, servicesHref }: ClosingBandProps) {
  const aside = data.aside
  const uptime = stats?.fleetUptimePct != null ? `${stats.fleetUptimePct.toFixed(1)}%` : '—'
  const agents = stats?.agentsInProduction != null ? String(stats.agentsInProduction) : '—'
  const audit = stats?.auditLogRetentionDays != null ? `${stats.auditLogRetentionDays}d` : '—'
  const ksEngaged = stats?.killSwitchState === 'engaged' || stats?.killSwitchState === 'partial'
  const ksValue = ksEngaged ? aside.engaged : aside.armed

  const rows: Array<{ label: string; value: string }> = [
    { label: aside.uptime, value: uptime },
    { label: aside.agentsInProduction, value: agents },
    { label: aside.auditLog, value: audit },
    { label: aside.killSwitch, value: ksValue },
  ]

  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[rgba(20,26,34,.9)] p-6 md:p-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="kicker">{data.kicker}</p>
          <h2 className="mt-4 max-w-3xl font-cinzel text-3xl text-[var(--forge-gold)] md:text-5xl">Most <span className="gradient-text">AI in production</span> is a screenshot. Ours has a public URL.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ink-300)]">{data.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={servicesHref} className="btn btn-primary">{data.primaryCta}</Link>
            <Link href={contactHref} className="btn btn-secondary">{data.secondaryCta}</Link>
          </div>
        </div>
        <aside className="panel p-5">
          {rows.map(({ label, value }) => (
            <div key={label} className="stat-row">
              <span className="stat-label">{label}</span>
              <span className="stat-value">{value}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}
