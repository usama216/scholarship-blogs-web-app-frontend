'use client'

import Link from 'next/link'
import { useGetPostsQuery, useGetCategoriesQuery, useGetCountriesQuery } from '@/lib/api/blogApi'

const FeaturedArticles = () => {
  const { data: postsData, isLoading } = useGetPostsQuery({})
  const { data: categoriesData } = useGetCategoriesQuery(undefined)
  const { data: countriesData } = useGetCountriesQuery(undefined)
  
  const posts = (postsData?.data || postsData || [])
    .filter((p: any) => p.status === 'published')
    .slice(0, 15)
  
  const categories = (categoriesData?.data || categoriesData || [])
  const countries = (countriesData?.data || countriesData || []).slice(0, 20)

  const getTextPreview = (html: string, maxLength = 200) => {
    if (!html) return ''
    const text = html.replace(/<[^>]*>/g, '')
    const decoded = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
    const trimmed = decoded.trim()
    return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Countries Grid */}
        {countries.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">🌍 Browse by Country</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {countries.map((country: any, index: number) => (
                <Link key={index} href={`/blog/country/${country.slug}`}>
                  <div className="border-2 border-neutral-200 hover:border-cta-500 rounded-lg p-3 text-center hover:bg-cta-50 transition-all">
                    <div className="text-2xl mb-1">{country.flag_emoji || '🌍'}</div>
                    <h3 className="font-bold text-neutral-900 text-xs">{country.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Categories Grid */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">📂 Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category: any, index: number) => (
                <Link key={index} href={`/blog/category/${category.slug}`}>
                  <div className="border-2 border-neutral-200 hover:border-primary-600 hover:bg-primary-50 rounded-lg p-4 transition-all">
                    <h3 className="font-bold text-neutral-900 text-sm">{category.name}</h3>
                    {category.description && (
                      <p className="text-xs text-neutral-600 mt-1">{category.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Scholarships List */}
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">Latest Scholarship Opportunities</h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="space-y-3 mb-8">
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
                          {post.category_name && <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">📂 {post.category_name}</span>}
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

            <div className="text-center pt-4">
              <Link href="/blog">
                <button className="bg-cta-500 hover:bg-cta-600 text-white px-10 py-3 rounded-lg font-bold text-lg transition-colors">
                  View All Scholarships →
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12 border border-neutral-200 rounded-lg">
            <p className="text-neutral-600">No scholarships available at the moment. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FeaturedArticles
