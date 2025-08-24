import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import './Menu.css';
import chocolates from '../menu/chocolates.json';
import desserts from '../menu/desserts.json';
import drinks from '../menu/drinks.json';
import iceCream from '../menu/ice-cream.json';

const Menu = () => {
    const { dispatch } = useCart();

    // Combine all menu items from all categories into a single array
    // Add a category prefix to each id to ensure uniqueness
    const allMenuItems = [
        ...chocolates.map(item => ({ ...item, _category: 'chocolates', _uniqueId: `chocolates-${item.id}` })),
        ...desserts.map(item => ({ ...item, _category: 'desserts', _uniqueId: `desserts-${item.id}` })),
        ...drinks.map(item => ({ ...item, _category: 'drinks', _uniqueId: `drinks-${item.id}` })),
        ...iceCream.map(item => ({ ...item, _category: 'iceCream', _uniqueId: `iceCream-${item.id}` })),
    ];
    return (
        <div>
            <Navbar />
            <div className="menu-container">
                <h1 className="menu-title">Our Menu</h1>
                <div className="menu-list">
                    {allMenuItems.map((item) => (
                        <div className="menu-card" key={item._uniqueId}>
                            <img src={item.img} alt={item.name} className="menu-img" />
                            <div className="menu-info">
                                <h2>{item.name}</h2>
                                <p>{item.dsc}</p>
                                <div className="menu-bottom">
                                    <span className="menu-price">₹{item.price}</span>
                                    <button
                                        className="add-btn"
                                        onClick={() =>
                                            dispatch({
                                                type: 'ADD_TO_CART',
                                                payload: {
                                                    ...item,
                                                    price: parseInt(item.price),
                                                },
                                            })
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


// Utility to get 8 random menu items for TopPicks

export function getRandomTopPicks(count = 8) {
    const shuffled = [...menuItems].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

export default Menu;
