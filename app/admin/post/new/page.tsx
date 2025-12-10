'use client'

import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { FaSave, FaEye, FaImage, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { 
  useCreatePostMutation, 
  useGetCategoriesQuery, 
  useGetCountriesQuery,
  useGetDegreeLevelsQuery,
  useGetFundingTypesQuery,
  useGetTagsQuery
} from '@/lib/api/blogApi'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function NewPostPage() {
  const router = useRouter()
  const [createPost, { isLoading }] = useCreatePostMutation()
  const [activeSection, setActiveSection] = useState<string>('basic')
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    is_featured: false,
    status: 'draft' as 'draft' | 'published',
    category_id: '',
    country_id: '',
    meta_description: '',
    meta_keywords: '',
    seo_title: '',
    // Scholarship fields
    scholarship_provider: '',
    university_name: '',
    funding_type_id: '',
    application_deadline: '',
    program_duration: '',
    eligible_nationalities: '',
    application_fee: false,
    application_fee_amount: '',
    official_website: '',
    apply_link: '',
    scholarship_benefits: '',
    eligibility_criteria: '',
    required_documents: '',
    how_to_apply: '',
    notes: '',
    contact_email: '',
    application_mode: 'online' as 'online' | 'offline' | 'both',
    available_seats: '',
    host_university_logo: '',
    scholarship_brochure_pdf: '',
    video_embed: '',
    scheduled_publish_at: '',
    degree_level_ids: [] as string[],
    tags: [] as string[]
  })

  const { data: categoriesData } = useGetCategoriesQuery(undefined)
  const categories = (categoriesData?.data || categoriesData || [])
  
  const { data: countriesData } = useGetCountriesQuery(undefined)
  const countries = (countriesData?.data || countriesData || [])

  const { data: degreeLevelsData } = useGetDegreeLevelsQuery(undefined)
  const degreeLevels = (degreeLevelsData?.data || degreeLevelsData || [])

  const { data: fundingTypesData } = useGetFundingTypesQuery(undefined)
  const fundingTypes = (fundingTypesData?.data || fundingTypesData || [])

  const { data: tagsData } = useGetTagsQuery(undefined)
  const tags = (tagsData?.data || tagsData || [])

  const hasUserEditedSlug = useRef(false)
  const hasUserEditedExcerpt = useRef(false)
  const [tagInput, setTagInput] = useState('')

  const stripHTML = (html: string) => {
    if (!html) return ''
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
  }

  const quillModules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean']
      ],
      handlers: {
        image: function(this: any) {
          const quill = this.quill
          const input = document.createElement('input')
          input.type = 'file'
          input.accept = 'image/*'
          input.onchange = async () => {
            const file = (input.files && input.files[0]) || null
            if (!file) return
            
            const range = quill.getSelection(true)
            const index = range ? range.index : quill.getLength()
            
            try {
              const form = new FormData()
              form.append('file', file)
              
              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, {
                method: 'POST',
                body: form,
              })
              
              if (!res.ok) throw new Error('Upload failed')
              
              const json = await res.json()
              if (json?.url) {
                quill.insertEmbed(index, 'image', json.url)
                quill.setSelection(index + 1)
              } else {
                alert('Failed to upload image. Please try again.')
              }
            } catch (e: any) {
              console.error('Image upload error:', e)
              alert('Image upload failed: ' + (e.message || 'Unknown error'))
            }
          }
          input.click()
        }
      }
    }
  }), [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
    
    if (name === 'title' && !hasUserEditedSlug.current) {
      const generatedSlug = value.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      setFormData(prev => ({ ...prev, slug: generatedSlug }))
    }
    if (name === 'slug') {
      hasUserEditedSlug.current = true
    }
    if (name === 'excerpt') {
      hasUserEditedExcerpt.current = true
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const handleToggleDegreeLevel = (degreeId: string) => {
    setFormData(prev => ({
      ...prev,
      degree_level_ids: prev.degree_level_ids.includes(degreeId)
        ? prev.degree_level_ids.filter(id => id !== degreeId)
        : [...prev.degree_level_ids, degreeId]
    }))
  }

  const handleSaveDraft = async () => {
    try {
      await createPost({ 
        ...formData, 
        status: 'draft',
        application_fee_amount: formData.application_fee_amount ? parseFloat(formData.application_fee_amount) : undefined,
        available_seats: formData.available_seats ? parseInt(formData.available_seats) : undefined
      }).unwrap()
      router.push('/admin')
    } catch (error) {
      alert('Failed to save draft. Please try again.')
    }
  }

  const handlePublish = async () => {
    try {
      await createPost({ 
        ...formData, 
        status: 'published',
        application_fee_amount: formData.application_fee_amount ? parseFloat(formData.application_fee_amount) : undefined,
        available_seats: formData.available_seats ? parseInt(formData.available_seats) : undefined
      }).unwrap()
      router.push('/admin')
    } catch (error) {
      alert('Failed to publish post. Please try again.')
    }
  }

  const CollapsibleSection = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => {
    const isOpen = activeSection === id
    return (
      <div className="border border-charcoal-200 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setActiveSection(isOpen ? '' : id)}
          className="w-full px-4 py-3 bg-charcoal-50 flex items-center justify-between hover:bg-charcoal-100 transition-colors"
        >
          <span className="font-semibold text-charcoal-900">{title}</span>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {isOpen && (
          <div className="p-4 space-y-4">
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
      <header className="bg-white shadow-sm border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900">New Scholarship</h1>
              <p className="text-sm text-charcoal-600 mt-1">Create a new scholarship post</p>
            </div>
            <div className="flex items-center gap-3 text-charcoal-600">
              <button
                onClick={() => router.back()}
                className="px-4 py-2 text-charcoal-600 hover:bg-charcoal-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDraft}
                disabled={isLoading}
                className="text-black flex items-center gap-2 px-6 py-2 bg-charcoal-600 text-white rounded-lg font-semibold hover:bg-charcoal-700 transition-colors disabled:opacity-50"
              >
                <FaSave /> Save Draft
              </button>
              <button
                onClick={handlePublish}
                disabled={isLoading}
                className="text-green-600  flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-forest-600 to-forest-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50"
              >
                <FaEye /> Publish
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Basic Information */}
          <CollapsibleSection id="basic" title="📝 Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Scholarship Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Fully Funded Masters Scholarship in Germany 2025"
                  className="w-full px-4 py-3 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  URL Slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-charcoal-500">/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    placeholder="url-slug"
                    className="flex-1 px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  SEO Title (Optional)
                </label>
                <input
                  type="text"
                  name="seo_title"
                  value={formData.seo_title}
                  onChange={handleInputChange}
                  placeholder="Custom SEO title"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Short Description / Summary *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  placeholder="Brief summary of the scholarship..."
                  rows={3}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Full Description *
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(html) => {
                      setFormData(prev => {
                        const newData = { ...prev, content: html }
                        if (!hasUserEditedExcerpt.current && !prev.excerpt && html) {
                          const textPreview = stripHTML(html)
                          newData.excerpt = textPreview.substring(0, 200)
                        }
                        return newData
                      })
                    }}
                    modules={quillModules}
                  />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Scholarship Details */}
          <CollapsibleSection id="details" title="🎓 Scholarship Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Scholarship Provider *
                </label>
                <input
                  type="text"
                  name="scholarship_provider"
                  value={formData.scholarship_provider}
                  onChange={handleInputChange}
                  placeholder="e.g., DAAD, Fulbright, etc."
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  University Name *
                </label>
                <input
                  type="text"
                  name="university_name"
                  value={formData.university_name}
                  onChange={handleInputChange}
                  placeholder="Host university name"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Funding Type *
                </label>
                <select
                  name="funding_type_id"
                  value={formData.funding_type_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                >
                  <option value="">Select funding type</option>
                  {fundingTypes.map((ft: any) => (
                    <option key={ft.id} value={ft.id}>{ft.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Application Deadline *
                </label>
                <input
                  type="date"
                  name="application_deadline"
                  value={formData.application_deadline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Program Duration
                </label>
                <input
                  type="text"
                  name="program_duration"
                  value={formData.program_duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 2 years, 3-4 years"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Eligible Nationalities
                </label>
                <input
                  type="text"
                  name="eligible_nationalities"
                  value={formData.eligible_nationalities}
                  onChange={handleInputChange}
                  placeholder="e.g., All countries, or specific countries"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Degree Levels *
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-charcoal-200 rounded-lg p-2">
                  {degreeLevels.map((dl: any) => (
                    <label key={dl.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.degree_level_ids.includes(dl.id)}
                        onChange={() => handleToggleDegreeLevel(dl.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{dl.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Application Mode
                </label>
                <select
                  name="application_mode"
                  value={formData.application_mode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="application_fee"
                    checked={formData.application_fee}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-semibold">Application Fee Required</span>
                </label>
                {formData.application_fee && (
                  <input
                    type="number"
                    name="application_fee_amount"
                    value={formData.application_fee_amount}
                    onChange={handleInputChange}
                    placeholder="Amount"
                    className="px-3 py-1 border border-charcoal-300 rounded-lg w-32"
                  />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Available Seats
                </label>
                <input
                  type="number"
                  name="available_seats"
                  value={formData.available_seats}
                  onChange={handleInputChange}
                  placeholder="Number of seats"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Application Information */}
          <CollapsibleSection id="application" title="📋 Application Information">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Official Website
                </label>
                <input
                  type="url"
                  name="official_website"
                  value={formData.official_website}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Apply Link *
                </label>
                <input
                  type="url"
                  name="apply_link"
                  value={formData.apply_link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleInputChange}
                  placeholder="contact@university.edu"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Scholarship Benefits *
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.scholarship_benefits}
                    onChange={(html) => setFormData(prev => ({ ...prev, scholarship_benefits: html }))}
                    modules={quillModules}
                    placeholder="List all benefits (stipend, tuition, accommodation, etc.)"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Eligibility Criteria *
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.eligibility_criteria}
                    onChange={(html) => setFormData(prev => ({ ...prev, eligibility_criteria: html }))}
                    modules={quillModules}
                    placeholder="List all eligibility requirements"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Required Documents *
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.required_documents}
                    onChange={(html) => setFormData(prev => ({ ...prev, required_documents: html }))}
                    modules={quillModules}
                    placeholder="List all required documents"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  How to Apply (Steps) *
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.how_to_apply}
                    onChange={(html) => setFormData(prev => ({ ...prev, how_to_apply: html }))}
                    modules={quillModules}
                    placeholder="Step-by-step application process"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Notes / Important Instructions
                </label>
                <div className="border border-charcoal-300 rounded-lg">
                  <ReactQuill
                    theme="snow"
                    value={formData.notes}
                    onChange={(html) => setFormData(prev => ({ ...prev, notes: html }))}
                    modules={quillModules}
                    placeholder="Additional notes or important information"
                  />
                </div>
              </div>
            </div>
          </CollapsibleSection>

          {/* Media & Additional */}
          <CollapsibleSection id="media" title="🖼️ Media & Additional Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Featured Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const form = new FormData()
                      form.append('file', file)
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, {
                        method: 'POST',
                        body: form,
                      })
                      const json = await res.json()
                      if (json?.url) {
                        setFormData(prev => ({ ...prev, featured_image: json.url }))
                      }
                    } catch (e) {
                      alert('Image upload failed')
                    }
                  }}
                  className="w-full text-sm"
                />
                {formData.featured_image && (
                  <img src={formData.featured_image} alt="Featured" className="mt-2 w-full h-48 object-cover rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Host University Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const form = new FormData()
                      form.append('file', file)
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, {
                        method: 'POST',
                        body: form,
                      })
                      const json = await res.json()
                      if (json?.url) {
                        setFormData(prev => ({ ...prev, host_university_logo: json.url }))
                      }
                    } catch (e) {
                      alert('Image upload failed')
                    }
                  }}
                  className="w-full text-sm"
                />
                {formData.host_university_logo && (
                  <img src={formData.host_university_logo} alt="Logo" className="mt-2 w-32 h-32 object-contain rounded-lg" />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Scholarship Brochure PDF
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={async (e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    try {
                      const form = new FormData()
                      form.append('file', file)
                      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, {
                        method: 'POST',
                        body: form,
                      })
                      const json = await res.json()
                      if (json?.url) {
                        setFormData(prev => ({ ...prev, scholarship_brochure_pdf: json.url }))
                      }
                    } catch (e) {
                      alert('PDF upload failed')
                    }
                  }}
                  className="w-full text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Video Embed Code (YouTube/Vimeo)
                </label>
                <textarea
                  name="video_embed"
                  value={formData.video_embed}
                  onChange={handleInputChange}
                  placeholder="Paste embed iframe code here"
                  rows={3}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* Categories & Organization */}
          <CollapsibleSection id="organization" title="📂 Categories & Organization">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Category *
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                >
                  <option value="">Select category</option>
                  {categories.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Country / Region *
                </label>
                <select
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                >
                  <option value="">Select country</option>
                  {countries.map((country: any) => (
                    <option key={country.id} value={country.id}>
                      {country.flag_emoji ? `${country.flag_emoji} ` : ''}{country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="Add tag and press Enter"
                    className="flex-1 px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-charcoal-100 text-charcoal-700 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-600 hover:text-red-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleInputChange}
                  className="w-4 h-4"
                />
                <label className="text-sm font-semibold text-charcoal-700">Mark as Featured</label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Schedule Publish (Optional)
                </label>
                <input
                  type="datetime-local"
                  name="scheduled_publish_at"
                  value={formData.scheduled_publish_at}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>
          </CollapsibleSection>

          {/* SEO Settings */}
          <CollapsibleSection id="seo" title="🔍 SEO Settings">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleInputChange}
                  placeholder="SEO description (150-160 characters recommended)"
                  rows={3}
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-charcoal-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  name="meta_keywords"
                  value={formData.meta_keywords}
                  onChange={handleInputChange}
                  placeholder="keyword1, keyword2, keyword3"
                  className="w-full px-4 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                />
              </div>
            </div>
          </CollapsibleSection>
        </form>
      </div>
    </div>
  )
}
