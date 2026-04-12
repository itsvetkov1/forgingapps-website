import Link from 'next/link'

interface DemoPackageCalloutProps {
  title: string
  rationale: string
  theme?: 'dark' | 'light'
}

export default function DemoPackageCallout({ title, rationale, theme = 'dark' }: DemoPackageCalloutProps) {
  const isDark = theme === 'dark'

  return (
    <div className={`rounded-2xl border px-5 py-4 ${isDark ? 'border-forge-ember/20 bg-forge-dark/60' : 'border-gray-200 bg-gray-50'}`}>
      <p className={`text-xs font-semibold uppercase tracking-[0.22em] ${isDark ? 'text-forge-gold/70' : 'text-gray-400'}`}>
        Best package fit
      </p>
      <p className={`mt-2 text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        <Link href="/en/services" className={`underline underline-offset-4 ${isDark ? 'text-forge-gold hover:text-forge-ember' : 'text-gray-900 hover:text-gray-700'}`}>
          {title}
        </Link>
      </p>
      <p className={`mt-2 text-sm leading-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{rationale}</p>
    </div>
  )
}
