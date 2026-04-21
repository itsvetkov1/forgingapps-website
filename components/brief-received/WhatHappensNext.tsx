import { getBriefReceivedTimeline } from '@/lib/brief-received-content.mjs'

interface WhatHappensNextProps {
  copy: {
    eyebrow: string
    heading: string
  }
  locale: 'en' | 'bg'
}

export default function WhatHappensNext({ copy, locale }: WhatHappensNextProps) {
  const timeline = getBriefReceivedTimeline(locale) as Array<{
    title: string
    meta: string
    detail: string
    state: string
  }>

  return (
    <section>
      <p className="mb-2 text-xs uppercase tracking-[0.24em] text-[#c4a062]/80">{copy.eyebrow}</p>
      <h2 className="mb-5 text-lg font-semibold text-[#f3ede3]">{copy.heading}</h2>
      <ol className="space-y-4">
        {timeline.map((step, index) => {
          const isActive = step.state === 'active'
          return (
            <li
              key={step.title}
              className={`rounded-2xl border px-4 py-4 transition-colors ${isActive ? 'border-[#d8660b]/60 bg-[#171f29]' : 'border-[rgba(196,160,98,0.12)] bg-[#141a22]'}`}
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <span className="font-mono text-xs tracking-[0.24em] text-[#c4a062]/85">0{index + 1}</span>
                <span className={`rounded-full px-2 py-1 text-[11px] uppercase tracking-[0.2em] ${isActive ? 'bg-[#d8660b]/20 text-[#f1c49c]' : 'bg-white/5 text-[#a8a39b]'}`}>
                  {isActive ? (locale === 'bg' ? 'Активно' : 'Active') : (locale === 'bg' ? 'Изчаква' : 'Pending')}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-[#f3ede3]">{step.title}</h3>
              <p className="mt-1 text-sm text-[#a8a39b]">{step.meta}</p>
              <p className="mt-2 text-sm text-[#d7d2ca]">{step.detail}</p>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
