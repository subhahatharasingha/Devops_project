import React, { useState, useEffect } from 'react';
import { 
  Home, Building, Plus, Edit3, Trash2, 
  Search, BarChart3, DollarSign, MapPin, Bed, Bath, Square,
  X, Save, CheckCircle, XCircle, Info
} from 'lucide-react';

// PropertyModal component with all required props
const API_BASE_URL = 'http://3.95.25.116:4000/api';

const PropertyModal = ({ 
  modalType, 
  setShowModal, 
  formData, 
  setFormData, 
  handleSaveProperty, 
  error, 
  categoryOptions,
  handleInputChange,
  handleImageChange,
  loading
}) => {
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSaveProperty();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">
            {modalType === 'add' ? 'Add New Property' : 'Edit Property'}
          </h3>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                {error}
              </div>
            )}

            {/* Contact Information Section */}
            <div className="bg-orange-500 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold">Contact Information</h3>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>

            {/* Property Information Section */}
            <div className="bg-orange-500 text-white p-4 rounded-lg">
              <h3 className="text-xl font-bold">Property Information</h3>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />

              <input
                type="text"
                name="address"
                placeholder="Property Address"
                value={formData.address}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="bedrooms"
                  placeholder="Bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  min="0"
                  disabled={loading}
                />
                <input
                  type="number"
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={formData.bathrooms}
                  onChange={handleInputChange}
                  className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  min="0"
                  disabled={loading}
                />
              </div>

              <input
                type="text"
                name="squareFootage"
                placeholder="Square Footage"
                value={formData.squareFootage}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                disabled={loading}
              />

              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                required
                disabled={loading}
              >
                <option value="">Property Type</option>
                <option value="houses">Houses</option>
                <option value="lands">Lands</option>
                <option value="appartments">Apartments</option>
              </select>

              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                disabled={!formData.propertyType || loading}
                className="text-black w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                required
              >
                <option value="">Select Category</option>
                {formData.propertyType &&
                  categoryOptions[formData.propertyType]?.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
              </select>

              {/* CHANGED: Updated availability options to match houses page */}
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                required
                disabled={loading}
              >
                <option value="">Availability</option>
                <option value="Buy">Buy</option>
                <option value="Rent">Rent</option>
              </select>

              <input
                type="text"
                name="desiredPrice"
                placeholder="Desired Price"
                value={formData.desiredPrice}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />

              <select
                name="timeframe"
                value={formData.timeframe}
                onChange={handleInputChange}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                disabled={loading}
              >
                <option value="">When do you want to sell?</option>
                <option value="asap">As soon as possible</option>
                <option value="1-3months">Within 1-3 months</option>
                <option value="3-6months">Within 3-6 months</option>
                <option value="6-12months">Within 6-12 months</option>
                <option value="just-looking">Just exploring options</option>
              </select>
              
              <textarea
                name="additionalInfo"
                placeholder="Additional Information (renovations, special features, etc.)"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none resize-none"
                disabled={loading}
              ></textarea>
              
              <div className="space-y-4">
                <label className="block text-black font-medium">Property Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                  disabled={loading}
                />

                {formData.image && (
                  <img
                    src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image}
                    alt="Preview"
                    className="mt-2 w-48 h-48 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 disabled:bg-orange-300 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {modalType === 'add' ? 'Adding...' : 'Updating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {modalType === 'add' ? 'Add Property' : 'Update Property'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  
  // Message states
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);

  const categoryOptions = {
    houses: ["Luxury Villa", "Signature Villa", "Holiday Villa"],
    lands: ["Residential", "Agricultural", "Commercial"],
    appartments: ["City Living", "Leisure Living", "Ultra Luxury Living"],
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    propertyType: '',
    category: '',
    availability: '',
    desiredPrice: '',
    timeframe: '',
    additionalInfo: '',
    image: null,
  });

  // Message display functions
  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(null), 5000);
  };

  const showInfo = (message) => {
    setInfo(message);
    setTimeout(() => setInfo(null), 3000);
  };

  // Clear all messages
  const clearMessages = () => {
    setError(null);
    setSuccess(null);
    setInfo(null);
  };

  // Real API calls
  const propertyAPI = {
    getProperties: async () => {
      const response = await fetch(`${API_BASE_URL}/properties`);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      return data.properties;
    },

    addProperty: async (propertyData) => {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.keys(propertyData).forEach(key => {
        if (key === 'image' && propertyData[key] instanceof File) {
          formData.append('image', propertyData[key]);
        } else if (propertyData[key] !== null && propertyData[key] !== undefined) {
          formData.append(key, propertyData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/properties/sell`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add property');
      }

      return await response.json();
    },

    updateProperty: async (id, propertyData) => {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.keys(propertyData).forEach(key => {
        if (key === 'image' && propertyData[key] instanceof File) {
          formData.append('image', propertyData[key]);
        } else if (propertyData[key] !== null && propertyData[key] !== undefined) {
          formData.append(key, propertyData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update property');
      }

      return await response.json();
    },

    deleteProperty: async (id) => {
      const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete property');
      }

      return await response.json();
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      clearMessages();
      // showInfo('Loading properties...');
      const response = await propertyAPI.getProperties();
      setProperties(response);
    } catch (err) {
      showError('Failed to fetch properties: ' + err.message);
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  // CHANGED: Updated stats to use new availability values
  const stats = [
    { 
      title: 'Total Properties', 
      value: properties.length, 
      icon: Building, 
      color: 'bg-blue-500' 
    },
    { 
      title: 'Properties for Buy', 
      value: properties.filter(p => p.availability === 'Buy').length, 
      icon: Home, 
      color: 'bg-green-500' 
    },
    { 
      title: 'Properties for Rent', 
      value: properties.filter(p => p.availability === 'Rent').length, 
      icon: DollarSign, 
      color: 'bg-yellow-500' 
    },
  ];

  const handleAddProperty = () => {
    setModalType('add');
    setFormData({
      name: '',
      email: '',
      phone: '',
      title: '',
      address: '',
      bedrooms: '',
      bathrooms: '',
      squareFootage: '',
      propertyType: '',
      category: '',
      availability: '',
      desiredPrice: '',
      timeframe: '',
      additionalInfo: '',
      image: null,
    });
    setShowModal(true);
    clearMessages();
  };

  const handleEditProperty = (property) => {
    setModalType('edit');
    setSelectedProperty(property);
    setFormData({
      name: property.name || '',
      email: property.email || '',
      phone: property.phone || '',
      title: property.title || '',
      address: property.address || '',
      bedrooms: property.bedrooms?.toString() || '',
      bathrooms: property.bathrooms?.toString() || '',
      squareFootage: property.squareFootage?.toString() || '',
      propertyType: property.propertyType || '',
      category: property.category || '',
      // CHANGED: Convert old availability values to new format
      availability: property.availability === 'For Buy' ? 'Buy' : 
                   property.availability === 'For Rent' ? 'Rent' : 
                   property.availability || '',
      desiredPrice: property.desiredPrice?.toString() || '',
      timeframe: property.timeframe || '',
      additionalInfo: property.additionalInfo || '',
      image: property.image || null
    });
    setShowModal(true);
    clearMessages();
  };

  const handleDeleteProperty = async (id) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        clearMessages();
        showInfo('Deleting property...');
        await propertyAPI.deleteProperty(id);
        await fetchProperties();
        showSuccess('Property deleted successfully!');
      } catch (err) {
        showError('Failed to delete property: ' + err.message);
        console.error('Error deleting property:', err);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, image: file});
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "propertyType" ? { category: "" } : {})
    }));
  };

  const handleSaveProperty = async () => {
    try {
      clearMessages();
      setLoading(true);

      let successMessage = '';
      
      if (modalType === 'add') {
        // showInfo('Adding property...');
        await propertyAPI.addProperty(formData);
        showSuccess('Property added successfully!');
      } else if (modalType === 'edit') {
        showInfo('Updating property...');
        await propertyAPI.updateProperty(selectedProperty._id, formData);
        showSuccess('Property updated successfully!');
      }

      await fetchProperties();
      setShowModal(false);

      setTimeout(() => {
      showSuccess(successMessage);
    }, 100);

    } catch (err) {
      showError(`Failed to ${modalType === 'add' ? 'create' : 'update'} property: ${err.message}`);
      console.error('Error saving property:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || property.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Message components
  const MessageContainer = () => (
    <div className="fixed top-4 right-4 z-50 space-y-3 w-80">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-start">
          <XCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700 ml-3">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg flex items-start">
          <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Success</p>
            <p className="text-sm">{success}</p>
          </div>
          <button onClick={() => setSuccess(null)} className="text-green-500 hover:text-green-700 ml-3">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {info && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded-lg shadow-lg flex items-start">
          <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Info</p>
            <p className="text-sm">{info}</p>
          </div>
          <button onClick={() => setInfo(null)} className="text-blue-500 hover:text-blue-700 ml-3">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  const Sidebar = () => (
    <div className="w-64 bg-transparent shadow-lg h-screen fixed left-0 top-0">
      <div className="pt-30 pl-6 border-b">
        <h1 className="text-2xl font-bold text-gray-800">Property Admin</h1>
        <p className="text-sm text-gray-600">Dream Nest Management</p>
      </div>
      
      <nav className="p-4">
        <div className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'properties', label: 'Properties', icon: Building }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-orange-50 text-orange-600 border border-orange-200' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );

 const Dashboard = () => (
  <div className="space-y-6">
    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg text-black font-semibold mb-4">Recent Properties</h3>
        <div className="space-y-3">
          {properties.slice(0, 5).map(property => (
            <div key={property._id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <img src={property.image || '/api/placeholder/300/200'} alt={property.title} className="w-12 h-12 rounded-lg object-cover" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{property.title}</h4>
                <p className="text-sm text-gray-600">{property.address}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-800">${property.desiredPrice}</p>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  property.availability === 'Buy' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {property.availability}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Property Distribution Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg text-black font-semibold mb-4">Property Distribution</h3>
        <div className="space-y-4">
          {Object.entries(categoryOptions).map(([propertyType, categories]) => {
            const count = properties.filter(p => p.propertyType === propertyType).length;
            const percentage = properties.length > 0 ? (count / properties.length * 100).toFixed(1) : 0;
            
            return (
              <div key={propertyType} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-black capitalize">{propertyType}</span>
                  <span className="font-medium text-gray-600">{count} ({percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      propertyType === 'houses' ? 'bg-blue-500' :
                      propertyType === 'lands' ? 'bg-green-500' : 'bg-purple-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
);

  const Properties = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Properties Management</h2>
        <button
          onClick={handleAddProperty}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Property
        </button>
      </div>

      {loading && <div className="text-center py-8 text-gray-500 flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mr-2"></div>
        Loading properties...
      </div>}
      
      {!loading && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-4 font-semibold text-gray-700">Property</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Address</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Category</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Type</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Price</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Details</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProperties.map(property => (
                  <tr key={property._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={property.image || '/api/placeholder/300/200'} alt={property.title} className="w-16 h-16 rounded-lg object-cover" />
                        <div>
                          <h4 className="font-medium text-gray-800">{property.title}</h4>
                          <p className="text-sm text-gray-600">ID: {property._id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{property.address}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        property.category === 'Apartment' ? 'bg-blue-100 text-blue-800' :
                        property.category === 'House' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {property.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-sm text-gray-600">{property.propertyType}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-semibold text-gray-800">${property.desiredPrice}</span>
                    </td>
                    <td className="p-4">
                      {property.propertyType !== 'lands' ? (
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Bed className="w-4 h-4" />
                            <span>{property.bedrooms || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="w-4 h-4" />
                            <span>{property.bathrooms || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="w-4 h-4" />
                            <span>{property.squareFootage || 0}ft²</span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Square className="w-4 h-4" />
                          <span>{property.squareFootage || 0} sq ft</span>
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        property.availability === 'Buy' 
                          ? 'bg-green-100 text-green-800' 
                          : property.availability === 'Rent'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {property.availability}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProperty(property)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit Property"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Property"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredProperties.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              No properties found matching your search criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'properties':
        return <Properties />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="ml-64 p-8">
        {renderContent()}
      </div>

      {showModal && (
        <PropertyModal
          modalType={modalType}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
          handleSaveProperty={handleSaveProperty}
          error={error}
          categoryOptions={categoryOptions}
          handleInputChange={handleInputChange}
          handleImageChange={handleImageChange}
          loading={loading}
        />
      )}
      
      <MessageContainer />
    </div>
  );
};

export default AdminDashboard;