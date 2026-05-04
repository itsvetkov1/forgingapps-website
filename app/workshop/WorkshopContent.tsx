'use client'

import Link from 'next/link'
import ExhibitTile from '@/components/workshop/ExhibitTile'
import ProofStrip from '@/components/workshop/ProofStrip'
import ClosingBand from '@/components/workshop/ClosingBand'
import FbPostMock from '@/components/workshop/FbPostMock'
import VelouraChatMock from '@/components/workshop/VelouraChatMock'
import AiOperatedBadge from '@/components/workshop/AiOperatedBadge'
import useWorkshopStats from '@/components/workshop/useWorkshopStats'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value)
}

function formatPercent(value: number) {
  return `${(value * 100).toFixed(1)}%`
}

function formatDate(value: string | null) {
  if (!value) return 'no human edit recorded'
  return new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' }).format(new Date(value))
}

export default function WorkshopContent() {
  const { language, localePath } = useLanguage()
  const copy = translations[language].workshop
  const { data, isStale, isFallback } = useWorkshopStats()
  const fb = data.exhibits['facebook-autopilot']
  const veloura = data.exhibits.veloura
  const velouraStoreUrl = process.env.NEXT_PUBLIC_VELOURA_STORE_URL || localePath('/demo/veloura-shop')

  return (
    <main className="workshop scanlines bg-forge-dark text-[var(--ink-100)]">
      <section className="relative overflow-hidden border-b border-[var(--hairline)] ember-grain">
        <div className="container-custom relative z-[1] py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="kicker">{copy.hero.kicker}</p>
            <div className="mt-6"><AiOperatedBadge label={copy.hero.badge} /></div>
            <h1 className="mt-6 font-cinzel text-5xl leading-none text-[var(--forge-gold)] md:text-7xl">The <span className="gradient-text">Workshop.</span></h1>
            <p className="mt-6 text-2xl text-[var(--ink-100)] md:text-3xl">{copy.hero.subtitle}</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-300)]">{copy.hero.context}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={localePath('/workshop/disclosure')} data-test="workshop-disclosure-link" className="btn btn-secondary">AI disclosure →</Link>
              <Link href={localePath('/workshop/facebook-autopilot')} className="btn btn-ghost">Inspect exhibit 01 →</Link>
            </div>
          </div>
          <div className="mt-12">
            <ProofStrip
              actions={formatNumber(data.proof.autonomousActionsLast30d)}
              interventionRate={formatPercent(data.proof.interventionRateLast30d)}
              daysSinceEdit={data.proof.daysSinceLastEditAcrossAllExhibits}
              lastEditLabel={formatDate(data.proof.lastEditTimestamp)}
              isStale={isStale || isFallback}
              staleLabel={copy.proof.staleBadge}
            />
          </div>
        </div>
      </section>

      <section className="container-custom py-16 md:py-24">
        <div className="mb-10 max-w-3xl">
          <p className="kicker">{copy.exhibits.sectionKicker.replace('{count}', '2')}</p>
          <h2 className="mt-4 font-cinzel text-4xl text-[var(--forge-gold)] md:text-5xl">{copy.exhibits.sectionTitle}</h2>
          <p className="mt-4 text-lg text-[var(--ink-300)]">{copy.exhibits.sectionDescription}</p>
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <ExhibitTile
            exhibitNumber="01"
            agentId="forger-social-01"
            agentVersion="v1.0"
            title={copy.exhibits.facebook.title}
            tagline={copy.exhibits.facebook.tagline}
            isLive
            badgeLabel="AI-operated"
            dataTest="workshop-exhibit-facebook"
            stats={[
              { label: copy.exhibits.facebook.stats.daysAutonomous, value: fb.daysAutonomous },
              { label: copy.exhibits.facebook.stats.postsThisMonth, value: fb.postsThisMonth, unit: copy.exhibits.facebook.stats.postsPlanned.replace('{count}', String(fb.postsPlanned)) },
              { label: copy.exhibits.facebook.stats.commentsAnswered, value: formatNumber(fb.commentsAnswered) },
              { label: copy.exhibits.facebook.stats.avgResponseTime, value: fb.avgResponseTimeMin, unit: 'min' },
              { label: copy.exhibits.facebook.stats.lastHumanEdit, value: fb.lastHumanEditTs ? formatDate(fb.lastHumanEditTs) : copy.exhibits.facebook.stats.neverEdited, color: 'live' },
            ]}
            preview={<FbPostMock />}
            actions={[
              { label: copy.exhibits.facebook.actions.viewOnFacebook, href: 'https://www.facebook.com/share/1GquCrojwm/', variant: 'secondary' },
              { label: copy.exhibits.facebook.actions.howItWorks, href: localePath('/workshop/facebook-autopilot'), variant: 'primary' },
            ]}
          />
          <ExhibitTile
            exhibitNumber="02"
            agentId="forger-support-veloura"
            agentVersion="v1.0"
            title={copy.exhibits.veloura.title}
            tagline={copy.exhibits.veloura.tagline}
            isLive
            badgeLabel="AI-operated"
            dataTest="workshop-exhibit-veloura"
            stats={[
              { label: copy.exhibits.veloura.stats.escalations, value: formatPercent(veloura.escalationsRate), isLead: true },
              { label: copy.exhibits.veloura.stats.conversationsHandled, value: formatNumber(veloura.conversationsHandled) },
              { label: copy.exhibits.veloura.stats.daysAutonomous, value: veloura.daysAutonomous },
              { label: copy.exhibits.veloura.stats.avgResolution, value: veloura.avgResolutionMin, unit: 'min' },
            ]}
            preview={<VelouraChatMock userMsg={copy.exhibits.veloura.mock.userMsg} botMsg={copy.exhibits.veloura.mock.botMsg} productLine={copy.exhibits.veloura.mock.productLine} inStock={copy.exhibits.veloura.mock.inStock.replace('{count}', '2')} resolutionLine={copy.exhibits.veloura.mock.resolutionLine.replace('{seconds}', '31')} />}
            actions={[
              { label: copy.exhibits.veloura.actions.visitStore, href: velouraStoreUrl, variant: 'secondary' },
              { label: copy.exhibits.veloura.actions.transcripts, href: localePath('/demo/veloura-support'), variant: 'ghost' },
              { label: copy.exhibits.veloura.actions.tryDemo, href: localePath('/demo/veloura-support'), variant: 'primary' },
            ]}
          />
        </div>
      </section>

      <section className="container-custom pb-20 md:pb-28">
        <ClosingBand data={copy.closing} servicesHref={localePath('/services')} contactHref={localePath('/contact')} />
      </section>
    </main>
  )
}
