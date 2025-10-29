import React, { useState } from 'react';
import { Mail, Lock, Home } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import SIGNUPIMAGE from "../assets/signup1.png";
import SIGNUPBG from "../assets/signupbg.jpeg";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'alex@email.com',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ADMIN_EMAIL = "admin@gmail.com";
  const ADMIN_PASSWORD = "Admin123";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

   const handleLogin = async () => {
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    return;
  }

  // Admin login logic
  if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
    const adminUser = { 
      email: ADMIN_EMAIL, 
      role: "admin",  // Make sure to set the role as "admin"
      name: "Administrator" // Add any other admin details you want
    };
    
    localStorage.setItem("authToken", "admin-token");
    localStorage.setItem("user", JSON.stringify(adminUser));
    window.dispatchEvent(new Event("storage"));
    navigate("/admin");
    return;
  }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event("storage"));
      navigate('/');
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login error:', error);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0  bg-opacity-50 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${SIGNUPBG})`
        }}
      >
        <div className="absolute top-0 right-0 h-full w-[30%] bg-orange-500 bg-opacity-50"></div>
      </div>

     

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full mx-auto" style={{border: '6px solid #110c41'}}>
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            
            {/* Left Side - Login Form */}
            <div className="p-12 flex flex-col justify-center bg-white">
              <div className="max-w-md mx-auto w-full">
                {/* Logo and Title */}
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    <Home className="w-8 h-8 text-black" />
                    <span className="text-2xl font-bold text-gray-800">Dream Nest</span>
                  </div>
                  <p className="text-gray-600 text-lg">Login into your account</p>
                </div>

                {/* Email Field */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="alex@email.com"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="bg-orange-500 p-2 rounded-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full pl-4 pr-12 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700"
                      placeholder="Enter your password"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <div className="bg-orange-500 p-2 rounded-lg cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-center mb-6">
                  <a href="#" className="text-gray-600 hover:text-indigo-600 text-sm underline">
                    Forgot password?
                  </a>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors mb-6"
                >
                  Login now
                </button>

                {/* OR Divider */}
                <div className="text-center mb-6">
                  <span className="text-gray-400 text-sm">OR</span>
                </div>

                {/* Signup Button */}
                <button
                  onClick={() => navigate("/signup")}
                  className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-4 rounded-lg transition-colors"
                >
                  Signup now
                </button>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="bg-gradient-to-br from-gray-100 to-gray-100 p-12 flex items-center justify-center relative overflow-hidden">
      <img
        src={SIGNUPIMAGE}
        alt="Illustration"
       className="w-full h-full object-cover rounded-none shadow-none"
      />
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;