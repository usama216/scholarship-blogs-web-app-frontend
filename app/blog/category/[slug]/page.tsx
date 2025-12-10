'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useParams } from 'next/navigation'
import { useGetPostsByCategorySlugQuery } from '@/lib/api/blogApi'
import Link from 'next/link'

export default function CategoryPage() {
  const params = useParams<{ slug: string }>()
  const slug = params?.slug as string
  const { data, isLoading } = useGetPostsByCategorySlugQuery(slug, { skip: !slug })
  const category = data?.category
  const posts = data?.data || []

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-charcoal-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal-900">
            {category?.name || 'Category'}
          </h1>
          <p className="text-charcoal-600 mt-2">{category?.description || ''}</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="text-charcoal-600 font-medium">Loading posts...</p>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <p className="text-charcoal-600">No posts yet in this category.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {posts.map((post: any) => (
              <article key={post.id} className="bg-white border-2 border-charcoal-100 rounded-2xl overflow-hidden hover:border-golden-200 hover:shadow-xl transition-all group h-full flex flex-col">
                <div className="h-48 bg-charcoal-100 flex-shrink-0">
                  {post.featured_image ? <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" /> : null}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-charcoal-900 mb-2 group-hover:text-golden-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-sm text-charcoal-600 line-clamp-3 mb-4">{(post.excerpt || '').replace(/<[^>]*>/g, '')}</p>
                  <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 text-golden-600 hover:text-golden-700 font-semibold">
                    Read More
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}


