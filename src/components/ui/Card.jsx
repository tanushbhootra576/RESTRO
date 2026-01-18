import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    className = '',
    hover = true,
    delay = 0,
    ...props
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className={`bg-white rounded-lg border border-luxury-border shadow-card transition-all duration-300 ${hover ? 'hover:shadow-card-hover hover:border-luxury-gold hover:-translate-y-2' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
