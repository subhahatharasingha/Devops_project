import { useState, useEffect } from 'react';
import AppartmentCard from '../component/appartmentscard';
import { propertyAPI } from '../services/api';
import Heroappartment from '../assets/apartment.jpg'

const ApartmentsPage = () => {
  const [activeCategory, setActiveCategory] = useState('City living');
  const [availability, setAvailability] = useState('All');
  const [priceRange, setPriceRange] = useState('Any');
  const [properties, setProperties] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApartments();
  }, []);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await propertyAPI.getApartments();
      
      if (response.success) {
       
        const categorizedProperties = {
          'City living': response.properties.filter(p => 
            p.category === 'City Living' || p.category === 'City living'
          ),
          'Leisure living': response.properties.filter(p => 
            p.category === 'Leisure Living' || p.category === 'Leisure living'
          ),
          'Luxury living': response.properties.filter(p => 
            p.category === 'Ultra Luxury Living' || p.category === 'Luxury living'
          )
        };
        setProperties(categorizedProperties);
      }
    } catch (error) {
      console.error('Error fetching apartments:', error);
      setError('Failed to load properties. Please try again later.');
     
      setProperties(getSampleProperties());
    } finally {
      setLoading(false);
    }
  };

  // Sample data 
  const getSampleProperties = () => ({
    'City living': [
      { 
        id: 1, 
        image: '/api/placeholder/400/300', 
        title: 'Luxurious Apartment', 
        location: 'Downtown, City Center', 
        beds: 3, 
        baths: 2, 
        area: 1200, 
        price: 250000, 
        type: 'Rent', 
        features: ['Modern kitchen', 'Balcony with city views'] 
      },
      { 
        id: 2, 
        image: '/api/placeholder/400/300', 
        title: 'City View Apartment', 
        location: 'Downtown, City Center', 
        beds: 2, 
        baths: 1, 
        area: 900, 
        price: 180000, 
        type: 'Buy', 
        features: ['City views', 'Modern amenities'] 
      }
    ],
    'Leisure living': [
      { 
        id: 4, 
        image: '/api/placeholder/400/300', 
        title: 'Resort Style Apartment', 
        location: 'Lakeside Community', 
        beds: 2, 
        baths: 2, 
        area: 1100, 
        price: 180000, 
        type: 'Rent', 
        features: ['Pool and spa access'] 
      },
      { 
        id: 5, 
        image: '/api/placeholder/400/300', 
        title: 'Lakeside Retreat', 
        location: 'Lakeside Community', 
        beds: 3, 
        baths: 2, 
        area: 1300, 
        price: 220000, 
        type: 'Buy', 
        features: ['Waterfront', 'Private dock'] 
      }
    ],
    'Luxury living': [
      { 
        id: 7, 
        image: '/api/placeholder/400/300', 
        title: 'Ultra Luxury Apartment', 
        location: 'Premium District', 
        beds: 4, 
        baths: 4, 
        area: 2200, 
        price: 650000, 
        type: 'Buy', 
        features: ['Smart home tech'] 
      },
      { 
        id: 8, 
        image: '/api/placeholder/400/300', 
        title: 'Penthouse Suite', 
        location: 'Premium District', 
        beds: 3, 
        baths: 3, 
        area: 2000, 
        price: 4500, 
        type: 'Rent', 
        features: ['Rooftop terrace', 'Panoramic views'] 
      }
    ]
  });

 
  const filterProperties = (list) => {
    if (!list) return [];
    
    return list.filter((property) => {
      
      const propertyPrice = property.desiredPrice || property.price || 0;
      
      
      const numericPrice = typeof propertyPrice === 'string' 
        ? parseFloat(propertyPrice.replace(/[^0-9.]/g, '')) 
        : Number(propertyPrice);
      
     
      if (priceRange === '100000-200000' && !(numericPrice >= 100000 && numericPrice <= 200000)) return false;
      if (priceRange === '200000-300000' && !(numericPrice >= 200000 && numericPrice <= 300000)) return false;
      if (priceRange === '300000+' && numericPrice < 300000) return false;
      
      const propertyAvailability = property.type || property.availability;
      
      if (availability !== 'All') {
        
        if (availability === 'Buy') { 
          if (!['Buy', 'Sale', 'For Sale', 'Purchase'].includes(propertyAvailability)) return false;
        } else if (availability === 'Rent') {
          if (!['Rent', 'For Rent', 'Rental'].includes(propertyAvailability)) return false;
        } else if (propertyAvailability !== availability) {
          return false;
        }
      }

      return true;
    });
  };

  const filtered = filterProperties(properties[activeCategory]);

  
  const formatPrice = (price) => {
    
    const numericPrice = typeof price === 'string' 
      ? parseFloat(price.replace(/[^0-9.]/g, '')) 
      : Number(price);
    
    if (isNaN(numericPrice)) {
      return 'Price not available';
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(numericPrice);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${Heroappartment})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Live Where Convenience Meets Comfort</h1>
            <h2 className="text-4xl font-light">Apartments</h2>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <div className="flex justify-center gap-6 pb-6 py-8">
        <div className="flex space-x-8 border-b">
          {Object.keys(properties).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`pb-4 px-2 font-medium transition-colors ${
                activeCategory === category
                  ? 'text-orange-500 border-b-2 border-orange-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Dropdowns */}
      <div className="flex justify-center gap-6 pb-6">
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Rent">For Rent</option>
          <option value="Buy">For Buy</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="Any">Any Price</option>
          <option value="100000-200000">$100,000 - $200,000</option>
          <option value="200000-300000">$200,000 - $300,000</option>
          <option value="300000+">$300,000+</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="max-w-8xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 capitalize">{activeCategory}</h2>
        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <AppartmentCard key={property._id || property.id} property={property} formatPrice={formatPrice} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No properties match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default ApartmentsPage;