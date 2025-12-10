import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Abroad Scholarships',
  description: 'Terms and Conditions for using the Abroad Scholarships website. Read our terms of service and usage policies.',
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-charcoal-900 mb-4">Terms & Conditions</h1>
        <p className="text-charcoal-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-charcoal-700 mb-4">
              By accessing and using the Abroad Scholarships website ("the Website"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">2. Use License</h2>
            <p className="text-charcoal-700 mb-4">
              Permission is granted to temporarily access the materials on Abroad Scholarships' website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">3. Disclaimer</h2>
            <p className="text-charcoal-700 mb-4">
              The materials on Abroad Scholarships' website are provided on an 'as is' basis. Abroad Scholarships makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">4. Limitations</h2>
            <p className="text-charcoal-700 mb-4">
              In no event shall Abroad Scholarships or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Abroad Scholarships' website, even if Abroad Scholarships or an authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">5. Accuracy of Materials</h2>
            <p className="text-charcoal-700 mb-4">
              The materials appearing on Abroad Scholarships' website could include technical, typographical, or photographic errors. Abroad Scholarships does not warrant that any of the materials on its website are accurate, complete, or current. Abroad Scholarships may make changes to the materials contained on its website at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">6. Scholarship Information</h2>
            <p className="text-charcoal-700 mb-4">
              While we strive to provide accurate and up-to-date scholarship information, we cannot guarantee the accuracy, completeness, or timeliness of all scholarship details. Scholarship opportunities, deadlines, eligibility criteria, and benefits are subject to change by the scholarship providers.
            </p>
            <p className="text-charcoal-700 mb-4">
              Users are strongly advised to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Verify all information directly with the scholarship provider or official website</li>
              <li>Check application deadlines and requirements before applying</li>
              <li>Confirm eligibility criteria with the scholarship provider</li>
              <li>Not rely solely on information provided on this website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">7. Links to Third-Party Websites</h2>
            <p className="text-charcoal-700 mb-4">
              Our website may contain links to third-party websites that are not owned or controlled by Abroad Scholarships. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.
            </p>
            <p className="text-charcoal-700 mb-4">
              By using our website, you expressly relieve Abroad Scholarships from any and all liability arising from your use of any third-party website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">8. User Content</h2>
            <p className="text-charcoal-700 mb-4">
              If you submit content to our website (such as comments, scholarship submissions, or other materials), you grant us a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, adapt, publish, translate, and distribute such content.
            </p>
            <p className="text-charcoal-700 mb-4">
              You represent and warrant that you own or have the necessary rights to grant us this license and that your content does not violate any third-party rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">9. Prohibited Uses</h2>
            <p className="text-charcoal-700 mb-4">You agree not to use the website:</p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>In any way that violates any applicable law or regulation</li>
              <li>To transmit any malicious code or viruses</li>
              <li>To collect or track personal information of others</li>
              <li>To spam or send unsolicited communications</li>
              <li>To impersonate any person or entity</li>
              <li>To interfere with or disrupt the website or servers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">10. Modifications</h2>
            <p className="text-charcoal-700 mb-4">
              Abroad Scholarships may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">11. Governing Law</h2>
            <p className="text-charcoal-700 mb-4">
              These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">12. Contact Information</h2>
            <p className="text-charcoal-700 mb-4">
              If you have any questions about these Terms & Conditions, please contact us at:
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

