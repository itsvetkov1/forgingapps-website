import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import StructuredData from '@/components/StructuredData'

const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://forgingapps.com'),
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <StructuredData />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-inter">{children}</body>
    </html>
  )
}
