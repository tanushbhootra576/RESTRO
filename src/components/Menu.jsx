import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';
import menuService from '../services/menuService';
import './Menu.css';

const Menu = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await menuService.getMenuItems();
                setMenuItems(response?.data?.menuItems || []);
            } catch (err) {
                setError(err.message || 'Failed to load menu');
            } finally {
                setLoading(false);
            }
        };

        fetchMenu();
    }, []);

    const handleAddToCart = async (item) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: '/menu' } });
            return;
        }

        const restaurantId = item.restaurant?._id || item.restaurant;

        await addToCart({
            restaurant: restaurantId,
            menuItem: item._id,
            quantity: 1
        });
    };
    return (
        <div className="menu-container">
            <h1 className="menu-title">Our Menu</h1>
            {error && <p className="text-red-400 text-center mb-4">{error}</p>}
            {loading ? (
                <div className="text-center text-luxury-gold">Loading menu...</div>
            ) : (
                <div className="menu-list">
                    {menuItems.map((item) => {
                        const isAvailable = item.availability !== false;
                        return (
                            <div className="menu-card" key={item._id}>
                                <img src={item.image || '/images/dish.png'} alt={item.name} className="menu-img" />
                                <div className="menu-info">
                                    <h2>{item.name}</h2>
                                    <p>{item.description}</p>
                                    <div className="menu-bottom">
                                        <span className="menu-price">₹{item.price}</span>
                                        <button
                                            className={`add-btn${!isAvailable ? ' opacity-60 cursor-not-allowed' : ''}`}
                                            onClick={() => handleAddToCart(item)}
                                            disabled={!isAvailable}
                                        >
                                            {isAvailable ? 'Add to Cart' : 'Out of Stock'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Menu;
