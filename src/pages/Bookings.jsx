import { useEffect, useState } from 'react';
import bookingService from '../services/bookingService';
import restaurantService from '../services/restaurantService';

const Bookings = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        restaurant: '',
        numberOfGuests: 2,
        bookingDate: '',
        bookingTime: '',
        phoneNumber: '',
        email: '',
        specialRequests: ''
    });

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

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await bookingService.createBooking(form);
            setMessage('Booking request sent!');
            setForm((prev) => ({
                ...prev,
                numberOfGuests: 2,
                bookingDate: '',
                bookingTime: '',
                specialRequests: ''
            }));
        } catch (err) {
            setError(err.message || 'Failed to create booking');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
            <div className="max-w-4xl mx-auto bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Book a table</h1>
                <p className="text-sm text-luxury-cream/80 mb-6">Reserve your next fine dining experience.</p>

                {message && (
                    <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                        <label className="block text-sm text-luxury-cream mb-1">Restaurant</label>
                        <select
                            name="restaurant"
                            value={form.restaurant}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        >
                            <option value="">Select a restaurant</option>
                            {restaurants.map((restaurant) => (
                                <option key={restaurant._id} value={restaurant._id}>
                                    {restaurant.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm text-luxury-cream mb-1">Guests</label>
                        <input
                            type="number"
                            name="numberOfGuests"
                            min={1}
                            value={form.numberOfGuests}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-luxury-cream mb-1">Date</label>
                        <input
                            type="date"
                            name="bookingDate"
                            value={form.bookingDate}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-luxury-cream mb-1">Time</label>
                        <input
                            type="time"
                            name="bookingTime"
                            value={form.bookingTime}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-luxury-cream mb-1">Phone</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-luxury-cream mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm text-luxury-cream mb-1">Special requests</label>
                        <textarea
                            name="specialRequests"
                            value={form.specialRequests}
                            onChange={handleChange}
                            rows={4}
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 w-full rounded-lg bg-luxury-gold text-luxury-dark font-semibold py-2 transition hover:opacity-90 disabled:opacity-70"
                    >
                        {loading ? 'Submitting...' : 'Request booking'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Bookings;
