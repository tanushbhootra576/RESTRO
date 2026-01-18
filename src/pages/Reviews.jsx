import { useEffect, useState } from 'react';
import restaurantService from '../services/restaurantService';
import reviewService from '../services/reviewService';

const Reviews = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        restaurant: '',
        rating: 5,
        title: '',
        comment: ''
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

    useEffect(() => {
        const loadReviews = async () => {
            if (!form.restaurant) return;
            try {
                const response = await reviewService.getReviews(form.restaurant);
                setReviews(response?.data?.reviews || []);
            } catch (err) {
                setError(err.message || 'Failed to load reviews');
            }
        };

        loadReviews();
    }, [form.restaurant]);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await reviewService.createReview(form);
            setMessage('Thanks for your review!');
            setForm((prev) => ({ ...prev, title: '', comment: '' }));
            const response = await reviewService.getReviews(form.restaurant);
            setReviews(response?.data?.reviews || []);
        } catch (err) {
            setError(err.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                <div className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                    <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Share your review</h1>
                    <p className="text-sm text-luxury-cream/80 mb-6">Help others discover their next favorite dish.</p>

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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
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
                            <label className="block text-sm text-luxury-cream mb-1">Rating</label>
                            <input
                                type="number"
                                name="rating"
                                min={1}
                                max={5}
                                value={form.rating}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Comment</label>
                            <textarea
                                name="comment"
                                value={form.comment}
                                onChange={handleChange}
                                rows={4}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-luxury-gold text-luxury-dark font-semibold py-2 transition hover:opacity-90 disabled:opacity-70"
                        >
                            {loading ? 'Submitting...' : 'Submit review'}
                        </button>
                    </form>
                </div>

                <aside className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-playfair text-luxury-gold mb-4">Recent reviews</h2>
                    <div className="space-y-4">
                        {reviews.length === 0 && (
                            <p className="text-sm text-luxury-cream/70">Select a restaurant to view reviews.</p>
                        )}
                        {reviews.map((review) => (
                            <div key={review._id} className="border border-luxury-gold/10 rounded-xl p-4">
                                <p className="text-sm text-luxury-cream/70">{review.user?.firstName} {review.user?.lastName}</p>
                                <p className="text-luxury-cream font-semibold">{review.title || 'Customer Review'}</p>
                                <p className="text-sm text-luxury-cream/80 mt-2">{review.comment}</p>
                                <p className="text-xs text-luxury-gold mt-2">Rating: {review.rating}/5</p>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Reviews;
