import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const propertyAPI = {
  addProperty: async (formData) => {
    try {
      const response = await api.post('/properties/sell', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  getProperties: async () => {
    try {
      const response = await api.get('/properties');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  getPropertiesByType: async (propertyType) => {
    try {
      const response = await api.get(`/properties?propertyType=${propertyType}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  getHouses: async () => {
    try {
      const response = await api.get('/properties?propertyType=houses');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  getLands: async () => {
    try {
      const response = await api.get('/properties?propertyType=lands');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  getApartments: async () => {
    try {
      const response = await api.get('/properties?propertyType=appartments');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  updateProperty: async (id, updates) => {
    try {
      const response = await api.put(`/properties/${id}`, updates);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  deleteProperty: async (id) => {
    try {
      const response = await api.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  }
};

export const favoritesAPI = {

  addToFavorites: async (propertyId, propertyType) => {
    try {
      const response = await api.post('/favorites', {
        propertyId,
        propertyType
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },


  removeFromFavorites: async (propertyId) => {
    try {
      const response = await api.delete(`/favorites/${propertyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },


  getUserFavorites: async () => {
    try {
      const response = await api.get('/favorites');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  checkFavoriteStatus: async (propertyId) => {
    try {
      const response = await api.get(`/favorites/check/${propertyId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  },

  getFavoritesCount: async () => {
    try {
      const response = await api.get('/favorites/count');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Network error occurred' };
    }
  }
};

export default api;