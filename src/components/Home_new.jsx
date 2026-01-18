import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitle, Button } from './ui';
import MenuCard from './cards/MenuCard';
import Hero from './sections/Hero';
import Features from './sections/Features';
import Testimonials from './sections/Testimonials';

const Home = () => {
    // Sample menu items
    const featuredItems = [
        {
            id: 1,
            name: 'Filet Mignon',
            description: 'Prime cut beef with truffle reduction and seasonal vegetables',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=500&q=60',
            category: 'Beef',
            rating: 4.8,
            reviews: 234,
        },
        {
            id: 2,
            name: 'Atlantic Salmon',
            description: 'Fresh salmon fillet with lemon butter sauce and asparagus',
            price: 38.99,
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=60',
            category: 'Seafood',
            rating: 4.9,
            reviews: 189,
        },
        {
            id: 3,
            name: 'Lobster Tail',
            description: 'Succulent lobster tail with garlic butter and roasted potatoes',
            price: 52.99,
            image: 'https://images.unsplash.com/photo-1598499820054-4cecf522e359?auto=format&fit=crop&w=500&q=60',
            category: 'Seafood',
            rating: 5.0,
            reviews: 156,
        },
        {
            id: 4,
            name: 'Duck Confit',
            description: 'Tender duck leg confit with cherry gastrique and microgreens',
            price: 42.99,
            image: 'https://images.unsplash.com/photo-1606787620884-cf2afac3c0bf?auto=format&fit=crop&w=500&q=60',
            category: 'Poultry',
            rating: 4.7,
            reviews: 145,
        },
        {
            id: 5,
            name: 'Truffle Pasta',
            description: 'Handmade pappardelle with white truffle oil and parmigiano',
            price: 36.99,
            image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=500&q=60',
            category: 'Pasta',
            rating: 4.9,
            reviews: 198,
        },
        {
            id: 6,
            name: 'Chocolate Soufflé',
            description: 'Decadent chocolate soufflé with vanilla bean ice cream',
            price: 18.99,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=500&q=60',
            category: 'Dessert',
            rating: 4.9,
            reviews: 267,
        },
    ];

    return (
        <div className="min-h-screen bg-luxury-cream">
            {/* Hero Section */}
            <Hero />

            {/* Featured Items Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SectionTitle subtitle="Handpicked selection of our most celebrated dishes">
                        Featured Culinary Creations
                    </SectionTitle>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredItems.map((item, idx) => (
                            <MenuCard key={item.id} {...item} delay={idx * 0.1} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Button variant="primary" size="lg">
                            Explore Full Menu
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <Features />

            {/* Testimonials Section */}
            <Testimonials />

            {/* CTA Section */}
            <section className="py-20 bg-gradient-luxury">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-playfair text-h1 text-white mb-6 tracking-wider"
                    >
                        Reserve Your Table
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-lg text-luxury-gold mb-8 italic"
                    >
                        Experience an unforgettable evening of culinary excellence
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Button variant="primary" size="lg">
                            Make a Reservation
                        </Button>
                        <Button variant="secondary" size="lg">
                            View Our Coupons
                        </Button>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
