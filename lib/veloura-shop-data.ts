export interface Product {
  id: string
  slug: string
  name: string
  category: string
  categorySlug: string
  price: number
  salePrice: number | null
  colors: { name: string; hex: string }[]
  sizes: { label: string; available: boolean }[]
  material: string
  description: string
  careInstructions: string[]
  image: string
  featured: boolean
  tags: string[]
}

export type ProductColor = { name: string; hex: string }

export interface Category {
  name: string
  slug: string
  image: string
  productCount: number
}

export const categories: Category[] = [
  {
    name: 'Hoodies & Sweatshirts',
    slug: 'hoodies-sweatshirts',
    image: '/veloura/categories/hoodies.jpg',
    productCount: 4,
  },
  {
    name: 'T-Shirts & Tops',
    slug: 'tshirts-tops',
    image: '/veloura/categories/tshirts.jpg',
    productCount: 4,
  },
  {
    name: 'Pants & Joggers',
    slug: 'pants-joggers',
    image: '/veloura/categories/pants.jpg',
    productCount: 3,
  },
  {
    name: 'Jackets & Outerwear',
    slug: 'jackets-outerwear',
    image: '/veloura/categories/jackets.jpg',
    productCount: 3,
  },
  {
    name: 'Accessories',
    slug: 'accessories',
    image: '/veloura/categories/accessories.jpg',
    productCount: 3,
  },
  {
    name: 'Sale',
    slug: 'sale',
    image: '/veloura/hero.jpg',
    productCount: 9,
  },
]

export const products: Product[] = [
  // Hoodies and Sweatshirts
  {
    id: 'p001',
    slug: 'heavyweight-hoodie',
    name: 'Heavyweight Hoodie',
    category: 'Hoodies & Sweatshirts',
    categorySlug: 'hoodies-sweatshirts',
    price: 65,
    salePrice: 48,
    colors: [
      { name: 'Obsidian Black', hex: '#1a1a1a' },
      { name: 'Stone', hex: '#8b8680' },
      { name: 'Forest Green', hex: '#2d4a3e' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: '400gsm cotton fleece, 80% cotton / 20% polyester',
    description: 'Our signature heavyweight hoodie. Warm 400gsm cotton fleece with a relaxed fit that works just as well on a cold morning as it does on a late night. Reinforced seams, double-lined hood, and a kangaroo pocket that actually fits your hands.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron on low if needed'],
    image: '/veloura/products/heavyweight-hoodie.jpg',
    featured: true,
    tags: ['hoodie', 'fleece', 'heavyweight', 'sale'],
  },
  {
    id: 'p002',
    slug: 'zip-up-sweatshirt',
    name: 'Zip-Up Sweatshirt',
    category: 'Hoodies & Sweatshirts',
    categorySlug: 'hoodies-sweatshirts',
    price: 70,
    salePrice: 52,
    colors: [
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Navy', hex: '#1b2838' },
      { name: 'Cream', hex: '#f5f0e1' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: '320gsm cotton blend, 75% cotton / 25% polyester',
    description: 'Full-zip sweatshirt with ribbed cuffs and hem. The kind of piece you reach for three days a week because it goes with everything. Roomy kangaroo pockets, slightly cropped fit, and a collar that sits just right.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Do not iron print'],
    image: '/veloura/products/zip-up-sweatshirt.jpg',
    featured: false,
    tags: ['zip-up', 'sweatshirt', 'sale'],
  },
  {
    id: 'p003',
    slug: 'lightweight-crewneck',
    name: 'Lightweight Crewneck',
    category: 'Hoodies & Sweatshirts',
    categorySlug: 'hoodies-sweatshirts',
    price: 55,
    salePrice: null,
    colors: [
      { name: 'Heather Grey', hex: '#9ea3a8' },
      { name: 'Dusty Rose', hex: '#c4a4a4' },
      { name: 'White', hex: '#ffffff' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: true },
    ],
    material: '280gsm French terry, 100% organic cotton',
    description: 'The everyday crewneck done right. 280gsm French terry is heavy enough to keep you warm but light enough for layering. Relaxed shoulders, slightly boxy fit, and a soft hand feel that gets better with every wash.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/lightweight-crewneck.jpg',
    featured: true,
    tags: ['crewneck', 'lightweight', 'organic'],
  },
  {
    id: 'p004',
    slug: 'oversized-logo-hoodie',
    name: 'Oversized Logo Hoodie',
    category: 'Hoodies & Sweatshirts',
    categorySlug: 'hoodies-sweatshirts',
    price: 75,
    salePrice: null,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Off-White', hex: '#f0ece1' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: true },
    ],
    material: '420gsm heavyweight cotton fleece',
    description: 'Drop shoulders and a massive silhouette. Embroidered chest logo in tonal thread. This hoodie is for people who like their clothes to make a statement without saying anything. Heavyweight build, premium details throughout.',
    careInstructions: ['Machine wash cold, inside out', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/oversized-logo-hoodie.jpg',
    featured: true,
    tags: ['hoodie', 'oversized', 'logo'],
  },

  // T-Shirts and Tops
  {
    id: 'p005',
    slug: 'classic-cotton-tee',
    name: 'Classic Cotton Tee',
    category: 'T-Shirts & Tops',
    categorySlug: 'tshirts-tops',
    price: 30,
    salePrice: 22,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1b2838' },
      { name: 'Olive', hex: '#556b2f' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: '180gsm organic cotton, 100% cotton',
    description: 'The baseline. 180gsm organic cotton, classic fit, reinforced collar that doesn\'t stretch out after three washes. The kind of tee you buy in every color because you know you\'ll reach for it constantly.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/classic-cotton-tee.jpg',
    featured: false,
    tags: ['tee', 'basic', 'organic', 'sale'],
  },
  {
    id: 'p006',
    slug: 'premium-fit-tshirt',
    name: 'Premium Fit T-Shirt',
    category: 'T-Shirts & Tops',
    categorySlug: 'tshirts-tops',
    price: 38,
    salePrice: null,
    colors: [
      { name: 'Slate', hex: '#708090' },
      { name: 'Sand', hex: '#c2b280' },
      { name: 'Burgundy', hex: '#722f37' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: '200gsm Supima cotton, 100% cotton',
    description: 'Supima cotton with a tailored fit. Slightly longer hem, narrower shoulders, and a fabric weight that drapes well without being sheer. For when a plain tee needs to look like you thought about it.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Iron on low'],
    image: '/veloura/products/premium-fit-tshirt.jpg',
    featured: true,
    tags: ['tee', 'premium', 'supima'],
  },
  {
    id: 'p007',
    slug: 'long-sleeve-henley',
    name: 'Long-Sleeve Henley',
    category: 'T-Shirts & Tops',
    categorySlug: 'tshirts-tops',
    price: 45,
    salePrice: 34,
    colors: [
      { name: 'Oatmeal', hex: '#d3c4a8' },
      { name: 'Charcoal', hex: '#36454f' },
      { name: 'Forest Green', hex: '#2d4a3e' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: 'Waffle knit cotton blend, 60% cotton / 40% polyester',
    description: 'Waffle knit long-sleeve with a three-button placket. The texture adds visual interest without being loud. Great alone or layered under a jacket. The kind of piece that makes an outfit feel considered.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach', 'Do not iron buttons'],
    image: '/veloura/products/long-sleeve-henley.jpg',
    featured: false,
    tags: ['henley', 'long-sleeve', 'waffle-knit', 'sale'],
  },
  {
    id: 'p008',
    slug: 'tank-top',
    name: 'Tank Top',
    category: 'T-Shirts & Tops',
    categorySlug: 'tshirts-tops',
    price: 25,
    salePrice: null,
    colors: [
      { name: 'White', hex: '#ffffff' },
      { name: 'Black', hex: '#000000' },
      { name: 'Light Blue', hex: '#add8e6' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: '180gsm ribbed cotton, 100% cotton',
    description: 'Ribbed cotton tank with a relaxed cut. Built for layering or wearing solo in warmer months. Reinforced straps, pre-shrunk fabric, and a fit that doesn\'t quit after washing.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/tank-top.jpg',
    featured: false,
    tags: ['tank', 'summer', 'ribbed'],
  },

  // Pants and Joggers
  {
    id: 'p009',
    slug: 'slim-jogger',
    name: 'Slim Jogger',
    category: 'Pants & Joggers',
    categorySlug: 'pants-joggers',
    price: 60,
    salePrice: 45,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Grey Marl', hex: '#8b8589' },
      { name: 'Navy', hex: '#1b2838' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: 'Fleece cotton blend, 80% cotton / 20% polyester',
    description: 'Tapered leg jogger with zip pockets and elastic cuffs. The fit sits between slim and relaxed -- fitted enough to look intentional, roomy enough to move in. Elastic waist with internal drawstring.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/slim-jogger.jpg',
    featured: true,
    tags: ['jogger', 'pants', 'sale'],
  },
  {
    id: 'p010',
    slug: 'wide-leg-trousers',
    name: 'Wide-Leg Trousers',
    category: 'Pants & Joggers',
    categorySlug: 'pants-joggers',
    price: 70,
    salePrice: null,
    colors: [
      { name: 'Khaki', hex: '#c3b091' },
      { name: 'Black', hex: '#000000' },
      { name: 'Cream', hex: '#f5f0e1' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: 'Woven cotton blend, 70% cotton / 30% polyester',
    description: 'High-waisted wide-leg trousers with a pleated front and flowing drape. The kind of piece that looks dressed up but feels like pajamas. Side pockets, hidden elastic back waist, and a relaxed silhouette that works from desk to dinner.',
    careInstructions: ['Machine wash cold', 'Hang to dry', 'Iron on low'],
    image: '/veloura/products/wide-leg-trousers.jpg',
    featured: false,
    tags: ['trousers', 'wide-leg', 'pleated'],
  },
  {
    id: 'p011',
    slug: 'cargo-pants',
    name: 'Cargo Pants',
    category: 'Pants & Joggers',
    categorySlug: 'pants-joggers',
    price: 75,
    salePrice: 56,
    colors: [
      { name: 'Olive', hex: '#556b2f' },
      { name: 'Sand', hex: '#c2b280' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: true },
    ],
    material: 'Heavyweight cotton twill, 100% cotton',
    description: 'Six-pocket utility cargo pants in a relaxed straight leg. Roomy thigh pockets with flap closures, reinforced stress points, and a durable cotton twill that breaks in well. For when you need pockets that actually hold things.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/cargo-pants.jpg',
    featured: false,
    tags: ['cargo', 'pants', 'utility', 'sale'],
  },

  // Jackets and Outerwear
  {
    id: 'p012',
    slug: 'lightweight-bomber',
    name: 'Lightweight Bomber',
    category: 'Jackets & Outerwear',
    categorySlug: 'jackets-outerwear',
    price: 110,
    salePrice: 82,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Sage', hex: '#8a9a5b' },
      { name: 'Navy', hex: '#1b2838' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
      { label: 'XXL', available: false },
    ],
    material: 'Nylon shell, satin lining, ribbed trim',
    description: 'Classic MA-1 bomber silhouette in a lightweight nylon shell. Ribbed collar, cuffs, and hem with satin lining throughout. Two front pockets plus an interior zip pocket. Fits true to size with enough room for a hoodie underneath.',
    careInstructions: ['Machine wash cold', 'Hang to dry', 'Do not bleach'],
    image: '/veloura/products/lightweight-bomber.jpg',
    featured: true,
    tags: ['bomber', 'jacket', 'nylon', 'sale'],
  },
  {
    id: 'p013',
    slug: 'quilted-liner-jacket',
    name: 'Quilted Liner Jacket',
    category: 'Jackets & Outerwear',
    categorySlug: 'jackets-outerwear',
    price: 95,
    salePrice: null,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Olive', hex: '#556b2f' },
    ],
    sizes: [
      { label: 'XS', available: true },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: 'Shell: polyester; Fill: polyester quilted; Lining: nylon',
    description: 'Snap-button quilted liner jacket with diamond quilting throughout. Designed as a mid-layer but works as a light outer in mild weather. Packs down small -- comes with its own interior pocket for packing. Warm without the weight.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/quilted-liner-jacket.jpg',
    featured: false,
    tags: ['quilted', 'jacket', 'packable', 'liner'],
  },
  {
    id: 'p014',
    slug: 'field-jacket',
    name: 'Field Jacket',
    category: 'Jackets & Outerwear',
    categorySlug: 'jackets-outerwear',
    price: 130,
    salePrice: 97,
    colors: [
      { name: 'Khaki', hex: '#c3b091' },
      { name: 'Washed Black', hex: '#1a1a1a' },
    ],
    sizes: [
      { label: 'XS', available: false },
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
      { label: 'XXL', available: false },
    ],
    material: 'Waxed cotton twill, 100% cotton',
    description: 'Four-pocket field jacket in waxed cotton. Drawstring waist and hem, button-front closure, and a collar that can be worn up. The wax coating repels water and develops a patina over time. A jacket that gets better the more you wear it.',
    careInstructions: ['Wipe clean with damp cloth', 'Do not machine wash', 'Re-wax as needed'],
    image: '/veloura/products/field-jacket.jpg',
    featured: false,
    tags: ['field-jacket', 'waxed', 'cotton', 'sale'],
  },

  // Accessories
  {
    id: 'p015',
    slug: 'logo-cap',
    name: 'Logo Cap',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 25,
    salePrice: 18,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#ffffff' },
      { name: 'Stone', hex: '#8b8680' },
    ],
    sizes: [
      { label: 'One Size', available: true },
    ],
    material: 'Cotton twill, adjustable strap',
    description: 'Embroidered logo cap in cotton twill. Six-panel construction, pre-curved brim, adjustable strap closure. The strap is embossed with the Veloura wordmark. One size fits most.',
    careInstructions: ['Spot clean', 'Do not machine wash', 'Do not iron'],
    image: '/veloura/products/logo-cap.jpg',
    featured: false,
    tags: ['cap', 'hat', 'accessories', 'sale'],
  },
  {
    id: 'p016',
    slug: 'canvas-tote-bag',
    name: 'Canvas Tote Bag',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 35,
    salePrice: null,
    colors: [
      { name: 'Natural', hex: '#d3c4a8' },
      { name: 'Black', hex: '#000000' },
    ],
    sizes: [
      { label: 'One Size', available: true },
    ],
    material: '16oz heavyweight canvas, cotton straps',
    description: '16oz heavyweight canvas tote with an internal pocket. Reinforced cotton straps, double-stitched seams, and a flat bottom that actually stands up on its own. The natural color will fade beautifully over time.',
    careInstructions: ['Machine wash cold', 'Hang to dry', 'Do not bleach'],
    image: '/veloura/products/canvas-tote-bag.jpg',
    featured: true,
    tags: ['tote', 'bag', 'accessories', 'canvas'],
  },
  {
    id: 'p017',
    slug: 'athletic-socks-3pack',
    name: 'Athletic Socks 3-Pack',
    category: 'Accessories',
    categorySlug: 'accessories',
    price: 18,
    salePrice: null,
    colors: [
      { name: 'White/Grey/Black', hex: '#ffffff/#808080/#000000' },
    ],
    sizes: [
      { label: 'One Size (38-45)', available: true },
    ],
    material: 'Cotton blend with cushioned sole, 78% cotton / 18% polyester / 4% elastane',
    description: 'Three pairs of performance athletic socks in white, grey, and black. Cushioned sole for comfort, arch support, and reinforced heel and toe. The socks you actually want to work out in.',
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Do not bleach'],
    image: '/veloura/products/athletic-socks.jpg',
    featured: false,
    tags: ['socks', 'athletic', 'accessories'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductsByCategory(categorySlug: string): Product[] {
  if (categorySlug === 'sale') {
    return products.filter(p => p.salePrice !== null)
  }
  return products.filter(p => p.categorySlug === categorySlug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(p => p.featured)
}

export function getSaleProducts(): Product[] {
  return products.filter(p => p.salePrice !== null)
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(p => p.id !== product.id && p.categorySlug === product.categorySlug)
    .slice(0, limit)
}


export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}
