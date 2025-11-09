import React from 'react'
import Navbar from './component/navbar'
import Footer from './component/footer'
import Homepage from './pages/home'
import PropertySellPage from './pages/property'
import HousesPage from './pages/houses'
import LoginPage from './pages/logging'
import SignupPage from './pages/signup'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandsPage from './pages/land'
import AppartmentsPage from './pages/appartment'
import AdminDashboard from './pages/admin'
import { AuthProvider } from "./component/authcontex"
import FavoritesPage from './pages/FavoritesPage';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
        <Navbar />
        {/* Main content with top padding to account for fixed navbar */}
        <main className="flex-grow pt-20"> {/* Adjust pt-20 based on your navbar height */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/property" element={<PropertySellPage />} />
            <Route path="/houses" element={<HousesPage />} />
            <Route path="/logging" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/land" element={<LandsPage />} />
            <Route path="/appartment" element={<AppartmentsPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </main>
      </AuthProvider>
      <Footer/>
    </div>
  )
}

export default App