import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
    const features = [
        {
            icon: '👨‍🍳',
            title: 'Expert Chefs',
            description: 'Award-winning culinary masters with decades of experience',
        },
        {
            icon: '🌟',
            title: 'Premium Ingredients',
            description: 'Sourced from finest suppliers around the world',
        },
        {
            icon: '🍽️',
            title: 'Fine Dining',
            description: 'Sophisticated ambiance with impeccable service',
        },
        {
            icon: '⏰',
            title: 'Perfect Timing',
            description: 'Each dish crafted and served at optimal temperature',
        },
    ];

    return (
        <section className="py-20 bg-luxury-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-lg p-8 border border-luxury-border hover:border-luxury-gold hover:shadow-card-hover transition-all duration-300 text-center group"
                        >
                            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="font-playfair text-h4 text-luxury-text-dark mb-3 group-hover:text-luxury-gold transition-colors duration-300">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-luxury-text-muted italic">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
