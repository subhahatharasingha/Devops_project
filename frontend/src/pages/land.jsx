import { useState, useEffect } from 'react';
import LandCard from '../component/landcard';
import { propertyAPI } from '../services/api';
import LandImage from "../assets/land.jpeg";

const LandsPage = () => {
  const [activeCategory, setActiveCategory] = useState('Residential land');
  const [availability, setAvailability] = useState('All');
  const [priceRange, setPriceRange] = useState('Any');
  const [lands, setLands] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await propertyAPI.getLands();
      
      if (response.success) {
        
        const categorizedLands = {
          'Residential land': response.properties.filter(p => 
            p.category === 'Residential' || p.category === 'Residential land'
          ),
          'Agricultural land': response.properties.filter(p => 
            p.category === 'Agricultural' || p.category === 'Agricultural land'
          ),
          'Commercial land': response.properties.filter(p => 
            p.category === 'Commercial' || p.category === 'Commercial land'
          )
        };
        setLands(categorizedLands);
      }
    } catch (error) {
      console.error('Error fetching lands:', error);
      setError('Failed to load properties. Please try again later.');
      
      setLands(getSampleLands());
    } finally {
      setLoading(false);
    }
  };

  // Sample data fallback
  const getSampleLands = () => ({
    'Residential land': [
      { 
        id: 1, 
        image: '/api/placeholder/400/300', 
        title: 'Suburban Plot', 
        location: 'Green Valley Suburbs', 
        size: '0.5 acres', 
        zoning: 'R1', 
        price: 85000, 
        type: 'Buy', 
        features: ['Prime location', 'Ready for construction', 'Utilities available'] 
      }
    ],
    'Agricultural land': [
      { 
        id: 4, 
        image: '/api/placeholder/400/300', 
        title: 'Fertile Farmland', 
        location: 'Golden Valley', 
        size: '10 acres', 
        zoning: 'A1', 
        price: 300000, 
        type: 'Buy', 
        features: ['Rich soil', 'Irrigation rights', 'Barn included'] 
      }
    ],
    'Commercial land': [
      { 
        id: 7, 
        image: '/api/placeholder/400/300', 
        title: 'Downtown Parcel', 
        location: 'Main Street District', 
        size: '0.3 acres', 
        zoning: 'C2', 
        price: 500000, 
        type: 'Buy', 
        features: ['High visibility', 'Pedestrian traffic', 'Mixed-use approved'] 
      }
    ]
  });

  
const filterLands = (list) => {
    if (!list) return [];
    
    return list.filter((land) => {
      
      const landPrice = land.desiredPrice || land.price || 0;
      
     
      const numericPrice = typeof landPrice === 'string' 
        ? parseFloat(landPrice.replace(/[^0-9.]/g, '')) 
        : Number(landPrice);
            
      if (priceRange === '100K-500K' && !(numericPrice >= 100000 && numericPrice <= 500000)) return false;
      if (priceRange === '500K-1M' && !(numericPrice >= 500000 && numericPrice <= 1000000)) return false;
      if (priceRange === '1M+' && numericPrice < 1000000) return false;

      const landAvailability = land.type || land.availability;
      
      if (availability !== 'All') {
        if (availability === 'Buy' && landAvailability !== 'Buy' && landAvailability !== 'Sale') return false;
        if (availability === 'Rent' && landAvailability !== 'Rent' && landAvailability !== 'Lease') return false;
      }

      return true;
    });
  };

  const filtered = filterLands(lands[activeCategory]);

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
               backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${LandImage})`
             }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">Invest in Earth, Build Your Future</h1>
            <h2 className="text-4xl font-light">Lands</h2>
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
          {Object.keys(lands).map((category) => (
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
          <option value="Buy">For Buy</option>
          <option value="Rent">For Rent</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="Any">Any Price</option>
          <option value="100K-500K">$100K - $500K</option>
          <option value="500K-1M">$500K - $1M</option>
          <option value="1M+">$1M+</option>
        </select>
      </div>

      {/* Lands Grid */}
       <div className="max-w-9xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 capitalize">{activeCategory}</h2>
        {filtered && filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((land) => (
              <LandCard key={land._id || land.id} land={land} formatPrice={formatPrice} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No land properties match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default LandsPage;