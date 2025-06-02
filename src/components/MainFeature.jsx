import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

const MainFeature = () => {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any',
    bathrooms: 'any',
    sortBy: 'newest'
  })

  const [viewMode, setViewMode] = useState('grid')
  const [favoriteProperties, setFavoriteProperties] = useState(new Set())
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  // Mock property data
  const [properties] = useState([
    {
      id: '1',
      title: 'Modern Downtown Loft',
      price: 850000,
      propertyType: 'apartment',
      bedrooms: 2,
      bathrooms: 2,
      squareFootage: 1200,
      address: { street: '123 Main St', city: 'New York', state: 'NY', zip: '10001' },
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop'],
      amenities: ['Gym', 'Pool', 'Parking', 'Security'],
      listingDate: new Date('2024-01-15'),
      status: 'available',
      description: 'Beautiful modern loft in the heart of downtown with stunning city views.'
    },
    {
      id: '2',
      title: 'Suburban Family Home',
      price: 650000,
      propertyType: 'house',
      bedrooms: 4,
      bathrooms: 3,
      squareFootage: 2400,
      address: { street: '456 Oak Ave', city: 'Austin', state: 'TX', zip: '78701' },
      images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'],
      amenities: ['Garden', 'Garage', 'Fireplace', 'Basement'],
      listingDate: new Date('2024-01-10'),
      status: 'available',
      description: 'Spacious family home with large backyard perfect for kids and entertaining.'
    },
    {
      id: '3',
      title: 'Luxury Penthouse Suite',
      price: 1200000,
      propertyType: 'penthouse',
      bedrooms: 3,
      bathrooms: 4,
      squareFootage: 2800,
      address: { street: '789 Skyline Dr', city: 'Miami', state: 'FL', zip: '33101' },
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'],
      amenities: ['Balcony', 'Concierge', 'Spa', 'Private Elevator'],
      listingDate: new Date('2024-01-20'),
      status: 'available',
      description: 'Exclusive penthouse with panoramic ocean views and premium amenities.'
    },
    {
      id: '4',
      title: 'Cozy Studio Apartment',
      price: 320000,
      propertyType: 'studio',
      bedrooms: 0,
      bathrooms: 1,
      squareFootage: 600,
      address: { street: '321 Pine St', city: 'Seattle', state: 'WA', zip: '98101' },
      images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'],
      amenities: ['WiFi', 'Laundry', 'Coffee Shop'],
      listingDate: new Date('2024-01-12'),
      status: 'available',
      description: 'Perfect starter home or investment property in a vibrant neighborhood.'
    },
    {
      id: '5',
      title: 'Country Estate Villa',
      price: 2100000,
      propertyType: 'villa',
      bedrooms: 6,
      bathrooms: 5,
      squareFootage: 4500,
      address: { street: '555 Country Rd', city: 'Napa', state: 'CA', zip: '94558' },
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'],
      amenities: ['Wine Cellar', 'Pool', 'Tennis Court', 'Guest House'],
      listingDate: new Date('2024-01-08'),
      status: 'available',
      description: 'Magnificent estate with vineyard views and luxury amenities throughout.'
    },
    {
      id: '6',
      title: 'Urban Townhouse',
      price: 750000,
      propertyType: 'townhouse',
      bedrooms: 3,
      bathrooms: 2.5,
      squareFootage: 1800,
      address: { street: '888 Urban Ave', city: 'Portland', state: 'OR', zip: '97201' },
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'],
      amenities: ['Patio', 'Storage', 'Modern Kitchen', 'Walk-in Closet'],
      listingDate: new Date('2024-01-18'),
      status: 'available',
      description: 'Contemporary townhouse with modern finishes and convenient location.'
    }
  ])

  const [filteredProperties, setFilteredProperties] = useState(properties)

  // Filter properties based on search criteria
  useEffect(() => {
    let filtered = properties.filter(property => {
      const matchesLocation = !searchFilters.location || 
        property.address.city.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        property.address.state.toLowerCase().includes(searchFilters.location.toLowerCase())
      
      const matchesType = searchFilters.propertyType === 'all' || 
        property.propertyType === searchFilters.propertyType
      
      const matchesPrice = (!searchFilters.priceMin || property.price >= parseInt(searchFilters.priceMin)) &&
        (!searchFilters.priceMax || property.price <= parseInt(searchFilters.priceMax))
      
      const matchesBedrooms = searchFilters.bedrooms === 'any' || 
        property.bedrooms >= parseInt(searchFilters.bedrooms)
      
      const matchesBathrooms = searchFilters.bathrooms === 'any' || 
        property.bathrooms >= parseInt(searchFilters.bathrooms)

      return matchesLocation && matchesType && matchesPrice && matchesBedrooms && matchesBathrooms
    })

    // Sort properties
    switch (searchFilters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'newest':
        filtered.sort((a, b) => b.listingDate - a.listingDate)
        break
      case 'oldest':
        filtered.sort((a, b) => a.listingDate - b.listingDate)
        break
      default:
        break
    }

    setFilteredProperties(filtered)
  }, [searchFilters, properties])

  const handleFilterChange = (key, value) => {
    setSearchFilters(prev => ({ ...prev, [key]: value }))
  }

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favoriteProperties)
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId)
      toast.success('Removed from favorites')
    } else {
      newFavorites.add(propertyId)
      toast.success('Added to favorites')
    }
    setFavoriteProperties(newFavorites)
  }

  const handleInquiry = (property) => {
    setSelectedProperty(property)
    setShowInquiryForm(true)
  }

  const submitInquiry = (e) => {
    e.preventDefault()
    if (!inquiryData.name || !inquiryData.email || !inquiryData.message) {
      toast.error('Please fill in all required fields')
      return
    }
    
    // Simulate inquiry submission
    toast.success(`Inquiry sent for ${selectedProperty.title}`)
    setShowInquiryForm(false)
    setInquiryData({ name: '', email: '', phone: '', message: '' })
    setSelectedProperty(null)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const propertyTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'villa', label: 'Villa' }
  ]

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 lg:p-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="xl:col-span-2">
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Location
            </label>
            <div className="relative">
              <ApperIcon name="MapPin" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="text"
                placeholder="City or State"
                value={searchFilters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="search-input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Property Type
            </label>
            <select
              value={searchFilters.propertyType}
              onChange={(e) => handleFilterChange('propertyType', e.target.value)}
              className="custom-select w-full"
            >
              {propertyTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Min Price
            </label>
            <div className="relative">
              <ApperIcon name="DollarSign" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="number"
                placeholder="Min"
                value={searchFilters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                className="search-input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Max Price
            </label>
            <div className="relative">
              <ApperIcon name="DollarSign" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
              <input
                type="number"
                placeholder="Max"
                value={searchFilters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                className="search-input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
              Bedrooms
            </label>
            <select
              value={searchFilters.bedrooms}
              onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
              className="custom-select w-full"
            >
              <option value="any">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={searchFilters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="custom-select"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-surface-600 dark:text-surface-400">
              {filteredProperties.length} properties found
            </span>
            <div className="flex bg-surface-100 dark:bg-surface-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                <ApperIcon name="Grid3X3" className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white dark:bg-surface-700 shadow-sm' 
                    : 'text-surface-600 dark:text-surface-400'
                }`}
              >
                <ApperIcon name="List" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Properties Grid/List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {filteredProperties.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`property-card group ${
                  viewMode === 'list' ? 'flex flex-col lg:flex-row' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'lg:w-80 lg:flex-shrink-0' : ''}`}>
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className={`property-image w-full ${
                      viewMode === 'list' ? 'lg:h-48' : 'h-48 sm:h-56'
                    } group-hover:scale-105 transition-transform duration-300`}
                  />
                  <button
                    onClick={() => toggleFavorite(property.id)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-soft transition-all duration-200 hover:scale-110"
                  >
                    <ApperIcon 
                      name="Heart" 
                      className={`h-5 w-5 transition-colors ${
                        favoriteProperties.has(property.id) 
                          ? 'text-red-500 fill-current' 
                          : 'text-surface-600'
                      }`} 
                    />
                  </button>
                  <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.propertyType.charAt(0).toUpperCase() + property.propertyType.slice(1)}
                  </div>
                </div>

                <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-surface-900 dark:text-white group-hover:text-primary transition-colors">
                        {property.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center text-surface-600 dark:text-surface-400 mb-3">
                      <ApperIcon name="MapPin" className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {property.address.city}, {property.address.state}
                      </span>
                    </div>

                    <div className="text-2xl font-bold text-primary mb-4">
                      {formatPrice(property.price)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-surface-600 dark:text-surface-400 mb-4">
                      {property.bedrooms > 0 && (
                        <div className="flex items-center">
                          <ApperIcon name="Bed" className="h-4 w-4 mr-1" />
                          {property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}
                        </div>
                      )}
                      <div className="flex items-center">
                        <ApperIcon name="Bath" className="h-4 w-4 mr-1" />
                        {property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}
                      </div>
                      <div className="flex items-center">
                        <ApperIcon name="Square" className="h-4 w-4 mr-1" />
                        {property.squareFootage.toLocaleString()} sq ft
                      </div>
                    </div>

                    <p className="text-surface-600 dark:text-surface-400 text-sm mb-4 line-clamp-2">
                      {property.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {property.amenities.slice(0, 3).map((amenity, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-1 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-md text-xs"
                        >
                          {amenity}
                        </span>
                      ))}
                      {property.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-surface-100 dark:bg-surface-800 text-surface-700 dark:text-surface-300 rounded-md text-xs">
                          +{property.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <button 
                      onClick={() => handleInquiry(property)}
                      className="btn-primary flex-1 text-center"
                    >
                      <ApperIcon name="MessageCircle" className="h-4 w-4 mr-2" />
                      Contact Agent
                    </button>
                    <button className="btn-secondary flex-1 text-center">
                      <ApperIcon name="Eye" className="h-4 w-4 mr-2" />
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 bg-surface-100 dark:bg-surface-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <ApperIcon name="Search" className="h-10 w-10 text-surface-400" />
            </div>
            <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
              No Properties Found
            </h3>
            <p className="text-surface-600 dark:text-surface-400 mb-6">
              Try adjusting your search filters to find more properties.
            </p>
            <button 
              onClick={() => setSearchFilters({
                location: '',
                propertyType: 'all',
                priceMin: '',
                priceMax: '',
                bedrooms: 'any',
                bathrooms: 'any',
                sortBy: 'newest'
              })}
              className="btn-primary"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {showInquiryForm && selectedProperty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowInquiryForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-surface-900 dark:text-white">
                  Contact About Property
                </h3>
                <button
                  onClick={() => setShowInquiryForm(false)}
                  className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-lg transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5 text-surface-500" />
                </button>
              </div>

              <div className="mb-6">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h4 className="font-semibold text-surface-900 dark:text-white">
                  {selectedProperty.title}
                </h4>
                <p className="text-surface-600 dark:text-surface-400 text-sm">
                  {selectedProperty.address.city}, {selectedProperty.address.state}
                </p>
                <p className="text-primary font-semibold">
                  {formatPrice(selectedProperty.price)}
                </p>
              </div>

              <form onSubmit={submitInquiry} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, name: e.target.value }))}
                    className="search-input"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, email: e.target.value }))}
                    className="search-input"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, phone: e.target.value }))}
                    className="search-input"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData(prev => ({ ...prev, message: e.target.value }))}
                    className="search-input resize-none"
                    placeholder="I'm interested in this property. Please contact me with more details."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowInquiryForm(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature