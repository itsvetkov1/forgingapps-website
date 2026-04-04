import type { Metadata } from "next"
import { VelouraCartProvider } from "@/contexts/VelouraCartContext"
import Navbar from "@/components/veloura-shop/Navbar"
import Footer from "@/components/veloura-shop/Footer"

export const metadata: Metadata = {
  title: "Veloura — Everyday essentials, built to last",
  description:
    "Shop the Veloura collection — hoodies, tees, pants, jackets and accessories. Thoughtfully designed, responsibly made.",
}

export default function VelouraShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <VelouraCartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </VelouraCartProvider>
  )
}
