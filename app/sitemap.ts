import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abroadscholarships.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  try {
    // Fetch dynamic pages (scholarships, categories, countries, degree levels)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
    
    const [postsRes, categoriesRes, countriesRes, degreeLevelsRes] = await Promise.all([
      fetch(`${apiUrl}/posts`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/categories`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/countries`, { next: { revalidate: 3600 } }).catch(() => null),
      fetch(`${apiUrl}/degree-levels`, { next: { revalidate: 3600 } }).catch(() => null),
    ])

    const dynamicPages: MetadataRoute.Sitemap = []

    // Add scholarship posts
    if (postsRes?.ok) {
      const postsData = await postsRes.json()
      const posts = (postsData?.data || postsData || []).filter((p: any) => p.status === 'published')
      posts.forEach((post: any) => {
        dynamicPages.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updated_at ? new Date(post.updated_at) : new Date(post.created_at),
          changeFrequency: 'weekly',
          priority: 0.8,
        })
      })
    }

    // Add category pages
    if (categoriesRes?.ok) {
      const categoriesData = await categoriesRes.json()
      const categories = categoriesData?.data || categoriesData || []
      categories.forEach((category: any) => {
        dynamicPages.push({
          url: `${baseUrl}/blog/category/${category.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.7,
        })
      })
    }

    // Add country pages
    if (countriesRes?.ok) {
      const countriesData = await countriesRes.json()
      const countries = countriesData?.data || countriesData || []
      countries.forEach((country: any) => {
        dynamicPages.push({
          url: `${baseUrl}/blog/country/${country.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.7,
        })
      })
    }

    // Add degree level pages
    if (degreeLevelsRes?.ok) {
      const degreeLevelsData = await degreeLevelsRes.json()
      const degreeLevels = degreeLevelsData?.data || degreeLevelsData || []
      degreeLevels.forEach((dl: any) => {
        dynamicPages.push({
          url: `${baseUrl}/blog/degree/${dl.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.7,
        })
      })
    }

    return [...staticPages, ...dynamicPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}

