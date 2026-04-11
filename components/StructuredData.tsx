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
    sameAs: [
      'https://www.linkedin.com/in/ivaylo-tsvetkov-28b039106/',
      'https://www.linkedin.com/in/radoslav-lambrev/',
      'https://www.umlaut.com',
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
          description: 'Landing page тАУ single-page responsive website with bilingual EN/BG support',
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
          description: 'Custom app or mobile product тАУ full-stack with custom backend and advanced features',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '5000',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          name: 'The Forge',
          description: 'Complex platform or full MVP тАУ enterprise-grade application development',
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: '10000',
            priceCurrency: 'EUR',
          },
        },
        {
          '@type': 'Offer',
          name: 'The Oracle',
          description: 'AI consulting and integration тАУ workflow automation, prompt engineering, AI strategy',
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
          description: 'Ongoing product partnership retainer тАУ maintenance, growth, or full partner tier',
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
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a custom website cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The cost depends on your project scope. Our Spark package starts at an accessible price point for landing pages and single-page websites. For more complex applications, The Anvil (custom app/mobile) and The Forge (enterprise platforms) offer different tiers based on your needs. Contact us for a custom quote.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is included in ongoing support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our Hearthstone retainer package provides ongoing support with three tier options: Maintenance (bug fixes and minor updates), Growth (new features and optimization), or full Partner tier (dedicated collaboration). Each tier is customized to your business needs.'
        }
      },
      {
        '@type': 'Question',
        name: 'How long does a project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Project timelines vary based on complexity. Landing pages and simple websites (Spark) typically take a few weeks. Mid-tier applications (Ember) take 4-8 weeks. Complex custom apps (Anvil) and enterprise platforms (Forge) span several months. We provide detailed timelines during discovery.'
        }
      },
      {
        '@type': 'Question',
        name: 'Do you work with international clients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we work with clients globally. Based in Sofia, Bulgaria, we support businesses across Europe and beyond. We offer bilingual (EN/BG) website support and are experienced in international project coordination.'
        }
      },
      {
        '@type': 'Question',
        name: 'What technologies do you use?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We build with modern, production-ready technologies: Next.js, React, TypeScript, Tailwind CSS for web applications. For mobile, we use Flutter. We integrate AI tools, APIs, databases, and payment systems as needed. All projects leverage the latest best practices in web and mobile development.'
        }
      }
    ]
  }
  return (
    <>
      <script
        type=" application/ld+json dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
 />
 <script
 type=pplication/ld+json dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
 />
 <script
 type=pplication/ld+json dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
 />
 </>
 )
}