import { useState } from 'react';
import contactService from '../services/contactService';

const Contact = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            await contactService.submitContact(form);
            setMessage('Message sent. We will reach out shortly.');
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (err) {
            setError(err.message || 'Failed to send message');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.2fr_1fr]">
                <div className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                    <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Contact us</h1>
                    <p className="text-sm text-luxury-cream/80 mb-6">We’re here to help with reservations, partnerships, or feedback.</p>

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

                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm text-luxury-cream mb-1">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                                />
                            </div>
                            <div>
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
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Message</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                                required
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-luxury-gold text-luxury-dark font-semibold py-2 transition hover:opacity-90 disabled:opacity-70"
                        >
                            {loading ? 'Sending...' : 'Send message'}
                        </button>
                    </form>
                </div>

                <aside className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-playfair text-luxury-gold mb-4">Visit us</h2>
                    <p className="text-sm text-luxury-cream/80">The Restro Restaurant</p>
                    <p className="text-sm text-luxury-cream/70">123 Foodie Street, Gourmet City, India</p>
                    <div className="mt-6 text-sm text-luxury-cream/80 space-y-2">
                        <p><span className="text-luxury-gold">Phone:</span> +91 98765 43210</p>
                        <p><span className="text-luxury-gold">Email:</span> info@restro.com</p>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default Contact;
