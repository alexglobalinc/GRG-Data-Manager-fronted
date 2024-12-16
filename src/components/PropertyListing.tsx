'use client'

import { useState, useEffect } from 'react'
import { PropertyFilters } from './PropertyFilters'
import { PropertyTable } from './PropertyTable'
import { fetchProperties, fetchFilterOptions, exportProperties } from '@/services/api'
import { PropertyResponse, FilterOptions, PropertyFilters as PropertyFiltersType } from '@/types/property'

export default function PropertyListing() {
  const [properties, setProperties] = useState<PropertyResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({ states: [], cities: [], counties: [], property_types: [], zipcodes: [] })
  const [filters, setFilters] = useState<PropertyFiltersType>({
    state: '',
    city: '',
    county: '',
    zip_codes: '',
    property_type: '',
    page: 1,
  })

  useEffect(() => {
    const getProperties = async () => {
      try {
        setLoading(true)
        const data = await fetchProperties(filters)
        setProperties(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch properties')
      } finally {
        setLoading(false)
      }
    }

    getProperties()
  }, [filters])

  useEffect(() => {
    const getFilterOptions = async () => {
      try {
        const data = await fetchFilterOptions()
        setFilterOptions(data)
      } catch (err) {
        console.error('Failed to fetch filter options:', err)
      }
    }

    getFilterOptions()
  }, [])

  const handleFilterChange = (newFilters: Partial<PropertyFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
  }

  const handleExport = (format: 'csv' | 'excel') => {
    exportProperties(format, selectedProperties, filters)
  }

  return (
    <div className="space-y-6">
      <PropertyFilters
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedProperties={selectedProperties}
        onExport={handleExport}
      />
      <PropertyTable
        properties={properties}
        loading={loading}
        error={error}
        selectedProperties={selectedProperties}
        setSelectedProperties={setSelectedProperties}
        onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
      />
    </div>
  )
}