'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { translations } from '@/lib/i18n/translations'

export default function ServicesContent() {
  const { language, localePath } = useLanguage()
  const data = translations[language].services

  const comparisonRows = [
    ['priceRange', data.spark.launchPrice, data.anvil.launchPrice, data.forge.launchPrice],
    ['delivery', data.spark.delivery, data.anvil.delivery, data.forge.delivery],
    ['platform', data.comparison.webOnly, data.comparison.mobileOrWeb, data.comparison.mobilePlusWeb],
    ['pagesScreens', data.comparison.oneToFive, data.comparison.upTo10, data.comparison.tenPlus],
    ['userAuth', '—', '✓', '✓'],
    ['backendDb', '—', '✓', '✓'],
    ['paymentIntegration', '—', '—', '✓'],
    ['realtimeFeatures', '—', '—', '✓'],
    ['bilingualEnBg', data.spark.addon3, '—', '✓'],
    ['adminDashboard', '—', '—', '✓'],
    ['revisionsIncluded', data.comparison.oneRound, data.comparison.oneRound, data.comparison.twoRounds],
    ['bugFixWarranty', data.comparison.thirtyDays, data.comparison.thirtyDays, data.comparison.sixtyDays],
  ]

  const faqItems = [data.faq.q1, data.faq.q2, data.faq.q3, data.faq.q4, data.faq.q5, data.faq.q6, data.faq.q7]
  const packages = [
    { id: 'spark', data: data.spark, href: localePath('/contact') },
    { id: 'anvil', data: data.anvil, href: localePath('/contact') },
    { id: 'forge', data: data.forge, href: localePath('/contact') },
    { id: 'oracle', data: data.oracle, href: localePath('/ai-consulting') },
    { id: 'hearthstone', data: data.hearthstone, href: localePath('/contact') },
  ]

  return (
    <div className="bg-forge-dark min-h-screen">
      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-4xl text-center">
          <div className="mb-4 inline-block"><span className="price-discount text-forge-gold bg-forge-gold/10 px-3 py-1">{data.launchBadge}</span></div>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">{data.heading}</h1>
          <p className="text-xl text-gray-300 mb-3">{data.subheading}</p>
          <p className="text-sm text-forge-gold">{data.launchNotice}</p>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom overflow-x-auto">
          <h2 className="font-cinzel text-4xl font-bold text-center mb-10">{data.comparison.heading}</h2>
          <table className="w-full min-w-[820px] border border-forge-ember/20 text-sm">
            <thead>
              <tr className="bg-forge-stone">
                <th className="p-4 text-left text-forge-gold">{data.comparison.heading}</th>
                <th className="p-4 text-left text-forge-gold">{data.spark.name}</th>
                <th className="p-4 text-left text-forge-gold">{data.anvil.name}</th>
                <th className="p-4 text-left text-forge-gold">{data.forge.name}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map(([label, spark, anvil, forge]) => (
                <tr key={String(label)} className="border-t border-forge-ember/10">
                  <td className="p-4 text-gray-300">{data.comparison[label as string]}</td>
                  <td className="p-4 text-gray-400">{spark}</td>
                  <td className="p-4 text-gray-400">{anvil}</td>
                  <td className="p-4 text-gray-400">{forge}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center mt-8">
            <p className="text-gray-300 mb-3">{data.comparison.needAi}</p>
            <Link href={localePath('/ai-consulting')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{data.comparison.exploreAi} →</Link>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packages.map(({ id, data: pkg, href }) => (
            <div key={id} id={id} className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-2">{pkg.name}</h2>
              <p className="text-forge-ember font-semibold mb-2">{pkg.subtitle}</p>
              <p className="text-gray-500 line-through">{pkg.regularPrice}</p>
              <p className="text-2xl font-bold text-white mb-4">{pkg.launchPrice}</p>
              <p className="text-gray-300 mb-6">{pkg.description}</p>
              {'delivery' in pkg ? <p className="text-sm text-gray-400 mb-4">{data.comparison.delivery}: {pkg.delivery}</p> : null}
              {'whatsIncluded' in pkg ? (
                <>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.whatsIncluded}</h3>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    {Object.keys(pkg).filter((key) => /^included\d+$/.test(key)).map((key) => <li key={key}>• {pkg[key]}</li>)}
                  </ul>
                </>
              ) : null}
              {'addOns' in pkg ? (
                <>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.addOns}</h3>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    {Object.keys(pkg).filter((key) => /^addon\d+$/.test(key)).map((key) => <li key={key}>+ {pkg[key]}</li>)}
                  </ul>
                </>
              ) : null}
              {'covers' in pkg ? (
                <>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.covers}</h3>
                  <ul className="space-y-2 text-gray-400 mb-6">
                    {Object.keys(pkg).filter((key) => /^cover\d+$/.test(key)).map((key) => <li key={key}>• {pkg[key]}</li>)}
                  </ul>
                </>
              ) : null}
              {'everyTierIncludes' in pkg ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <div className="bg-forge-dark rounded-lg p-4 border border-forge-ember/20"><p className="text-sm text-gray-400">{pkg.bronze.name}</p><p className="text-forge-gold font-semibold">{pkg.bronze.launchPrice}</p></div>
                    <div className="bg-forge-dark rounded-lg p-4 border border-forge-ember/20"><p className="text-sm text-gray-400">{pkg.silver.name}</p><p className="text-forge-gold font-semibold">{pkg.silver.launchPrice}</p></div>
                    <div className="bg-forge-dark rounded-lg p-4 border border-forge-ember/20"><p className="text-sm text-gray-400">{pkg.gold.name}</p><p className="text-forge-gold font-semibold">{pkg.gold.launchPrice}</p></div>
                  </div>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.everyTierIncludes}</h3>
                  <ul className="space-y-2 text-gray-400 mb-6">{Object.keys(pkg).filter((key) => /^tier\d+$/.test(key)).map((key) => <li key={key}>• {pkg[key]}</li>)}</ul>
                </>
              ) : null}
              {'builtFor' in pkg ? (
                <>
                  <h3 className="font-semibold text-forge-gold mb-3">{pkg.builtFor}</h3>
                  <ul className="space-y-2 text-gray-400 mb-6">{Object.keys(pkg).filter((key) => /^built\d+$/.test(key)).map((key) => <li key={key}>• {pkg[key]}</li>)}</ul>
                </>
              ) : null}
              <Link href={href} className="btn-primary">{pkg.cta}</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-6">{data.payment.heading}</h2>
            {[data.payment.fixedPrice, data.payment.hourly, data.payment.retainers, data.payment.methods].map((item: any) => (
              <div key={item.title} className="mb-4"><h3 className="font-semibold text-white mb-1">{item.title}</h3><p className="text-gray-400">{item.detail}</p></div>
            ))}
          </div>
          <div className="bg-forge-stone border border-forge-ember/30 rounded-xl p-8">
            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">{data.notIncluded.heading}</h2>
            <p className="text-gray-300 mb-4">{data.notIncluded.subheading}</p>
            <ul className="space-y-2 text-gray-400">{['item1','item2','item3','item4','item5','item6'].map((key) => <li key={key}>• {data.notIncluded[key]}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="section-py border-b border-forge-ember/20">
        <div className="container-custom max-w-5xl">
          <h2 className="font-cinzel text-4xl font-bold text-center text-forge-gold mb-10">{data.faq.heading}</h2>
          <div className="space-y-6">{faqItems.map((faq: any) => <div key={faq.q} className="bg-forge-stone border border-forge-ember/20 rounded-lg p-6"><h3 className="font-semibold text-white mb-2">{faq.q}</h3><p className="text-gray-400">{faq.a}</p></div>)}</div>
          <div className="text-center mt-8"><p className="text-gray-300 mb-3">{data.faq.stillHaveQuestions}</p><Link href={localePath('/contact')} className="text-forge-gold hover:text-forge-ember transition font-semibold">{data.faq.talkToUs} →</Link></div>
        </div>
      </section>

      <section className="section-py">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="font-cinzel text-4xl font-bold text-forge-gold mb-4">{data.footerCta.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{data.footerCta.subheading}</p>
          <Link href={localePath('/contact')} className="btn-primary">{data.footerCta.button}</Link>
        </div>
      </section>
    </div>
  )
}
