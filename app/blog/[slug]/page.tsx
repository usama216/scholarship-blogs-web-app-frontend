'use client'

import { useMemo, useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetPostsQuery } from '@/lib/api/blogApi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import StructuredData from '@/components/StructuredData'
import { FaCalendarAlt, FaUniversity, FaGlobe, FaGraduationCap, FaDollarSign, FaEnvelope, FaExternalLinkAlt, FaClock, FaFilePdf, FaPlayCircle } from 'react-icons/fa'

function CountdownTimer({ deadline }: { deadline: string }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null)

  useEffect(() => {
    if (!deadline) return

    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const deadlineTime = new Date(deadline).getTime()
      const difference = deadlineTime - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [deadline])

  if (!timeLeft) return null

  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return <span className="text-red-600 font-semibold">Deadline Passed</span>
  }

  return (
    <div className="flex gap-4 text-center">
      <div className="bg-primary-100 rounded-lg p-3 min-w-[70px]">
        <div className="text-2xl font-bold text-primary-700">{timeLeft.days}</div>
        <div className="text-xs text-primary-600">Days</div>
      </div>
      <div className="bg-primary-100 rounded-lg p-3 min-w-[70px]">
        <div className="text-2xl font-bold text-primary-700">{timeLeft.hours}</div>
        <div className="text-xs text-primary-600">Hours</div>
      </div>
      <div className="bg-primary-100 rounded-lg p-3 min-w-[70px]">
        <div className="text-2xl font-bold text-primary-700">{timeLeft.minutes}</div>
        <div className="text-xs text-primary-600">Minutes</div>
      </div>
      <div className="bg-primary-100 rounded-lg p-3 min-w-[70px]">
        <div className="text-2xl font-bold text-primary-700">{timeLeft.seconds}</div>
        <div className="text-xs text-primary-600">Seconds</div>
      </div>
    </div>
  )
}

export default function BlogDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { data: postsData, isLoading } = useGetPostsQuery({})
  const posts = (postsData?.data || postsData || [])

  const post = useMemo(() => {
    const slug = params?.slug
    if (!slug) return null
    return posts.find((p: any) => p.slug === slug && p.status === 'published')
  }, [params, posts])

  const featured = useMemo(() => {
    return posts.filter((p: any) => p.status === 'published' && p.is_featured && p.slug !== post?.slug).slice(0, 5)
  }, [posts, post])

  const relatedPosts = useMemo(() => {
    if (!post) return []
    const related: any[] = []
    
    // Related by country
    if (post.country_id) {
      const byCountry = posts.filter((p: any) => 
        p.status === 'published' && 
        p.country_id === post.country_id && 
        p.slug !== post.slug
      )
      related.push(...byCountry.slice(0, 2))
    }
    
    // Related by category
    if (post.category_id) {
      const byCategory = posts.filter((p: any) => 
        p.status === 'published' && 
        p.category_id === post.category_id && 
        p.slug !== post.slug &&
        !related.find(r => r.id === p.id)
      )
      related.push(...byCategory.slice(0, 2))
    }
    
    // Related by degree level
    if (post.degree_levels && post.degree_levels.length > 0) {
      const degreeIds = post.degree_levels.map((dl: any) => dl.id)
      const byDegree = posts.filter((p: any) => 
        p.status === 'published' && 
        p.slug !== post.slug &&
        !related.find(r => r.id === p.id) &&
        p.degree_levels?.some((dl: any) => degreeIds.includes(dl.id))
      )
      related.push(...byDegree.slice(0, 1))
    }
    
    return related.slice(0, 3)
  }, [posts, post])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-charcoal-600 font-medium">Loading scholarship...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-charcoal-600">Scholarship not found.</p>
          <button onClick={() => router.push('/blog')} className="mt-4 text-golden-700 underline">Back to Scholarships</button>
        </div>
        <Footer />
      </main>
    )
  }

  const country = post.countries || {}
  const fundingType = post.funding_types || {}
  const category = post.categories || {}

  // Schema.org structured data for Scholarship
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Scholarship',
    name: post.title,
    description: post.excerpt || post.content?.replace(/<[^>]*>/g, '').substring(0, 200),
    provider: {
      '@type': 'Organization',
      name: post.scholarship_provider || post.university_name || 'Scholarship Provider',
      ...(post.university_name && { legalName: post.university_name }),
    },
    ...(post.university_name && {
      award: {
        '@type': 'MonetaryGrant',
        name: post.title,
      },
    }),
    ...(post.application_deadline && {
      applicationDeadline: post.application_deadline,
    }),
    ...(post.eligibility_criteria && {
      eligibilityToWin: post.eligibility_criteria.replace(/<[^>]*>/g, ''),
    }),
    ...(post.scholarship_benefits && {
      awardDetails: post.scholarship_benefits.replace(/<[^>]*>/g, ''),
    }),
    ...(post.apply_link && {
      url: post.apply_link,
    }),
    ...(post.featured_image && {
      image: post.featured_image,
    }),
    ...(country.name && {
      areaServed: {
        '@type': 'Country',
        name: country.name,
      },
    }),
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <StructuredData data={structuredData} />
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_minmax(0,_800px)_1fr] gap-6">
          {/* Left Ad (xl+) */}
          <aside className="hidden xl:block">
            <div className="sticky top-20">
              <AdBanner position="left-rail" />
            </div>
          </aside>

          {/* Content */}
          <article className="bg-white rounded-2xl shadow border border-charcoal-200 overflow-hidden">
            {post.featured_image && (
              <div className="w-full h-72 md:h-96 bg-charcoal-100 relative">
                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                {post.host_university_logo && (
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded-lg shadow-lg">
                    <img src={post.host_university_logo} alt="University Logo" className="h-16 w-auto object-contain" />
                  </div>
                )}
              </div>
            )}
            
            <div className="p-6 md:p-10">
              {/* Breadcrumbs */}
              <nav className="text-sm text-charcoal-500 mb-4">
                <a href="/" className="hover:text-primary-600">Home</a> / 
                <a href="/blog" className="hover:text-primary-600"> Scholarships</a>
                {category.name && <> / <a href={`/blog/category/${category.slug}`} className="hover:text-primary-600">{category.name}</a></>}
                {country.name && <> / <a href={`/blog/country/${country.slug}`} className="hover:text-primary-600">{country.name}</a></>}
                {' / '}
                <span className="text-charcoal-700">{post.title}</span>
              </nav>

              <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal-900 mb-4">{post.title}</h1>
              
              {/* Key Info Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {fundingType.name && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    💰 {fundingType.name}
                  </span>
                )}
                {country.name && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {country.flag_emoji || '🌍'} {country.name}
                  </span>
                )}
                {category.name && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    📂 {category.name}
                  </span>
                )}
                {post.degree_levels && post.degree_levels.length > 0 && (
                  post.degree_levels.map((dl: any) => (
                    <span key={dl.id} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                      🎓 {dl.name}
                    </span>
                  ))
                )}
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-charcoal-50 rounded-lg">
                {post.scholarship_provider && (
                  <div className="flex items-center gap-3">
                    <FaUniversity className="text-primary-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">Provider</div>
                      <div className="font-semibold text-charcoal-900">{post.scholarship_provider}</div>
                    </div>
                  </div>
                )}
                {post.university_name && (
                  <div className="flex items-center gap-3">
                    <FaGraduationCap className="text-primary-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">University</div>
                      <div className="font-semibold text-charcoal-900">{post.university_name}</div>
                    </div>
                  </div>
                )}
                {post.application_deadline && (
                  <div className="flex items-center gap-3">
                    <FaCalendarAlt className="text-red-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">Application Deadline</div>
                      <div className="font-semibold text-charcoal-900">
                        {new Date(post.application_deadline).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                )}
                {post.program_duration && (
                  <div className="flex items-center gap-3">
                    <FaClock className="text-primary-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">Duration</div>
                      <div className="font-semibold text-charcoal-900">{post.program_duration}</div>
                    </div>
                  </div>
                )}
                {post.eligible_nationalities && (
                  <div className="flex items-center gap-3">
                    <FaGlobe className="text-primary-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">Eligible Nationalities</div>
                      <div className="font-semibold text-charcoal-900">{post.eligible_nationalities}</div>
                    </div>
                  </div>
                )}
                {post.application_fee !== undefined && (
                  <div className="flex items-center gap-3">
                    <FaDollarSign className="text-primary-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">Application Fee</div>
                      <div className="font-semibold text-charcoal-900">
                        {post.application_fee 
                          ? `Yes${post.application_fee_amount ? ` - $${post.application_fee_amount}` : ''}` 
                          : 'No'}
                      </div>
                    </div>
                  </div>
                )}
                {post.application_mode && (
                  <div className="flex items-center gap-3">
                    <FaExternalLinkAlt className="text-primary-600 text-xl" />
                    <div>
                      <div className="text-xs text-charcoal-500">Application Mode</div>
                      <div className="font-semibold text-charcoal-900 capitalize">{post.application_mode}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Deadline Countdown */}
              {post.application_deadline && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-semibold text-red-900 mb-2">⏰ Time Remaining to Apply:</div>
                  <CountdownTimer deadline={post.application_deadline} />
                </div>
              )}

              {/* Apply Button */}
              {post.apply_link && (
                <div className="mb-6">
                  <a
                    href={post.apply_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all hover:scale-105"
                  >
                    Apply Now <FaExternalLinkAlt />
                  </a>
                </div>
              )}

              {/* Video Embed */}
              {post.video_embed && (
                <div className="mb-6">
                  <div className="aspect-video rounded-lg overflow-hidden" dangerouslySetInnerHTML={{ __html: post.video_embed }} />
                </div>
              )}

              {/* Full Description */}
              {post.content && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-4">About the Scholarship</h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                  </div>
                </div>
              )}

              {/* In-Article Ad */}
              <div className="my-8">
                <AdBanner position="in-article" />
              </div>

              {/* Scholarship Benefits */}
              {post.scholarship_benefits && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-4">💰 Scholarship Benefits</h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.scholarship_benefits }} />
                  </div>
                </div>
              )}

              {/* Eligibility Criteria */}
              {post.eligibility_criteria && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-4">✅ Eligibility Criteria</h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.eligibility_criteria }} />
                  </div>
                </div>
              )}

              {/* Required Documents */}
              {post.required_documents && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-4">📄 Required Documents</h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.required_documents }} />
                  </div>
                </div>
              )}

              {/* How to Apply */}
              {post.how_to_apply && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-4">📝 How to Apply</h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.how_to_apply }} />
                  </div>
                </div>
              )}

              {/* Notes */}
              {post.notes && (
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h2 className="text-xl font-bold text-charcoal-900 mb-3">⚠️ Important Notes</h2>
                  <div className="prose prose-lg max-w-none prose-headings:text-charcoal-900 prose-p:text-charcoal-800 prose-a:text-blue-600 prose-a:underline hover:prose-a:text-blue-800 blog-content">
                    <div dangerouslySetInnerHTML={{ __html: post.notes }} />
                  </div>
                </div>
              )}

              {/* Contact & Links */}
              <div className="mb-8 p-4 bg-charcoal-50 rounded-lg">
                <h3 className="text-lg font-semibold text-charcoal-900 mb-3">Contact & Links</h3>
                <div className="space-y-2">
                  {post.contact_email && (
                    <div className="flex items-center gap-2">
                      <FaEnvelope className="text-primary-600" />
                      <a href={`mailto:${post.contact_email}`} className="text-primary-600 hover:underline">
                        {post.contact_email}
                      </a>
                    </div>
                  )}
                  {post.official_website && (
                    <div className="flex items-center gap-2">
                      <FaExternalLinkAlt className="text-primary-600" />
                      <a href={post.official_website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        Official Website
                      </a>
                    </div>
                  )}
                  {post.scholarship_brochure_pdf && (
                    <div className="flex items-center gap-2">
                      <FaFilePdf className="text-red-600" />
                      <a href={post.scholarship_brochure_pdf} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                        Download Scholarship Brochure (PDF)
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Anchor Ad */}
              <div className="md:hidden my-6">
                <AdBanner position="mobile-anchor" />
              </div>
            </div>
          </article>

          {/* Right Ad (xl+) */}
          <aside className="hidden xl:block">
            <div className="sticky top-20 space-y-6">
              <AdBanner position="right-rail" />
              <AdBanner position="sidebar-rectangle" />
              <AdBanner position="half-page" />
              
              {/* Featured Posts */}
              {featured.length > 0 && (
                <div className="bg-white rounded-xl shadow border border-charcoal-200 p-4">
                  <h3 className="text-base font-semibold text-charcoal-900 mb-3">Featured Scholarships</h3>
                  <ul className="space-y-3">
                    {featured.map((fp: any) => (
                      <li key={fp.id}>
                        <a href={`/blog/${fp.slug}`} className="group block">
                          <div className="flex gap-3 items-center">
                            {fp.featured_image ? (
                              <img src={fp.featured_image} alt={fp.title} className="w-14 h-14 rounded object-cover border" />
                            ) : (
                              <div className="w-14 h-14 rounded bg-charcoal-100 border" />
                            )}
                            <div>
                              <p className="text-sm font-medium text-charcoal-900 group-hover:text-golden-700 line-clamp-2">{fp.title}</p>
                              <p className="text-xs text-charcoal-500">{fp.created_at ? new Date(fp.created_at).toLocaleDateString() : ''}</p>
                            </div>
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <AdBanner position="square" />
            </div>
          </aside>
        </div>

        {/* Bottom Ad */}
        <div className="mt-10">
          <AdBanner position="between-sections" />
        </div>

        {/* Related Scholarships */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 mb-10">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-charcoal-900 mb-2">Related Scholarships</h2>
              <p className="text-charcoal-600">You may also be interested in</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost: any) => (
                <a
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group bg-white rounded-xl shadow-md border border-charcoal-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {relatedPost.featured_image ? (
                    <div className="w-full h-48 bg-charcoal-100 overflow-hidden">
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-golden-200 to-forest-200" />
                  )}
                  
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-charcoal-600 mb-3 line-clamp-2">
                      {relatedPost.excerpt || relatedPost.content?.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-charcoal-500">
                      <span>
                        {relatedPost.created_at ? new Date(relatedPost.created_at).toLocaleDateString() : ''}
                      </span>
                      <span className="text-golden-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                        Read More →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
        
        {/* Large Leaderboard before Footer */}
        <div className="mt-16">
          <AdBanner position="before-footer" />
        </div>
      </div>

      <Footer />
    </main>
  )
}
