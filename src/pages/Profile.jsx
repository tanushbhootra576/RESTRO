import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import userService from '../services/userService';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setForm({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                address: {
                    street: user.address?.street || '',
                    city: user.address?.city || '',
                    state: user.address?.state || '',
                    zipCode: user.address?.zipCode || '',
                    country: user.address?.country || ''
                }
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const key = name.split('.')[1];
            setForm((prev) => ({
                ...prev,
                address: { ...prev.address, [key]: value }
            }));
            return;
        }
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');
        try {
            const response = await userService.updateProfile(form);
            if (response?.data?.user) {
                updateUser(response.data.user);
            }
            setMessage('Profile updated successfully');
        } catch (err) {
            setError(err.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] bg-luxury-dark px-4 py-12 on-dark">
            <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1fr_2fr]">
                <aside className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-2xl font-playfair text-luxury-gold mb-2">My Profile</h2>
                    <p className="text-sm text-luxury-cream/70">Manage your personal details and preferences.</p>

                    <div className="mt-6 space-y-2 text-luxury-cream/80 text-sm">
                        <p><span className="text-luxury-gold">Name:</span> {user?.firstName} {user?.lastName}</p>
                        <p><span className="text-luxury-gold">Email:</span> {user?.email}</p>
                        <p><span className="text-luxury-gold">Role:</span> {user?.role}</p>
                    </div>
                </aside>

                <div className="bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xl font-playfair text-luxury-gold mb-4">Update details</h3>

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
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
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
                            <label className="block text-sm text-luxury-cream mb-1">Street</label>
                            <input
                                type="text"
                                name="address.street"
                                value={form.address.street}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">City</label>
                            <input
                                type="text"
                                name="address.city"
                                value={form.address.city}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">State</label>
                            <input
                                type="text"
                                name="address.state"
                                value={form.address.state}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Zip code</label>
                            <input
                                type="text"
                                name="address.zipCode"
                                value={form.address.zipCode}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-luxury-cream mb-1">Country</label>
                            <input
                                type="text"
                                name="address.country"
                                value={form.address.country}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="md:col-span-2 w-full rounded-lg bg-luxury-gold text-luxury-dark font-semibold py-2 transition hover:opacity-90 disabled:opacity-70"
                        >
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Profile;
