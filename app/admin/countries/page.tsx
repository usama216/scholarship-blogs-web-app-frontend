'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaPlus, FaEdit, FaTrash, FaGlobe } from 'react-icons/fa'
import { useGetCountriesQuery, useCreateCountryMutation, useUpdateCountryMutation, useDeleteCountryMutation } from '@/lib/api/blogApi'

export default function CountriesAdminPage() {
  const { data: countriesData, isLoading } = useGetCountriesQuery(undefined)
  const countries = (countriesData?.data || countriesData || [])
  
  const [createCountry] = useCreateCountryMutation()
  const [updateCountry] = useUpdateCountryMutation()
  const [deleteCountry] = useDeleteCountryMutation()
  
  const [showModal, setShowModal] = useState(false)
  const [editingCountry, setEditingCountry] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    flag_emoji: '',
    region: '',
    description: ''
  })

  const handleOpenModal = (country?: any) => {
    if (country) {
      setEditingCountry(country)
      setFormData({
        name: country.name || '',
        code: country.code || '',
        flag_emoji: country.flag_emoji || '',
        region: country.region || '',
        description: country.description || ''
      })
    } else {
      setEditingCountry(null)
      setFormData({ name: '', code: '', flag_emoji: '', region: '', description: '' })
    }
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingCountry(null)
    setFormData({ name: '', code: '', flag_emoji: '', region: '', description: '' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingCountry) {
        await updateCountry({ id: editingCountry.id, ...formData }).unwrap()
      } else {
        await createCountry(formData).unwrap()
      }
      handleCloseModal()
    } catch (error) {
      alert('Failed to save country. Please try again.')
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"? This will remove the country from all associated scholarships.`)) {
      try {
        await deleteCountry(id).unwrap()
      } catch (error) {
        alert('Failed to delete country.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Manage Countries</h1>
              <p className="text-sm text-neutral-600 mt-1">Add and manage scholarship countries/regions</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/admin">
                <button className="px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors">
                  ← Back to Dashboard
                </button>
              </Link>
              <button
                onClick={() => handleOpenModal()}
                className="flex items-center gap-2 px-6 py-2 bg-cta-500 text-white rounded-lg font-semibold hover:bg-cta-600 transition-colors"
              >
                <FaPlus /> Add Country
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Countries List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Flag
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Country Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {countries.map((country: any) => (
                  <tr key={country.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-2xl">
                      {country.flag_emoji || '🌍'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-neutral-900">{country.name}</div>
                      <div className="text-sm text-neutral-500">{country.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-mono">
                        {country.code}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600">
                      {country.region || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">
                      {country.description ? (
                        <div className="max-w-xs truncate">{country.description}</div>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleOpenModal(country)}
                        className="text-primary-600 hover:text-primary-900 mr-4"
                      >
                        <FaEdit className="inline" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(country.id, country.name)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {countries.length === 0 && (
              <div className="text-center py-12">
                <FaGlobe className="mx-auto text-4xl text-neutral-300 mb-4" />
                <p className="text-neutral-600 mb-4">No countries added yet.</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="bg-cta-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-cta-600"
                >
                  Add Your First Country
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-neutral-900">
                {editingCountry ? 'Edit Country' : 'Add New Country'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">
                  Country Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., United States"
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-neutral-900 mb-2">
                    Country Code *
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder="e.g., US"
                    maxLength={2}
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200 uppercase"
                    required
                  />
                  <p className="text-xs text-neutral-500 mt-1">2-letter ISO code</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-neutral-900 mb-2">
                    Flag Emoji
                  </label>
                  <input
                    type="text"
                    value={formData.flag_emoji}
                    onChange={(e) => setFormData({ ...formData, flag_emoji: e.target.value })}
                    placeholder="🇺🇸"
                    className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200 text-2xl"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Copy flag emoji</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Select region</option>
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Africa">Africa</option>
                  <option value="South America">South America</option>
                  <option value="Middle East">Middle East</option>
                  <option value="Global">Global</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-900 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., Scholarships for studying in the United States"
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:border-primary-600 focus:ring-2 focus:ring-primary-200"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 border-2 border-neutral-300 text-neutral-700 rounded-lg font-semibold hover:bg-neutral-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-cta-500 text-white rounded-lg font-semibold hover:bg-cta-600 transition-colors"
                >
                  {editingCountry ? 'Update Country' : 'Add Country'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

