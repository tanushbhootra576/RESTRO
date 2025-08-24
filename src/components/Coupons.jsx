
import Navbar from './Navbar';
import './ComingSoon.css';
import { FESTIVALS_BY_YEAR } from '../utils/festivals';



function getTodayFestival() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const yearFestivals = FESTIVALS_BY_YEAR[year] || [];
    return yearFestivals.find(f => f.month === month && f.day === day);
}

function generateCouponCode(festivalName) {
    // 6-letter code: 3 from festival + 3 random uppercase letters
    const prefix = festivalName.replace(/[^A-Za-z]/g, '').toUpperCase().slice(0, 3);
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 3; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return (prefix + code).slice(0, 6);
}

const Coupons = () => {
    const festival = getTodayFestival();
    let coupon = null;
    if (festival) {
        coupon = generateCouponCode(festival.name);
    }
    return (
        <>
            <Navbar />
            <div className="coming-soon-container">
                <h1>Offer Coupons</h1>
                {festival ? (
                    <div style={{ marginTop: 40 }}>
                        <h2 style={{ color: '#388e3c' }}>Happy {festival.name}!</h2>
                        <p className="soon-text">Use this festive coupon code:</p>
                        <div style={{ fontSize: 32, fontWeight: 'bold', letterSpacing: 2, color: '#ff5722', margin: '20px 0' }}>{coupon}</div>
                        <p style={{ color: '#555' }}>Apply at checkout to get your special festival discount!</p>
                    </div>
                ) : (
                    <p className="soon-text">🎁 Amazing deals are on their way. Coming soon! 🛍️</p>
                )}
            </div>
        </>
    );
};

export default Coupons;
