import Favorite from '../models/favorite.js';
import Property from '../models/property.js';

export const addToFavorites = async (req, res) => {
  try {
    console.log('addToFavorites called');
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);

    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated - req.user missing'
      });
    }

    const { propertyId, propertyType } = req.body;
    const userId = req.user._id; 

    console.log('UserId:', userId, 'PropertyId:', propertyId, 'PropertyType:', propertyType);

    if (!propertyId || !propertyType) {
      return res.status(400).json({
        success: false,
        message: 'Property ID and property type are required'
      });
    }

    const validTypes = ['house', 'apartment', 'land'];
    if (!validTypes.includes(propertyType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid property type. Must be one of: ${validTypes.join(', ')}`
      });
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    const existingFavorite = await Favorite.findOne({
      userId,
      propertyId
    });

    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: 'Property already in favorites'
      });
    }

    const favorite = new Favorite({
      userId,
      propertyId,
      propertyType
    });

    const savedFavorite = await favorite.save();
    console.log('Favorite saved:', savedFavorite);

    res.status(201).json({
      success: true,
      message: 'Property added to favorites',
      favorite: savedFavorite
    });

  } catch (error) {
    console.error('Error adding to favorites:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Property already in favorites'
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred'
    });
  }
};

export const removeFromFavorites = async (req, res) => {
  try {
    console.log('removeFromFavorites called');
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const { propertyId } = req.params;
    const userId = req.user._id; 

    console.log('Removing favorite - UserId:', userId, 'PropertyId:', propertyId);

    const favorite = await Favorite.findOneAndDelete({
      userId,
      propertyId
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }

    console.log('Favorite removed:', favorite);

    res.json({
      success: true,
      message: 'Property removed from favorites'
    });

  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred'
    });
  }
};

export const getUserFavorites = async (req, res) => {
  try {
    console.log('getUserFavorites called');
    
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const userId = req.user._id; 
    console.log('Getting favorites for user:', userId);

    const favorites = await Favorite.find({ userId })
      .populate({
        path: 'propertyId',
        select: '_id title location price desiredPrice image category beds baths area features description type availability name email phone company bedrooms bathrooms sqft size zoning'
      })
      .sort({ createdAt: -1 });

    console.log('Found favorites:', favorites.length);

    const validFavorites = favorites
      .filter(fav => fav.propertyId)
      .map(fav => ({
        _id: fav._id,
        propertyType: fav.propertyType,
        property: fav.propertyId,
        createdAt: fav.createdAt
      }));

    res.json({
      success: true,
      favorites: validFavorites
    });

  } catch (error) {
    console.error('Error getting favorites:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred'
    });
  }
};

export const checkFavoriteStatus = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const { propertyId } = req.params;
    const userId = req.user._id; 

    const favorite = await Favorite.findOne({
      userId,
      propertyId
    });

    res.json({
      success: true,
      isFavorited: !!favorite
    });

  } catch (error) {
    console.error('Error checking favorite status:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred'
    });
  }
};

export const getFavoritesCount = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      });
    }

    const userId = req.user._id;
    
    const count = await Favorite.countDocuments({ userId });
    
    console.log('Favorites count for user', userId, ':', count);
    
    res.json({
      success: true,
      count
    });

  } catch (error) {
    console.error('Error getting favorites count:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error occurred'
    });
  }
};