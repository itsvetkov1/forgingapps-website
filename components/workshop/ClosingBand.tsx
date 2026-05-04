import Link from 'next/link'

interface ClosingBandProps {
  data: any
  contactHref: string
  servicesHref: string
}

export default function ClosingBand({ data, contactHref, servicesHref }: ClosingBandProps) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-[var(--hairline-strong)] bg-[rgba(20,26,34,.9)] p-6 md:p-10">
      <div className="grid gap-8">
        <div>
          <p className="kicker">{data.kicker}</p>
          <h2 className="mt-4 max-w-3xl font-cinzel text-3xl text-[var(--forge-gold)] md:text-5xl">Most <span className="gradient-text">AI in production</span> is a screenshot. Ours has a public URL.</h2>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--ink-300)]">{data.body}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={servicesHref} className="btn btn-primary">{data.primaryCta}</Link>
            <Link href={contactHref} className="btn btn-secondary">{data.secondaryCta}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
