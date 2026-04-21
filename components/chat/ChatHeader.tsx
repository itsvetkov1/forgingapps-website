interface ChatHeaderProps {
  copy: {
    title: string
    subtitle: string
  }
}

export default function ChatHeader({ copy }: ChatHeaderProps) {
  return (
    <header className="border-b border-[#eadfca] px-4 py-4 min-[840px]:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_30%_30%,#ffb36b_0%,#d8660b_45%,#6f2f02_100%)] shadow-[0_12px_28px_rgba(216,102,11,0.32)]">
          <span className="text-lg text-white">✦</span>
        </div>
        <div>
          <p className="font-cinzel text-2xl text-[#141a22]">{copy.title}</p>
          <p className="text-sm text-[#6b6963]">{copy.subtitle}</p>
        </div>
      </div>
    </header>
  )
}
