'use client'

import { useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useGetJobsQuery } from '@/lib/api/jobsApi'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt, FaGlobe, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa'

function CountdownTimer({ deadline }: { deadline: string }) {
  if (!deadline) return null
  const d = new Date(deadline)
  const now = new Date()
  if (d < now) return <span className="text-red-600 font-semibold">Deadline Passed</span>
  const diff = Math.ceil((d.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return <span className="text-primary-600 font-medium">{diff} days left</span>
}

export default function JobDetailPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const { data: jobsData, isLoading } = useGetJobsQuery(undefined)
  const jobs = (jobsData?.data || [])

  const job = useMemo(() => {
    const slug = params?.slug
    if (!slug) return null
    return jobs.find((j: any) => j.slug === slug && j.status === 'published')
  }, [params, jobs])

  const relatedJobs = useMemo(() => {
    if (!job) return []
    return jobs
      .filter((j: any) => j.status === 'published' && j.slug !== job.slug && (j.location_type === job.location_type || j.company_name === job.company_name))
      .slice(0, 3)
  }, [jobs, job])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16">
          <p className="text-neutral-600">Job not found.</p>
          <button onClick={() => router.push('/jobs')} className="mt-4 text-primary-600 underline">Back to Jobs</button>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/jobs" className="text-primary-600 hover:underline text-sm">← Back to Jobs</Link>
        </div>

        <header className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            {job.company_logo ? (
              <img src={job.company_logo} alt="" className="w-20 h-20 object-contain rounded-lg border" />
            ) : (
              <div className="w-20 h-20 bg-neutral-100 rounded-lg flex items-center justify-center">
                <FaBriefcase className="text-3xl text-neutral-400" />
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded ${job.location_type === 'international' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                  {job.location_type}
                </span>
                {job.employment_types && (
                  <span className="px-2 py-1 text-xs bg-neutral-100 text-neutral-700 rounded">{job.employment_types.name}</span>
                )}
                {job.remote_work && (
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded capitalize">{job.remote_work}</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">{job.title}</h1>
              <p className="text-xl text-neutral-600 mb-4">{job.company_name}</p>
              <div className="flex flex-wrap gap-4 text-sm text-neutral-600">
                {job.countries && (
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt /> {job.countries.flag_emoji} {job.countries.name}
                  </span>
                )}
                {job.salary_range && <span>{job.salary_range}</span>}
                {job.experience_level && <span>{job.experience_level}</span>}
                {job.application_deadline && (
                  <span className="flex items-center gap-1">
                    <FaCalendarAlt /> <CountdownTimer deadline={job.application_deadline} />
                    <span className="text-neutral-500">({new Date(job.application_deadline).toLocaleDateString()})</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </header>

        {job.excerpt && (
          <div className="mb-8 p-4 bg-neutral-50 rounded-lg">
            <p className="text-neutral-700 leading-relaxed">{job.excerpt.replace(/<[^>]*>/g, '')}</p>
          </div>
        )}

        <div className="prose prose-neutral max-w-none mb-8">
          <div dangerouslySetInnerHTML={{ __html: job.content }} />
        </div>

        {job.job_requirements && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Requirements</h2>
            <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: job.job_requirements }} />
          </section>
        )}

        {job.job_responsibilities && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Responsibilities</h2>
            <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: job.job_responsibilities }} />
          </section>
        )}

        {job.benefits && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Benefits</h2>
            <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: job.benefits }} />
          </section>
        )}

        <div className="border-t border-neutral-200 pt-8 flex flex-wrap gap-4">
          {job.apply_link && (
            <a
              href={job.apply_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <FaExternalLinkAlt /> Apply Now
            </a>
          )}
          {job.contact_email && (
            <a href={`mailto:${job.contact_email}`} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 rounded-lg font-semibold hover:border-primary-500 hover:text-primary-600 transition-colors">
              <FaEnvelope /> Contact
            </a>
          )}
        </div>

        {relatedJobs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-neutral-200">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Related Jobs</h2>
            <div className="space-y-4">
              {relatedJobs.map((j: any) => (
                <Link key={j.id} href={`/jobs/${j.slug}`} className="block p-4 border border-neutral-200 rounded-lg hover:border-primary-500 hover:shadow transition-all">
                  <h3 className="font-bold text-neutral-900">{j.title}</h3>
                  <p className="text-sm text-neutral-600">{j.company_name}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </main>
  )
}
