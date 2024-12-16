import Image from 'next/image'
import { PropertyFilters } from './PropertyFilters'
import { FilterOptions, PropertyFilters as PropertyFiltersType } from '@/types/property'

interface HeaderProps {
    filters: PropertyFiltersType
    filterOptions: FilterOptions
    onFilterChange: (filters: Partial<PropertyFiltersType>) => void
    selectedProperties: string[]
    onExport: (format: 'csv' | 'excel') => void
  }
  
  export default function Header({
    filters,
    filterOptions,
    onFilterChange,
    selectedProperties,
    onExport
  }: HeaderProps) {
    return (
      <div className="bg-[#1a237e] p-4 mb-6">
        <div className="container mx-auto">
          <div className="flex items-center gap-6">
            <Image
              src="/grg_logo_2022 1.svg"
              alt="Global Roofing Group"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
            <div className="flex-1">
              <PropertyFilters
                filters={filters}
                filterOptions={filterOptions}
                onFilterChange={onFilterChange}
                selectedProperties={selectedProperties}
                onExport={onExport}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }