'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FaFileAlt, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaEyeSlash,
  FaImage,
  FaTag,
  FaFolder,
  FaChartLine,
  FaSave,
  FaGlobe,
  FaSearch,
  FaEnvelope
} from 'react-icons/fa'
import { useGetPostsQuery, useDeletePostMutation, useUpdatePostStatusMutation, useGetCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCountriesQuery, useCreateCountryMutation, useUpdateCountryMutation, useDeleteCountryMutation, useGetDegreeLevelsQuery, useCreateDegreeLevelMutation, useUpdateDegreeLevelMutation, useDeleteDegreeLevelMutation, useGetTagsQuery, useCreateTagMutation, useUpdateTagMutation, useDeleteTagMutation } from '@/lib/api/blogApi'
import { useGetSubscribersQuery } from '@/lib/api/newsletterApi'

function CountriesTab({
  countries,
  isLoading,
  onCreateCountry,
  onUpdateCountry,
  onDeleteCountry
}: {
  countries: any[]
  isLoading: boolean
  onCreateCountry: (data: { name: string; code: string; flag_emoji?: string; flag_image?: string; region?: string; description?: string }) => Promise<void>
  onUpdateCountry: (id: string, data: { name?: string; code?: string; flag_emoji?: string; flag_image?: string; region?: string; description?: string }) => Promise<void>
  onDeleteCountry: (id: string) => Promise<void>
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCountry, setNewCountry] = useState({ name: '', code: '', flag_emoji: '', flag_image: '', region: '', description: '' })
  const [editForm, setEditForm] = useState({ name: '', code: '', flag_emoji: '', flag_image: '', region: '', description: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300) // 300ms delay

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter countries based on search
  const filteredCountries = countries.filter((country: any) => {
    if (!debouncedSearch) return true
    const search = debouncedSearch.toLowerCase()
    return (
      country.name.toLowerCase().includes(search) ||
      country.code.toLowerCase().includes(search) ||
      (country.region && country.region.toLowerCase().includes(search)) ||
      (country.description && country.description.toLowerCase().includes(search))
    )
  })

  const handleStartEdit = (country: any) => {
    setEditingId(country.id)
    setEditForm({
      name: country.name,
      code: country.code,
      flag_emoji: country.flag_emoji || '',
      flag_image: country.flag_image || '',
      region: country.region || '',
      description: country.description || ''
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', code: '', flag_emoji: '', flag_image: '', region: '', description: '' })
  }

  const handleSaveEdit = async (id: string) => {
    await onUpdateCountry(id, editForm)
    handleCancelEdit()
  }

  const handleCreate = async () => {
    if (!newCountry.name.trim() || !newCountry.code.trim()) {
      alert('Country name and code are required')
      return
    }
    await onCreateCountry(newCountry)
    setNewCountry({ name: '', code: '', flag_emoji: '', flag_image: '', region: '', description: '' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Filter */}
      <div className="bg-white rounded-lg p-4 border border-neutral-200">
        <label className="block text-sm font-semibold text-neutral-900 mb-2">
          🔍 Search Countries
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by name, code, region..."
          className="w-full px-4 py-3 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        {debouncedSearch && (
          <p className="text-sm text-neutral-600 mt-2">
            Found {filteredCountries.length} result{filteredCountries.length !== 1 ? 's' : ''} for "{debouncedSearch}"
          </p>
        )}
      </div>

      {/* Add New Country */}
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Add New Country</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Country Name *</label>
            <input
              type="text"
              value={newCountry.name}
              onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
              placeholder="e.g., United States"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Code *</label>
            <input
              type="text"
              value={newCountry.code}
              onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value.toUpperCase() })}
              placeholder="US"
              maxLength={2}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 uppercase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Flag Emoji</label>
            <input
              type="text"
              value={newCountry.flag_emoji}
              onChange={(e) => setNewCountry({ ...newCountry, flag_emoji: e.target.value })}
              placeholder="🇺🇸"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-2xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Region</label>
            <select
              value={newCountry.region}
              onChange={(e) => setNewCountry({ ...newCountry, region: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Select</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="Africa">Africa</option>
              <option value="South America">South America</option>
              <option value="Middle East">Middle East</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <input
              type="text"
              value={newCountry.description}
              onChange={(e) => setNewCountry({ ...newCountry, description: e.target.value })}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        {/* Flag Image Upload Section */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            🖼️ Flag Image (Optional)
          </label>
          {newCountry.flag_image ? (
            <div className="flex items-center gap-3">
              <img 
                src={newCountry.flag_image} 
                alt="Flag preview" 
                className="w-24 h-16 object-contain rounded border-2 border-green-300 bg-white p-1 shadow-sm" 
              />
              <button
                type="button"
                onClick={() => setNewCountry({ ...newCountry, flag_image: '' })}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
              <span className="text-xs text-green-700">✅ Image uploaded</span>
            </div>
          ) : (
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  
                  if (!file.type.startsWith('image/')) {
                    alert('Please select an image file')
                    return
                  }
                  
                  if (file.size > 5 * 1024 * 1024) {
                    alert('Image size should be less than 5MB')
                    return
                  }
                  
                  try {
                    const form = new FormData()
                    form.append('file', file)
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, {
                      method: 'POST',
                      body: form,
                    })
                    const json = await res.json()
                    if (json?.url) {
                      setNewCountry({ ...newCountry, flag_image: json.url })
                    } else {
                      alert('Failed to upload image')
                    }
                  } catch (error) {
                    alert('Image upload failed')
                  }
                }}
                className="hidden"
                id="new-country-flag-upload"
              />
              <label
                htmlFor="new-country-flag-upload"
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-neutral-300 rounded-lg bg-white hover:border-primary-400 hover:bg-primary-50 cursor-pointer transition-colors"
              >
                <span className="text-xl">📤</span>
                <span className="text-sm font-medium text-neutral-700">Upload Flag Image</span>
                <span className="text-xs text-neutral-500">(PNG, JPG, SVG)</span>
              </label>
            </div>
          )}
          <p className="text-xs text-neutral-500 mt-1">Upload country flag image (recommended: 16:10 ratio, 320x200px)</p>
        </div>

        <button
          onClick={handleCreate}
          disabled={!newCountry.name.trim() || !newCountry.code.trim()}
          className="mt-2 px-6 py-2 bg-cta-500 text-white rounded-lg font-semibold hover:bg-cta-600 transition-colors disabled:opacity-50"
        >
          <FaPlus className="inline mr-2" />
          Add Country
        </button>
      </div>

      {/* Countries List */}
      {countries.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg">
          <FaGlobe className="text-6xl text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg mb-2">No countries yet</p>
          <p className="text-sm text-neutral-500">Create your first country above</p>
        </div>
      ) : filteredCountries.length === 0 ? (
        <div className="text-center py-12 border border-neutral-200 rounded-lg">
          <p className="text-neutral-600 text-lg mb-2">No countries found for "{debouncedSearch}"</p>
          <button
            onClick={() => setSearchQuery('')}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-sm text-neutral-600 mb-2">
            Showing {filteredCountries.length} of {countries.length} countries
          </div>
          {filteredCountries.map((country: any) => (
            <div
              key={country.id}
              className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all bg-white"
            >
              {editingId === country.id ? (
                <div className="flex-1 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Name</label>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                        placeholder="Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Code</label>
                      <input
                        type="text"
                        value={editForm.code}
                        onChange={(e) => setEditForm({ ...editForm, code: e.target.value.toUpperCase() })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg uppercase text-sm"
                        placeholder="Code"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Flag Emoji</label>
                      <input
                        type="text"
                        value={editForm.flag_emoji}
                        onChange={(e) => setEditForm({ ...editForm, flag_emoji: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-2xl"
                        placeholder="🇺🇸"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Region</label>
                      <select
                        value={editForm.region}
                        onChange={(e) => setEditForm({ ...editForm, region: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                      >
                        <option value="">Region</option>
                        <option value="North America">North America</option>
                        <option value="Europe">Europe</option>
                        <option value="Asia">Asia</option>
                        <option value="Oceania">Oceania</option>
                        <option value="Africa">Africa</option>
                        <option value="South America">South America</option>
                        <option value="Middle East">Middle East</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-600 mb-1">Description</label>
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm"
                        placeholder="Description"
                      />
                    </div>
                  </div>
                  
                  {/* Flag Image Upload in Edit Mode */}
                  <div>
                    <label className="block text-xs text-neutral-600 mb-1">🖼️ Flag Image</label>
                    {editForm.flag_image ? (
                      <div className="flex items-center gap-2">
                        <img 
                          src={editForm.flag_image} 
                          alt="Flag preview" 
                          className="w-20 h-12 object-contain rounded border border-green-300 bg-white p-1" 
                        />
                        <button
                          type="button"
                          onClick={() => setEditForm({ ...editForm, flag_image: '' })}
                          className="px-2 py-1 bg-red-500 text-white rounded text-xs font-semibold hover:bg-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            
                            if (!file.type.startsWith('image/')) {
                              alert('Please select an image file')
                              return
                            }
                            
                            if (file.size > 5 * 1024 * 1024) {
                              alert('Image size should be less than 5MB')
                              return
                            }
                            
                            try {
                              const form = new FormData()
                              form.append('file', file)
                              const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`, {
                                method: 'POST',
                                body: form,
                              })
                              const json = await res.json()
                              if (json?.url) {
                                setEditForm({ ...editForm, flag_image: json.url })
                              } else {
                                alert('Failed to upload image')
                              }
                            } catch (error) {
                              alert('Image upload failed')
                            }
                          }}
                          className="hidden"
                          id={`edit-flag-upload-${country.id}`}
                        />
                        <label
                          htmlFor={`edit-flag-upload-${country.id}`}
                          className="flex items-center justify-center gap-2 px-3 py-1.5 border border-dashed border-neutral-300 rounded-lg bg-white hover:border-primary-400 hover:bg-primary-50 cursor-pointer transition-colors text-xs"
                        >
                          <span>📤</span>
                          <span>Upload Flag Image</span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSaveEdit(country.id)}
                      className="px-3 py-1.5 bg-green-500 text-white rounded text-sm font-semibold hover:bg-green-600"
                      title="Save"
                    >
                      <FaSave className="inline mr-1" /> Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="px-3 py-1.5 bg-neutral-400 text-white rounded text-sm font-semibold hover:bg-neutral-500"
                      title="Cancel"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-3xl">
                      {country.flag_image ? (
                        <img src={country.flag_image} alt={country.name} className="w-10 h-7 object-cover rounded border border-neutral-200" />
                      ) : (
                        <span>{country.flag_emoji || '🌍'}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-neutral-900">{country.name}</h3>
                        <span className="px-2 py-0.5 bg-primary-100 text-primary-700 rounded text-xs font-mono">
                          {country.code}
                        </span>
                        {country.region && (
                          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded text-xs">
                            {country.region}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">
                        Slug: <code className="bg-neutral-100 px-2 py-0.5 rounded">/{country.slug}</code>
                      </p>
                      {country.description && (
                        <p className="text-sm text-neutral-500 mt-1">{country.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(country)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDeleteCountry(country.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function CategoriesTab({ 
  categories, 
  isLoading, 
  onCreateCategory, 
  onUpdateCategory, 
  onDeleteCategory 
}: { 
  categories: any[]
  isLoading: boolean
  onCreateCategory: (data: { name: string; slug?: string; description?: string }) => Promise<void>
  onUpdateCategory: (id: string, data: { name?: string; slug?: string; description?: string }) => Promise<void>
  onDeleteCategory: (id: string) => Promise<void>
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState({ name: '', slug: '', description: '' })
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '' })

  const handleStartEdit = (cat: any) => {
    setEditingId(cat.id)
    setEditForm({ name: cat.name, slug: cat.slug, description: cat.description || '' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', slug: '', description: '' })
  }

  const handleSaveEdit = async (id: string) => {
    await onUpdateCategory(id, editForm)
    handleCancelEdit()
  }

  const handleCreate = async () => {
    if (!newCategory.name.trim()) return
    await onCreateCategory(newCategory)
    setNewCategory({ name: '', slug: '', description: '' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-charcoal-600 font-medium">Loading categories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add New Category */}
      <div className="bg-charcoal-50 rounded-lg p-4 border border-charcoal-200">
        <h3 className="text-lg font-semibold text-charcoal-900 mb-4">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Name *</label>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => {
                const name = e.target.value
                setNewCategory({
                  name,
                  slug: newCategory.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  description: newCategory.description
                })
              }}
              placeholder="Category name"
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Slug</label>
            <input
              type="text"
              value={newCategory.slug}
              onChange={(e) => setNewCategory(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-slug"
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal-700 mb-1">Description</label>
            <input
              type="text"
              value={newCategory.description}
              onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Optional description"
              className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-forest-500"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={!newCategory.name.trim()}
          className="text-black border mt-4 px-6 py-2 bg-forest-600 rounded-lg font-semibold hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaPlus className="inline mr-2" />
          Create Category
        </button>
      </div>

      {/* Categories List */}
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <FaFolder className="text-6xl text-charcoal-300 mx-auto mb-4" />
          <p className="text-charcoal-600 text-lg mb-4">No categories yet</p>
          <p className="text-sm text-charcoal-500">Create your first category above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border border-charcoal-200 rounded-lg hover:shadow-md transition-all"
            >
              {editingId === category.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={editForm.slug}
                      onChange={(e) => setEditForm(prev => ({ ...prev, slug: e.target.value }))}
                      className="w-full px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                      placeholder="Slug"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-charcoal-300 rounded-lg focus:ring-2 focus:ring-forest-500"
                      placeholder="Description"
                    />
                    <button
                      onClick={() => handleSaveEdit(category.id)}
                      className="p-2 text-forest-600 hover:bg-forest-50 rounded transition-colors"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-charcoal-600 hover:bg-charcoal-100 rounded transition-colors"
                      title="Cancel"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h3 className="font-semibold text-charcoal-900">{category.name}</h3>
                    <p className="text-sm text-charcoal-600 mt-1">
                      Slug: <code className="bg-charcoal-100 px-2 py-0.5 rounded">/{category.slug}</code>
                    </p>
                    {category.description && (
                      <p className="text-sm text-charcoal-500 mt-1">{category.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(category)}
                      className="p-2 text-forest-600 hover:bg-forest-50 rounded transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function TagsTab({
  tags,
  isLoading,
  onCreateTag,
  onUpdateTag,
  onDeleteTag
}: {
  tags: any[]
  isLoading: boolean
  onCreateTag: (data: { name: string; slug?: string }) => Promise<void>
  onUpdateTag: (id: string, data: { name?: string; slug?: string }) => Promise<void>
  onDeleteTag: (id: string) => Promise<void>
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newTag, setNewTag] = useState({ name: '', slug: '' })
  const [editForm, setEditForm] = useState({ name: '', slug: '' })

  const handleStartEdit = (tag: any) => {
    setEditingId(tag.id)
    setEditForm({ name: tag.name, slug: tag.slug })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', slug: '' })
  }

  const handleSaveEdit = async (id: string) => {
    await onUpdateTag(id, editForm)
    handleCancelEdit()
  }

  const handleCreate = async () => {
    if (!newTag.name.trim()) return
    await onCreateTag(newTag)
    setNewTag({ name: '', slug: '' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Add New Tag</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
            <input
              type="text"
              value={newTag.name}
              onChange={(e) => {
                const name = e.target.value
                setNewTag({
                  name,
                  slug: newTag.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                })
              }}
              placeholder="Tag name"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
            <input
              type="text"
              value={newTag.slug}
              onChange={(e) => setNewTag(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-slug"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={!newTag.name.trim()}
          className="mt-4 px-6 py-2 bg-cta-500 text-white rounded-lg font-semibold hover:bg-cta-600 transition-colors disabled:opacity-50"
        >
          <FaPlus className="inline mr-2" />
          Add Tag
        </button>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg">
          <FaTag className="text-6xl text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg mb-2">No tags yet</p>
          <p className="text-sm text-neutral-500">Create your first tag above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tags.map((tag: any) => (
            <div
              key={tag.id}
              className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all bg-white"
            >
              {editingId === tag.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                  <div>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      placeholder="Name"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editForm.slug}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg"
                      placeholder="Slug"
                    />
                    <button
                      onClick={() => handleSaveEdit(tag.id)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded"
                      title="Cancel"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{tag.name}</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Slug: <code className="bg-neutral-100 px-2 py-0.5 rounded">/{tag.slug}</code>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(tag)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDeleteTag(tag.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DegreeLevelsTab({
  degreeLevels,
  isLoading,
  onCreateDegreeLevel,
  onUpdateDegreeLevel,
  onDeleteDegreeLevel
}: {
  degreeLevels: any[]
  isLoading: boolean
  onCreateDegreeLevel: (data: { name: string; slug?: string; description?: string }) => Promise<void>
  onUpdateDegreeLevel: (id: string, data: { name?: string; slug?: string; description?: string }) => Promise<void>
  onDeleteDegreeLevel: (id: string) => Promise<void>
}) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newDegreeLevel, setNewDegreeLevel] = useState({ name: '', slug: '', description: '' })
  const [editForm, setEditForm] = useState({ name: '', slug: '', description: '' })

  const handleStartEdit = (dl: any) => {
    setEditingId(dl.id)
    setEditForm({ name: dl.name, slug: dl.slug, description: dl.description || '' })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({ name: '', slug: '', description: '' })
  }

  const handleSaveEdit = async (id: string) => {
    await onUpdateDegreeLevel(id, editForm)
    handleCancelEdit()
  }

  const handleCreate = async () => {
    if (!newDegreeLevel.name.trim()) return
    await onCreateDegreeLevel(newDegreeLevel)
    setNewDegreeLevel({ name: '', slug: '', description: '' })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Add New Degree Level</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Name *</label>
            <input
              type="text"
              value={newDegreeLevel.name}
              onChange={(e) => {
                const name = e.target.value
                setNewDegreeLevel({
                  name,
                  slug: newDegreeLevel.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                  description: newDegreeLevel.description
                })
              }}
              placeholder="e.g., Master"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Slug</label>
            <input
              type="text"
              value={newDegreeLevel.slug}
              onChange={(e) => setNewDegreeLevel(prev => ({ ...prev, slug: e.target.value }))}
              placeholder="url-slug"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <input
              type="text"
              value={newDegreeLevel.description}
              onChange={(e) => setNewDegreeLevel(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Optional"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <button
          onClick={handleCreate}
          disabled={!newDegreeLevel.name.trim()}
          className="mt-4 px-6 py-2 bg-cta-500 text-white rounded-lg font-semibold hover:bg-cta-600 transition-colors disabled:opacity-50"
        >
          <FaPlus className="inline mr-2" />
          Add Degree Level
        </button>
      </div>

      {degreeLevels.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg">
          <FaTag className="text-6xl text-neutral-300 mx-auto mb-4" />
          <p className="text-neutral-600 text-lg mb-2">No degree levels yet</p>
          <p className="text-sm text-neutral-500">Create your first degree level above</p>
        </div>
      ) : (
        <div className="space-y-3">
          {degreeLevels.map((dl: any) => (
            <div
              key={dl.id}
              className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-all bg-white"
            >
              {editingId === dl.id ? (
                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  <div>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={editForm.slug}
                      onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg"
                      placeholder="Slug"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg"
                      placeholder="Description"
                    />
                    <button
                      onClick={() => handleSaveEdit(dl.id)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                      title="Save"
                    >
                      <FaSave />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="p-2 text-neutral-600 hover:bg-neutral-100 rounded"
                      title="Cancel"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{dl.name}</h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      Slug: <code className="bg-neutral-100 px-2 py-0.5 rounded">/{dl.slug}</code>
                    </p>
                    {dl.description && (
                      <p className="text-sm text-neutral-500 mt-1">{dl.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleStartEdit(dl)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => onDeleteDegreeLevel(dl.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function NewsletterTab({ 
  subscribers,
  isLoading,
  onRefresh
}: {
  subscribers: any[]
  isLoading: boolean
  onRefresh: () => void
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeOnly, setActiveOnly] = useState(true)
  const [debouncedSearch, setDebouncedSearch] = useState('')

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Filter subscribers
  const filteredSubscribers = subscribers.filter((sub: any) => {
    if (activeOnly && !sub.is_active) return false
    if (!debouncedSearch) return true
    return sub.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  })

  const activeSubscribers = subscribers.filter((s: any) => s.is_active).length
  const totalSubscribers = subscribers.length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-primary-700 font-semibold">Total Subscribers</p>
              <p className="text-3xl font-bold text-primary-900 mt-1">{totalSubscribers}</p>
            </div>
            <FaEnvelope className="text-4xl text-primary-400 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-semibold">Active</p>
              <p className="text-3xl font-bold text-green-900 mt-1">{activeSubscribers}</p>
            </div>
            <FaEnvelope className="text-4xl text-green-400 opacity-50" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-lg p-4 border border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-neutral-700 font-semibold">Inactive</p>
              <p className="text-3xl font-bold text-neutral-900 mt-1">{totalSubscribers - activeSubscribers}</p>
            </div>
            <FaEnvelope className="text-4xl text-neutral-400 opacity-50" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg p-4 border border-neutral-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-neutral-900 mb-2">
              🔍 Search Email
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by email..."
              className="w-full px-4 py-2 border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
                className="w-4 h-4 text-primary-600 border-neutral-300 rounded focus:ring-primary-500"
              />
              <span className="text-sm font-semibold text-neutral-700">Show active only</span>
            </label>
          </div>
        </div>
        {debouncedSearch && (
          <p className="text-sm text-neutral-600 mt-2">
            Found {filteredSubscribers.length} result{filteredSubscribers.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Subscribers List */}
      {filteredSubscribers.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-neutral-300 rounded-lg bg-neutral-50">
          <FaEnvelope className="text-6xl text-neutral-300 mx-auto mb-4" />
          <p className="text-lg font-semibold text-neutral-600">
            {activeOnly ? 'No active subscribers found' : 'No subscribers found'}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-primary-600 hover:text-primary-700 font-semibold mt-2"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-sm text-neutral-600 mb-2">
            Showing {filteredSubscribers.length} of {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg border border-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider border-b border-neutral-200">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider border-b border-neutral-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider border-b border-neutral-200">
                    Subscribed At
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider border-b border-neutral-200">
                    Unsubscribed At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {filteredSubscribers.map((subscriber: any) => (
                  <tr key={subscriber.id} className="hover:bg-neutral-50 transition-colors">
                    <td className="px-4 py-3 text-sm text-neutral-900 font-medium">
                      {subscriber.email}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          subscriber.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}
                      >
                        {subscriber.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {new Date(subscriber.subscribed_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600">
                      {subscriber.unsubscribed_at
                        ? new Date(subscriber.unsubscribed_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'posts' | 'categories' | 'countries' | 'tags' | 'degree-levels' | 'newsletter' | 'stats'>('posts')
  const { data: postsData, isLoading, refetch } = useGetPostsQuery({})
  const [deletePost] = useDeletePostMutation()
  const [updateStatus] = useUpdatePostStatusMutation()

  const { data: categoriesData, isLoading: isLoadingCategories, refetch: refetchCategories } = useGetCategoriesQuery(undefined)
  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const { data: countriesData, isLoading: isLoadingCountries, refetch: refetchCountries } = useGetCountriesQuery(undefined)
  const [createCountry] = useCreateCountryMutation()
  const [updateCountry] = useUpdateCountryMutation()
  const [deleteCountry] = useDeleteCountryMutation()

  const { data: degreeLevelsData, isLoading: isLoadingDegreeLevels, refetch: refetchDegreeLevels } = useGetDegreeLevelsQuery(undefined)
  const [createDegreeLevel] = useCreateDegreeLevelMutation()
  const [updateDegreeLevel] = useUpdateDegreeLevelMutation()
  const [deleteDegreeLevel] = useDeleteDegreeLevelMutation()

  const { data: tagsData, isLoading: isLoadingTags, refetch: refetchTags } = useGetTagsQuery(undefined)
  const [createTag] = useCreateTagMutation()
  const [updateTag] = useUpdateTagMutation()
  const [deleteTag] = useDeleteTagMutation()

  const { data: subscribersData, isLoading: isLoadingSubscribers, refetch: refetchSubscribers } = useGetSubscribersQuery({})
  const subscribers = subscribersData?.data || []

  const posts = postsData?.data || []
  const categories = (categoriesData?.data || categoriesData || [])
  const countries = (countriesData?.data || countriesData || [])
  const degreeLevels = (degreeLevelsData?.data || degreeLevelsData || [])
  const tags = (tagsData?.data || tagsData || [])

  // Function to strip HTML tags and get plain text preview
  const getTextPreview = (html: string, maxLength: number = 150) => {
    if (!html) return ''
    // Remove HTML tags
    const text = html.replace(/<[^>]*>/g, '')
    // Decode HTML entities
    const decoded = text.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    // Trim and limit length
    const trimmed = decoded.trim()
    return trimmed.length > maxLength ? trimmed.substring(0, maxLength) + '...' : trimmed
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(id).unwrap()
        refetch()
      } catch (error) {
        alert('Failed to delete post')
      }
    }
  }

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      await updateStatus({
        id,
        status: currentStatus === 'published' ? 'draft' : 'published'
      }).unwrap()
      refetch()
    } catch (error) {
      alert('Failed to update post status')
    }
  }

  const stats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p: any) => p.status === 'published').length,
    draftPosts: posts.filter((p: any) => p.status === 'draft').length,
    totalViews: posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-50 to-charcoal-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-charcoal-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900">Admin Dashboard</h1>
              <p className="text-sm text-charcoal-600 mt-1">Manage your blog content</p>
            </div>
            <Link
              href="/admin/post/new"
              className="text-black inline-flex items-center gap-2 bg-gradient-to-r from-forest-600 to-forest-700 px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all shadow-md hover:scale-105"
            >
              <FaPlus className="text-lg" /> <span className="font-bold">New Post</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Total Posts</p>
                <p className="text-3xl font-bold text-charcoal-900 mt-2">{stats.totalPosts}</p>
              </div>
              <FaFileAlt className="text-4xl text-forest-500 opacity-20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Published</p>
                <p className="text-3xl font-bold text-forest-600 mt-2">{stats.publishedPosts}</p>
              </div>
              <FaEye className="text-4xl text-forest-500 opacity-20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Drafts</p>
                <p className="text-3xl font-bold text-golden-600 mt-2">{stats.draftPosts}</p>
              </div>
              <FaEyeSlash className="text-4xl text-golden-500 opacity-20" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-md border border-charcoal-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-charcoal-600">Total Views</p>
                <p className="text-3xl font-bold text-charcoal-900 mt-2">{stats.totalViews}</p>
              </div>
              <FaChartLine className="text-4xl text-forest-500 opacity-20" />
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md border border-charcoal-200 mb-6">
          <div className="border-b border-charcoal-200">
            <nav className="flex -mb-px">
              {[
                { id: 'posts', label: 'Posts', icon: FaFileAlt },
                { id: 'categories', label: 'Categories', icon: FaFolder },
                { id: 'countries', label: 'Countries', icon: FaGlobe },
                { id: 'degree-levels', label: 'Degree Levels', icon: FaTag },
                { id: 'tags', label: 'Tags', icon: FaTag },
                { id: 'newsletter', label: 'Newsletter', icon: FaEnvelope },
                { id: 'stats', label: 'Statistics', icon: FaChartLine }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-forest-600 text-forest-600'
                      : 'border-transparent text-charcoal-600 hover:text-charcoal-900 hover:border-charcoal-300'
                  }`}
                >
                  <tab.icon />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'posts' && (
              <div>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-charcoal-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-golden-600 rounded-full border-t-transparent animate-spin"></div>
                      </div>
                      <p className="text-charcoal-600 font-medium">Loading posts...</p>
                    </div>
                  </div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-12">
                    <FaFileAlt className="text-6xl text-charcoal-300 mx-auto mb-4" />
                    <p className="text-charcoal-600 text-lg mb-4">No posts yet</p>
                    <Link
                      href="/admin/post/new"
                      className="inline-flex items-center gap-2 bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
                    >
                      <FaPlus /> Create Your First Post
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {posts.map((post: any) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between p-4 border border-charcoal-200 rounded-lg hover:shadow-md transition-all"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-semibold text-charcoal-900">{post.title}</h3>
                            <span
                              className={`px-2 py-1 text-xs font-semibold rounded ${
                                post.status === 'published'
                                  ? 'bg-forest-100 text-forest-700'
                                  : 'bg-golden-100 text-golden-700'
                              }`}
                            >
                              {post.status}
                            </span>
                          </div>
                          <p className="text-sm text-charcoal-600 mt-1 line-clamp-2">
                            {post.excerpt ? getTextPreview(post.excerpt) : getTextPreview(post.content || '')}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-charcoal-500">
                            <span>Views: {post.views || 0}</span>
                            <span>•</span>
                            <span>{new Date(post.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStatus(post.id, post.status)}
                            className="p-2 text-charcoal-600 hover:bg-charcoal-100 rounded transition-colors"
                            title={post.status === 'published' ? 'Unpublish' : 'Publish'}
                          >
                            {post.status === 'published' ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <Link
                            href={`/admin/post/edit/${post.id}`}
                            className="p-2 text-forest-600 hover:bg-forest-50 rounded transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(post.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'categories' && (
              <CategoriesTab 
                categories={categories}
                isLoading={isLoadingCategories}
                onCreateCategory={async (data) => {
                  await createCategory(data).unwrap()
                  refetchCategories()
                }}
                onUpdateCategory={async (id, data) => {
                  await updateCategory({ id, ...data }).unwrap()
                  refetchCategories()
                }}
                onDeleteCategory={async (id) => {
                  if (confirm('Are you sure you want to delete this category?')) {
                    await deleteCategory(id).unwrap()
                    refetchCategories()
                  }
                }}
              />
            )}

            {activeTab === 'countries' && (
              <CountriesTab
                countries={countries}
                isLoading={isLoadingCountries}
                onCreateCountry={async (data) => {
                  await createCountry(data).unwrap()
                  refetchCountries()
                }}
                onUpdateCountry={async (id, data) => {
                  await updateCountry({ id, ...data }).unwrap()
                  refetchCountries()
                }}
                onDeleteCountry={async (id) => {
                  if (confirm('Are you sure you want to delete this country?')) {
                    await deleteCountry(id).unwrap()
                    refetchCountries()
                  }
                }}
              />
            )}

            {activeTab === 'degree-levels' && (
              <DegreeLevelsTab
                degreeLevels={degreeLevels}
                isLoading={isLoadingDegreeLevels}
                onCreateDegreeLevel={async (data) => {
                  await createDegreeLevel(data).unwrap()
                  refetchDegreeLevels()
                }}
                onUpdateDegreeLevel={async (id, data) => {
                  await updateDegreeLevel({ id, ...data }).unwrap()
                  refetchDegreeLevels()
                }}
                onDeleteDegreeLevel={async (id) => {
                  if (confirm('Are you sure you want to delete this degree level?')) {
                    await deleteDegreeLevel(id).unwrap()
                    refetchDegreeLevels()
                  }
                }}
              />
            )}

            {activeTab === 'tags' && (
              <TagsTab
                tags={tags}
                isLoading={isLoadingTags}
                onCreateTag={async (data) => {
                  await createTag(data).unwrap()
                  refetchTags()
                }}
                onUpdateTag={async (id, data) => {
                  await updateTag({ id, ...data }).unwrap()
                  refetchTags()
                }}
                onDeleteTag={async (id) => {
                  if (confirm('Are you sure you want to delete this tag?')) {
                    await deleteTag(id).unwrap()
                    refetchTags()
                  }
                }}
              />
            )}

            {activeTab === 'newsletter' && (
              <NewsletterTab
                subscribers={subscribers}
                isLoading={isLoadingSubscribers}
                onRefresh={() => refetchSubscribers()}
              />
            )}

            {activeTab === 'stats' && (
              <div className="text-center py-12">
                <FaChartLine className="text-6xl text-charcoal-300 mx-auto mb-4" />
                <p className="text-charcoal-600">Detailed statistics coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
