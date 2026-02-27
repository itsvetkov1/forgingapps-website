export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ForgingApps',
    url: 'https://forgingapps.com',
    logo: 'https://forgingapps.com/favicon.svg',
    description: 'Custom mobile and web applications forged by senior developers. AI consulting, cross-platform apps, and startup-friendly pricing.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Sofia',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.6977,
      longitude: 23.3219,
    },
    email: 'hello@forgingapps.com',
    priceRange: '€€',
    areaServed: [
      { '@type': 'Country', name: 'Bulgaria' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    knowsAbout: [
      'Web Application Development',
      'Mobile Application Development',
      'AI Consulting',
      'Flutter Development',
      'React Development',
      'Artificial Intelligence Integration',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Landing Page',
          description: 'Single-page responsive website with bilingual EN/BG support',
          price: '300',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Standard Web App',
          description: 'Multi-page SPA with auth, database, and API integrations',
          price: '1500',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'Complex App',
          description: 'Full-stack application with custom backend and advanced features',
          price: '4000',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          name: 'AI Consulting',
          description: 'AI workflow automation, integration, prompt engineering, and training',
          price: '80',
          priceCurrency: 'EUR',
          unitCode: 'HUR',
        },
      ],
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ForgingApps',
    url: 'https://forgingapps.com',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  )
}
