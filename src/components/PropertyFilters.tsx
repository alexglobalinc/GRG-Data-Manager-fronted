'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, X } from 'lucide-react'
import { FilterOptions, PropertyFilters as PropertyFiltersType } from "@/types/property"

interface PropertyFiltersProps {
  filters: PropertyFiltersType
  filterOptions: FilterOptions
  onFilterChange: (filters: Partial<PropertyFiltersType>) => void
  selectedProperties: string[]
  onExport: (format: 'csv' | 'excel') => void
}

export function PropertyFilters({
  filters,
  filterOptions,
  onFilterChange,
  selectedProperties,
  onExport
}: PropertyFiltersProps) {
  const clearFilter = (key: keyof PropertyFiltersType) => {
    onFilterChange({ [key]: '' })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2 md:gap-4">
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <Select
            value={filters.state}
            onValueChange={(value) => onFilterChange({ state: value })}
          >
            <SelectTrigger className="w-[120px] md:w-[160px] bg-white">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.city}
            onValueChange={(value) => onFilterChange({ city: value })}
          >
            <SelectTrigger className="w-[120px] md:w-[160px] bg-white">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.county}
            onValueChange={(value) => onFilterChange({ county: value })}
          >
            <SelectTrigger className="w-[120px] md:w-[160px] bg-white">
              <SelectValue placeholder="County" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.counties.map(county => (
                <SelectItem key={county} value={county}>{county}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            placeholder="Zip code(s)"
            value={filters.zip_codes}
            onChange={(e) => onFilterChange({ zip_codes: e.target.value })}
            className="w-[120px] md:w-[160px] bg-white"
          />

          <Select
            value={filters.property_type}
            onValueChange={(value) => onFilterChange({ property_type: value })}
          >
            <SelectTrigger className="w-[120px] md:w-[160px] bg-white">
              <SelectValue placeholder="Property type" />
            </SelectTrigger>
            <SelectContent>
              {filterOptions.property_types.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            variant="outline"
            onClick={() => onExport('csv')}
            disabled={selectedProperties.length === 0}
            className="bg-white hover:bg-gray-100 text-xs md:text-sm"
            size="sm"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Export CSV
          </Button>
          <Button
            variant="outline"
            onClick={() => onExport('excel')}
            disabled={selectedProperties.length === 0}
            className="bg-white hover:bg-gray-100 text-xs md:text-sm"
            size="sm"
          >
            <Download className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          if (value && key !== 'page') {
            return (
              <Button
                key={key}
                variant="secondary"
                size="sm"
                onClick={() => clearFilter(key as keyof PropertyFiltersType)}
                className="bg-blue-100 text-blue-800 hover:bg-blue-200"
              >
                {key}: {value}
                <X className="w-4 h-4 ml-2" />
              </Button>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}