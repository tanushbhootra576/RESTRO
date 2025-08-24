import { useMemo } from 'react';
import "./TopPicks.css";
import { getRandomTopPicks } from '../utils/topPicks';

const TopPicks = () => {
    // Memoize so random picks only change on mount
    const items = useMemo(() => getRandomTopPicks(8), []);
    return (
        <div id="famous" style={{ marginTop: 20 }}>
            <div id="famhead" style={{ textAlign: 'center', backgroundColor: 'black', color: 'white' }}>TOP PICKS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                {items.map((item, idx) => (
                    <div key={idx} className="card">
                        <div style={{ display: 'flex' }}>
                            <img src={item.img} className="img" alt={item.name} />
                            <h4 className="itemname" style={{ fontSize: 28 }}>{item.name}</h4>
                        </div>
                        <p className="info">The top choice among all our customers, delicious, healthy and a part of an amazing meal!</p>
                        <div className="rating" style={{ display: 'flex', alignItems: 'center', marginLeft: 25, marginTop: 9 }}>
                            {/* Render filled and empty stars based on item.rate (out of 5) */}
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i} style={{ color: i < Math.round(item.rate) ? '#FFD700' : '#ccc', fontSize: 24, marginRight: 2 }}>
                                    ★
                                </span>
                            ))}
                            <div style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 16 }}>{item.rate}/5</div>
                        </div>
                        <div style={{ display: 'flex', marginTop: 20, marginLeft: 20, width: '90%', height: 47 }}>
                            <div className="amt">₹ {item.price}</div>
                            <button id="addtocart" onClick={() => alert('Item has been added to the bag')}>ADD TO CART</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopPicks;
