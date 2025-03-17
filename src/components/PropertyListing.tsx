'use client'

import { useState, useEffect } from 'react'
import Header from './Header'
import { PropertyTable } from './PropertyTable'
import { fetchProperties, fetchFilterOptions, exportProperties } from '@/services/api'
import { PropertyResponse, FilterOptions, PropertyFilters as PropertyFiltersType } from '@/types/property'
import { Button } from '@/components/ui/button'

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
  const [allPagesSelected, setAllPagesSelected] = useState(false)

  useEffect(() => {
    const getProperties = async () => {
      try {
        setLoading(true)
        const data = await fetchProperties(filters)
        setProperties(data)
        
        // If "select all pages" is active, add all IDs from this page to selection
        if (allPagesSelected && data) {
          const currentPageIds = data.data.map(p => p.PropertyID)
          setSelectedProperties(prev => {
            const newSelection = [...prev]
            currentPageIds.forEach(id => {
              if (!newSelection.includes(id)) {
                newSelection.push(id)
              }
            })
            return newSelection
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    getProperties()
  }, [filters, allPagesSelected])

  useEffect(() => {
    const getFilterOptions = async () => {
      try {
        const options = await fetchFilterOptions()
        setFilterOptions(options)
      } catch (err) {
        console.error('Failed to fetch filter options:', err)
      }
    }

    getFilterOptions()
  }, [])

  const handleFilterChange = (newFilters: Partial<PropertyFiltersType>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }))
    // Reset all pages selection when filters change
    setAllPagesSelected(false)
  }

  const handleExport = (format: 'csv' | 'excel') => {
    exportProperties(format, selectedProperties, filters)
  }

  const handleSelectAllPages = async () => {
    setAllPagesSelected(true)
    
    // Get all property IDs across all pages
    try {
      // This assumes you have an API endpoint that can return all IDs matching the current filters
      // If not, you'll need to implement a different approach
      const allIds = await fetchAllPropertyIds()
      setSelectedProperties(allIds)
    } catch (err) {
      console.error('Failed to fetch all property IDs:', err)
    }
  }

  const handleClearSelection = () => {
    setSelectedProperties([])
    setAllPagesSelected(false)
  }

  const fetchAllPropertyIds = async (): Promise<string[]> => {
    try {
      // Implement the actual API call here
      const response = await fetch('/api/properties/ids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)  // This now correctly references the state variable
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching all property IDs:", error);
      return [];
    }
  }

  return (
    <div className="w-full overflow-hidden">
      <Header
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
        selectedProperties={selectedProperties}
        onExport={handleExport}
      />
      <div className="container mx-auto px-4 overflow-x-auto">
        {selectedProperties.length > 0 && (
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedProperties.length} properties selected
              {allPagesSelected ? ' across all pages' : ''}
            </span>
            {!allPagesSelected && properties && properties.total > properties.data.length && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSelectAllPages}
                className="text-xs"
              >
                Select all {properties.total} properties
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleClearSelection}
              className="text-xs ml-auto"
            >
              Clear selection
            </Button>
          </div>
        )}
        <PropertyTable
          properties={properties}
          loading={loading}
          error={error}
          selectedProperties={selectedProperties}
          setSelectedProperties={setSelectedProperties}
          onPageChange={(newPage) => setFilters(prev => ({ ...prev, page: newPage }))}
          allPagesSelected={allPagesSelected}
        />
      </div>
    </div>
  )
}