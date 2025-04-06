import React from 'react';
import Navbar from './Navbar';
import './ComingSoon.css';

const Bookings = () => {
    return (
        <>
            <Navbar />
            <div className="coming-soon-container">
                <h1>Bookings</h1>
                <p className="soon-text">🚧 This feature is coming soon. Stay tuned! 🚀</p>
            </div>
        </>
    );
};

export default Bookings;
