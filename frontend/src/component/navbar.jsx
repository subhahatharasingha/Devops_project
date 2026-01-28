import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/home-6.png";
import { Heart } from "lucide-react";
import { favoritesAPI } from '../services/api.js';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);

  // Fetch favorites count from API
  const fetchFavoritesCount = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setFavoriteCount(0);
        return;
      }

      const data = await favoritesAPI.getFavoritesCount();
      setFavoriteCount(data.count || 0);
    } catch (error) {
      console.error('Error fetching favorites count:', error);
      setFavoriteCount(0);
    }
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const token = localStorage.getItem("authToken");
        const userData = localStorage.getItem("user");

        setIsLoggedIn(!!token);

        if (userData) {
          const user = JSON.parse(userData);
          if (user.role === "admin" || user.email === "admin@gmail.com") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setIsAdmin(false);
        }

        // Fetch favorites count if logged in and not admin
        if (token && !isAdmin) {
          fetchFavoritesCount();
        } else {
          setFavoriteCount(0);
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        setIsLoggedIn(false);
        setIsAdmin(false);
        setFavoriteCount(0);
      }
    };

    checkLoginStatus();
    
    // Listen for changes to localStorage
    window.addEventListener("storage", checkLoginStatus);
    
    // Custom event listener for favorites updates within the same tab
    window.addEventListener("favoritesUpdated", fetchFavoritesCount);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("favoritesUpdated", fetchFavoritesCount);
    };
  }, [isAdmin]); // Added isAdmin as dependency

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Error removing token:", error);
    }
    setIsLoggedIn(false);
    setIsAdmin(false);
    setFavoriteCount(0);
    navigate("/logging");
  };

  const handleFavoritesClick = () => {
    if (isLoggedIn && !isAdmin) {
      navigate("/favorites");
    } else {
      navigate("/logging");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo/Brand */}
      <div className="flex items-center">
        <img 
          src={Logo} 
          alt="Dream Nest Logo" 
          className="h-12 w-auto mr-2" 
        />
        <span className="text-xl font-bold text-gray-800">Dream Nest</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-700 hover:text-orange-600"}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/land"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-700 hover:text-orange-600"}`
          }
        >
          Land
        </NavLink>
        <NavLink
          to="/appartment"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-700 hover:text-orange-600"}`
          }
        >
          Apartment
        </NavLink>
        <NavLink
          to="/houses"
          className={({ isActive }) =>
            `font-medium ${isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-700 hover:text-orange-600"}`
          }
        >
          Houses
        </NavLink>

        {isLoggedIn && !isAdmin && (
          <NavLink
            to="/property"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-700 hover:text-orange-600"}`
            }
          >
            Sell Your Property
          </NavLink>
        )}

        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `font-medium ${isActive ? "text-orange-600 border-b-2 border-orange-600" : "text-gray-700 hover:text-orange-600"}`
            }
          >
            Admin Dashboard
          </NavLink>
        )}

        {/* Favorites Section - Hidden for admin users */}
        {!isAdmin && (
          <button
            onClick={handleFavoritesClick}
            className="flex items-center font-medium text-gray-700 hover:text-orange-600 relative"
          >
            <Heart className="w-5 h-5 mr-1" />
            Favorites
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
        )}
      </div>

      {/* Right side - Login/Logout */}
      <div className="flex items-center space-x-4">
        {/* Favorites button for mobile view - Hidden for admin users */}
        {!isAdmin && (
          <button
            onClick={handleFavoritesClick}
            className="md:hidden flex items-center text-gray-700 hover:text-orange-600 relative mr-2"
          >
            <Heart className="w-5 h-5" />
            {favoriteCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favoriteCount}
              </span>
            )}
          </button>
        )}

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