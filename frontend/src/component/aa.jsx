import React, { useState } from "react";
import HousesCard from "../component/housescard";

const HousesPage = () => {
  const [activeCategory, setActiveCategory] = useState('Luxury villa');
  const [availability, setAvailability] = useState('All');
  const [priceRange, setPriceRange] = useState('Any');

  // Sample property data
  const properties = {
    'Luxury villa': [
{
      id: 1,
      category: "Luxury villa",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      title: "Modern Lake Home Offering Panoramic Views",
      location: "Colorado, USA",
      price: "$2,450,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200 sq ft",
      rating: 4.9,
      availability: "Buy",
    },
    {
      id: 2,
      category: "Luxury villa",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      title: "Contemporary Villa with Private Pool",
      location: "California, USA",
      price: "$3,850,000",
      bedrooms: 5,
      bathrooms: 4,
      area: "4,500 sq ft",
      rating: 4.8,
      availability: "Buy",
    },
    {
      id: 3,
      category: "Luxury villa",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      title: "Elegant Townhouse in Prime Location",
      location: "New York, USA",
      price: "$1,950,000",
      bedrooms: 3,
      bathrooms: 2,
      area: "2,800 sq ft",
      rating: 4.7,
      availability: "Rent",
    }
    ],
    'Signature villa': [
       {
      id: 4,
      category: "Signature villa",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      title: "Waterfront Modern Villa with Infinity Pool",
      location: "Miami, Florida",
      price: "$5,200,000",
      bedrooms: 6,
      bathrooms: 5,
      area: "6,000 sq ft",
      rating: 4.9,
      availability: "Buy",
    }
    ],
    'Holiday villa': [
{
      id: 5,
      category: "Holiday villa",
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
      title: "Tropical Beach House with Private Beach Access",
      location: "Maui, Hawaii",
      price: "$3,200,000",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,800 sq ft",
      rating: 4.9,
      availability: "Rent",
    }
    ]
  };

  // filtering logic
  const filterProperties = (list) => {
    return list.filter((p) => {
      // Availability filter
      if (availability !== 'All' && p.type !== availability) return false;

      // Price filter
      if (priceRange === '1000-2000' && !(p.price >= 1000 && p.price <= 2000)) return false;
      if (priceRange === '2000-3000' && !(p.price >= 2000 && p.price <= 3000)) return false;
      if (priceRange === '3000+' && p.price < 3000) return false;

      return true;
    });
  };

  const filtered = filterProperties(properties[activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative h-96 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=2000&q=80')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Houses</h1>
            <p className="text-xl md:text-2xl font-light">
              Discover your perfect home from our exclusive collection
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="max-w-6xl mx-auto px-6 py-8">
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
      <div className="max-w-6xl mx-auto px-6 pb-6 flex gap-6">
        <select
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="All">All</option>
          <option value="Rent">Rent</option>
          <option value="Buy">Buy</option>
        </select>

        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="text-black px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="Any">Any Price</option>
          <option value="1000-2000">$1,000 - $2,000</option>
          <option value="2000-3000">$2,000 - $3,000</option>
          <option value="3000+">$3,000+</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 capitalize">{activeCategory}</h2>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <HousesCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No properties match your filters.</p>
        )}
      </div>
    </div>
  );
};

export default HousesPage;
