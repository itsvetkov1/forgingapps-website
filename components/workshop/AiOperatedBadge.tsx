interface AiOperatedBadgeProps {
  label: string
}

export default function AiOperatedBadge({ label }: AiOperatedBadgeProps) {
  return <span className="live-badge"><span className="live-dot" aria-hidden="true" />{label}</span>
}
