import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Abroad Scholarships',
  description: 'Privacy Policy for Abroad Scholarships website. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-charcoal-900 mb-4">Privacy Policy</h1>
        <p className="text-charcoal-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">1. Introduction</h2>
            <p className="text-charcoal-700 mb-4">
              Welcome to Abroad Scholarships ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our website. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-charcoal-800 mb-2">2.1 Personal Information</h3>
            <p className="text-charcoal-700 mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our contact form</li>
              <li>Submit scholarship information</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-charcoal-700 mb-4">
              This information may include your name, email address, phone number, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-charcoal-800 mb-2">2.2 Automatically Collected Information</h3>
            <p className="text-charcoal-700 mb-4">
              When you visit our website, we automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages you visit and time spent on pages</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-charcoal-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Provide, maintain, and improve our services</li>
              <li>Send you newsletters and updates about scholarships</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze website usage and trends</li>
              <li>Detect, prevent, and address technical issues</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">4. Cookies and Tracking Technologies</h2>
            <p className="text-charcoal-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="text-charcoal-700 mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">5. Third-Party Services</h2>
            <p className="text-charcoal-700 mb-4">
              We may use third-party services that collect, monitor, and analyze information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Google Analytics for website analytics</li>
              <li>Google AdSense for advertising</li>
              <li>Email service providers for newsletter delivery</li>
            </ul>
            <p className="text-charcoal-700 mb-4">
              These third parties have their own privacy policies addressing how they use such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">6. Data Security</h2>
            <p className="text-charcoal-700 mb-4">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">7. Your Rights</h2>
            <p className="text-charcoal-700 mb-4">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your personal information</li>
              <li>Objection to processing of your information</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">8. Children's Privacy</h2>
            <p className="text-charcoal-700 mb-4">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-charcoal-700 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">10. Contact Us</h2>
            <p className="text-charcoal-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-charcoal-700">
              Email: contact@abroadscholarships.com<br />
              Website: <a href="/contact" className="text-primary-600 hover:underline">Contact Page</a>
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}

