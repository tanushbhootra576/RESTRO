import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import { useCart } from '../context/CartContext';
import orderService from '../services/orderService';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const cartItems = useMemo(() => (Array.isArray(cart?.items) ? cart.items : []), [cart?.items]);

    const total = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.price * (item.quantity ?? item.qty ?? 0), 0),
        [cartItems]
    );

    const restaurantId = cart?.restaurant || cartItems[0]?.menuItem?.restaurant || cartItems[0]?.restaurant;

    const [orderType, setOrderType] = useState('pickup');
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'India'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const addressValid = orderType !== 'delivery' || (address.street && address.city);

    const mapPaymentMethod = (method) => {
        switch (method) {
            case 'upi':
                return 'upi';
            case 'wallet':
                return 'wallet';
            case 'cod':
                return 'cash';
            case 'debit_card':
            case 'credit_card':
            default:
                return 'card';
        }
    };

    const handlePaymentSuccess = async (paymentResult) => {
        setError('');
        setSuccess('');

        if (!restaurantId) {
            setError('Restaurant information is missing. Please refresh your cart.');
            return;
        }

        if (!addressValid) {
            setError('Please provide your delivery address to continue.');
            return;
        }

        try {
            setIsSubmitting(true);
            const orderItems = cartItems.map((item) => ({
                menuItem: item.menuItem?._id || item.menuItem || item._id,
                quantity: item.quantity ?? item.qty ?? 1,
                price: item.price
            }));

            const paymentMethod = mapPaymentMethod(paymentResult?.method);

            await orderService.createOrder({
                restaurant: restaurantId,
                items: orderItems,
                totalAmount: total,
                discountAmount: 0,
                deliveryCharge: 0,
                tax: 0,
                finalAmount: total,
                orderType,
                deliveryAddress: orderType === 'delivery' ? address : undefined,
                paymentMethod,
                notes: paymentResult?.transactionId ? `Payment ${paymentResult.transactionId}` : undefined
            });

            await clearCart();
            setSuccess('Order placed successfully.');
        } catch (err) {
            setError(err.message || 'Failed to place order');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
                <div className="max-w-3xl mx-auto bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl text-center">
                    <h1 className="text-2xl font-playfair text-luxury-gold mb-2">Your cart is empty</h1>
                    <p className="text-sm text-luxury-cream/80 mb-6">Add some delicious items before checking out.</p>
                    <Link
                        to="/menu"
                        className="inline-flex items-center justify-center rounded-lg bg-luxury-gold text-luxury-dark font-semibold px-6 py-2"
                    >
                        Browse Menu
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_1fr]">
                <div className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                    <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Checkout</h1>
                    <p className="text-sm text-luxury-cream/80 mb-6">Confirm your order details before payment.</p>

                    {error && (
                        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200">
                            {success}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Order type</label>
                            <select
                                value={orderType}
                                onChange={(e) => setOrderType(e.target.value)}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            >
                                <option value="pickup">Pickup</option>
                                <option value="delivery">Delivery</option>
                                <option value="dine-in">Dine-in</option>
                            </select>
                        </div>

                        {orderType === 'delivery' && (
                            <div className="grid gap-4 md:grid-cols-2">
                                <input
                                    type="text"
                                    placeholder="Street"
                                    value={address.street}
                                    onChange={(e) => setAddress((prev) => ({ ...prev, street: e.target.value }))}
                                    className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                                />
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={address.city}
                                    onChange={(e) => setAddress((prev) => ({ ...prev, city: e.target.value }))}
                                    className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                                />
                                <input
                                    type="text"
                                    placeholder="State"
                                    value={address.state}
                                    onChange={(e) => setAddress((prev) => ({ ...prev, state: e.target.value }))}
                                    className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                                />
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={address.zipCode}
                                    onChange={(e) => setAddress((prev) => ({ ...prev, zipCode: e.target.value }))}
                                    className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                                />
                            </div>
                        )}

                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/cart')}
                                className="text-luxury-gold hover:underline"
                            >
                                ← Back to cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-8 shadow-xl">
                    {isSubmitting ? (
                        <div className="text-center text-luxury-text-muted">Placing your order...</div>
                    ) : (
                        <>
                            {!addressValid && (
                                <div className="mb-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm text-amber-700">
                                    Enter your delivery address to continue with payment.
                                </div>
                            )}
                            {addressValid && (
                                <PaymentForm
                                    amount={total}
                                    onSuccess={handlePaymentSuccess}
                                    onCancel={() => navigate('/cart')}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Checkout;
