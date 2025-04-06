import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <Navbar />
            <div className="page">
                <h1>404 - Page Not Found</h1>
                <p>The page you're looking for doesn't exist.</p>
                <Link to="/" className="menu">Go Back Home</Link>
            </div>
        </>
    );
};

export default NotFound;
