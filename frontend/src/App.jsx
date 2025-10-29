import React from 'react'
import Navbar from './component/navbar'
import Footer from './component/footer'
import Homepage from './pages/home'
import PropertySellPage from './pages/property'
import SignupPage from './pages/signup'
import LoginPage from './pages/logging'
import AdminDashboard from './pages/admin'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./component/authcontex";

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/property" element={<PropertySellPage />} />
        <Route path="/logging" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </AuthProvider>
  )
}

export default App
