import React from 'react';
import { motion } from 'framer-motion';

const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    error = null,
    label = '',
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-semibold text-luxury-text-dark mb-2">
                    {label}
                </label>
            )}
            <motion.input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-3 bg-white border-2 border-luxury-border rounded text-luxury-text-dark font-montserrat text-sm focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold focus:ring-opacity-10 transition-all duration-300 ${error ? 'border-luxury-burgundy' : ''} ${className}`}
                {...props}
            />
            {error && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-luxury-burgundy text-xs mt-1 font-semibold"
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default Input;
