import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { cart } = useCart();
    const { isAuthenticated, logout, user } = useAuth();

    // Ensure we always work with an array of items
    const cartItems = Array.isArray(cart?.items) ? cart.items : [];
    const cartCount = cartItems.reduce((sum, item) => sum + (item.qty ?? item.quantity ?? 0), 0);

    const normalizeRole = (role) => {
        if (!role) return role;
        const normalized = role.toLowerCase();
        if (normalized === 'restaurantowner' || normalized === 'restaurant_owner') {
            return 'owner';
        }
        if (normalized === 'administrator') {
            return 'admin';
        }
        return normalized;
    };

    const role = normalizeRole(user?.role);
    const showDashboard = role === 'admin' || role === 'owner';

    const navLinks = [
        { name: 'Menu', path: '/menu' },
        { name: 'Bookings', path: '/bookings' },
        { name: 'Coupons', path: '/coupons' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
        { name: 'Reviews', path: '/reviews' },
    ];

    if (showDashboard) {
        navLinks.unshift({ name: 'Add Menu Item', path: '/dashboard?tab=menu' });
        navLinks.unshift({ name: 'Dashboard', path: '/dashboard' });
    }

    const isActive = (path) => {
        if (!path.includes('?')) {
            return location.pathname === path;
        }

        const [pathname, queryString] = path.split('?');
        if (location.pathname !== pathname) {
            return false;
        }

        const targetParams = new URLSearchParams(queryString);
        const currentParams = new URLSearchParams(location.search);

        for (const [key, value] of targetParams.entries()) {
            if (currentParams.get(key) !== value) {
                return false;
            }
        }

        return true;
    };

    return (
        <nav className="fixed top-0 w-full bg-gradient-luxury border-b border-luxury-gold border-opacity-15 backdrop-blur-md z-50 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-h2 font-playfair font-bold text-luxury-gold tracking-wider"
                        >
                            RESTRO
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-4 py-2 text-sm font-bold tracking-wider uppercase rounded transition-all duration-300 border-2 border-transparent ${isActive(link.path)
                                    ? 'bg-luxury-gold text-luxury-dark'
                                    : 'text-white hover:border-luxury-gold hover:text-luxury-gold'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Section */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Cart Icon */}
                        <Link
                            to="/cart"
                            className="relative p-2 text-luxury-gold hover:text-luxury-gold-light transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-0 right-0 bg-luxury-burgundy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/profile"
                                    className="px-4 py-2 text-sm font-bold tracking-wider uppercase rounded border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition"
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 text-sm font-bold tracking-wider uppercase rounded bg-luxury-gold text-luxury-dark hover:opacity-90 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-bold tracking-wider uppercase rounded border border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 text-sm font-bold tracking-wider uppercase rounded bg-luxury-gold text-luxury-dark hover:opacity-90 transition"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <Link
                            to="/cart"
                            className="relative p-2 text-luxury-gold hover:text-luxury-gold-light transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute top-0 right-0 bg-luxury-burgundy text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                                >
                                    {cartCount}
                                </motion.span>
                            )}
                        </Link>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-luxury-gold hover:text-luxury-gold-light transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-luxury-darker border-t border-luxury-gold border-opacity-15"
                        >
                            <div className="px-2 pt-2 pb-3 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block px-4 py-2 rounded text-sm font-bold tracking-wider uppercase transition-all duration-300 ${isActive(link.path)
                                            ? 'bg-luxury-gold text-luxury-dark'
                                            : 'text-luxury-gold hover:bg-luxury-gold hover:bg-opacity-10'
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className="border-t border-luxury-gold/20 pt-3">
                                    {isAuthenticated ? (
                                        <>
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block px-4 py-2 rounded text-sm font-bold tracking-wider uppercase text-luxury-gold hover:bg-luxury-gold hover:bg-opacity-10"
                                            >
                                                Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setIsMenuOpen(false);
                                                    logout();
                                                }}
                                                className="w-full text-left px-4 py-2 rounded text-sm font-bold tracking-wider uppercase text-luxury-gold hover:bg-luxury-gold hover:bg-opacity-10"
                                            >
                                                Logout
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/login"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block px-4 py-2 rounded text-sm font-bold tracking-wider uppercase text-luxury-gold hover:bg-luxury-gold hover:bg-opacity-10"
                                            >
                                                Login
                                            </Link>
                                            <Link
                                                to="/register"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block px-4 py-2 rounded text-sm font-bold tracking-wider uppercase text-luxury-gold hover:bg-luxury-gold hover:bg-opacity-10"
                                            >
                                                Register
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
