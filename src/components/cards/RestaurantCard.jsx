import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, Badge } from '../ui';

const RestaurantCard = ({
    id,
    name,
    cuisine,
    image,
    rating,
    reviews,
    deliveryTime,
    description,
    delay = 0
}) => {
    return (
        <Card className="overflow-hidden group cursor-pointer" delay={delay}>
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden bg-luxury-cream">
                <motion.img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                {/* Info Badge */}
                <div className="absolute top-4 right-4">
                    <Badge variant="primary" className="backdrop-blur">
                        {cuisineType || 'Featured'}
                    </Badge>
                </div>

                {/* Quick Info */}
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Link
                        to={`/menu/${id}`}
                        className="inline-block bg-luxury-gold text-luxury-dark font-bold px-6 py-2 rounded text-sm hover:shadow-lg transition-all duration-300"
                    >
                        View Menu →
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-playfair text-h4 text-luxury-text-dark mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                    {name}
                </h3>

                <p className="text-xs font-bold text-luxury-gold tracking-widest uppercase mb-3">
                    {cuisine}
                </p>

                <p className="text-sm text-luxury-text-muted italic mb-4 line-clamp-2">
                    {description}
                </p>

                {/* Rating and Meta */}
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <span className="text-luxury-gold font-bold">★ {rating}</span>
                        <span className="text-luxury-text-muted">({reviews} reviews)</span>
                    </div>
                    <span className="text-luxury-text-muted text-xs">
                        {deliveryTime} min
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default RestaurantCard;
