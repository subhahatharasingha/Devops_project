import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Layers, Home, Building, ArrowRight, X, Mail, Phone } from 'lucide-react';
import { favoritesAPI } from '../services/api.js';

const LandCard = ({ land, formatPrice }) => {
  const [showModal, setShowModal] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is logged in
  const isLoggedIn = () => {
    return localStorage.getItem('authToken') !== null;
  };

  // Check favorite status on component mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (!isLoggedIn() || !land._id) return;

      try {
        const data = await favoritesAPI.checkFavoriteStatus(land._id);
        setIsFavorited(data.isFavorited);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavoriteStatus();
  }, [land._id]);

  // Handle favorite toggle
  const handleFavoriteToggle = async (e) => {
    e.stopPropagation();
    
    if (!isLoggedIn()) {
      alert('Please login to add favorites');
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        // Remove from favorites
        await favoritesAPI.removeFromFavorites(land._id);
        setIsFavorited(false);
        // Dispatch custom event to update navbar count
        window.dispatchEvent(new Event('favoritesUpdated'));
      } else {
        // Add to favorites
        await favoritesAPI.addToFavorites(land._id, 'land');
        setIsFavorited(true);
        // Dispatch custom event to update navbar count
        window.dispatchEvent(new Event('favoritesUpdated'));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert(error.message || 'Error updating favorites');
    } finally {
      setIsLoading(false);
    }
  };

  // Use actual owner details from the property data
  const ownerDetails = {
    name: land.name || 'Property Owner',
    email: land.email || 'No email provided',
    phone: land.phone || 'No phone provided',
    company: land.company || 'Land Property'
  };

  // Handle both backend and sample data structures
  const getImageSrc = () => {
    return land.image || '/api/placeholder/400/300';
  };

  const getFeatures = () => {
    if (Array.isArray(land.features)) {
      return land.features;
    }
    return land.featuresList || land.amenities || [];
  };

  const getDescription = () => {
    return land.description || land.additionalInfo || 'No description available';
  };

  const getType = () => {
    return land.type || land.availability || 'N/A';
  };

  const getAvailabilityText = () => {
    const availability = land.type || land.availability;
    if (availability === 'Buy' || availability === 'Sale') return 'For Buy';
    if (availability === 'Rent' || availability === 'Lease') return 'For Rent';
    return availability || 'Available';
  };

  const getAvailabilityColor = () => {
    const availability = land.type || land.availability;
    if (availability === 'Buy' || availability === 'Sale') return 'bg-green-100 text-green-800';
    if (availability === 'Rent' || availability === 'Lease') return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Original Card Display */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
        <div className="relative">
          <img 
            src={getImageSrc()} 
            alt={land.title}
            className="w-full h-48 object-cover"
          />
          <button 
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isLoading 
                ? 'bg-gray-200 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            <Heart 
              className={`w-5 h-5 transition-colors ${
                isFavorited 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600'
              } ${isLoading ? 'opacity-50' : ''}`} 
            />
          </button>
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-semibold text-gray-800 flex-grow pr-2 line-clamp-1">{land.title}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${getAvailabilityColor()}`}>
              {getAvailabilityText()}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{land.location || land.address}</span>
          </div>
          
          <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Layers className="w-4 h-4 mr-1" />
              <span>{land.size || 'N/A'}</span>
            </div>
            <div className="flex items-center">
              {land.category === 'Residential land' || land.category === 'Residential' ? (
                <Home className="w-4 h-4 mr-1" />
              ) : land.category === 'Commercial land' || land.category === 'Commercial' ? (
                <Building className="w-4 h-4 mr-1" />
              ) : (
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              )}
              <span>{land.zoning || 'N/A'}</span>
            </div>
          </div>
          
          <div className="mb-4 flex-grow">
            <ul className="text-sm text-gray-600 space-y-1">
              {getFeatures().slice(0, 2).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-orange-500 mr-2">•</span>
                  <span className="line-clamp-1">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t mt-auto">
            <span className="text-2xl font-bold text-orange-500 whitespace-nowrap">
              {formatPrice(land.desiredPrice || land.price || 0)}
            </span>
            <button 
              onClick={() => setShowModal(true)}
              className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors whitespace-nowrap ml-4"
            >
              <span className="mr-2">Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-cover bg-center flex items-center justify-center p-4 z-50 "
          style={{ backgroundImage: `url(${getImageSrc()})` }}
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0  bg-opacity-50"></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-xl"> 
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-gray-800">{land.title}</h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Property Image at the top */}
              <div className="mb-8">
                <img 
                  src={getImageSrc()} 
                  alt={land.title}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-md"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Land Details */}
                <div>
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                      Land Details
                    </h4>
                    <div className="space-y-4">
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-600">Location:</span>
                        <span className="text-gray-800">{land.location || land.address}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-600">Size:</span>
                        <span className="text-gray-800">{land.size || 'N/A'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-600">Zoning:</span>
                        <span className="text-gray-800">{land.zoning || 'N/A'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-600">Type:</span>
                        <span className="text-gray-800">{land.category || 'N/A'}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-600">Availability:</span>
                        <span className="text-gray-800">{getType()}</span>
                      </div>
                      <div className="flex">
                        <span className="w-32 font-medium text-gray-600">Price:</span>
                        <span className="text-gray-800 font-bold">{formatPrice(land.desiredPrice || land.price || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                      Additional Information
                    </h4>
                    <p className="text-gray-600 mb-4">{getDescription()}</p>
                    <ul className="space-y-2">
                      {getFeatures().map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-orange-500 mr-2">•</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Owner Contact Information - USING ACTUAL OWNER DATA */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                    Contact Owner
                  </h4>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-800">{ownerDetails.name}</h5>
                        <p className="text-sm text-gray-600">{ownerDetails.company}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-gray-500 mr-3" />
                        {ownerDetails.email !== 'No email provided' ? (
                          <a href={`mailto:${ownerDetails.email}`} className="text-gray-600 hover:text-orange-500">
                            {ownerDetails.email}
                          </a>
                        ) : (
                          <span className="text-gray-600">{ownerDetails.email}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-gray-500 mr-3" />
                        {ownerDetails.phone !== 'No phone provided' ? (
                          <a href={`tel:${ownerDetails.phone.replace(/\D/g, '')}`} className="text-gray-600 hover:text-orange-500">
                            {ownerDetails.phone}
                          </a>
                        ) : (
                          <span className="text-gray-600">{ownerDetails.phone}</span>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                      {ownerDetails.phone !== 'No phone provided' ? (
                        <a href={`tel:${ownerDetails.phone.replace(/\D/g, '')}`} className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center">
                          <Phone className="w-5 h-5 mr-2" />
                          Call Now
                        </a>
                      ) : (
                        <button className="w-full bg-gray-400 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center cursor-not-allowed" disabled>
                          <Phone className="w-5 h-5 mr-2" />
                          No Phone Available
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandCard;