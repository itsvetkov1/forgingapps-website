import StaleBadge from './StaleBadge'

interface ProofStripProps {
  actions: string
  actionsStale: boolean
  interventionRate: string
  interventionRateStale: boolean
  daysSinceEdit: string
  daysSinceEditStale: boolean
  lastEditLabel: string
  staleLabel: string
}

export default function ProofStrip({
  actions,
  actionsStale,
  interventionRate,
  interventionRateStale,
  daysSinceEdit,
  daysSinceEditStale,
  lastEditLabel,
  staleLabel,
}: ProofStripProps) {
  const cards = [
    { test: 'workshop-proof-actions', label: 'Autonomous actions / month', value: actions, sub: 'across 2 exhibits', stale: actionsStale },
    { test: 'workshop-proof-intervention-rate', label: 'Human intervention rate', value: interventionRate, sub: 'of agent actions, last 30d · ↓ lower is better', stale: interventionRateStale },
    { test: 'workshop-proof-days-since-edit', label: 'Days since last human edit', value: daysSinceEdit, sub: `${lastEditLabel} · across all exhibits`, stale: daysSinceEditStale },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3" data-test="workshop-proof-strip">
      {cards.map((card) => (
        <article key={card.test} className="counter-card tick-corners" data-test={card.test}>
          <p className="counter-label">{card.label} {card.stale && <StaleBadge label={staleLabel} />}</p>
          <p className="counter-value">{card.value}</p>
          <p className="counter-sub">{card.sub}</p>
        </article>
      ))}
    </div>
  )
}
