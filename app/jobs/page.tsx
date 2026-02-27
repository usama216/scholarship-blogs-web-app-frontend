'use client'

import { useState, useMemo } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useGetJobsQuery, useGetEmploymentTypesQuery } from '@/lib/api/jobsApi'
import { useGetCountriesQuery } from '@/lib/api/blogApi'
import { FaSearch, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'

export default function JobsPage() {
  const { data: jobsData, isLoading } = useGetJobsQuery(undefined)
  const { data: countriesData } = useGetCountriesQuery(undefined)
  const { data: employmentTypesData } = useGetEmploymentTypesQuery(undefined)

  const allJobs = (jobsData?.data || []).filter((j: any) => j.status === 'published')
  const countries = (countriesData?.data || countriesData || [])
  const employmentTypes = (employmentTypesData?.data || employmentTypesData || [])

  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState<'all' | 'national' | 'international'>('all')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedEmploymentType, setSelectedEmploymentType] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'deadline'>('latest')

  const filteredAndSortedJobs = useMemo(() => {
    let filtered = [...allJobs]
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter((job: any) => job.title?.toLowerCase().includes(q) || job.company_name?.toLowerCase().includes(q) || job.excerpt?.toLowerCase().includes(q))
    }
    if (locationFilter !== 'all') filtered = filtered.filter((job: any) => job.location_type === locationFilter)
    if (selectedCountry) filtered = filtered.filter((job: any) => job.country_id === selectedCountry)
    if (selectedEmploymentType) filtered = filtered.filter((job: any) => job.employment_type_id === selectedEmploymentType)
    filtered.sort((a: any, b: any) => {
      if (sortBy === 'deadline') {
        const da = a.application_deadline ? new Date(a.application_deadline).getTime() : Infinity
        const db = b.application_deadline ? new Date(b.application_deadline).getTime() : Infinity
        return da - db
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
    return filtered
  }, [allJobs, searchQuery, locationFilter, selectedCountry, selectedEmploymentType, sortBy])

  const getTextPreview = (html: string, maxLength = 150) => {
    if (!html) return ''
    const text = html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">Job Opportunities</h1>
          <p className="text-lg text-neutral-700">Browse national and international job postings.</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="flex gap-2 mb-6 border-b border-neutral-200">
          <button onClick={() => setLocationFilter('all')} className={`px-6 py-3 font-semibold border-b-2 -mb-px ${locationFilter === 'all' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-600'}`}>All Jobs</button>
          <button onClick={() => setLocationFilter('national')} className={`px-6 py-3 font-semibold border-b-2 -mb-px ${locationFilter === 'national' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-600'}`}>National</button>
          <button onClick={() => setLocationFilter('international')} className={`px-6 py-3 font-semibold border-b-2 -mb-px ${locationFilter === 'international' ? 'border-primary-600 text-primary-600' : 'border-transparent text-neutral-600'}`}>International</button>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search jobs by title, company..." className="w-full pl-12 pr-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500" />
          </div>
          <div className="flex flex-wrap gap-4">
            <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="px-4 py-2 border border-neutral-300 rounded-lg">
              <option value="">All Countries</option>
              {countries.map((c: any) => <option key={c.id} value={c.id}>{c.flag_emoji || ''} {c.name}</option>)}
            </select>
            <select value={selectedEmploymentType} onChange={(e) => setSelectedEmploymentType(e.target.value)} className="px-4 py-2 border border-neutral-300 rounded-lg">
              <option value="">All Types</option>
              {employmentTypes.map((et: any) => <option key={et.id} value={et.id}>{et.name}</option>)}
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-4 py-2 border border-neutral-300 rounded-lg">
              <option value="latest">Latest First</option>
              <option value="deadline">Deadline Soon</option>
            </select>
          </div>
        </div>

        <div className="mb-4 text-sm text-neutral-600">Showing {filteredAndSortedJobs.length} of {allJobs.length} jobs</div>

        {isLoading ? (
          <div className="flex justify-center py-16"><div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div></div>
        ) : filteredAndSortedJobs.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-neutral-300 rounded-lg">
            <FaBriefcase className="text-6xl text-neutral-300 mx-auto mb-4" />
            <p className="text-neutral-600 text-lg">No jobs found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAndSortedJobs.map((job: any) => (
              <Link key={job.id} href={`/jobs/${job.slug}`}>
                <div className="border border-neutral-200 hover:border-primary-500 rounded-lg p-6 hover:shadow-lg transition-all">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {job.company_logo ? <img src={job.company_logo} alt="" className="w-16 h-16 object-contain rounded-lg border" /> : <div className="w-16 h-16 bg-neutral-100 rounded-lg flex items-center justify-center"><FaBriefcase className="text-2xl text-neutral-400" /></div>}
                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 mb-2">
                        <h2 className="text-xl font-bold text-neutral-900 hover:text-primary-600">{job.title}</h2>
                        <span className={`px-2 py-0.5 text-xs font-semibold rounded ${job.location_type === 'international' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{job.location_type}</span>
                        {job.employment_types && <span className="px-2 py-0.5 text-xs bg-neutral-100 text-neutral-700 rounded">{job.employment_types.name}</span>}
                      </div>
                      <p className="text-neutral-600 font-medium mb-1">{job.company_name}</p>
                      <p className="text-neutral-600 text-sm mb-3">{getTextPreview(job.excerpt || job.content)}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-neutral-500">
                        {job.countries && <span>{job.countries.flag_emoji} {job.countries.name}</span>}
                        {job.salary_range && <span>{job.salary_range}</span>}
                        {job.remote_work && <span className="capitalize">{job.remote_work}</span>}
                        {job.application_deadline && <span className="flex items-center gap-1"><FaCalendarAlt /> {new Date(job.application_deadline).toLocaleDateString()}</span>}
                      </div>
                    </div>
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
