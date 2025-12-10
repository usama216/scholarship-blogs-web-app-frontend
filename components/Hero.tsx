'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaStar } from 'react-icons/fa6'
import { HiOutlineHeart } from 'react-icons/hi2'
import { IoSparkles } from 'react-icons/io5'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      badge: 'New Scholarships Added Weekly',
      title: 'Your Gateway to',
      highlight: 'Study Abroad Dreams',
      description: 'Discover fully funded scholarships and international opportunities to study in your dream country.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=800&fit=crop',
      stats: [
        { number: '500+', label: 'Scholarships', sublabel: 'Listed' },
        { number: '50+', label: 'Countries', sublabel: 'Worldwide' }
      ]
    },
    {
      badge: 'Fully Funded Opportunities',
      title: 'Find Your',
      highlight: 'Perfect Scholarship',
      description: 'Access comprehensive guides, application tips, and fully funded programs from top universities worldwide.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=800&fit=crop',
      stats: [
        { number: '100+', label: 'Universities', sublabel: 'Featured' },
        { number: '24/7', label: 'Updates', sublabel: 'Latest info' }
      ]
    },
    {
      badge: 'Start Your Journey Today',
      title: 'Achieve Your',
      highlight: 'Education Goals',
      description: 'Get expert guidance on applications, visa processes, and everything you need to study abroad.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=800&fit=crop',
      stats: [
        { number: '1000+', label: 'Students', sublabel: 'Helped' },
        { number: '90%', label: 'Success', sublabel: 'Rate' }
      ]
    }
  ]

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds
    return () => clearInterval(interval)
  }, [slides.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-white to-accent-50/30"></div>
      
      {/* Side Ad Slots - AdSense Wide Skyscraper 160×600 (visible on xl and above) */}
      <aside className="hidden xl:flex absolute left-4 top-6 z-20" style={{ width: '160px', height: '600px' }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-neutral-50 to-neutral-100 border-2 border-dashed border-neutral-300 rounded-xl shadow-sm">
          {/* 
            REPLACE WITH ADSENSE CODE:
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            ></ins>
          */}
          <div className="text-center text-gray-400 text-xs uppercase tracking-wider rotate-180 [writing-mode:vertical-rl]">
            160×600 AdSense
          </div>
        </div>
      </aside>
      <aside className="hidden xl:flex absolute right-4 top-6 z-20" style={{ width: '160px', height: '600px' }}>
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-xl shadow-sm">
          {/* 
            REPLACE WITH ADSENSE CODE:
            <ins
              className="adsbygoogle"
              style={{ display: 'inline-block', width: '160px', height: '600px' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="XXXXXXXXXX"
            ></ins>
          */}
          <div className="text-center text-gray-400 text-xs uppercase tracking-wider rotate-180 [writing-mode:vertical-rl]">
            160×600 AdSense
          </div>
        </div>
      </aside>

      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary-300 rounded-full filter blur-3xl opacity-15 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-accent-300 rounded-full filter blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-32 py-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-100 to-accent-100 border-2 border-primary-300 rounded-full shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                <span className="text-neutral-800 text-sm font-bold">{slides[currentSlide].badge}</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
              >
                <span className="block text-neutral-900 mb-3 leading-tight">{slides[currentSlide].title}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-accent-600 to-primary-600 animate-gradient leading-tight">
                  {slides[currentSlide].highlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-lg sm:text-xl text-neutral-700 leading-relaxed max-w-2xl"
                style={{ lineHeight: '1.8' }}
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex sm:flex-row items-start gap-4 pt-4"
              >
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(249,115,22,0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-cta-500 to-cta-600 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-2xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Find Scholarships Now
                      <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cta-600 to-cta-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center gap-8 pt-8 border-t border-charcoal-200"
              >
                {slides[currentSlide].stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: idx % 2 === 0 ? 5 : -5 }}
                      className={`relative w-14 h-14 bg-gradient-to-br ${idx % 2 === 0 ? 'from-primary-400 to-primary-600' : 'from-accent-400 to-accent-600'} rounded-2xl flex items-center justify-center shadow-xl`}
                    >
                      <span className="text-xl font-black text-white">{stat.number}</span>
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl"></div>
                    </motion.div>
                    <div>
                      <p className={`font-bold text-xl text-neutral-900 group-hover:${idx % 2 === 0 ? 'text-primary-600' : 'text-accent-600'} transition-colors`}>{stat.label}</p>
                      <p className="text-base text-neutral-600">{stat.sublabel}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Right Side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square max-w-lg mx-auto">
                <div className="relative w-full h-full bg-gradient-to-br from-primary-100 to-accent-100 rounded-3xl shadow-2xl overflow-hidden">
                  <Image 
                    src={slides[currentSlide].image}
                    alt="Scholarship Gateway - Study Abroad Opportunities"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-accent-600/20"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-8 h-3 bg-gradient-to-r from-primary-600 to-accent-600' 
                  : 'w-3 h-3 bg-neutral-300 hover:bg-neutral-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
