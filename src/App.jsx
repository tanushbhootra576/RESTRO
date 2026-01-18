import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Services from './components/Services';
import NotFound from './components/NotFound';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import OwnerRoute from './components/OwnerRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Bookings from './pages/Bookings';
import Contact from './pages/Contact';
import Coupons from './pages/Coupons';
import Reviews from './pages/Reviews';
import Dashboard from './pages/Dashboard';
import Checkout from './pages/Checkout';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <main className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/coupons" element={<Coupons />} />
              <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
              <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/dashboard" element={<OwnerRoute><Dashboard /></OwnerRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
