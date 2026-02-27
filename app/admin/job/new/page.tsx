'use client'

import { useRef, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FaSave, FaEye, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useCreateJobMutation, useGetEmploymentTypesQuery } from '@/lib/api/jobsApi'
import { useGetCountriesQuery } from '@/lib/api/blogApi'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const CollapsibleSection = ({
  id,
  title,
  children,
  isOpen,
  onToggle
}: {
  id: string
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: (id: string) => void
}) => (
  <div className="border border-charcoal-200 rounded-lg overflow-hidden">
    <button type="button" onClick={() => onToggle(id)} className="w-full px-4 py-3 bg-charcoal-50 flex items-center justify-between hover:bg-charcoal-100 transition-colors">
      <span className="font-semibold text-charcoal-900">{title}</span>
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </button>
    {isOpen && <div className="p-4 space-y-4">{children}</div>}
  </div>
)

export default function NewJobPage() {
  const router = useRouter()
  const [createJob, { isLoading }] = useCreateJobMutation()
  const [activeSection, setActiveSection] = useState('basic')
  const hasUserEditedSlug = useRef(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    is_featured: false,
    status: 'draft' as 'draft' | 'published',
    company_name: '',
    company_logo: '',
    location_type: 'national' as 'national' | 'international',
    country_id: '',
    employment_type_id: '',
    salary_range: '',
    remote_work: '' as '' | 'onsite' | 'remote' | 'hybrid',
    application_deadline: '',
    apply_link: '',
    contact_email: '',
    job_requirements: '',
    job_responsibilities: '',
    benefits: '',
    experience_level: '',
    meta_description: '',
    meta_keywords: '',
    seo_title: ''
  })

  const { data: countriesData } = useGetCountriesQuery(undefined)
  const { data: employmentTypesData } = useGetEmploymentTypesQuery(undefined)
  const countries = (countriesData?.data || countriesData || [])
  const employmentTypes = (employmentTypesData?.data || employmentTypesData || [])

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ]
    }
  }), [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (name === 'title' && !hasUserEditedSlug.current) {
      const generatedSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, [name]: value, slug: generatedSlug }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    if (name === 'slug') hasUserEditedSlug.current = true
  }

  const handleSaveDraft = async () => {
    try {
      await createJob({ ...formData, status: 'draft' }).unwrap()
      router.push('/admin')
    } catch (error) {
      alert('Failed to save draft. Please try again.')
    }
  }

  const handlePublish = async () => {
    try {
      await createJob({ ...formData, status: 'published' }).unwrap()
      router.push('/admin')
    } catch (error) {
      alert('Failed to publish job. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
      <header className="bg-white shadow-sm border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900">New Job Posting</h1>
              <p className="text-sm text-charcoal-600 mt-1">Post national or international job</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => router.back()} className="px-4 py-2 text-charcoal-600 hover:bg-charcoal-100 rounded-lg border transition-colors">Cancel</button>
              <button onClick={handleSaveDraft} disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-charcoal-600 text-white rounded-lg font-semibold hover:bg-charcoal-700 disabled:opacity-50">
                <FaSave /> Save Draft
              </button>
              <button onClick={handlePublish} disabled={isLoading} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-forest-600 to-forest-700 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50">
                <FaEye /> Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={e => e.preventDefault()} className="space-y-6">
          <CollapsibleSection id="basic" title="📝 Basic Information" isOpen={activeSection === 'basic'} onToggle={id => setActiveSection(prev => prev === id ? '' : id)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Job Title *</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="e.g., Senior Software Engineer" className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">URL Slug</label>
                <div className="flex items-center gap-2">
                  <span className="text-charcoal-500">/jobs/</span>
                  <input type="text" name="slug" value={formData.slug} onChange={handleInputChange} placeholder="url-slug" className="flex-1 px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Short Description</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} placeholder="Brief summary..." rows={3} className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Full Description *</label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill theme="snow" value={formData.content} onChange={html => setFormData(prev => ({ ...prev, content: html }))} modules={quillModules} />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection id="job" title="💼 Job Details" isOpen={activeSection === 'job'} onToggle={id => setActiveSection(prev => prev === id ? '' : id)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Company Name *</label>
                <input type="text" name="company_name" value={formData.company_name} onChange={handleInputChange} placeholder="Company or Organization" className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" required />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Location Type *</label>
                <select name="location_type" value={formData.location_type} onChange={handleInputChange} className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500">
                  <option value="national">National</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Country</label>
                <select name="country_id" value={formData.country_id} onChange={handleInputChange} className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500">
                  <option value="">Select country</option>
                  {countries.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.flag_emoji || ''} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Employment Type</label>
                <select name="employment_type_id" value={formData.employment_type_id} onChange={handleInputChange} className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500">
                  <option value="">Select type</option>
                  {employmentTypes.map((et: any) => (
                    <option key={et.id} value={et.id}>{et.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Remote Work</label>
                <select name="remote_work" value={formData.remote_work} onChange={handleInputChange} className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500">
                  <option value="">Select</option>
                  <option value="onsite">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Salary Range</label>
                <input type="text" name="salary_range" value={formData.salary_range} onChange={handleInputChange} placeholder="e.g., $50k - $80k" className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Application Deadline</label>
                <input type="date" name="application_deadline" value={formData.application_deadline} onChange={handleInputChange} className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Experience Level</label>
                <input type="text" name="experience_level" value={formData.experience_level} onChange={handleInputChange} placeholder="e.g., Mid-level, Senior" className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Apply Link</label>
                <input type="url" name="apply_link" value={formData.apply_link} onChange={handleInputChange} placeholder="https://..." className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Contact Email</label>
                <input type="email" name="contact_email" value={formData.contact_email} onChange={handleInputChange} placeholder="hr@company.com" className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500" />
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection id="requirements" title="📋 Requirements & Benefits" isOpen={activeSection === 'requirements'} onToggle={id => setActiveSection(prev => prev === id ? '' : id)}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Job Requirements</label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill theme="snow" value={formData.job_requirements} onChange={html => setFormData(prev => ({ ...prev, job_requirements: html }))} modules={quillModules} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Job Responsibilities</label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill theme="snow" value={formData.job_responsibilities} onChange={html => setFormData(prev => ({ ...prev, job_responsibilities: html }))} modules={quillModules} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Benefits</label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill theme="snow" value={formData.benefits} onChange={html => setFormData(prev => ({ ...prev, benefits: html }))} modules={quillModules} />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          <CollapsibleSection id="media" title="🖼️ Media" isOpen={activeSection === 'media'} onToggle={id => setActiveSection(prev => prev === id ? '' : id)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Featured Image</label>
                <input type="file" accept="image/*" onChange={async e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  try {
                    const form = new FormData()
                    form.append('file', file)
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, { method: 'POST', body: form })
                    const json = await res.json()
                    if (json?.url) setFormData(prev => ({ ...prev, featured_image: json.url }))
                  } catch { alert('Image upload failed') }
                }} className="w-full text-sm" />
                {formData.featured_image && <img src={formData.featured_image} alt="Featured" className="mt-2 w-full h-48 object-cover rounded-lg" />}
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">Company Logo</label>
                <input type="file" accept="image/*" onChange={async e => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  try {
                    const form = new FormData()
                    form.append('file', file)
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, { method: 'POST', body: form })
                    const json = await res.json()
                    if (json?.url) setFormData(prev => ({ ...prev, company_logo: json.url }))
                  } catch { alert('Image upload failed') }
                }} className="w-full text-sm" />
                {formData.company_logo && <img src={formData.company_logo} alt="Logo" className="mt-2 w-32 h-32 object-contain rounded-lg" />}
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleInputChange} className="w-4 h-4" />
                <label className="text-sm font-semibold text-charcoal-700">Mark as Featured</label>
              </div>
            </div>
          </CollapsibleSection>
        </form>
      </div>
    </div>
  )
}
