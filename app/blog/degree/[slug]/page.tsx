'use client'

import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useGetPostsQuery, useGetDegreeLevelsQuery } from '@/lib/api/blogApi'
import { FaGraduationCap } from 'react-icons/fa'

export default function DegreeLevelPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const { data: postsData, isLoading: isLoadingPosts } = useGetPostsQuery({})
  const { data: degreeLevelsData, isLoading: isLoadingDegree } = useGetDegreeLevelsQuery(undefined)
  
  const allPosts = (postsData?.data || postsData || []).filter((p: any) => p.status === 'published')
  const degreeLevels = (degreeLevelsData?.data || degreeLevelsData || [])
  
  const degreeLevel = degreeLevels.find((dl: any) => dl.slug === slug)
  
  const posts = allPosts.filter((post: any) => 
    post.degree_levels && post.degree_levels.some((dl: any) => dl.slug === slug)
  )

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

  if (isLoadingPosts || isLoadingDegree) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!degreeLevel) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-neutral-600">Degree level not found.</p>
          <Link href="/blog" className="mt-4 text-primary-600 hover:underline">Back to Scholarships</Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <FaGraduationCap className="text-5xl" />
            <div>
              <h1 className="text-4xl font-bold mb-2">{degreeLevel.name} Scholarships</h1>
              {degreeLevel.description && (
                <p className="text-primary-100 text-lg">{degreeLevel.description}</p>
              )}
            </div>
          </div>
          <p className="text-primary-100">
            Find {degreeLevel.name.toLowerCase()} scholarships from universities worldwide
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Results Count */}
        <div className="mb-6 text-sm text-neutral-600">
          Found {posts.length} {degreeLevel.name.toLowerCase()} scholarship{posts.length !== 1 ? 's' : ''}
        </div>

        {/* Scholarships List */}
        {posts.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg">
            <FaGraduationCap className="text-6xl text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg mb-2">No scholarships found</p>
            <p className="text-sm text-neutral-500">Check back later for new {degreeLevel.name.toLowerCase()} opportunities</p>
            <Link href="/blog" className="mt-4 inline-block text-primary-600 hover:underline">
              Browse All Scholarships
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <div className="border border-neutral-200 hover:border-primary-600 hover:shadow-md rounded-lg p-5 hover:bg-neutral-50 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.funding_types && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                            {post.funding_types.name}
                          </span>
                        )}
                        {post.countries && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                            {post.countries.flag_emoji} {post.countries.name}
                          </span>
                        )}
                        {post.categories && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                            📂 {post.categories.name}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-neutral-900 mb-2 hover:text-primary-600">
                        {post.title}
                      </h3>
                      <p className="text-neutral-700 mb-2 text-sm leading-relaxed">
                        {post.excerpt ? getTextPreview(post.excerpt) : getTextPreview(post.content)}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
                        <span>📅 {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        {post.application_deadline && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                            Deadline: {new Date(post.application_deadline).toLocaleDateString()}
                          </span>
                        )}
                        {post.university_name && (
                          <span>🏛️ {post.university_name}</span>
                        )}
                      </div>
                    </div>
                    {post.featured_image && (
                      <img src={post.featured_image} alt={post.title} className="w-24 h-24 object-cover rounded flex-shrink-0" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </main>
  )
}

