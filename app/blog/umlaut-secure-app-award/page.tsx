import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How We Won the umlaut Secure App Award — Twice | ForgingApps Blog',
  description: 'What it takes to pass umlaut\'s security certification, why most apps fail, and what it means when your developer has done it twice.',
  alternates: {
    canonical: 'https://forgingapps.com/blog/umlaut-secure-app-award',
  },
  openGraph: {
    title: 'How We Won the umlaut Secure App Award — Twice | ForgingApps Blog',
    description: 'What it takes to pass umlaut\'s security certification, why most apps fail, and what it means when your developer has done it twice.',
    url: 'https://forgingapps.com/blog/umlaut-secure-app-award',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'umlaut Secure App Award' }],
  },
}

export default function BlogPost() {
  return (
    <article className="bg-forge-dark min-h-screen py-16">
      <div className="container-custom max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <Link href="/blog" className="text-forge-gold hover:text-forge-ember transition mb-4 inline-block">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-semibold text-forge-ember bg-forge-ember/10 px-2 py-1 rounded">Security</span>
            <span className="text-sm text-gray-400">Feb 27, 2026</span>
            <span className="text-sm text-gray-400">•</span>
            <span className="text-sm text-gray-400">5 min read</span>
          </div>
          <h1 className="font-cinzel text-5xl font-bold text-forge-gold mb-4">How We Won the umlaut Secure App Award — Twice</h1>
          <p className="text-xl text-gray-400">What it takes to pass umlaut&apos;s security certification, why most apps fail, and what it means when your developer has done it twice.</p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none mb-12">
          <div className="space-y-6 text-gray-300 leading-relaxed">

            <p>
              In 2024, the mobile application we built for our client passed umlaut&apos;s security certification. In 2025, it passed again. Not a rebadge — a full re-audit against updated criteria.
            </p>

            <p>
              We&apos;re not telling you this to brag. We&apos;re telling you this because most mobile apps don&apos;t come close, and the gap between a secure app and a vulnerable one is usually invisible until something goes wrong.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">What Is the umlaut Secure App Award?</h2>

            <p>
              umlaut is an international engineering and consulting group that tests consumer and enterprise applications against rigorous security benchmarks. Their methodology covers the full attack surface: authentication, data storage, data transmission, platform-level security, code obfuscation, and network communication — among others.
            </p>

            <p>
              The award is not a checkbox. It&apos;s a penetration-tested, independently verified assessment. Apps either pass or they don&apos;t. Many don&apos;t.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">What Most Apps Get Wrong</h2>

            <p>
              After going through this process twice, we know exactly where apps fail. The failures rarely come from exotic attack vectors. They come from the basics being skipped under deadline pressure.
            </p>

            <ul className="list-none space-y-4 my-6">
              <li className="bg-forge-stone border border-forge-ember/30 rounded-lg p-4">
                <strong className="text-forge-gold block mb-1">Insecure data storage.</strong>
                <span>Sensitive data written to shared preferences, local storage, or device logs without encryption. This is the most common failure category. A stolen phone becomes a data breach.</span>
              </li>
              <li className="bg-forge-stone border border-forge-ember/30 rounded-lg p-4">
                <strong className="text-forge-gold block mb-1">Broken authentication.</strong>
                <span>Session tokens that don&apos;t expire. Passwords stored in plaintext. Auth flows that can be bypassed by manipulating client-side state. We see this in applications built by teams with no security background.</span>
              </li>
              <li className="bg-forge-stone border border-forge-ember/30 rounded-lg p-4">
                <strong className="text-forge-gold block mb-1">Unprotected API endpoints.</strong>
                <span>Backend endpoints that trust client-sent user IDs. Missing rate limiting. No input validation beyond what the UI enforces. The API layer is where enterprise apps bleed most.</span>
              </li>
              <li className="bg-forge-stone border border-forge-ember/30 rounded-lg p-4">
                <strong className="text-forge-gold block mb-1">Weak transport security.</strong>
                <span>Certificate pinning skipped &quot;to make testing easier&quot; and never turned back on. Plain HTTP fallbacks. Outdated TLS configurations.</span>
              </li>
            </ul>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">How We Build Differently</h2>

            <p>
              Security is not a layer you add before shipping. It&apos;s a constraint you design around from day one. Our stack choices reflect this.
            </p>

            <p>
              We use Flutter for cross-platform mobile development, which gives us a unified codebase with explicit control over platform channels and no hidden native behavior. Our backend communication runs exclusively over TLS 1.3 with certificate pinning enabled in production builds. Authentication tokens are stored in the secure enclave on iOS and in the Android Keystore — never in shared preferences, never in SQLite without encryption.
            </p>

            <p>
              For data at rest, we use AES-256 encryption for anything sensitive. Database queries are parameterized by default. Every API endpoint authenticates at the server layer, regardless of what the client claims.
            </p>

            <p>
              We threat-model during the design phase, before a line of code is written. Not because umlaut requires it — because finding a vulnerability in a design document costs nothing. Finding it after launch costs everything.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">What the Second Year Taught Us</h2>

            <p>
              Passing the first time taught us what we already knew: secure architecture from the start is cheaper than retrofitting. Passing the second time — against updated criteria, with new attack patterns in scope — taught us something more valuable: security debt compounds fast.
            </p>

            <p>
              The applications that fail re-audits usually aren&apos;t compromised. They&apos;re just stagnant. Dependency versions that were fine in 2024 have known CVEs in 2025. Authentication patterns that were best practice eighteen months ago are now baseline inadequate. The attack surface of a mobile app evolves whether or not your team does.
            </p>

            <p>
              Staying certified means treating security as an ongoing practice, not a past achievement.
            </p>

            <h2 className="font-cinzel text-3xl font-bold text-forge-gold mt-8 mb-4">What This Means for Your Project</h2>

            <p>
              If you&apos;re building a consumer or enterprise app that will handle user data — and every app does — you have a choice at the start of the project. You can build fast and clean up later, or you can build correctly and not have the cleanup conversation.
            </p>

            <p>
              The cleanup conversation usually happens after a user complaint, a penetration test, or an investor due diligence call. None of these are good times.
            </p>

            <p>
              We&apos;ve been through the umlaut process twice. We know what auditors look for. We know what fails. We design our builds to the same standard from day one, regardless of whether certification is in scope.
            </p>

            <p>
              If you&apos;re building something that matters, build it to last.
            </p>

          </div>
        </div>

        {/* CTA */}
        <div className="bg-forge-stone border border-forge-ember/40 rounded-lg p-8 text-center">
          <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-4">Need a Secure App?</h3>
          <p className="text-gray-400 mb-6">We build to the same security standards that earned us two consecutive umlaut certifications. Tell us about your project.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Get a Free Consultation
            </Link>
            <Link href="/services" className="btn-secondary">
              View Our Packages
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-forge-ember/20">
          <Link href="/blog" className="text-forge-gold hover:text-forge-ember transition">
            ← All Posts
          </Link>
        </div>
      </div>
    </article>
  )
}
