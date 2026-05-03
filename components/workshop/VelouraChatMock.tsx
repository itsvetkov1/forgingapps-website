interface VelouraChatMockProps {
  userMsg: string
  botMsg: string
  productLine: string
  inStock: string
  resolutionLine: string
}

export default function VelouraChatMock({ userMsg, botMsg, productLine, inStock, resolutionLine }: VelouraChatMockProps) {
  return (
    <div className="rounded-lg border border-[var(--hairline)] bg-[#10161d] p-4">
      <div className="mb-3 max-w-[82%] rounded-lg bg-[var(--panel-2)] p-3 text-xs text-[var(--ink-200)]">{userMsg}</div>
      <div className="ml-auto mb-3 max-w-[86%] rounded-lg border border-[rgba(74,222,128,.24)] bg-[rgba(74,222,128,.08)] p-3 text-xs text-[var(--ink-100)]">{botMsg}</div>
      <div className="rounded-lg border border-[var(--hairline-strong)] bg-[rgba(216,102,11,.08)] p-3">
        <p className="font-cinzel text-sm text-[var(--forge-gold)]">Solène silk slip</p>
        <p className="mono mt-1 text-[11px] text-[var(--ink-300)]">{productLine} · {inStock}</p>
        <p className="mono mt-3 text-[10px] text-[var(--live)]">{resolutionLine}</p>
      </div>
    </div>
  )
}
