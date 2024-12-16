import axios from 'axios'
import { PropertyResponse, FilterOptions, PropertyFilters } from '@/types/property'

const BASE_URL = 'http://localhost:8001/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchProperties = async (filters: PropertyFilters): Promise<PropertyResponse> => {
  const params = new URLSearchParams({
    page: filters.page.toString(),
    page_size: '10',
    ...(filters.state && { state: filters.state }),
    ...(filters.city && { city: filters.city }),
    ...(filters.county && { county: filters.county }),
    ...(filters.zip_codes && { zip_codes: filters.zip_codes }),
    ...(filters.property_type && { property_type: filters.property_type })
  })

  const response = await api.get(`/properties?${params}`)
  return response.data
}

export const fetchFilterOptions = async (): Promise<FilterOptions> => {
  const response = await api.get('/filters')
  return response.data
}

export const exportProperties = (
  format: 'csv' | 'excel',
  selectedIds: string[],
  filters: PropertyFilters
) => {
  const params = new URLSearchParams({
    format,
    selected_ids: JSON.stringify(selectedIds),
    ...(filters.state && { state: filters.state }),
    ...(filters.city && { city: filters.city }),
    ...(filters.county && { county: filters.county }),
    ...(filters.zip_codes && { zip_codes: filters.zip_codes }),
    ...(filters.property_type && { property_type: filters.property_type })
  })

  window.open(`${BASE_URL}/properties/export?${params}`)
}