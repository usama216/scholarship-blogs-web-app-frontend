'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FaSeedling, FaStar, FaLeaf } from 'react-icons/fa6'
import { IoSparkles } from 'react-icons/io5'

const AboutMission = () => {
  return (
    <section className="relative bg-white py-6 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-400 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-primary-100 border border-primary-300 rounded-full mb-4">
              <span className="text-primary-700 text-sm font-semibold uppercase tracking-wide">Our Mission</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                Education Opens Doors.
              </span>
              <br />
              We Help You Find Them.
            </h2>
            
            <p className="text-xl text-neutral-700 leading-relaxed mb-6" style={{ lineHeight: '1.8' }}>
              At Scholarship Gateway, we believe <span className="font-semibold text-accent-700">every student deserves the opportunity to study abroad.</span> We connect ambitious students with fully funded scholarships and international education opportunities.
            </p>
            
            <p className="text-xl text-neutral-700 leading-relaxed" style={{ lineHeight: '1.8' }}>
              Whether you're seeking undergraduate, graduate, or doctoral programs, we provide comprehensive information about scholarships, application processes, and visa requirements to make your study abroad dreams a reality.
            </p>
            
            <div className="flex gap-4">
              {['Scholarships', 'Study Abroad', 'Guidance'].map((tag, i) => (
                <div key={i} className="px-4 py-2 bg-primary-50 border border-primary-200 rounded-lg text-primary-700 font-semibold">
                  {tag}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Right Side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Find Scholarships', Icon: FaSeedling, color: 'from-accent-400 to-accent-600' },
                { title: 'Top Universities', Icon: FaStar, color: 'from-primary-400 to-primary-600' },
                { title: 'Expert Guidance', Icon: FaLeaf, color: 'from-primary-400 to-accent-500' },
                { title: 'Study Abroad', Icon: IoSparkles, color: 'from-accent-400 to-primary-500' },
              ].map((item, i) => {
                const IconComponent = item.Icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gradient-to-br flex flex-col items-center justify-center rounded-2xl p-6 shadow-lg border border-white/20"
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))`, backgroundImage: `linear-gradient(135deg, ${item.color === 'from-accent-400 to-accent-600' ? '#22d3ee, #0891b2' : item.color === 'from-primary-400 to-primary-600' ? '#60a5fa, #2563eb' : '#60a5fa, #0891b2'})` }}
                  >
                    <IconComponent className="w-12 h-12 mb-3 text-white" />
                    <span className="text-white font-semibold text-center">{item.title}</span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutMission

