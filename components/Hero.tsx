'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaGraduationCap, FaGlobe, FaAward, FaArrowRight } from 'react-icons/fa'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      badge: 'New Scholarships Added Weekly',
      title: 'Your Gateway to',
      highlight: 'Study Abroad Dreams',
      description: 'Discover fully funded scholarships and international opportunities to study in your dream country. Access 500+ scholarships from top universities worldwide.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
      stats: [
        { number: '500+', label: 'Scholarships', sublabel: 'Listed', icon: FaGraduationCap },
        { number: '50+', label: 'Countries', sublabel: 'Worldwide', icon: FaGlobe }
      ]
    },
    {
      badge: 'Fully Funded Opportunities',
      title: 'Find Your',
      highlight: 'Perfect Scholarship',
      description: 'Access comprehensive guides, application tips, and fully funded programs from top universities. Get expert guidance to make your study abroad dream a reality.',
      image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop',
      stats: [
        { number: '100+', label: 'Universities', sublabel: 'Featured', icon: FaAward },
        { number: '24/7', label: 'Updates', sublabel: 'Latest info', icon: FaGraduationCap }
      ]
    },
    {
      badge: 'Start Your Journey Today',
      title: 'Achieve Your',
      highlight: 'Education Goals',
      description: 'Get expert guidance on applications, visa processes, and everything you need to study abroad. Join thousands of students who achieved their dreams.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      stats: [
        { number: '1000+', label: 'Students', sublabel: 'Helped', icon: FaGraduationCap },
        { number: '90%', label: 'Success', sublabel: 'Rate', icon: FaAward }
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
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-50/50 via-white to-cta-50/30">
      {/* Floating orbs for visual interest */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cta-300 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Left Side - Content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-100 to-cta-100 border-2 border-primary-300 rounded-full shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                <span className="text-neutral-800 text-xs sm:text-sm font-bold">{slides[currentSlide].badge}</span>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              >
                <span className="block text-neutral-900 mb-2">{slides[currentSlide].title}</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-cta-500 to-primary-600">
                  {slides[currentSlide].highlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-sm sm:text-base lg:text-lg text-neutral-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                style={{ lineHeight: '1.7' }}
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Link href="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-cta-500 to-cta-600 text-white px-6 py-3 sm:px-8 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all overflow-hidden w-full sm:w-auto"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Find Scholarships Now
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cta-600 to-cta-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.button>
                </Link>
                <Link href="/about">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 sm:px-8 sm:py-3.5 bg-white border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold text-sm sm:text-base hover:border-primary-400 hover:text-primary-600 transition-all shadow-sm w-full sm:w-auto"
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-6 sm:pt-8 border-t border-neutral-200"
              >
                {slides[currentSlide].stats.map((stat, idx) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-3 group cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className={`relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${
                        idx % 2 === 0 
                          ? 'from-primary-400 to-primary-600' 
                          : 'from-cta-400 to-cta-600'
                      } rounded-lg flex items-center justify-center shadow-lg`}>
                        <IconComponent className="text-white text-base sm:text-lg" />
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg"></div>
                      </div>
                      <div>
                        <p className="font-bold text-base sm:text-lg text-neutral-900 group-hover:text-primary-600 transition-colors">
                          {stat.number}
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-600 font-semibold">{stat.label}</p>
                        <p className="text-xs text-neutral-500">{stat.sublabel}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
            
            {/* Right Side - Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] max-w-lg mx-auto">
                <div className="relative w-full h-full bg-gradient-to-br from-primary-100 to-cta-100 rounded-3xl shadow-2xl overflow-hidden group">
                  <Image 
                    src={slides[currentSlide].image}
                    alt="Scholarship Gateway - Study Abroad Opportunities"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                    sizes="(max-width: 1024px) 0vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 to-cta-600/10"></div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30"></div>
                  <div className="absolute bottom-4 left-4 w-20 h-20 bg-cta-500/20 backdrop-blur-sm rounded-full border border-cta-400/30"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index 
                  ? 'w-8 h-3 bg-gradient-to-r from-primary-600 to-cta-500' 
                  : 'w-3 h-3 bg-neutral-300 hover:bg-neutral-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
