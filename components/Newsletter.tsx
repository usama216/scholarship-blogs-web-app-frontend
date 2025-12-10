'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useSubscribeToNewsletterMutation } from '@/lib/api/newsletterApi'
import { MdOutlineLock } from 'react-icons/md'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [subscribe, { isLoading, isSuccess, isError }] = useSubscribeToNewsletterMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await subscribe({ email }).unwrap()
      setEmail('')
    } catch (error) {
      console.error('Failed to subscribe:', error)
    }
  }

  return (
    <section className="bg-primary-600 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Subscribe for Scholarship Updates
        </h2>

        <p className="text-lg text-white/90 mb-8">
          Get weekly scholarship alerts and study abroad opportunities.
        </p>

        {/* Success/Error Messages */}
        {(isSuccess || isError) && (
          <div className={`mb-6 max-w-2xl mx-auto p-3 rounded-lg ${
              isSuccess 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
            {isSuccess ? '✓ Successfully subscribed!' : '✗ Failed to subscribe. Please try again.'}
          </div>
        )}

        {/* Newsletter Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg border-2 border-white/30 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:border-white/50"
            />
            
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-cta-500 hover:bg-cta-600 text-white rounded-lg font-bold disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          <p className="mt-4 text-sm text-white/70">
            Join 1000+ students. No spam, unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Newsletter

