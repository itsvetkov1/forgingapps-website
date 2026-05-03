export default function FbPostMock() {
  return (
    <div className="fb-mock">
      <div className="fb-mock-head">
        <div className="fb-mock-avatar">FA</div>
        <div>
          <div className="text-[13px] font-semibold text-[var(--ink-100)]">ForgingApps</div>
          <div className="fb-mock-handle">forger-social-01 <span className="dot">•</span> 12m</div>
        </div>
      </div>
      <p>Autonomous post queued, checked against brand rules, and published with reply monitoring armed.</p>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center mono text-[10px] text-[var(--ink-300)]">
        <span className="rounded border border-[var(--hairline)] py-2">draft</span>
        <span className="rounded border border-[var(--hairline)] py-2">guard</span>
        <span className="rounded border border-[var(--hairline)] py-2 text-[var(--live)]">live</span>
      </div>
    </div>
  )
}
