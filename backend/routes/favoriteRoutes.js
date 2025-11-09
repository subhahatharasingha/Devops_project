import express from 'express';
import {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
  checkFavoriteStatus,
  getFavoritesCount
} from '../controllers/favoriteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', addToFavorites);

router.get('/', getUserFavorites);

router.get('/count', getFavoritesCount);

router.get('/check/:propertyId', checkFavoriteStatus);

router.delete('/:propertyId', removeFromFavorites);

export default router;