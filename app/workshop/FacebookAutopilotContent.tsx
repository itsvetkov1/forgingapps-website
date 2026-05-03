'use client'

import Link from 'next/link'
import ActivityItem from '@/components/workshop/ActivityItem'
import DiagramNode from '@/components/workshop/DiagramNode'
import SparkBars from '@/components/workshop/SparkBars'
import AiOperatedBadge from '@/components/workshop/AiOperatedBadge'
import useWorkshopStats from '@/components/workshop/useWorkshopStats'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function FacebookAutopilotContent() {
  const { language, localePath } = useLanguage()
  const copy = translations[language].workshop
  const { data } = useWorkshopStats()
  const fb = data.exhibits['facebook-autopilot']

  return (
    <main className="workshop scanlines min-h-screen bg-forge-dark text-[var(--ink-100)]">
      <section className="border-b border-[var(--hairline)]">
        <div className="container-custom py-16 md:py-24">
          <Link href={localePath('/workshop')} className="kicker">{copy.detail.breadcrumbHome}</Link>
          <div className="mt-5"><AiOperatedBadge label={copy.detail.breadcrumbActive} /></div>
          <h1 className="mt-6 max-w-4xl font-cinzel text-5xl text-[var(--forge-gold)] md:text-7xl">Facebook Autopilot</h1>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-[var(--ink-300)]">forger-social-01 researches, drafts, schedules, publishes, and replies on a live public Facebook page with audit logs and kill-switches armed.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {[['Days autonomous', fb.daysAutonomous], ['Posts this month', fb.postsThisMonth], ['Comments answered', fb.commentsAnswered], ['Avg response', `${fb.avgResponseTimeMin} min`]].map(([label, value]) => <div key={label} className="counter-card"><p className="counter-label">{label}</p><p className="counter-value text-3xl">{value}</p></div>)}
          </div>
        </div>
      </section>

      <section className="container-custom grid gap-8 py-16 lg:grid-cols-[1fr_360px]">
        <div className="space-y-8">
          <article className="panel p-6 md:p-8">
            <h2 className="font-cinzel text-3xl text-[var(--forge-gold)]">{copy.detail.sectionHowItWorks}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_40px_1fr_40px_1fr]">
              <DiagramNode tag="input" name="Signals" sub="calendar, page context, comments" />
              <div className="diagram-arrow">→</div>
              <DiagramNode tag="agent" name="forger-social-01" sub="draft, guardrail, schedule" />
              <div className="diagram-arrow">→</div>
              <DiagramNode tag="output" name="Facebook page" sub="post + reply receipts" />
            </div>
          </article>
          <article className="panel p-6 md:p-8">
            <h2 className="font-cinzel text-3xl text-[var(--forge-gold)]">{copy.detail.sectionWhyItMatters}</h2>
            <p className="mt-4 text-lg leading-8 text-[var(--ink-300)]">This exhibit proves an agent can run a public-facing channel without pretending to be human: every action is logged, AI operation is disclosed, and human intervention is measured instead of hidden.</p>
          </article>
          <article className="panel p-6 md:p-8">
            <h2 className="font-cinzel text-3xl text-[var(--forge-gold)]">{copy.detail.activityHeading}</h2>
            <div className="mt-4">
              <ActivityItem time="12m" headline="Published scheduled proof-of-work post" reasoning="Matched the workshop launch theme, checked duplicate-window, queued without human edit." />
              <ActivityItem time="38m" headline="Answered comment with disclosure-safe phrasing" reasoning="Detected question intent, avoided sales overclaim, linked human contact path." />
              <ActivityItem time="2h" headline="Skipped low-confidence reply" reasoning="Escalation is not counted as intervention; audit trail preserved." />
            </div>
          </article>
        </div>
        <aside className="space-y-6">
          <div className="panel p-5"><p className="counter-label">30-day activity</p><SparkBars values={[35,48,42,55,66,72,61,80,58,74,88,70]} /></div>
          <div className="panel p-5"><p className="counter-label">Compliance</p><div className="stat-row"><span className="stat-label">AI label</span><span className="stat-value text-[var(--live)]">visible</span></div><div className="stat-row"><span className="stat-label">Kill switch</span><span className="stat-value">armed</span></div><Link href={localePath('/workshop/disclosure')} className="btn btn-secondary mt-5 w-full">Disclosure</Link></div>
        </aside>
      </section>
    </main>
  )
}
