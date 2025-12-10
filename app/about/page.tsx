'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Simple Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">About Scholarship Gateway</h1>
          <p className="text-lg text-neutral-700">Your trusted source for international scholarships and study abroad opportunities.</p>
        </div>
      </section>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Main Content */}
        <div className="space-y-6 text-neutral-700 text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Our Mission</h2>
          <p>
            Scholarship Gateway is dedicated to helping students find and secure fully funded scholarships to study abroad. We provide comprehensive information about international scholarship opportunities, application processes, and study abroad programs from universities worldwide.
          </p>
          
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">What We Offer</h2>
          <p>
            Our platform features detailed scholarship listings, including eligibility criteria, application deadlines, required documents, and step-by-step application guides. We cover scholarships for undergraduate, master's, and doctoral programs across 50+ countries.
          </p>
          
          <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-3">Scholarship Database</h3>
          <p>
            We maintain an up-to-date database of over 500 fully funded scholarships from top universities worldwide. Each scholarship listing includes comprehensive details about eligibility requirements, application procedures, deadlines, and benefits.
          </p>
          
          <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-3">Application Guidance</h3>
          <p>
            Our detailed guides help you prepare strong scholarship applications, including tips for writing compelling personal statements, obtaining recommendation letters, and preparing for interviews. We provide country-specific guides for popular study destinations.
          </p>
          
          <h3 className="text-xl font-bold text-neutral-900 mt-6 mb-3">Study Abroad Resources</h3>
          <p>
            Beyond scholarships, we provide information about visa processes, language requirements (IELTS, TOEFL), standardized tests (GRE, GMAT), cost of living in different countries, and cultural adaptation tips for international students.
          </p>
          
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Popular Scholarship Categories</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Fully Funded Undergraduate Scholarships</li>
            <li>Master's Degree Scholarships</li>
            <li>PhD and Doctoral Scholarships</li>
            <li>Country-Specific Scholarships (USA, UK, Canada, Germany, Australia, etc.)</li>
            <li>Field-Specific Scholarships (Engineering, Medicine, Business, Computer Science)</li>
            <li>Merit-Based Scholarships</li>
            <li>Need-Based Financial Aid</li>
            <li>Minority and Diversity Scholarships</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Why Choose Scholarship Gateway</h2>
          <p>
            We understand the challenges students face when searching for international scholarships. Our platform simplifies this process by providing verified, up-to-date information in one place. We regularly update our scholarship database and publish new guides to help students navigate the complex application process.
          </p>
          
          <p>
            Whether you're a high school student planning for undergraduate studies, a bachelor's graduate seeking master's opportunities, or a researcher looking for PhD funding, Scholarship Gateway provides the information and resources you need to succeed.
          </p>
          
          <h2 className="text-2xl font-bold text-neutral-900 mt-8 mb-4">Get Started</h2>
          <p>
            Browse our scholarship database, read application guides, and subscribe to our newsletter for weekly updates on new scholarship opportunities. Your study abroad journey starts here.
          </p>
          
          <div className="mt-8 pt-6 border-t">
            <a href="/blog" className="inline-block bg-cta-500 hover:bg-cta-600 text-white px-8 py-3 rounded-lg font-bold">
              Browse Scholarships →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
