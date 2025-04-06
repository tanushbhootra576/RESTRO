import React from 'react';
import Navbar from './Navbar';
import './ComingSoon.css';

const Coupons = () => {
    return (
        <>
            <Navbar />
            <div className="coming-soon-container">
                <h1>Offer Coupons</h1>
                <p className="soon-text">🎁 Amazing deals are on their way. Coming soon! 🛍️</p>
            </div>
        </>
    );
};

export default Coupons;
