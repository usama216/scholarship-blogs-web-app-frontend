import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - Scholarship Gateway | Latest Scholarships & Study Abroad Tips',
  description: 'Explore our blog on scholarships, study abroad opportunities, application tips, visa guidance, and success stories. Your comprehensive guide to international education.',
  keywords: 'scholarship blog, study abroad tips, international scholarships, application guidance, visa information, scholarship deadlines',
  openGraph: {
    title: 'Blog - Scholarship Gateway',
    description: 'Explore scholarship opportunities, study abroad tips, and success stories.',
    type: 'website',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

