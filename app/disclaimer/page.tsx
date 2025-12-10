import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Disclaimer | Abroad Scholarships',
  description: 'Disclaimer for Abroad Scholarships website. Important information about the accuracy and use of scholarship information.',
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-charcoal-900 mb-4">Disclaimer</h1>
        <p className="text-charcoal-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">General Information</h2>
            <p className="text-charcoal-700 mb-4">
              The information contained on the Abroad Scholarships website is for general information purposes only. While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Scholarship Information Accuracy</h2>
            <p className="text-charcoal-700 mb-4">
              <strong>Important:</strong> All scholarship information provided on this website is compiled from various sources and is subject to change without notice. We strongly advise all users to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li><strong>Verify all information</strong> directly with the official scholarship provider or university website</li>
              <li><strong>Check application deadlines</strong> as they may have passed or changed</li>
              <li><strong>Confirm eligibility requirements</strong> as they may vary or be updated</li>
              <li><strong>Verify scholarship benefits</strong> and funding amounts directly with the provider</li>
              <li><strong>Read the official scholarship announcement</strong> before applying</li>
            </ul>
            <p className="text-charcoal-700 mb-4">
              We are not responsible for any errors or omissions in the scholarship information, nor for any decisions made based on the information provided on this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">No Endorsement</h2>
            <p className="text-charcoal-700 mb-4">
              The inclusion of any scholarship, university, or organization on this website does not constitute an endorsement, recommendation, or guarantee by Abroad Scholarships. We do not endorse or recommend any specific scholarship, university, or educational program.
            </p>
            <p className="text-charcoal-700 mb-4">
              Users should conduct their own research and due diligence before applying for any scholarship or making any educational decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Application Process</h2>
            <p className="text-charcoal-700 mb-4">
              Abroad Scholarships is not involved in the scholarship application process. We do not:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Process scholarship applications</li>
              <li>Make decisions regarding scholarship awards</li>
              <li>Guarantee acceptance or funding</li>
              <li>Charge fees for scholarship applications (unless clearly stated)</li>
              <li>Act as an intermediary between applicants and scholarship providers</li>
            </ul>
            <p className="text-charcoal-700 mb-4">
              All applications must be submitted directly to the scholarship provider through their official channels.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">External Links</h2>
            <p className="text-charcoal-700 mb-4">
              Our website contains links to external websites that are not provided or maintained by Abroad Scholarships. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
            </p>
            <p className="text-charcoal-700 mb-4">
              When you click on external links, you will be subject to the privacy policies and terms of service of those external websites. We encourage you to review those policies before providing any personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Limitation of Liability</h2>
            <p className="text-charcoal-700 mb-4">
              In no event will Abroad Scholarships be liable for any loss or damage including, without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
            </p>
            <p className="text-charcoal-700 mb-4">
              This includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Loss of scholarship opportunities due to outdated information</li>
              <li>Financial losses from application fees or related expenses</li>
              <li>Missed deadlines or application errors</li>
              <li>Decisions made based on incomplete or inaccurate information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">User Responsibility</h2>
            <p className="text-charcoal-700 mb-4">
              Users of this website are solely responsible for:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Verifying all scholarship information before applying</li>
              <li>Ensuring they meet all eligibility requirements</li>
              <li>Submitting complete and accurate applications</li>
              <li>Meeting all application deadlines</li>
              <li>Following up with scholarship providers directly</li>
              <li>Making informed decisions about their education and career</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Third-Party Services</h2>
            <p className="text-charcoal-700 mb-4">
              Our website may use third-party services such as Google Analytics and Google AdSense. These services have their own privacy policies and terms of service. We are not responsible for the practices of these third-party services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Changes to Information</h2>
            <p className="text-charcoal-700 mb-4">
              Scholarship information is subject to change at any time. Scholarship providers may:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Modify eligibility criteria</li>
              <li>Change application deadlines</li>
              <li>Update funding amounts or benefits</li>
              <li>Cancel or postpone scholarship programs</li>
              <li>Change application procedures</li>
            </ul>
            <p className="text-charcoal-700 mb-4">
              We strive to update our content regularly, but we cannot guarantee that all information is current at all times.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Professional Advice</h2>
            <p className="text-charcoal-700 mb-4">
              The information on this website is not intended to replace professional advice. For specific guidance regarding:
            </p>
            <ul className="list-disc pl-6 mb-4 text-charcoal-700">
              <li>Scholarship applications</li>
              <li>University admissions</li>
              <li>Visa requirements</li>
              <li>Financial planning</li>
              <li>Career decisions</li>
            </ul>
            <p className="text-charcoal-700 mb-4">
              We recommend consulting with qualified professionals, educational counselors, or the relevant authorities.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-charcoal-900 mb-4">Contact Us</h2>
            <p className="text-charcoal-700 mb-4">
              If you have any questions about this disclaimer or notice any errors in our scholarship information, please contact us at:
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

