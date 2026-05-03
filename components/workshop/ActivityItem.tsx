interface ActivityItemProps {
  time: string
  headline: string
  reasoning: string
}

export default function ActivityItem({ time, headline, reasoning }: ActivityItemProps) {
  return <div className="activity-item"><span className="activity-time">{time}</span><div><p className="activity-headline">{headline}</p><p className="activity-reasoning"><span className="tag">reasoning</span> {reasoning}</p></div></div>
}
