interface SparkBarsProps { values: number[] }
export default function SparkBars({ values }: SparkBarsProps) {
  return <div className="sparkbars" aria-hidden="true">{values.map((value, index) => <span key={`${value}-${index}`} style={{ height: `${value}%` }} />)}</div>
}
