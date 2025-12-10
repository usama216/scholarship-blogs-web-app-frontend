import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us - Scholarship Gateway | Our Mission',
  description: 'Learn about Scholarship Gateway\'s mission to help students find fully funded scholarships and study abroad opportunities. Discover our story and commitment to education.',
  keywords: 'scholarships, study abroad, international education, scholarship opportunities, foreign scholarships, Scholarship Gateway',
  openGraph: {
    title: 'About Us - Scholarship Gateway',
    description: 'Learn about our mission to help students achieve their study abroad dreams through comprehensive scholarship information.',
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

