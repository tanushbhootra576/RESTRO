import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./TopPicks.css";
import menuService from '../services/menuService';
import { useCart } from '../context/CartContext';
import { useAuth } from '../hooks/useAuth';

const TopPicks = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchTopPicks = async () => {
            try {
                const response = await menuService.getMenuItems();
                const allItems = response?.data?.menuItems || [];
                const shuffled = [...allItems].sort(() => 0.5 - Math.random());
                setItems(shuffled.slice(0, 8));
            } catch (error) {
                setItems([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTopPicks();
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
        <div id="famous" className="top-picks">
            <div id="famhead" className="top-picks-title">Top Picks</div>
            <div className="top-picks-grid">
                {loading && <p className="top-picks-loading">Loading top picks...</p>}
                {!loading && items.map((item) => (
                    <div key={item._id} className="top-pick-card">
                        <div className="top-pick-header">
                            <img src={item.image || '/images/dish.png'} className="top-pick-img" alt={item.name} />
                            <h4 className="top-pick-name">{item.name}</h4>
                        </div>
                        <p className="top-pick-info">{item.description || 'Signature chef selection crafted for discerning diners.'}</p>
                        <div className="top-pick-footer">
                            <div className="top-pick-amt">₹{item.price}</div>
                            <button className="top-pick-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPicks;
