import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | ForgingApps',
  description: 'Terms and conditions for ForgingApps custom app development and AI consulting services.',
}

export default function Terms() {
  return (
    <article className="bg-forge-dark min-h-screen py-16">
      <div className="container-custom max-w-3xl">
        <div className="mb-12">
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: February 23, 2026</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300 leading-relaxed">

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">1. Services</h2>
              <p>
                ForgingApps provides custom software development, mobile and web application development, and AI consulting services. All services are provided by ForgingApps, based in Sofia, Bulgaria.
              </p>
              <p className="mt-3">
                Service scope, deliverables, timelines, and pricing are defined in individual project proposals or service agreements signed before work begins.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">2. Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All prices are listed in EUR unless otherwise stated.</li>
                <li>Project-based work requires a deposit before development begins, as specified in the project proposal.</li>
                <li>Consulting services (The Oracle) are billed at the agreed hourly rate.</li>
                <li>Retainer packages (The Hearthstone) are billed monthly in advance.</li>
                <li>Invoices are due within 14 days of issuance unless otherwise agreed.</li>
                <li>Late payments may incur a 1.5% monthly interest charge.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">3. Project Delivery</h2>
              <p>
                Timelines provided in project proposals are estimates based on the agreed scope. We commit to transparent communication if timelines shift due to scope changes, external dependencies, or unforeseen technical challenges.
              </p>
              <p className="mt-3">
                All projects include a defined number of revision rounds as specified in the project proposal. Additional revisions beyond the agreed scope are billed at our standard hourly rate.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">4. Intellectual Property</h2>
              <p>
                Upon full payment, the client receives full ownership of all custom code, designs, and deliverables created specifically for their project.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>Third-party libraries and frameworks remain under their respective licenses.</li>
                <li>ForgingApps retains the right to use general techniques, knowledge, and non-proprietary patterns developed during the project.</li>
                <li>ForgingApps may reference the project in our portfolio unless the client requests otherwise in writing.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">5. Bug Fix Warranty</h2>
              <p>
                All delivered projects include a bug fix warranty period as specified in the project proposal. During this period, we will fix defects in the delivered code at no additional charge. This warranty covers bugs in our code, not issues caused by third-party services, client modifications, or changes in external APIs.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">6. Limitation of Liability</h2>
              <p>
                ForgingApps&apos; total liability for any claim arising from our services is limited to the total amount paid by the client for the specific project in question.
              </p>
              <p className="mt-3">
                We are not liable for indirect, incidental, or consequential damages including lost profits, lost data, or business interruption, except in cases of gross negligence or willful misconduct.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">7. Cancellation</h2>
              <p>
                Either party may terminate a project with 14 days written notice. In case of cancellation:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                <li>The client pays for all work completed up to the cancellation date.</li>
                <li>All completed deliverables are transferred to the client.</li>
                <li>Unused portions of prepaid deposits are refunded, minus completed work.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">8. Confidentiality</h2>
              <p>
                Both parties agree to keep confidential any proprietary information shared during the engagement. This includes business plans, technical specifications, user data, and financial information. This obligation survives the termination of the agreement.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">9. Governing Law</h2>
              <p>
                These terms are governed by the laws of the Republic of Bulgaria. Any disputes will be resolved in the competent courts of Sofia, Bulgaria.
              </p>
            </section>

            <section>
              <h2 className="font-cinzel text-3xl font-bold text-forge-gold mb-4">10. Contact</h2>
              <p>
                For questions about these terms, contact us at <a href="mailto:hello@forgingapps.com" className="text-forge-gold hover:text-forge-ember transition">hello@forgingapps.com</a>.
              </p>
            </section>

          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-forge-ember/20">
          <Link href="/" className="text-forge-gold hover:text-forge-ember transition">
            ← Back to Home
          </Link>
        </div>
      </div>
    </article>
  )
}
