interface PanelFootNoteProps {
  copy: {
    title: string
    body: string
  }
}

export default function PanelFootNote({ copy }: PanelFootNoteProps) {
  return (
    <div className="mt-10 rounded-2xl border border-[rgba(196,160,98,0.12)] bg-[#141a22] px-4 py-4 text-sm text-[#a8a39b]">
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.24em] text-[#c4a062]/80">{copy.title}</p>
      <p>{copy.body}</p>
    </div>
  )
}
