import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ children, variant = 'primary', className = '' }) => {
    const variants = {
        primary: 'bg-luxury-gold text-luxury-dark',
        secondary: 'bg-luxury-burgundy text-white',
        outline: 'bg-transparent border-2 border-luxury-gold text-luxury-gold',
    };

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase ${variants[variant]} ${className}`}
        >
            {children}
        </motion.span>
    );
};

export default Badge;
