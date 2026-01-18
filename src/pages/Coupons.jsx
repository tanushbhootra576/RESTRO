import { useEffect, useState } from 'react';
import couponService from '../services/couponService';
import restaurantService from '../services/restaurantService';

const Coupons = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [restaurant, setRestaurant] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRestaurants = async () => {
            try {
                const response = await restaurantService.getAllRestaurants();
                setRestaurants(response?.data?.restaurants || []);
            } catch (err) {
                setError(err.message || 'Failed to load restaurants');
            }
        };

        loadRestaurants();
    }, []);

    useEffect(() => {
        const loadCoupons = async () => {
            try {
                const response = await couponService.getCoupons(restaurant || null);
                setCoupons(response?.data?.coupons || []);
            } catch (err) {
                setError(err.message || 'Failed to load coupons');
            }
        };

        loadCoupons();
    }, [restaurant]);

    return (
        <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
            <div className="max-w-5xl mx-auto bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Available coupons</h1>
                <p className="text-sm text-luxury-cream/80 mb-6">Apply premium offers to your next order.</p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <div className="mb-6">
                    <label className="block text-sm text-luxury-cream mb-1">Filter by restaurant</label>
                    <select
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                    >
                        <option value="">All restaurants</option>
                        {restaurants.map((rest) => (
                            <option key={rest._id} value={rest._id}>
                                {rest.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {coupons.length === 0 && (
                        <p className="text-sm text-luxury-cream/70">No active coupons at the moment.</p>
                    )}
                    {coupons.map((coupon) => (
                        <div key={coupon._id} className="border border-luxury-gold/10 rounded-xl p-4">
                            <h3 className="text-luxury-gold font-semibold">{coupon.code}</h3>
                            <p className="text-sm text-luxury-cream/70">{coupon.description || 'Exclusive dining offer'}</p>
                            <p className="text-sm text-luxury-cream/80 mt-2">Type: {coupon.discountType}</p>
                            <p className="text-sm text-luxury-cream/80">Value: {coupon.discountValue}</p>
                            <p className="text-xs text-luxury-cream/60 mt-2">Valid until {new Date(coupon.endDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Coupons;
