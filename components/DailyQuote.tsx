'use client'

import { motion } from 'framer-motion'

const DailyQuote = () => {
  const quote = "Education is the most powerful weapon which you can use to change the world. Your scholarship is your gateway to unlimited possibilities."

  return (
    <section className="relative z-10 bg-gradient-to-br from-accent-50 via-white to-primary-50 py-10 lg:py-32 overflow-hidden">
      {/* Enhanced Decorative Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-accent-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-300 rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-success-100 border border-success-300 rounded-full mb-4"
          >
            <span className="text-success-700 text-sm font-semibold uppercase tracking-wide">Inspiration</span>
          </motion.div>
          
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-neutral-900"
            >
              Words of Motivation
            </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group bg-white rounded-3xl p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl border-2 border-transparent hover:border-accent-200 transition-all duration-500"
        >
          {/* Enhanced Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-50 via-white to-primary-50 opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-accent-100/50 via-transparent to-primary-100/50 group-hover:opacity-100 transition-opacity duration-500"></div>
        
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-accent-400 to-transparent opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary-400 to-transparent opacity-10"></div>
        
          {/* Quote Icon - Enhanced */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="absolute top-4 left-4 text-9xl text-accent-200 font-serif leading-none select-none opacity-60"
          >
            &ldquo;
          </motion.div>

          {/* Quote Text */}
          <div className="relative z-10 max-w-5xl mx-auto">
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 italic text-center px-4" style={{ lineHeight: '1.6' }}>
              {quote}
            </p>
            
            {/* Author attribution */}
            <div className="mt-10 text-center">
              <p className="text-base font-semibold text-accent-600 uppercase tracking-wider">- Scholarship Gateway</p>
            </div>
          </div>

          {/* Bottom quote mark - Enhanced */}
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="absolute bottom-4 right-6 text-9xl text-accent-200 font-serif leading-none select-none opacity-60"
          >
            &rdquo;
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default DailyQuote

