import type { Metadata } from 'next'
import { Cinzel, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'ForgingApps -- Custom App Development & AI Consulting | Sofia, Bulgaria',
  description: 'Custom mobile and web applications forged by senior developers. AI consulting, cross-platform apps, and startup-friendly pricing. Based in Sofia, serving Europe.',
  keywords: 'app development, flutter, react, AI consulting, custom apps, Bulgaria, Europe',
  openGraph: {
    title: 'ForgingApps -- Custom App Development & AI Consulting',
    description: 'Apps forged to last. Senior developers, AI-powered delivery, startup-friendly pricing.',
    type: 'website',
    url: 'https://forgingapps.com',
  },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-inter bg-forge-dark text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
