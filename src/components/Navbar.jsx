import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import "./Navbar.css";

const CartIcon = ({ size = 22 }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
    >
        <circle cx="9" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2 3h2l2.4 12.1a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" />
    </svg>
);

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { cart } = useCart();
    const cartCount = cart.items ? cart.items.reduce((sum, item) => sum + item.qty, 0) : 0;

    return (
        <nav id="menubar">


            <Link to="/" >  <button id="special" style={{ width: 200 }}></button></Link>

            {/* Desktop Links */}
            <div className="nav-links hide-mobile">
                <Link to="/" className="menu">HOME</Link>
                <Link to="/menu" className="menu">MENU</Link>
                <Link to="/contact" className="menu">CONTACT</Link>
                <Link to="/services" className="menu">SERVICES</Link>
                <Link to="/bookings" className="menu">BOOKINGS</Link>
                <Link to="/coupons" className="menu">OFFER COUPONS</Link>

                {/* Cart link (desktop) */}
                <Link to="/cart" className="menu cart-link" style={{ position: 'relative', marginLeft: 12 }}>
                    <CartIcon size={22} />
                    {cartCount > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: -6,
                            right: -8,
                            background: '#ff7043',
                            color: '#fff',
                            borderRadius: '50%',
                            fontSize: 12,
                            width: 20,
                            height: 20,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700
                        }}>
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setOpen(!open)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </button>

            {/* Mobile Menu */}
            {open && (
                <div className="mobile-menu">
                    <Link to="/" className="menu" onClick={() => setOpen(false)}>HOME</Link>
                    <Link to="/menu" className="menu" onClick={() => setOpen(false)}>MENU</Link>
                    <Link to="/contact" className="menu" onClick={() => setOpen(false)}>CONTACT</Link>
                    <Link to="/services" className="menu" onClick={() => setOpen(false)}>SERVICES</Link>
                    <Link to="/bookings" className="menu" onClick={() => setOpen(false)}>BOOKINGS</Link>
                    <Link to="/coupons" className="menu" onClick={() => setOpen(false)}>OFFER COUPONS</Link>

                    {/* Cart link (mobile) */}
                    <Link to="/cart" className="menu" onClick={() => setOpen(false)} style={{ position: 'relative' }}>
                        <CartIcon size={22} />
                        {cartCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: -6,
                                right: -8,
                                background: '#ff7043',
                                color: '#fff',
                                borderRadius: '50%',
                                fontSize: 12,
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700
                            }}>
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
