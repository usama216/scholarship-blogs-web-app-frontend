'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const Header = () => {
  const navItems = ['Home', 'Blog', 'Jobs', 'About', 'Contact']
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={closeMenu}>
              <Image 
                src="/logo.png" 
                alt="Scholarship Gateway Logo" 
                width={120}
                height={120}
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const href = item === 'Home' ? '/' : item === 'Blog' ? '/blog' : item === 'Jobs' ? '/jobs' : `/${item.toLowerCase()}`
              return (
                <Link key={item} href={href}>
                  <span className="text-neutral-800 hover:text-primary-600 font-semibold transition-colors cursor-pointer">
                    {item}
                  </span>
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-neutral-700"
            onClick={toggleMenu}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 py-4">
            {navItems.map((item) => {
              const href = item === 'Home' ? '/' : item === 'Blog' ? '/blog' : item === 'Jobs' ? '/jobs' : `/${item.toLowerCase()}`
              return (
                <Link key={item} href={href} onClick={closeMenu}>
                  <div className="text-neutral-800 hover:text-primary-600 font-semibold px-2 py-3 hover:bg-neutral-50">
                    {item}
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
