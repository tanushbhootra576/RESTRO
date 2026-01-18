import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ children, subtitle = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            <h2 className="font-playfair text-h1 text-luxury-text-dark mb-3 tracking-wider relative pb-5 inline-block">
                {children}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></span>
            </h2>
            {subtitle && (
                <p className="text-body text-luxury-text-muted italic max-w-2xl mx-auto mt-6">
                    {subtitle}
                </p>
            )}
        </motion.div>
    );
};

export default SectionTitle;
