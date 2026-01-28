import  { useState, useEffect } from 'react';
import { Heart, Trash2, Home, Building, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LandCard from '../component/landcard';
import HouseCard from '../component/housescard';
import AppartmentCard from '../component/appartmentscard';
import { favoritesAPI } from '../services/api.js';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const navigate = useNavigate();

 
  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return `$${price.toLocaleString()}`;
  };

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const data = await favoritesAPI.getUserFavorites();
      setFavorites(data.favorites || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      setError(error.message || 'Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (propertyId) => {
    try {
      await favoritesAPI.removeFromFavorites(propertyId);
      setFavorites(prev => prev.filter(fav => fav.property._id !== propertyId));
      window.dispatchEvent(new Event('favoritesUpdated'));
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert(error.message || 'Error removing from favorites');
    }
  };

 
  const filteredFavorites = favorites.filter(favorite => {
    if (filterType === 'all') return true;
    return favorite.propertyType === filterType;
  });

  
  const propertyTypes = [...new Set(favorites.map(fav => fav.propertyType))];

  useEffect(() => {
   
    if (!localStorage.getItem('authToken')) {
      setError('Please log in to view your favorites');
      setLoading(false);
      return;
    }

    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/logging')}
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-orange-600 mr-3 fill-orange-600" />
            <h1 className="text-3xl font-bold text-gray-800">My Favorites</h1>
          </div>
          <p className="text-gray-600">
            {favorites.length === 0 
              ? "You haven't added any properties to your favorites yet" 
              : `You have ${favorites.length} favorite ${favorites.length === 1 ? 'property' : 'properties'}`
            }
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-8">Start browsing properties and add them to your favorites!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/houses')}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <Home className="w-5 h-5 mr-2" />
                Browse Houses
              </button>
              <button
                onClick={() => navigate('/appartment')}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <Building className="w-5 h-5 mr-2" />
                Browse Apartments
              </button>
              <button
                onClick={() => navigate('/land')}
                className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Browse Land
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Filter Buttons */}
            {propertyTypes.length > 1 && (
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    filterType === 'all'
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                  }`}
                >
                  All ({favorites.length})
                </button>
                {propertyTypes.map(type => {
                  const count = favorites.filter(fav => fav.propertyType === type).length;
                  return (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-6 py-2 rounded-lg font-medium transition-colors capitalize ${
                        filterType === type
                          ? 'bg-orange-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                    >
                      {type}s ({count})
                    </button>
                  );
                })}
              </div>
            )}

            {/* Favorites Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFavorites.map((favorite) => {
                const property = favorite.property;
                
                if (favorite.propertyType === 'apartment') {
                  return (
                    <div key={favorite._id} className="relative">
                      <AppartmentCard 
                        property={property} 
                        formatPrice={formatPrice} 
                      />
                      <button
                        onClick={() => removeFavorite(property._id)}
                        className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                } else if (favorite.propertyType === 'house') {
                  return (
                    <div key={favorite._id} className="relative">
                      <HouseCard 
                        house={property} 
                        formatPrice={formatPrice} 
                      />
                      <button
                        onClick={() => removeFavorite(property._id)}
                        className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                } else if (favorite.propertyType === 'land') {
                  return (
                    <div key={favorite._id} className="relative">
                      <LandCard 
                        land={property} 
                        formatPrice={formatPrice} 
                      />
                      <button
                        onClick={() => removeFavorite(property._id)}
                        className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition-colors z-10"
                        title="Remove from favorites"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                }
                
                return null;
              })}
            </div>

            {filteredFavorites.length === 0 && filterType !== 'all' && (
              <div className="text-center py-16">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No {filterType}s in favorites
                </h3>
                <p className="text-gray-500">
                  You haven't favorited any {filterType}s yet.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;