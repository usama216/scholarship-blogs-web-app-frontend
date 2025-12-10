import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - Scholarship Gateway | Get in Touch',
  description: 'Get in touch with Scholarship Gateway. Have questions about scholarships or study abroad? Need guidance on applications? We\'re here to help.',
  keywords: 'contact, scholarship help, study abroad questions, application guidance, Scholarship Gateway',
  openGraph: {
    title: 'Contact Us - Scholarship Gateway',
    description: 'Get in touch with Scholarship Gateway. Have questions about scholarships or study abroad? We\'re here to help.',
    type: 'website',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

