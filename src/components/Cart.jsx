import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const cartItems = Array.isArray(cart?.items) ? cart.items : [];
    const total = cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? item.qty ?? 0), 0);

    return (
        <>
            <div className="cart-container">
                <h2 className="cart-title">Your Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                        <Link to="/menu" className="back-btn">Browse Menu</Link>
                    </div>
                ) : (
                    <>
                        <ul className="cart-list">
                            {cartItems.map((item) => (
                                <li key={item.menuItem?._id || item.name} className="cart-item">
                                    <img src={item.menuItem?.image || '/images/dish.png'} alt={item.menuItem?.name || item.name} className="cart-img" />
                                    <div className="cart-info">
                                        <div className="cart-name">{item.menuItem?.name || item.name}</div>
                                        <div className="cart-meta">
                                            ₹{item.price} × {item.quantity ?? item.qty ?? 0}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.menuItem?._id || item.menuItem)}
                                        className="remove-btn"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-summary">
                            <div className="cart-total">
                                <span>Total:</span>
                                <strong>₹{total}</strong>
                            </div>
                            <div className="cart-actions">
                                <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                                <Link to="/menu" className="continue-link">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Cart;
