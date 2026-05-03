interface StaleBadgeProps {
  label?: string
}

export default function StaleBadge({ label = 'stale' }: StaleBadgeProps) {
  return <span className="workshop-stale-badge mono">{label}</span>
}
