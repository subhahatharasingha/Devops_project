import { Link } from "react-router-dom";
import { Search, MapPin, Home, Star } from 'lucide-react';
import HomeImage from "../assets/home.jpg";
import LandImage from "../assets/land.jpeg";
import AppartmentImage from "../assets/home2.jpeg";
import HomeImage1 from "../assets/home1.jpeg";
import keyImage from "../assets/key.jpg";

export default function Homepage() {
  
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r  relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: `url(${HomeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              FIND YOUR PLACE OF DREAM
            </h1>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              From as low as $10 per day with limited time offer discounts.
            </p>
          </div>
        </div>
      </div>

      {/* Why Dream Nest Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Dream Nest is Number One
              </h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Dream Nest has been the leading real estate platform for over two decades, connecting millions of buyers, sellers, and renters with their perfect properties. Our comprehensive approach combines cutting-edge technology with personalized service to deliver exceptional results. From residential homes to commercial spaces, we provide end-to-end solutions that make real estate transactions seamless and successful.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-teal-600 mb-2">29+</div>
                  <div className="text-gray-600 font-medium">Years of trust</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-teal-600 mb-2">15</div>
                  <div className="text-gray-600 font-medium">District covered</div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <div className="text-4xl font-bold text-teal-600 mb-2">200k+</div>
                  <div className="text-gray-600 font-medium">Satisfied customers</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Property Cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Lands Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={LandImage}
                  alt="House"
                  className="h-32 w-full object-cover"
                />
                <div className="p-4 bg-blue-50 text-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-1">Lands</h3>
                  <p className="text-blue-500 font-semibold">8,657</p>
                </div>
              </div>
              
              {/* Houses Card */}
              <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={HomeImage1}
                  alt="House"
                  className="h-32 w-full object-cover"
                />
                <div className="p-4 bg-blue-50 text-center">
                  <h3 className="text-xl font-bold text-blue-600 mb-1">Houses</h3>
                  <p className="text-blue-500 font-semibold">12,357</p>
                </div>
              </div>
              
              {/* Apartment Card  */}
              <div className="col-span-2 bg-white rounded-lg overflow-hidden shadow-lg">
               <div 
                 className="h-32 bg-cover bg-center relative"
                 style={{ backgroundImage: `url(${AppartmentImage})` }}
                    >
                  <div className="absolute inset-0  bg-opacity-50 flex items-end">
                    <div className="p-4 text-white">
                      <h3 className="text-xl font-bold mb-1">Apartment</h3>
                      <p className="text-lg font-semibold">8,945</p>
                  </div>
                </div>
               </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What we offer?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Property Buying */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Property Buying"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Property Buying</h3>
                  <p className="text-white/90 text-sm">Find your dream home from our extensive property listings</p>
                </div>
              </div>
            </div>

            {/* Property Selling */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Property Selling"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Property Selling</h3>
                  <p className="text-white/90 text-sm">Sell your property quickly and efficiently with our expert team</p>
                </div>
              </div>
            </div>

            {/* Property Renting */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Property Renting"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Property Renting</h3>
                  <p className="text-white/90 text-sm">Explore the best rental options perfect for your lifestyle</p>
                </div>
              </div>
            </div>

            {/* Real Estate Consulting */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Real Estate Consulting"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">Real estate consulting</h3>
                  <p className="text-white/90 text-sm">Get professional advice to make smart real estate decisions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover The Facilities Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Discover The Facilities We Offer At Dream Nest
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Verified Property Listing */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Property Listing</h3>
              <p className="text-gray-600 text-sm">
                We ensure that our property listings are 100% trusted and verified for peace of mind.
              </p>
            </div>

            {/* Advanced Search Filters */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Search Filters</h3>
              <p className="text-gray-600 text-sm">
                Find exactly what you're looking for with our comprehensive search and filter options.
              </p>
            </div>

            {/* Expert Support */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Support</h3>
              <p className="text-gray-600 text-sm">
                Our experienced team provides personalized guidance at every step.
              </p>
            </div>

            {/* User-Friendly Platform */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">User-Friendly Platform</h3>
              <p className="text-gray-600 text-sm">
                Navigate our platform with ease using our intuitive and modern interface.
              </p>
            </div>

            {/* Flexible Payment Options */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Flexible Payment Options</h3>
              <p className="text-gray-600 text-sm">
                Multiple payment plans to make your dream property affordable.
              </p>
            </div>

            {/* Customizable Insights */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Customizable Insights</h3>
              <p className="text-gray-600 text-sm">
                Discover neighborhood insights and analytics that fit your lifestyle.
              </p>
            </div>

            {/* Virtual Tours */}
            <div className="text-center p-6 bg-white rounded-lg border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Virtual Tours</h3>
              <p className="text-gray-600 text-sm">
                Explore properties from the comfort of your home with our virtual tours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Explore Properties Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Explore And Browse Our Exclusive Property Listings
            </h2>
            <p className="text-lg text-gray-600">Our Featured Properties</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Property 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury Apartment"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    For Sale
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Luxury BHK Apartment in Colombo 03</h3>
                <p className="text-gray-600 mb-2">Price Rs. 25,000,000</p>
                <p className="text-gray-500 text-sm mb-4">Bedrooms: 3 | Bathrooms: 2 | Area: 1,250 sqft</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern Villa"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    For Sale
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Modern Villa with Pool in Kandy</h3>
                <p className="text-gray-600 mb-2">Price Rs. 45,000,000</p>
                <p className="text-gray-500 text-sm mb-4">Bedrooms: 4 | Bathrooms: 3 | Area: 2,800 sqft</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Beach House"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    For Sale
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spacious BHK Villa in Galle</h3>
                <p className="text-gray-600 mb-2">Price Rs. 35,000,000</p>
                <p className="text-gray-500 text-sm mb-4">Bedrooms: 5 | Bathrooms: 4 | Area: 3,200 sqft</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Modern House"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    For Rent
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Spacious BHK Villa in Kandy</h3>
                <p className="text-gray-600 mb-2">Price Rs. 150,000/month</p>
                <p className="text-gray-500 text-sm mb-4">Bedrooms: 3 | Bathrooms: 2 | Area: 1,800 sqft</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property 5 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="City Apartment"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    For Rent
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Stunning BHK Penthouse Negombo</h3>
                <p className="text-gray-600 mb-2">Price Rs. 200,000/month</p>
                <p className="text-gray-500 text-sm mb-4">Bedrooms: 4 | Bathrooms: 3 | Area: 2,200 sqft</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>

            {/* Property 6 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Dining Room"
                  className="h-48 w-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded text-sm font-semibold">
                    For Rent
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Luxury BHK Apartment Colombo 07</h3>
                <p className="text-gray-600 mb-2">Price Rs. 180,000/month</p>
                <p className="text-gray-500 text-sm mb-4">Bedrooms: 2 | Bathrooms: 2 | Area: 1,100 sqft</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
         <div className="text-center">
        <Link to="/houses">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition-colors">
             VIEW MORE
          </button>
          </Link>
         </div>
        </div>
      </div>

      {/* Find Your Dream Home Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Find Your Dream Home Today
            </h2>
          </div>
          
          <div className="relative">
  <img 
    src={keyImage}   
    alt="Happy Family"
    className="w-full h-96 object-cover rounded-lg"
  />
  <div className="absolute inset-0 bg-opacity-40 rounded-lg flex items-center justify-center">
    <div className="text-center text-white">
      <h3 className="text-3xl font-bold mb-4">Your Dream Home Awaits</h3>
      <p className="text-xl mb-6">Start your journey to finding the perfect home for your family</p>
      <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-semibold transition-colors">
        Get Started
      </button>
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Our Exclusive Agents Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Our Exclusive Agents
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Agent 1 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Jenny White"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Jenny White</h3>
              <p className="text-gray-600 text-sm mb-4">Real Estate Specialist</p>
              <button className="border border-pink-300 text-pink-600 px-4 py-2 rounded-md text-sm hover:bg-pink-50 transition-colors">
                VIEW PROPERTIES
              </button>
            </div>

            {/* Agent 2 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="John White"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">John White</h3>
              <p className="text-gray-600 text-sm mb-4">Property Consultant</p>
              <button className="border border-pink-300 text-pink-600 px-4 py-2 rounded-md text-sm hover:bg-pink-50 transition-colors">
                VIEW PROPERTIES
              </button>
            </div>

            {/* Agent 3 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Mary Rose"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mary Rose</h3>
              <p className="text-gray-600 text-sm mb-4">Senior Agent</p>
              <button className="border border-pink-300 text-pink-600 px-4 py-2 rounded-md text-sm hover:bg-pink-50 transition-colors">
                VIEW PROPERTIES
              </button>
            </div>

            {/* Agent 4 */}
            <div className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                alt="Alex Ray"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Alex Ray</h3>
              <p className="text-gray-600 text-sm mb-4">Property Manager</p>
              <button className="border border-pink-300 text-pink-600 px-4 py-2 rounded-md text-sm hover:bg-pink-50 transition-colors">
                VIEW PROPERTIES
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Address */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Address:</h3>
              <p className="text-gray-600">892/2 Dikwewa, Uswewa, Tangalle</p>
            </div>

            {/* Phone */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone:</h3>
              <p className="text-gray-600">+94703376797</p>
            </div>

            {/* Email */}
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">E-mail:</h3>
              <p className="text-gray-600">subanyakalpani@gmail.com</p>
            </div>
          </div>

          {/* Business Hours */}
          <div className="text-center mt-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="h-8 w-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">We are Open:</h3>
            <div className="text-gray-600 space-y-1">
              <p>Monday - Thursday: 9:00 AM - 5:30 PM</p>
              <p>Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 11:00 AM - 5:00 PM</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="text-center mt-8">
            <div className="flex justify-center space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}