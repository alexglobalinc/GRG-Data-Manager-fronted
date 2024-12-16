import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { User } from 'lucide-react'
import { PropertyResponse } from '@/types/property'

interface PropertyTableProps {
  properties: PropertyResponse | null
  loading: boolean
  error: string | null
  selectedProperties: string[]
  setSelectedProperties: (ids: string[]) => void
  onPageChange: (page: number) => void
}

export function PropertyTable({
  properties,
  loading,
  error,
  selectedProperties,
  setSelectedProperties,
  onPageChange
}: PropertyTableProps) {
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={properties?.data.length === selectedProperties.length}
                  onCheckedChange={(checked) => {
                    if (checked && properties) {
                      setSelectedProperties(properties.data.map(p => p.PropertyID))
                    } else {
                      setSelectedProperties([])
                    }
                  }}
                />
              </TableHead>
              <TableHead>Property Name</TableHead>
              <TableHead>Property Address</TableHead>
              <TableHead>City</TableHead>
              <TableHead>State</TableHead>
              <TableHead>ZIP</TableHead>
              <TableHead>County</TableHead>
              <TableHead>Property Type</TableHead>
              <TableHead>Contact Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : properties?.data.map((property) => (
              <TableRow
                key={property.PropertyID}
                className={selectedProperties.includes(property.PropertyID) ? "bg-blue-100 text-blue-900" : "text-gray-900"}
              >
                <TableCell>
                  <Checkbox
                    checked={selectedProperties.includes(property.PropertyID)}
                    onCheckedChange={() => {
                      setSelectedProperties(
                        selectedProperties.includes(property.PropertyID)
                          ? selectedProperties.filter(id => id !== property.PropertyID)
                          : [...selectedProperties, property.PropertyID]
                      )
                    }}
                  />
                </TableCell>
                <TableCell className="font-semibold">{property.Property_Name}</TableCell>
                <TableCell className="font-semibold">{property.Property_Address}</TableCell>
                <TableCell className="font-semibold">{property.City}</TableCell>
                <TableCell className="font-semibold">{property.State}</TableCell>
                <TableCell className="font-semibold">{property.Zip}</TableCell>
                <TableCell className="font-semibold">{property.County_Name}</TableCell>
                <TableCell className="font-semibold">{property.PropertyType}</TableCell>
                <TableCell className="font-semibold">{property.contact_name}</TableCell>
                <TableCell className="font-semibold">{property.phone}</TableCell>
                <TableCell className="font-semibold">{property.email}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <User className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600">
                      Remove
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {properties?.data.length || 0} of {properties?.total || 0} results
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => onPageChange(properties?.page ? properties.page - 1 : 1)}
            disabled={!properties || properties.page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => onPageChange(properties?.page ? properties.page + 1 : 1)}
            disabled={!properties || properties.page >= properties.total_pages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

