'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MdOutlineEmail } from 'react-icons/md'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Here you would send the form data to your backend
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '' })
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Simple Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">Contact Us</h1>
          <p className="text-lg text-neutral-700">Have questions about scholarships? We're here to help.</p>
        </div>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Info */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Get in Touch</h2>
            
            <div className="space-y-4">
              <div className="border border-neutral-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <MdOutlineEmail className="w-6 h-6 text-primary-600" />
                  <h3 className="font-bold text-neutral-900">Email</h3>
                </div>
                <a href="mailto:contact@scholarshipgateway.com" className="text-primary-600 hover:text-primary-700">
                  contact@scholarshipgateway.com
                </a>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <h3 className="font-bold text-neutral-900 mb-2">Response Time</h3>
                <p className="text-neutral-700">We typically respond within 24-48 hours</p>
              </div>

              <div className="border border-neutral-200 rounded-lg p-4">
                <h3 className="font-bold text-neutral-900 mb-2">What We Can Help With</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-700">
                  <li>Scholarship application questions</li>
                  <li>Study abroad guidance</li>
                  <li>Visa and admission processes</li>
                  <li>General inquiries</li>
                  <li>Partnership opportunities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Send a Message</h2>
            
            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="name" className="block text-sm font-bold text-neutral-900 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all text-neutral-900"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-neutral-900 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all text-neutral-900"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-neutral-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-200 transition-all text-neutral-900 resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border-2 border-green-200 text-green-800 rounded-lg font-semibold">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cta-500 hover:bg-cta-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
