import React from 'react';
import "./TopPicks.css";
const items = [
    {
        name: 'Red Lentil Curry',
        price: 275,
        img: '../public/images/1.png'
    },
    {
        name: 'Kadhi Pakora',
        price: 245,
        img: '../public/images/2.png'
    },
    {
        name: 'Mali Kesar Ghevar',
        price: 275,
        img: '../public/images/3.png'
    }
];

const TopPicks = () => {
    return (
        <div id="famous" style={{ marginTop: 20 }}>
            <div id="famhead" style={{ textAlign: 'center', backgroundColor: 'black', color: 'white' }}>TOP PICK's</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
                {items.map((item, idx) => (
                    <div key={idx} className="card">
                        <div style={{ display: 'flex' }}>
                            <img src={item.img} className="img" alt={item.name} />
                            <h4 className="itemname" style={{ fontSize: 28 }}>{item.name}</h4>
                        </div>
                        <p className="info">The top choice among all our customers, delicious, healthy and a part of an amazing meal!</p>
                        <div className="rating" style={{ display: 'flex', marginLeft: 25, marginTop: 9 }}>
                            <img src="/assets/r1.png" alt="Rating" style={{ height: 30 }} />
                            <div style={{ marginTop: 10, marginLeft: 14 }}><b>4.5/5 Overall customer ratings</b></div>
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
