export interface Property {
    PropertyID: string
    Property_Name: string
    Property_Address: string
    City: string
    State: string
    Zip: string
    County_Name: string
    PropertyType: string
    contact_name: string
    phone: string
    email: string
  }
  
  export interface PropertyResponse {
    data: Property[]
    total: number
    total_pages: number
    page: number
    page_size: number
  }
  
  export interface FilterOptions {
    states: string[]
    cities: string[]
    counties: string[]
    property_types: string[]
    zipcodes: string[]
  }
  
  export interface PropertyFilters {
    state: string
    city: string
    county: string
    zip_codes: string
    property_type: string
    page: number
  }