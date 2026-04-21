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
        <article key={card.label} className="rounded-[22px] border border-[#d7cdb8] bg-white/65 px-4 py-4 shadow-[0_16px_45px_rgba(15,20,25,0.06)] backdrop-blur">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8a8177]">{card.label}</p>
          <p className="mt-3 text-sm font-medium leading-6 text-[#1d232b]">{card.value}</p>
        </article>
      ))}
    </div>
  )
}
