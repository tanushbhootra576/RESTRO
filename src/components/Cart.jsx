import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Cart.css';

const Cart = () => {
    const { cart, dispatch } = useCart();
    const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            <Navbar />
            <div className="cart-container">
                <h2 className="cart-title">Your Shopping Cart</h2>

                {cart.items.length === 0 ? (
                    <div className="empty-cart">
                        <p>Your cart is empty.</p>
                        <Link to="/menu" className="back-btn">Browse Menu</Link>
                    </div>
                ) : (
                    <>
                        <ul className="cart-list">
                            {cart.items.map((item) => (
                                <li key={item.name} className="cart-item">
                                    <img src={item.image} alt={item.name} className="cart-img" />
                                    <div className="cart-info">
                                        <div className="cart-name">{item.name}</div>
                                        <div className="cart-meta">
                                            ₹{item.price} × {item.qty}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item })}
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
                                <button className="checkout-btn">Proceed to Checkout</button>
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
