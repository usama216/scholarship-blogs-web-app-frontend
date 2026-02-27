'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'
import { useGetPostsQuery, useGetCategoriesQuery, useGetCountriesQuery, useGetDegreeLevelsQuery, useGetFundingTypesQuery } from '@/lib/api/blogApi'
import { FaSearch, FaFilter, FaSort, FaTimes } from 'react-icons/fa'

export default function BlogPage() {
  const { data: postsData, isLoading } = useGetPostsQuery({})
  const { data: countriesData } = useGetCountriesQuery(undefined)
  const { data: categoriesData } = useGetCategoriesQuery(undefined)
  const { data: degreeLevelsData } = useGetDegreeLevelsQuery(undefined)
  const { data: fundingTypesData } = useGetFundingTypesQuery(undefined)
  
  const allPosts = (postsData?.data || postsData || []).filter((p: any) => p.status === 'published')
  const countries = (countriesData?.data || countriesData || [])
  const categories = (categoriesData?.data || categoriesData || [])
  const degreeLevels = (degreeLevelsData?.data || degreeLevelsData || [])
  const fundingTypes = (fundingTypesData?.data || fundingTypesData || [])

  // Filter states
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDegreeLevels, setSelectedDegreeLevels] = useState<string[]>([])
  const [selectedFundingTypes, setSelectedFundingTypes] = useState<string[]>([])
  const [deadlineFilter, setDeadlineFilter] = useState<'all' | 'upcoming' | 'past'>('all')
  const [sortBy, setSortBy] = useState<'latest' | 'deadline' | 'popular' | 'fully-funded'>('latest')
  const [showFilters, setShowFilters] = useState(false)

  const getTextPreview = (html: string, maxLength = 160) => {
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

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = [...allPosts]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((post: any) => 
        post.title?.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query) ||
        post.scholarship_provider?.toLowerCase().includes(query) ||
        post.university_name?.toLowerCase().includes(query)
      )
    }

    // Country filter
    if (selectedCountry) {
      filtered = filtered.filter((post: any) => post.country_id === selectedCountry)
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((post: any) => post.category_id === selectedCategory)
    }

    // Degree levels filter
    if (selectedDegreeLevels.length > 0) {
      filtered = filtered.filter((post: any) => {
        if (!post.degree_levels || post.degree_levels.length === 0) return false
        return post.degree_levels.some((dl: any) => selectedDegreeLevels.includes(dl.id))
      })
    }

    // Funding types filter
    if (selectedFundingTypes.length > 0) {
      filtered = filtered.filter((post: any) => 
        post.funding_type_id && selectedFundingTypes.includes(post.funding_type_id)
      )
    }

    // Deadline filter
    if (deadlineFilter !== 'all') {
      const now = new Date()
      filtered = filtered.filter((post: any) => {
        if (!post.application_deadline) return deadlineFilter === 'past'
        const deadline = new Date(post.application_deadline)
        return deadlineFilter === 'upcoming' ? deadline >= now : deadline < now
      })
    }

    // Sort
    filtered.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'deadline':
          if (!a.application_deadline && !b.application_deadline) return 0
          if (!a.application_deadline) return 1
          if (!b.application_deadline) return -1
          return new Date(a.application_deadline).getTime() - new Date(b.application_deadline).getTime()
        case 'popular':
          return (b.views || 0) - (a.views || 0)
        case 'fully-funded':
          const aFullyFunded = a.funding_types?.slug === 'fully-funded' ? 1 : 0
          const bFullyFunded = b.funding_types?.slug === 'fully-funded' ? 1 : 0
          return bFullyFunded - aFullyFunded
        default:
          return 0
      }
    })

    return filtered
  }, [allPosts, searchQuery, selectedCountry, selectedCategory, selectedDegreeLevels, selectedFundingTypes, deadlineFilter, sortBy])

  const toggleDegreeLevel = (id: string) => {
    setSelectedDegreeLevels(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const toggleFundingType = (id: string) => {
    setSelectedFundingTypes(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCountry('')
    setSelectedCategory('')
    setSelectedDegreeLevels([])
    setSelectedFundingTypes([])
    setDeadlineFilter('all')
    setSortBy('latest')
  }

  const activeFiltersCount = [
    searchQuery,
    selectedCountry,
    selectedCategory,
    selectedDegreeLevels.length,
    selectedFundingTypes.length,
    deadlineFilter !== 'all'
  ].filter(Boolean).length

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Header */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">Scholarship Opportunities</h1>
          <p className="text-lg text-neutral-700">Browse fully funded scholarships, study abroad programs, and application guides.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Ad Banner */}
        <AdBanner position="between-sections" />

        {/* Search and Filter Bar */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scholarships by title, provider, university..."
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <FaFilter />
              Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </button>
            <div className="flex items-center gap-2">
              <FaSort className="text-neutral-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              >
                <option value="latest">Latest First</option>
                <option value="deadline">Deadline Soon</option>
                <option value="popular">Most Popular</option>
                <option value="fully-funded">Fully Funded First</option>
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Country Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Countries</option>
                    {countries.map((country: any) => (
                      <option key={country.id} value={country.id}>
                        {country.flag_emoji} {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>

                {/* Deadline Filter */}
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Deadline</label>
                  <select
                    value={deadlineFilter}
                    onChange={(e) => setDeadlineFilter(e.target.value as any)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Deadlines</option>
                    <option value="upcoming">Upcoming Only</option>
                    <option value="past">Past Deadlines</option>
                  </select>
                </div>
              </div>

              {/* Degree Levels */}
              {degreeLevels.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Degree Levels</label>
                  <div className="flex flex-wrap gap-2">
                    {degreeLevels.map((dl: any) => (
                      <label
                        key={dl.id}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDegreeLevels.includes(dl.id)}
                          onChange={() => toggleDegreeLevel(dl.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{dl.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Funding Types */}
              {fundingTypes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Funding Type</label>
                  <div className="flex flex-wrap gap-2">
                    {fundingTypes.map((ft: any) => (
                      <label
                        key={ft.id}
                        className="flex items-center gap-2 px-3 py-2 bg-white border border-neutral-300 rounded-lg cursor-pointer hover:bg-neutral-50"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFundingTypes.includes(ft.id)}
                          onChange={() => toggleFundingType(ft.id)}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">{ft.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <FaTimes />
                  Clear All Filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-neutral-600">
          Showing {filteredAndSortedPosts.length} of {allPosts.length} scholarships
        </div>

        {/* Countries Quick Links */}
        {countries.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">🌍 Browse by Country</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {countries.slice(0, 20).map((country: any) => (
                <Link key={country.id} href={`/blog/country/${country.slug}`}>
                  <div className="border-2 border-neutral-200 hover:border-cta-500 rounded-lg p-3 text-center hover:bg-cta-50 transition-all">
                    <div className="text-2xl mb-1">{country.flag_emoji || '🌍'}</div>
                    <h3 className="font-bold text-neutral-900 text-2xl">{country.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Categories Quick Links */}
        {categories.length > 0 && (
          <section id="categories" className="mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">📂 Browse by Category</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {categories.slice(0, 12).map((category: any) => (
                <Link key={category.id} href={`/blog/category/${category.slug}`}>
                  <div className="border-2 border-neutral-200 hover:border-primary-600 hover:bg-primary-50 rounded-lg p-4 transition-all">
                    <h3 className="font-bold text-neutral-900">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-neutral-600 mt-1">{category.description}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            {categories.length > 12 && (
              <div className="flex justify-center mt-4">
                <Link
                  href="/blog#categories"
                  className="px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  View More
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Ad Banner */}
        <div className="my-8">
          <AdBanner position="in-article" />
        </div>

        {/* Scholarships List */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-4">All Scholarship Articles</h2>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
            </div>
          ) : filteredAndSortedPosts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg">
              <p className="text-neutral-600 text-lg mb-2">No scholarships found</p>
              <p className="text-sm text-neutral-500 mb-4">Try adjusting your filters</p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAndSortedPosts.map((post: any) => (
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
                          {post.degree_levels && post.degree_levels.length > 0 && (
                            post.degree_levels.slice(0, 2).map((dl: any) => (
                              <span key={dl.id} className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs">
                                {dl.name}
                              </span>
                            ))
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
                          {post.categories && (
                            <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded">
                              📂 {post.categories.name}
                            </span>
                          )}
                          {post.views > 0 && (
                            <span>👁️ {post.views} views</span>
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
        </section>

        {/* Ad Banners */}
        <div className="my-8">
          <AdBanner position="square" />
        </div>
        
        <div className="my-8">
          <AdBanner position="before-footer" />
        </div>
      </div>

      <Footer />
    </main>
  )
}
