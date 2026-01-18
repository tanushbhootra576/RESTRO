import Cart from '../models/Cart.js';
import MenuItem from '../models/MenuItem.js';
import { successResponse, errorResponse } from '../utils/responses.js';

export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId })
            .populate('restaurant', 'name')
            .populate('items.menuItem', 'name price');

        if (!cart) {
            return successResponse(res, 200, 'Cart is empty', { cart: null });
        }

        successResponse(res, 200, 'Cart fetched', { cart });
    } catch (error) {
        errorResponse(res, 500, 'Failed to fetch cart', error.message);
    }
};

export const addToCart = async (req, res) => {
    try {
        const { restaurant, menuItem, quantity, specialInstructions } = req.body;

        if (!restaurant || !menuItem || !quantity) {
            return errorResponse(res, 400, 'Please provide restaurant, menu item, and quantity');
        }

        // Get menu item details
        const item = await MenuItem.findById(menuItem);
        if (!item) {
            return errorResponse(res, 404, 'Menu item not found');
        }

        let cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            cart = await Cart.create({
                user: req.user.userId,
                restaurant,
                items: [{
                    menuItem,
                    quantity,
                    price: item.price,
                    specialInstructions
                }],
                totalAmount: item.price * quantity
            });
        } else {
            // Check if item already in cart
            const existingItem = cart.items.find(i => i.menuItem.toString() === menuItem);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({
                    menuItem,
                    quantity,
                    price: item.price,
                    specialInstructions
                });
            }

            // Recalculate total
            cart.totalAmount = cart.items.reduce((total, i) => total + (i.price * i.quantity), 0);
            await cart.save();
        }

        successResponse(res, 201, 'Item added to cart', { cart });
    } catch (error) {
        errorResponse(res, 500, 'Failed to add to cart', error.message);
    }
};

export const removeFromCart = async (req, res) => {
    try {
        const { itemId } = req.params;

        const cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            return errorResponse(res, 404, 'Cart not found');
        }

        cart.items = cart.items.filter(i => i.menuItem.toString() !== itemId);
        cart.totalAmount = cart.items.reduce((total, i) => total + (i.price * i.quantity), 0);

        await cart.save();

        successResponse(res, 200, 'Item removed from cart', { cart });
    } catch (error) {
        errorResponse(res, 500, 'Failed to remove from cart', error.message);
    }
};

export const clearCart = async (req, res) => {
    try {
        await Cart.deleteOne({ user: req.user.userId });

        successResponse(res, 200, 'Cart cleared');
    } catch (error) {
        errorResponse(res, 500, 'Failed to clear cart', error.message);
    }
};
