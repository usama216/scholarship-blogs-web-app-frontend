'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'
import { useGetPostsByCountrySlugQuery } from '@/lib/api/blogApi'

export default function CountryPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const { data, isLoading } = useGetPostsByCountrySlugQuery(slug)
  const country = data?.country
  const posts = data?.data || []

  const getTextPreview = (html: string, maxLength = 200) => {
    if (!html) return ''
    const text = html.replace(/<[^>]*>/g, '')
    const decoded = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
        </div>
      ) : (
        <>
          {/* Header */}
          <section className="bg-white py-8 border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-3 mb-3">
                {country?.flag_emoji && <span className="text-4xl">{country.flag_emoji}</span>}
                <h1 className="text-3xl font-bold text-neutral-900">
                  {country?.name} Scholarships
                </h1>
              </div>
              <p className="text-lg text-neutral-700">
                {country?.description || `Browse scholarship opportunities for studying in ${country?.name}`}
              </p>
              <p className="text-sm text-neutral-600 mt-2">
                {posts.length} scholarship{posts.length !== 1 ? 's' : ''} available
              </p>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Ad Banner */}
            <AdBanner position="between-sections" />

            {/* Scholarships List */}
            <section className="my-8">
              {posts.length > 0 ? (
                <div className="space-y-3">
                  {posts.map((post: any, index: number) => (
                    <Link key={post.id || index} href={`/blog/${post.slug}`}>
                      <div className="border border-neutral-200 hover:border-primary-600 hover:shadow-md rounded-lg p-5 hover:bg-neutral-50 transition-all">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-neutral-900 mb-2 hover:text-primary-600">
                              {post.title}
                            </h3>
                            <p className="text-neutral-700 mb-2 text-sm leading-relaxed">
                              {post.excerpt ? getTextPreview(post.excerpt) : getTextPreview(post.content)}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                              <span>📅 {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                              {post.category_name && (
                                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                                  📂 {post.category_name}
                                </span>
                              )}
                            </div>
                          </div>
                          {post.featured_image && (
                            <img 
                              src={post.featured_image} 
                              alt={post.title} 
                              className="w-24 h-24 object-cover rounded flex-shrink-0" 
                            />
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 border border-neutral-200 rounded-lg">
                  <p className="text-neutral-600 mb-4">
                    No scholarships available for {country?.name} at the moment.
                  </p>
                  <Link href="/blog">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg">
                      Browse All Scholarships
                    </button>
                  </Link>
                </div>
              )}
            </section>

            {/* Ad Banners */}
            <div className="my-8">
              <AdBanner position="in-article" />
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <Link href="/blog">
                <button className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-bold">
                  ← Back to All Scholarships
                </button>
              </Link>
            </div>
          </div>
        </>
      )}

      <Footer />
    </main>
  )
}

