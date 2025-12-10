'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' }
  ]

  const socialLinks = [
    { name: 'Instagram', href: '#', Icon: FaInstagram },
    { name: 'LinkedIn', href: '#', Icon: FaLinkedin },
    { name: 'YouTube', href: '#', Icon: FaYoutube }
  ]

  return (
    <footer className="bg-neutral-900 text-white mt-16 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Image 
                src="/logo.png" 
                alt="Scholarship Gateway Logo" 
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-4">
              Your trusted source for international scholarships and study abroad opportunities. Helping students achieve their educational dreams.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.Icon
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 hover:bg-cta-500 rounded-full flex items-center justify-center transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href}>
                    <span className="text-white/70 hover:text-cta-400 transition-colors cursor-pointer">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-white/70 text-sm mb-4">
              Get weekly scholarship updates.
            </p>
            <Link href="/#newsletter">
              <button className="w-full bg-cta-500 hover:bg-cta-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              Copyright © 2025 Scholarship Gateway. All Rights Reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <a href="#" className="hover:text-cta-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cta-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
