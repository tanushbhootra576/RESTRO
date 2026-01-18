import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const normalizeRole = (role) => {
    if (!role) return role;
    const normalized = role.toLowerCase();
    if (normalized === 'restaurantowner' || normalized === 'restaurant_owner') {
        return 'owner';
    }
    if (normalized === 'administrator') {
        return 'admin';
    }
    return normalized;
};

const OwnerRoute = ({ children, allowAdmin = true }) => {
    const { isAuthenticated, loading, user } = useAuth();

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center text-luxury-gold">
                Loading...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const role = normalizeRole(user?.role);
    const isOwner = role === 'owner';
    const isAdmin = role === 'admin';

    if (!isOwner && !(allowAdmin && isAdmin)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default OwnerRoute;
