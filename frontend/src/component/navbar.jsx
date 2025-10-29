import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user"); // Get user data
        
        setIsLoggedIn(!!token);
        
        // Check if user is admin
        if (userData) {
          const user = JSON.parse(userData);
          // Check both the role field and email for admin status
          if (user.role === "admin" || user.email === "admin@gmail.com") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    };

    // Run immediately
    checkLoginStatus();

    // Listen for storage changes
    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, [navigate]);

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user"); // Remove user data
    } catch (error) {
      console.error("Error removing token:", error);
    }
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/logging");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <span className="text-xl font-bold text-gray-800">Dream Nest</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <a href="/" className="text-gray-700 hover:text-orange-600 font-medium">Home</a>
        <a href="land" className="text-gray-700 hover:text-orange-600 font-medium">Land</a>
        <a href="appartment" className="text-gray-700 hover:text-orange-600 font-medium">Apartment</a>
        <a href="houses" className="text-gray-700 hover:text-orange-600 font-medium">Houses</a>

        {isLoggedIn && !isAdmin && (
          <a href="property" className="text-gray-700 hover:text-orange-600 font-medium">
            Sell Your Property
          </a>
        )}

        {isAdmin && (
          <a href="admin" className="text-gray-700 hover:text-orange-600 font-medium">
            Admin Dashboard
          </a>
        )}
      </div>

      {/* Right side - Login/Logout */}
      <div className="flex items-center space-x-2">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/logging")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md font-medium"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button className="text-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;