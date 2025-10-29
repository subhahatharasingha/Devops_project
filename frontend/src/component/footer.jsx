// Footer.jsx
import React from "react";
import footerImage from "../assets/home-06.jpg"; // Make sure to replace with your actual image

const Footer = () => {
  return (
    <footer className="bg-[#110c41] text-white py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and description */}
        <div className="space-y-4">
          <div className="flex items-center">
            <img 
              src={footerImage} 
              alt="Dream Nest Logo" 
              className="h-10 mr-2" 
            />
            <h1 className="text-2xl font-bold">Dream Nest</h1>
          </div>
          <p className="text-white-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-600 transition">Land</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Apartment</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Houses</a></li>
            <li><a href="#" className="hover:text-orange-600 transition">Sell your property</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-4">News Letter</h2>
          <div className="space-y-4">
            <input 
              type="email" 
              placeholder="Enter Email Address" 
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#0B2C3D]"
            />
            <button className="bg-orange-600 text-white px-6 py-2 rounded font-medium hover:bg-orange-700 transition">
              Subscribe
            </button>
            <p className="text-sm text-gray-600">We never spam you!</p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Contact</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              121 King St, Melbourne den 3000, Australia
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@example.com
            </li>
            <li className="flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 999999999
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-6xl mx-auto my-8 border-t border-gray-300"></div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto text-center text-gray-600">
        <p>&copy; {new Date().getFullYear()} Dream Nest. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;