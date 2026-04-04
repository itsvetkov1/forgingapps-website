import { getProductBySlug, getRelatedProducts, products } from "@/lib/veloura-shop-data"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetail from "./ProductDetail"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: "Product — Veloura" }
  return {
    title: `${product.name} — Veloura`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return notFound()
  const relatedProducts = getRelatedProducts(product)
  return <ProductDetail product={product} relatedProducts={relatedProducts} />
}
