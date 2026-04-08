export default function StructuredData() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'ForgingApps',
    url: 'https://forgingapps.com',
    logo: 'https://forgingapps.com/favicon.svg',
    description: 'Custom mobile and web applications built by senior developers. AI consulting, cross-platform apps, and startup-friendly pricing.',
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
    priceRange: 'EUR',
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
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    }],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Development Services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'The Spark',
          description: 'Landing page — single-page responsive website with bilingual EN/BG support',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '1500',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          name: 'The Ember',
          description: 'Mid-tier web application with auth, database, and API integrations',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '3000',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          name: 'The Anvil',
          description: 'Custom app or mobile product — full-stack with custom backend and advanced features',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '5000',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          name: 'The Forge',
          description: 'Complex platform or full MVP — enterprise-grade application development',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '10000',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          name: 'The Oracle',
          description: 'AI consulting and integration — workflow automation, prompt engineering, AI strategy',
          priceSpecification: [
            {
              '@type': 'UnitPriceSpecification',
              price: '60',
              priceCurrency: 'EUR',
              unitCode: 'HUR',
            },
            {
              '@type': 'PriceSpecification',
              minPrice: '1500',
              priceCurrency: 'EUR',
              description: 'Fixed-price AI projects',
            },
          ],
        },
        {
          '@type': 'Offer',
          name: 'The Hearthstone',
          description: 'Ongoing product partnership retainer — maintenance, growth, or full partner tier',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            minPrice: '800',
            priceCurrency: 'EUR',
            unitCode: 'MON',
          },
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