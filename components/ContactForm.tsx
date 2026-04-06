'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ContactFormProps {
  packagePreselect?: string
}

export default function ContactForm({ packagePreselect }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    packageInterest: packagePreselect || 'Not Sure Yet',
    message: '',
    budget: '',
    source: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(false)

    try {
      const response = await fetch('https://formspree.io/f/xlgwoabo', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          packageInterest: packagePreselect || 'Not Sure Yet',
          message: '',
          budget: '',
          source: '',
        })
        setTimeout(() => setSubmitted(false), 5000)
      } else {
        setError(true)
      }
    } catch (_error) {
      setError(true)
    }

    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-forge-stone border border-forge-gold rounded-lg p-8 text-center">
        <div className="text-5xl mb-4">✓</div>
        <h3 className="font-cinzel text-2xl font-bold text-forge-gold mb-2">We Got Your Message!</h3>
        <p className="text-gray-300 mb-6">Here's what happens next:</p>
        <div className="text-left space-y-3 mb-6 bg-forge-dark rounded-lg p-4 border border-forge-ember/20">
          <div className="flex items-start gap-3">
            <span className="text-forge-ember font-bold">1.</span>
            <p className="text-gray-300 text-sm">We read your brief carefully — usually same day.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-forge-ember font-bold">2.</span>
            <p className="text-gray-300 text-sm">We prepare a quick assessment: fit, approach, ballpark.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-forge-ember font-bold">3.</span>
            <p className="text-gray-300 text-sm">You hear from us within 24 hours on business days.</p>
          </div>
        </div>
        <p className="text-gray-400 text-sm mb-4">Want to see our work first?</p>
        <a href="/demo" className="text-forge-gold text-sm font-semibold hover:text-forge-ember transition">
          Try the live demo →
        </a>
        <div className="mt-4 pt-4 border-t border-forge-ember/20">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-gray-500 text-xs hover:text-gray-300 transition"
          >
            ← Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.name@company.com"
            required
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+359..."
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">Package Interest</label>
          <select
            name="packageInterest"
            value={formData.packageInterest}
            onChange={handleChange}
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
          >
            <option>Not Sure Yet</option>
            <option>The Spark (Landing Page)</option>
            <option>The Anvil (Standard App)</option>
            <option>The Forge (Full MVP)</option>
            <option>The Oracle (AI Consulting)</option>
            <option>The Hearthstone (Retainer)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-forge-gold mb-2">Tell Us About Your Project *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your idea, your timeline, and what success looks like."
          required
          rows={5}
          className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
        ></textarea>
        <p className="text-gray-500 text-xs mt-2">
          Include: problem you're solving, who the users are, your timeline/budget, specific features, and what success looks like.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">Budget Range</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
          >
            <option value="">Select budget...</option>
            <option>Under €1,000</option>
            <option>€1,000 - €5,000</option>
            <option>€5,000 - €15,000</option>
            <option>€15,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-forge-gold mb-2">How Did You Find Us?</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full bg-forge-dark border border-forge-stone rounded-lg px-4 py-2 text-white focus:outline-none focus:border-forge-gold transition"
          >
            <option value="">Select source...</option>
            <option>Google Search</option>
            <option>Social Media</option>
            <option>Referral</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-red-300 text-sm">
          Something went wrong. Please try again or email us directly at <a href="mailto:hello@forgingapps.com" className="text-forge-gold hover:text-forge-ember transition underline">hello@forgingapps.com</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Your Brief'}
      </button>
    </form>
  )
}
