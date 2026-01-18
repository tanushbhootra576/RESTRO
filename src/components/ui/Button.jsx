import React from 'react';
import { motion } from 'framer-motion';

const Button = ({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    disabled = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'font-montserrat font-bold tracking-wider uppercase transition-all duration-300 rounded focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'bg-gradient-gold text-luxury-dark hover:shadow-luxury-lg hover:-translate-y-0.5 focus:ring-luxury-gold',
        secondary: 'bg-transparent border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-luxury-dark focus:ring-luxury-gold',
        tertiary: 'bg-transparent text-luxury-gold hover:text-luxury-gold-dark focus:ring-luxury-gold',
        danger: 'bg-luxury-burgundy text-white hover:bg-luxury-burgundy-dark focus:ring-luxury-burgundy',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-7 py-3 text-sm',
        lg: 'px-10 py-4 text-base',
        full: 'w-full px-7 py-3 text-sm',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
