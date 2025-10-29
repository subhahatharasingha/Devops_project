import React, { useState } from 'react';
import { Home, Users, TrendingUp, Award, Star, MapPin } from 'lucide-react';
import { propertyAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const PropertySellPage = () => {
  const navigate = useNavigate();
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
    propertyImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categoryOptions = {
    houses: ["Luxury Villa", "Signature Villa", "Holiday Villa"],
    lands: ["Residential", "Agricultural", "Commercial"],
    appartments: ["City Living", "Leisure Living", "Ultra Luxury Living"],
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      propertyImage: file
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "propertyType" ? { category: "" } : {})
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'address', 'title'];
      for (const field of requiredFields) {
        if (!formData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      // Create FormData for file upload
      const submitData = new FormData();
      
      // Append all form data (match backend field names)
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('address', formData.address);
      submitData.append('title', formData.title);
      submitData.append('bedrooms', formData.bedrooms);
      submitData.append('bathrooms', formData.bathrooms);
      submitData.append('squareFootage', formData.squareFootage);
      submitData.append('propertyType', formData.propertyType);
      submitData.append('category', formData.category);
      submitData.append('availability', formData.availability);
      submitData.append('desiredPrice', formData.desiredPrice);
      submitData.append('timeframe', formData.timeframe);
      submitData.append('additionalInfo', formData.additionalInfo);
      
      // Append image with correct field name for backend
      if (formData.propertyImage) {
        submitData.append('image', formData.propertyImage);
      }

      // Send to backend
      const response = await propertyAPI.addProperty(submitData);
      
      if (response.success) {
        alert('Thank you for your submission! We will contact you soon.');
        
        // Reset form
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
          propertyImage: null,
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to submit property. Please try again.');
      console.error('Error submitting property:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2075&q=80')"
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Sell Your Property
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Get the best value for your investment
            </p>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="bg-indigo-900 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get the <span className="text-orange-400">Best Value</span> for Your Property
          </h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Our experienced team of real estate professionals will help you get the maximum value for your property with our proven marketing strategies and expert negotiations.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Left Column - Images and Content */}
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="border relative bg-gradient-to-br from-white to-orange-200 rounded-2xl p-10 text-black overflow-hidden min-h-[200px]">
                <div className="absolute top-0 right-0 w-32 h-32 bg- bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg- bg-opacity-10 rounded-full translate-y-10 -translate-x-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-white bg-opacity-20 rounded-lg">
                      <Home className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold">Dream Nest</h2>
                  </div>
                  <p className="text-black text-opacity-90 leading-relaxed text-lg mb-4">
                    Find your perfect home with our expert guidance and comprehensive property solutions.
                  </p>
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold">10+</p>
                      <p className="text-sm opacity-80">Years Experience</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">500+</p>
                      <p className="text-sm opacity-80">Properties Sold</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-3xl font-bold text-gray-800">50K+</span>
                  </div>
                  <p className="text-gray-600 text-base font-medium">Happy Clients</p>
                  <p className="text-gray-500 text-sm mt-1">Satisfied customers worldwide</p>
                </div>
                
                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-3xl font-bold text-gray-800">95%</span>
                  </div>
                  <p className="text-gray-600 text-base font-medium">Success Rate</p>
                  <p className="text-gray-500 text-sm mt-1">Properties sold successfully</p>
                </div>
              </div>

              {/* Featured Properties */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">Featured Properties</h3>
                  <Award className="w-6 h-6 text-orange-500" />
                </div>
                
                <div className="space-y-6">
                  {/* Property 1 */}
                  <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                    <div 
                      className="h-48 bg-cover bg-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">Downtown District</span>
                        </div>
                        <p className="text-lg font-semibold">Modern Luxury Apartment</p>
                        <p className="text-sm opacity-90">3 bed • 2 bath • 1,200 sqft</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 bg-white bg-opacity-95 px-3 py-2 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property 2 */}
                  <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                    <div 
                      className="h-48 bg-cover bg-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">Suburban Heights</span>
                        </div>
                        <p className="text-lg font-semibold">Elegant Family Villa</p>
                        <p className="text-sm opacity-90">4 bed • 3 bath • 2,500 sqft</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 bg-white bg-opacity-95 px-3 py-2 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Property 3 */}
                  <div className="relative rounded-lg overflow-hidden group cursor-pointer">
                    <div 
                      className="h-48 bg-cover bg-center transition-transform group-hover:scale-105"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')"
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">City Center</span>
                        </div>
                        <p className="text-lg font-semibold">Executive Penthouse</p>
                        <p className="text-sm opacity-90">2 bed • 2 bath • 1,800 sqft</p>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center space-x-1 bg-white bg-opacity-95 px-3 py-2 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">4.7</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Our Services</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                      <Home className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Property Valuation</p>
                      <p className="text-sm text-gray-600">Get accurate market value assessment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Expert Consultation</p>
                      <p className="text-sm text-gray-600">Professional guidance throughout</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Market Analysis</p>
                      <p className="text-sm text-gray-600">Comprehensive market insights</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Award className="w-6 h-6 text-orange-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Certified</p>
                  <p className="text-xs text-gray-600 mt-1">Licensed Agents</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Trusted</p>
                  <p className="text-xs text-gray-600 mt-1">By Thousands</p>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-sm font-medium text-gray-800">Growing</p>
                  <p className="text-xs text-gray-600 mt-1">Every Year</p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="space-y-6">
                
                {/* Error Message */}
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                
                {/* Contact Information Section */}
                <div className="bg-orange-500 text-white p-4 rounded-lg mb-6">
                  <h3 className="text-xl font-bold">Contact Information</h3>
                </div>
                
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                </div>

                {/* Property Information Section */}
                <div className="bg-orange-500 text-white p-4 rounded-lg mt-8 mb-6">
                  <h3 className="text-xl font-bold">Property Information</h3>
                </div>

                <div className="space-y-4">

                   <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <input
                    type="text"
                    name="address"
                    placeholder="Property Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      name="bedrooms"
                      placeholder="Bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="number"
                      name="bathrooms"
                      placeholder="Bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                    />
                  </div>

                  <input
                    type="text"
                    name="squareFootage"
                    placeholder="Square Footage"
                    value={formData.squareFootage}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Property Type</option>
                    <option value="houses">Houses</option>
                    <option value="lands">Lands</option>
                    <option value="appartments">Appartments</option>
                    
                  </select>

                   <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    disabled={!formData.propertyType}
                    className="text-black  w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Select Category</option>
                    {formData.propertyType &&
                      categoryOptions[formData.propertyType].map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                  </select>

                   <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                  >
                    <option value="">Availability</option>
                    <option value="Rent">Rent</option>
                    <option value="Sale">Buy</option>
                  </select>

                  <input
                    type="text"
                    name="desiredPrice"
                    placeholder="Desired Selling Price"
                    value={formData.desiredPrice}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                  />

                  <select
                    name="timeframe"
                    value={formData.timeframe}
                    onChange={handleInputChange}
                    className="text-black  w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
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
                  ></textarea>
                  <div className="space-y-4">
                 <label className="block text-black font-medium">Property Image</label>
                  <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none bg-white"
                 />

                {formData.propertyImage && (
                 <img
                  src={URL.createObjectURL(formData.propertyImage)}
                  alt="Preview"
                  className="mt-2 w-48 h-48 object-cover rounded-lg"
                 />
               )}
              </div>
                                
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Apply Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertySellPage;