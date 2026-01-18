import React, { createContext, useContext, useEffect, useState } from 'react';
import cartService from '../services/cartService';
import { useAuth } from '../hooks/useAuth';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { isAuthenticated } = useAuth();
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await cartService.getCart();
            setCart(response?.data?.cart || { items: [] });
        } catch (error) {
            setCart({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        } else {
            setCart({ items: [] });
        }
    }, [isAuthenticated]);

    const addToCart = async (item) => {
        const response = await cartService.addToCart(item);
        setCart(response?.data?.cart || { items: [] });
        return response;
    };

    const removeFromCart = async (menuItemId) => {
        const response = await cartService.removeFromCart(menuItemId);
        setCart(response?.data?.cart || { items: [] });
        return response;
    };

    const clearCart = async () => {
        await cartService.clearCart();
        setCart({ items: [] });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                removeFromCart,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
