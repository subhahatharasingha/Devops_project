import { useState, useEffect } from 'react';
import HouseCard from '../component/housescard';
import { propertyAPI } from '../services/api';
import HOUSEIMAGE from '../assets/houses.jpg'

const HousesPage = () => {
  const [activeCategory, setActiveCategory] = useState('Luxury villas');
  const [priceRange, setPriceRange] = useState('Any');
  const [availability, setAvailability] = useState('All');
  const [houses, setHouses] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await propertyAPI.getHouses();
      
      if (response.success) {
        const categorizedHouses = {
          'Luxury villas': response.properties.filter(p => 
            p.category === 'Luxury Villa' || p.category === 'Luxury villas'
          ),
          'Signature villas': response.properties.filter(p => 
            p.category === 'Signature Villa' || p.category === 'Signature villas'
          ),
          'Holiday villas': response.properties.filter(p => 
            p.category === 'Holiday Villa' || p.category === 'Holiday villas'
          )
        };
        setHouses(categorizedHouses);
      }
    } catch (error) {
      console.error('Error fetching houses:', error);
      setError('Failed to load properties. Please try again later.');
      setHouses(getSampleHouses());
    } finally {
      setLoading(false);
    }
  };

  // Sample data fallback
  const getSampleHouses = () => ({
    'Luxury villas': [
      { 
        id: 1,
        image: '/api/placeholder/400/300',
        title: 'Oceanfront Luxury Estate',
        location: 'Malibu, California',
        bedrooms: 5,
        bathrooms: 6,
        sqft: 6500,
        price: 12500000,
        type: 'Buy',
        description: 'Stunning contemporary villa with panoramic ocean views, infinity pool, and private beach access.',
        features: ['Infinity pool', 'Home theater', 'Wine cellar', 'Smart home system']
      }
    ],
    'Signature villas': [
      { 
        id: 3,
        image: '/api/placeholder/400/300',
        title: 'Mediterranean Villa',
        location: 'Miami Beach, Florida',
        bedrooms: 4,
        bathrooms: 4.5,
        sqft: 4800,
        price: 6500000,
        type: 'Buy',
        description: 'Elegant villa with Spanish architecture, courtyard, and resort-style pool area.',
        features: ['Courtyard', 'Chef\'s kitchen', 'Pool with spa', 'Lush landscaping']
      }
    ],
    'Holiday villas': [
      { 
        id: 5,
        image: '/api/placeholder/400/300',
        title: 'Tropical Paradise Villa',
        location: 'Koh Samui, Thailand',
        bedrooms: 4,
        bathrooms: 4,
        sqft: 4200,
        price: 3200000,
        type: 'Buy',
        description: 'Private beachfront villa with infinity pool, open-air living spaces, and staff quarters.',
        features: ['Beachfront', 'Infinity pool', 'Open-air living', 'Staff quarters']
      }
    ]
  });

  const filterHouses = (list) => {
    if (!list) return [];
    
    return list.filter((house) => {

      const price = typeof house.desiredPrice === 'string' 
        ? parseFloat(house.desiredPrice.replace(/[^0-9.]/g, '')) 
        : Number(house.desiredPrice);

     
      if (priceRange === '1M-5M' && !(price >= 1000000 && price <= 5000000)) return false;
      if (priceRange === '5M-10M' && !(price >= 5000000 && price <= 10000000)) return false;
      if (priceRange === '10M+' && price < 10000000) return false;

     
            const houseAvailability = house.type || house.availability;
    
    if (availability !== 'All') {
      if (availability === 'Buy' && houseAvailability !== 'Buy' && houseAvailability !== 'Sale') return false;
      if (availability === 'Rent' && houseAvailability !== 'Rent') return false;
    }

    return true;
  });
};

  const filtered = filterHouses(houses[activeCategory]);

  
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
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${HOUSEIMAGE})`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Find a House That Feels Like Home</h1>
            <h2 className="text-4xl font-light">Houses</h2>
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
          {Object.keys(houses).map((category) => (
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
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="Any">Any Price</option>
          <option value="1M-5M">$1M - $5M</option>
          <option value="5M-10M">$5M - $10M</option>
          <option value="10M+">$10M+</option>
        </select>

        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Buy">For Buy</option>
          <option value="Rent">For Rent</option>
        </select>
      </div>

      {/* Houses Grid */}
      <div className="max-w-8xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 capitalize">{activeCategory}</h2>
        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((house) => (
              <HouseCard 
                key={house._id || house.id} 
                house={house} 
                formatPrice={formatPrice}              
                price={house.desiredPrice}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No houses match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default HousesPage;