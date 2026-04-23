import type { BriefRecord } from '@/lib/chat-intake'

interface BriefContextStripProps {
  brief: BriefRecord | null
  copy: {
    project: string
    interest: string
    launch: string
  }
}

export default function BriefContextStrip({ brief, copy }: BriefContextStripProps) {
  const cards = [
    { label: copy.project, value: brief?.project || '—' },
    { label: copy.interest, value: brief?.interest || '—' },
    { label: copy.launch, value: brief?.launch || '—' },
  ]

  return (
    <div className="mt-4 grid gap-3 min-[840px]:grid-cols-3">
      {cards.map((card) => (
        <article key={card.label} className="rounded-[22px] border border-[#e8d7ba]/12 bg-[#161f29] px-4 py-4 shadow-[0_16px_45px_rgba(0,0,0,0.18)] backdrop-blur">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#b8a992]">{card.label}</p>
          <p className="mt-3 text-sm font-medium leading-6 text-[#f3ede3]">{card.value}</p>
        </article>
      ))}
    </div>
  )
}
