import Link from 'next/link'

export default function VelouraDemoBanner() {
  return (
    <div
      role="note"
      aria-label="Demo notice"
      className="sticky top-0 z-[60] w-full bg-amber-500/95 text-amber-950 border-b border-amber-700 text-xs sm:text-sm"
    >
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-center gap-3 text-center">
        <span className="font-semibold">ForgingApps demo</span>
        <span className="hidden sm:inline">— Veloura is a fictional brand</span>
        <Link
          href="https://forgingapps.com"
          className="underline underline-offset-2 font-semibold hover:text-black whitespace-nowrap"
        >
          Back to forgingapps.com →
        </Link>
      </div>
    </div>
  )
}
