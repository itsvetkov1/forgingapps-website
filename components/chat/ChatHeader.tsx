interface ChatHeaderProps {
  copy: {
    title: string
    subtitle: string
  }
  finalizedBanner?: {
    dateLabel: string
    bannerText: string
    recapLine: string | null
  } | null
}

export default function ChatHeader({ copy, finalizedBanner }: ChatHeaderProps) {
  return (
    <header className="border-b border-[#e8d7ba]/12 bg-[#141a22] px-4 py-4 min-[840px]:px-6">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_30%_30%,#ffb36b_0%,#d8660b_45%,#6f2f02_100%)] shadow-[0_12px_28px_rgba(216,102,11,0.32)]">
          <span className="text-lg text-white">✦</span>
        </div>
        <div>
          <p className="font-cinzel text-2xl text-[#f8f0e3]">{copy.title}</p>
          <p className="text-sm text-[#c7b79f]">{copy.subtitle}</p>
        </div>
      </div>
      {finalizedBanner ? (
        <div
          data-test="brief-received-finalized-banner"
          className="mt-4 rounded-[24px] border border-[#d8660b]/35 bg-[#221a14] px-4 py-4 text-sm leading-6 text-[#f8f0e3]"
        >
          <p>{finalizedBanner.bannerText}</p>
          <p data-test="brief-received-finalized-date" className="sr-only">{finalizedBanner.dateLabel}</p>
          {finalizedBanner.recapLine ? <p className="mt-2 text-[#e8d7ba]">{finalizedBanner.recapLine}</p> : null}
        </div>
      ) : null}
    </header>
  )
}
