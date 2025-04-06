import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
    return (
        <div id="menubar">
            <button id="special" style={{ width: 350 }}></button>
            <Link to="/" className="menu">HOME</Link>
            <Link to="/menu" className="menu">MENU</Link>
            <Link to="/contact" className="menu">CONTACT</Link>
            <Link to="/services" className="menu">SERVICES</Link>
            <Link to="/bookings" className="menu">BOOKINGS</Link>
            <Link to="/coupons" className="menu">OFFER COUPONS</Link>
        </div>
    );
};

export default Navbar;
