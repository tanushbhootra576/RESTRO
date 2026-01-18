import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from '../ui';
import { useCart } from '../../context/CartContext';

const MenuCard = ({
    id,
    name,
    description,
    price,
    image,
    category,
    rating = 4.5,
    reviews = 0,
    delay = 0
}) => {
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            id,
            name,
            price,
            image,
            quantity,
        });
        setQuantity(1);
    };

    return (
        <Card
            className="overflow-hidden group h-full flex flex-col"
            delay={delay}
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-luxury-cream">
                <motion.img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                    <Badge variant="primary">{category}</Badge>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 backdrop-blur px-3 py-1 rounded text-luxury-gold text-xs font-bold flex items-center gap-1">
                    <span>★</span>
                    <span>{rating}</span>
                    {reviews > 0 && <span className="text-luxury-text-muted">({reviews})</span>}
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-playfair text-h4 text-luxury-text-dark mb-1 group-hover:text-luxury-gold transition-colors duration-300">
                    {name}
                </h3>

                <p className="text-sm text-luxury-text-muted italic flex-1 mb-4">
                    {description}
                </p>

                {/* Price and Controls */}
                <div className="flex items-center justify-between gap-3">
                    <div className="text-h3 font-playfair text-luxury-gold font-bold">
                        ${price.toFixed(2)}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 border border-luxury-border rounded">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-2 py-1 text-luxury-gold hover:bg-luxury-cream transition-colors"
                        >
                            -
                        </button>
                        <span className="px-2 font-semibold text-luxury-text-dark">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-2 py-1 text-luxury-gold hover:bg-luxury-cream transition-colors"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddToCart}
                    className="w-full mt-4"
                >
                    Add to Cart
                </Button>
            </div>
        </Card>
    );
};

export default MenuCard;
