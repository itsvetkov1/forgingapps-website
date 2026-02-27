import Hero from '@/components/Hero'
import ContactForm from '@/components/ContactForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact ForgingApps -- Free Consultation',
  alternates: {
    canonical: 'https://forgingapps.com/contact',
  },
  openGraph: {
    title: 'Contact ForgingApps -- Free Consultation',
    description: 'Get a free 30-minute consultation. Tell us about your project. Response within 24 hours.',
    url: 'https://forgingapps.com/contact',
  },
  description: 'Get a free 30-minute consultation. Tell us about your project and we\'ll recommend the right package. Response within 24 hours.',
}

export default function Contact() {
  return (
    <>
      <Hero
        headline="Let's Talk"
        subheadline="Free consultation. No commitment. Tell us what you need and we'll tell you how we can help."
        size="small"
      />

      <section className="section-py bg-forge-dark border-t border-forge-ember/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h2 className="font-cinzel text-2xl font-bold text-forge-gold mb-6">Send Your Brief</h2>
                <ContactForm />
              </div>
            </div>

            {/* Contact Info & FAQ */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-6">Direct Contact</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Email</p>
                    <a href="mailto:hello@forgingapps.com" className="text-forge-gold font-semibold hover:text-forge-ember transition">
                      hello@forgingapps.com
                    </a>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Location</p>
                    <p className="text-white font-semibold">Sofia, Bulgaria</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Response Time</p>
                    <p className="text-white font-semibold">Within 24 hours on business days</p>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-forge-stone border border-forge-ember/30 rounded-lg p-8">
                <h3 className="font-cinzel text-xl font-bold text-forge-gold mb-6">Quick FAQ</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-forge-gold font-semibold mb-2">How long does a project take?</p>
                    <p className="text-gray-400">It depends on scope. A landing page takes 1-2 weeks. A standard app takes 4-8 weeks. A full MVP takes 8-16 weeks. We give you a precise timeline during the free consultation.</p>
                  </div>
                  <div className="border-t border-forge-ember/20 pt-4">
                    <p className="text-forge-gold font-semibold mb-2">Do you work with clients outside Bulgaria?</p>
                    <p className="text-gray-400">Yes. We work with clients across Europe and beyond. Communication is in English, payments in EUR. Remote collaboration is our default mode.</p>
                  </div>
                  <div className="border-t border-forge-ember/20 pt-4">
                    <p className="text-forge-gold font-semibold mb-2">What's included in the free consultation?</p>
                    <p className="text-gray-400">A 30-minute call where we discuss your idea, assess feasibility, and recommend the right package. No sales pitch, no commitment. If we're not the right fit, we'll tell you.</p>
                  </div>
                  <div className="border-t border-forge-ember/20 pt-4">
                    <p className="text-forge-gold font-semibold mb-2">Can I upgrade my package mid-project?</p>
                    <p className="text-gray-400">Yes. If your project grows beyond the original scope, we'll re-scope and re-price transparently. No surprise invoices.</p>
                  </div>
                  <div className="border-t border-forge-ember/20 pt-4">
                    <p className="text-forge-gold font-semibold mb-2">What if I'm not happy?</p>
                    <p className="text-gray-400">Every project includes revision rounds and a post-launch warranty. We work iteratively with weekly demos, so you see progress before it's too late to course-correct.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-py bg-gradient-to-r from-forge-ember to-forge-gold text-forge-dark">
        <div className="container-custom text-center">
          <h2 className="font-cinzel text-4xl font-bold mb-4">Questions?</h2>
          <p className="text-lg text-forge-dark/80">Email us at <a href="mailto:hello@forgingapps.com" className="font-semibold hover:underline">hello@forgingapps.com</a> or fill the form above.</p>
        </div>
      </section>
    </>
  )
}
