import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Register = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(form);
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-luxury-dark px-4 on-dark">
            <div className="w-full max-w-lg bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Create your account</h1>
                <p className="text-sm text-luxury-cream/80 mb-6">Join Restro and unlock premium dining experiences.</p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-luxury-cream mb-1">First name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            autoComplete="given-name"
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
                            required
                            autoComplete="family-name"
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
                            autoComplete="email"
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
                            autoComplete="tel"
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-luxury-cream mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                            autoComplete="new-password"
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="md:col-span-2 w-full rounded-lg bg-luxury-gold text-luxury-dark font-semibold py-2 transition hover:opacity-90 disabled:opacity-70"
                    >
                        {loading ? 'Creating account...' : 'Create account'}
                    </button>
                </form>

                <p className="text-sm text-luxury-cream/70 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-luxury-gold hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Register;
