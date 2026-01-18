import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from || '/profile';

    const [form, setForm] = useState({ email: '', password: '' });
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
            await login(form.email, form.password);
            navigate(redirectTo, { replace: true });
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-luxury-dark px-4 on-dark">
            <div className="w-full max-w-md bg-luxury-darker border border-luxury-gold/20 rounded-2xl p-8 shadow-xl">
                <h1 className="text-3xl font-playfair text-luxury-gold mb-2">Welcome back</h1>
                <p className="text-sm text-luxury-cream/80 mb-6">Sign in to manage your bookings and orders.</p>

                {error && (
                    <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
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
                        <label className="block text-sm text-luxury-cream mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                            className="w-full rounded-lg bg-black/30 border border-luxury-gold/20 px-4 py-2 text-white focus:outline-none focus:border-luxury-gold"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-luxury-gold text-luxury-dark font-semibold py-2 transition hover:opacity-90 disabled:opacity-70"
                    >
                        {loading ? 'Signing in...' : 'Sign in'}
                    </button>
                </form>

                <p className="text-sm text-luxury-cream/70 mt-6">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-luxury-gold hover:underline">
                        Create one
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
