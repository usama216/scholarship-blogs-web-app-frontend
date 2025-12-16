import type { Metadata } from 'next'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import FeaturedArticles from '@/components/FeaturedArticles'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'

export const metadata: Metadata = {
  title: 'Scholarship Gateway - Your Path to Foreign Scholarships | Study Abroad',
  description: 'Discover fully funded scholarships, international study opportunities, and expert guidance for students seeking to study abroad. Find your dream scholarship today.',
  keywords: 'scholarships, study abroad, international scholarships, fully funded scholarships, foreign scholarships, education abroad, student funding, study opportunities, Scholarship Gateway',
  authors: [{ name: 'Usama', url: 'https://scholarshipgateway.com' }],
  openGraph: {
    title: 'Scholarship Gateway - Your Path to Foreign Scholarships',
    description: 'Discover fully funded scholarships and international study opportunities. Your gateway to studying abroad.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Scholarship Gateway',
    url: 'https://scholarshipgateway.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scholarship Gateway - Your Path to Foreign Scholarships',
    description: 'Discover fully funded scholarships and international study opportunities. Your gateway to studying abroad.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://scholarshipgateway.com',
  },
}

export default function Home() {
  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Scholarship Gateway',
    url: 'https://scholarshipgateway.com',
    description: 'Your comprehensive guide to international scholarships, study abroad opportunities, and fully funded education programs worldwide.',
    publisher: {
      '@type': 'Person',
      name: 'Usama',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://scholarshipgateway.com/blog?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Scholarship Gateway',
    url: 'https://scholarshipgateway.com',
    logo: 'https://scholarshipgateway.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'contact@scholarshipgateway.com',
      contactType: 'Customer Service',
    },
    sameAs: [
      'https://instagram.com/scholarshipgateway',
      'https://linkedin.com/company/scholarshipgateway',
      'https://youtube.com/@scholarshipgateway',
    ],
  }

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <div className="bg-white">
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Ad Banner */}
        <AdBanner position="after-hero" />
        
        {/* Featured Articles - Main Content */}
        <FeaturedArticles />
        
        {/* Ad Banner between sections */}
        <AdBanner position="between-sections" />
        
        {/* In-Article Ad */}
        <div className="py-6">
          <AdBanner position="in-article" />
        </div>
        
        {/* Newsletter */}
        <Newsletter />
        
        {/* Ad Banner before footer */}
        <AdBanner position="before-footer" />
        
        <Footer />
      </div>
    </>
  )
}
