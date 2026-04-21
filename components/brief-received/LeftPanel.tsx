import Greeting from '@/components/brief-received/Greeting'
import PanelFootNote from '@/components/brief-received/PanelFootNote'
import WhatHappensNext from '@/components/brief-received/WhatHappensNext'
import type { BriefRecord } from '@/lib/chat-intake'

interface LeftPanelProps {
  brief: BriefRecord | null
  copy: any
  locale: 'en' | 'bg'
  phase: 'idle' | 'loading' | 'ready' | 'missing' | 'error'
}

export default function LeftPanel({ brief, copy, locale, phase }: LeftPanelProps) {
  return (
    <aside className="flex flex-col justify-between bg-[#111821] px-6 py-8 text-[#e8e6e1] min-[840px]:px-10 min-[840px]:py-10">
      <div>
        <div className="mb-10 flex items-center gap-3">
          <img src="/logo.svg" alt="ForgingApps logo" width={42} height={42} className="h-10 w-10" />
          <div>
            <p className="font-cinzel text-xl text-[#f3ede3]">ForgingApps</p>
            <p className="text-xs uppercase tracking-[0.24em] text-[#a8a39b]">{copy.leftPanel.kicker}</p>
          </div>
        </div>

        <Greeting firstName={brief?.firstName} label={copy.leftPanel.greeting} locale={locale} phase={phase} />
        <WhatHappensNext copy={copy.leftPanel.timeline} locale={locale} />
      </div>

      <PanelFootNote copy={copy.leftPanel.footnote} />
    </aside>
  )
}
