import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { PropertyResponse } from '@/types/property'

interface PropertyTableProps {
  properties: PropertyResponse | null
  loading: boolean
  error: string | null
  selectedProperties: string[]
  setSelectedProperties: (ids: string[]) => void
  onPageChange: (page: number) => void
  allPagesSelected?: boolean
}

export function PropertyTable({
  properties,
  loading,
  error,
  selectedProperties,
  setSelectedProperties,
  onPageChange,
  allPagesSelected = false
}: PropertyTableProps) {
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  // Check if all properties on current page are selected
  const allCurrentPageSelected = properties?.data.every(p => 
    selectedProperties.includes(p.PropertyID)
  ) || false;

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allCurrentPageSelected || allPagesSelected}
                  onCheckedChange={(checked) => {
                    if (checked && properties) {
                      // Add current page items to selection if not already selected
                      const currentPageIds = properties.data.map(p => p.PropertyID);
                      const newSelection = [...selectedProperties];
                      
                      currentPageIds.forEach(id => {
                        if (!newSelection.includes(id)) {
                          newSelection.push(id);
                        }
                      });
                      
                      setSelectedProperties(newSelection);
                    } else if (properties) {
                      // Remove only current page items from selection
                      const currentPageIds = properties.data.map(p => p.PropertyID);
                      setSelectedProperties(selectedProperties.filter(id => 
                        !currentPageIds.includes(id)
                      ));
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-4">Loading...</TableCell>
              </TableRow>
            ) : !properties?.data.length ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-4">No properties found</TableCell>
              </TableRow>
            ) : (
              properties.data.map((property) => (
                <TableRow key={property.PropertyID}>
                  <TableCell>
                    <Checkbox
                      checked={selectedProperties.includes(property.PropertyID) || allPagesSelected}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedProperties([...selectedProperties, property.PropertyID])
                        } else {
                          setSelectedProperties(selectedProperties.filter(id => id !== property.PropertyID))
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{property.Property_Name}</TableCell>
                  <TableCell>{property.Property_Address}</TableCell>
                  <TableCell>{property.City}</TableCell>
                  <TableCell>{property.State}</TableCell>
                  <TableCell>{property.Zip}</TableCell>
                  <TableCell>{property.County_Name}</TableCell>
                  <TableCell>{property.PropertyType}</TableCell>
                  <TableCell>{property.contact_name}</TableCell>
                  <TableCell>{property.phone}</TableCell>
                  <TableCell className="font-semibold">{property.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mb-32 sticky bottom-0 bg-white p-4 border-t">
        <div className="text-sm text-gray-500">
          Showing {properties?.data.length || 0} of {properties?.total || 0} results
          {selectedProperties.length > 0 && (
            <span className="ml-2 font-medium text-blue-600">
              ({selectedProperties.length} selected)
            </span>
          )}
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

