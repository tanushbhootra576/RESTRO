import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is logged in on mount
    useEffect(() => {
        const initAuth = async () => {
            const accessToken = localStorage.getItem('accessToken');

            if (accessToken) {
                try {
                    const response = await authService.getCurrentUser();
                    if (response.success) {
                        setUser(response.data.user);
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.error('Failed to fetch user:', error);
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                }
            }

            setLoading(false);
        };

        initAuth();
    }, []);

    const register = async (userData) => {
        try {
            const response = await authService.register(userData);
            if (response.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return response;
            }
        } catch (error) {
            throw error;
        }
    };

    const login = async (email, password) => {
        try {
            const response = await authService.login(email, password);
            if (response.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return response;
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        register,
        login,
        logout,
        updateUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
