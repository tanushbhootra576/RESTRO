import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import authService from '../services/authService';
import dashboardService from '../services/dashboardService';
import restaurantService from '../services/restaurantService';
import './Dashboard.css';

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

const blankHours = {
    monday: { open: '', close: '' },
    tuesday: { open: '', close: '' },
    wednesday: { open: '', close: '' },
    thursday: { open: '', close: '' },
    friday: { open: '', close: '' },
    saturday: { open: '', close: '' },
    sunday: { open: '', close: '' }
};

const Dashboard = () => {
    const { user, updateUser } = useAuth();
    const location = useLocation();
    const role = normalizeRole(user?.role);
    const isAdmin = role === 'admin';

    const [activeTab, setActiveTab] = useState('menu');
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [restaurant, setRestaurant] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [adminRestaurantId, setAdminRestaurantId] = useState('');

    const restaurantId = useMemo(() => {
        if (isAdmin) return adminRestaurantId.trim();
        return user?.restaurant?._id || user?.restaurantId || user?.restaurant || '';
    }, [isAdmin, adminRestaurantId, user]);

    const [menuForm, setMenuForm] = useState({
        name: '',
        description: '',
        price: '',
        category: 'main',
        availability: true,
        image: ''
    });
    const [editingMenuId, setEditingMenuId] = useState(null);

    const [restaurantForm, setRestaurantForm] = useState({
        name: '',
        description: '',
        phone: '',
        email: '',
        website: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: ''
        },
        operatingHours: { ...blankHours }
    });

    const resetMessages = () => {
        setError('');
        setSuccess('');
    };

    const loadMenuItems = async () => {
        try {
            setLoading(true);
            resetMessages();
            if (!restaurantId && role !== 'admin') {
                setError('Restaurant profile missing. Please link your restaurant before managing menu items.');
                return;
            }
            const response = await dashboardService.getMenuItems(role, restaurantId || undefined);
            setMenuItems(response?.data?.menuItems || []);
        } catch (err) {
            setError(err.message || 'Failed to load menu items');
        } finally {
            setLoading(false);
        }
    };

    const loadOrders = async () => {
        try {
            setLoading(true);
            resetMessages();
            if (!restaurantId && role !== 'admin') {
                setError('Restaurant profile missing. Please link your restaurant before viewing orders.');
                return;
            }
            const response = await dashboardService.getOrders(role, restaurantId || undefined);
            setOrders(response?.data?.orders || []);
        } catch (err) {
            setError(err.message || 'Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const loadBookings = async () => {
        try {
            setLoading(true);
            resetMessages();
            if (!restaurantId && role !== 'admin') {
                setError('Restaurant profile missing. Please link your restaurant before viewing bookings.');
                return;
            }
            const response = await dashboardService.getBookings(role, restaurantId || undefined);
            setBookings(response?.data?.bookings || []);
        } catch (err) {
            setError(err.message || 'Failed to load bookings');
        } finally {
            setLoading(false);
        }
    };

    const loadRestaurant = async () => {
        try {
            setLoading(true);
            resetMessages();
            if (!restaurantId && role !== 'admin') {
                setRestaurant(null);
                return;
            }
            const response = await dashboardService.getRestaurant(role, restaurantId);
            const data = response?.data?.restaurant;
            setRestaurant(data || null);
            if (data) {
                setRestaurantForm({
                    name: data.name || '',
                    description: data.description || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    website: data.website || '',
                    address: {
                        street: data.address?.street || '',
                        city: data.address?.city || '',
                        state: data.address?.state || '',
                        zipCode: data.address?.zipCode || '',
                        country: data.address?.country || ''
                    },
                    operatingHours: data.operatingHours || { ...blankHours }
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to load restaurant details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const requestedTab = params.get('tab');
        if (requestedTab && ['menu', 'orders', 'bookings', 'settings'].includes(requestedTab)) {
            setActiveTab(requestedTab);
        }
    }, [location.search]);

    useEffect(() => {
        if (activeTab === 'menu') {
            loadMenuItems();
        }
        if (activeTab === 'orders') {
            loadOrders();
        }
        if (activeTab === 'bookings') {
            loadBookings();
        }
        if (activeTab === 'settings') {
            if (restaurantId) {
                loadRestaurant();
            } else if (!isAdmin) {
                setRestaurant(null);
            }
        }
    }, [activeTab, restaurantId]);

    const handleMenuChange = (event) => {
        const { name, value, type, checked } = event.target;
        setMenuForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleMenuSubmit = async (event) => {
        event.preventDefault();
        resetMessages();

        if (!menuForm.name || !menuForm.price) {
            setError('Name and price are required.');
            return;
        }

        if (!restaurantId && role !== 'admin') {
            setError('Restaurant profile missing. Please link your restaurant before adding menu items.');
            return;
        }

        if (isAdmin && !restaurantId) {
            setError('Restaurant ID is required for admin actions.');
            return;
        }

        try {
            setLoading(true);
            const payload = {
                ...menuForm,
                price: Number(menuForm.price),
                restaurantId: isAdmin ? restaurantId : undefined
            };

            if (editingMenuId) {
                await dashboardService.updateMenuItem(role, editingMenuId, payload);
                setSuccess('Menu item updated.');
            } else {
                await dashboardService.createMenuItem(role, payload);
                setSuccess('Menu item created.');
            }

            setMenuForm({
                name: '',
                description: '',
                price: '',
                category: 'main',
                availability: true,
                image: ''
            });
            setEditingMenuId(null);
            await loadMenuItems();
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save menu item');
        } finally {
            setLoading(false);
        }
    };

    const handleEditMenuItem = (item) => {
        setEditingMenuId(item._id);
        setMenuForm({
            name: item.name || '',
            description: item.description || '',
            price: item.price || '',
            category: item.category || 'main',
            availability: item.availability !== false,
            image: item.image || ''
        });
        setSuccess('');
        setError('');
    };

    const handleCancelEdit = () => {
        setEditingMenuId(null);
        setMenuForm({
            name: '',
            description: '',
            price: '',
            category: 'main',
            availability: true,
            image: ''
        });
    };

    const handleDeleteMenuItem = async (id) => {
        try {
            setLoading(true);
            await dashboardService.deleteMenuItem(role, id);
            setSuccess('Menu item deleted.');
            await loadMenuItems();
        } catch (err) {
            setError(err.message || 'Failed to delete menu item');
        } finally {
            setLoading(false);
        }
    };

    const handleToggleAvailability = async (item) => {
        try {
            setLoading(true);
            await dashboardService.updateMenuStatus(role, item._id, !item.availability);
            await loadMenuItems();
        } catch (err) {
            setError(err.message || 'Failed to update availability');
        } finally {
            setLoading(false);
        }
    };

    const handleOrderStatusChange = async (orderId, status) => {
        try {
            setLoading(true);
            await dashboardService.updateOrderStatus(role, orderId, status);
            await loadOrders();
        } catch (err) {
            setError(err.message || 'Failed to update order status');
        } finally {
            setLoading(false);
        }
    };

    const handleBookingStatusChange = async (bookingId, status) => {
        try {
            setLoading(true);
            await dashboardService.updateBooking(role, bookingId, { status });
            await loadBookings();
        } catch (err) {
            setError(err.message || 'Failed to update booking');
        } finally {
            setLoading(false);
        }
    };

    const handleRestaurantChange = (event) => {
        const { name, value } = event.target;
        setRestaurantForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setRestaurantForm((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value }
        }));
    };

    const handleHoursChange = (day, field, value) => {
        setRestaurantForm((prev) => ({
            ...prev,
            operatingHours: {
                ...prev.operatingHours,
                [day]: { ...prev.operatingHours?.[day], [field]: value }
            }
        }));
    };

    const handleRestaurantSubmit = async (event) => {
        event.preventDefault();
        resetMessages();

        if (!restaurantForm.name || !restaurantForm.address?.street || !restaurantForm.address?.city) {
            setError('Restaurant name, street, and city are required.');
            return;
        }

        if (!restaurant && role !== 'admin') {
            try {
                setLoading(true);
                const response = await restaurantService.createRestaurant(restaurantForm);
                setRestaurant(response?.data?.restaurant || null);
                setSuccess('Restaurant profile created. You can now manage menu items.');

                const refreshedUser = await authService.getCurrentUser();
                if (refreshedUser?.success) {
                    updateUser(refreshedUser.data.user);
                }

                await loadRestaurant();
            } catch (err) {
                setError(err.message || 'Failed to create restaurant profile');
            } finally {
                setLoading(false);
            }
            return;
        }

        if (isAdmin && !restaurantId) {
            setError('Restaurant ID is required for admin actions.');
            return;
        }

        try {
            setLoading(true);
            await dashboardService.updateRestaurant(role, restaurantForm, restaurantId || undefined);
            setSuccess('Restaurant settings updated.');
            await loadRestaurant();
        } catch (err) {
            setError(err.message || 'Failed to update restaurant settings');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-page on-dark">
            <header className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Manage menu, orders, bookings, and restaurant settings.</p>
                </div>
                {isAdmin && (
                    <div className="dashboard-restaurant-select">
                        <label htmlFor="restaurantId">Restaurant ID</label>
                        <input
                            id="restaurantId"
                            value={adminRestaurantId}
                            onChange={(event) => setAdminRestaurantId(event.target.value)}
                            placeholder="Enter restaurant ID"
                        />
                        <button type="button" onClick={() => activeTab === 'settings' && loadRestaurant()}>
                            Load
                        </button>
                    </div>
                )}
            </header>

            {!isAdmin && !restaurantId && (
                <div className="dashboard-alert error" role="alert">
                    Restaurant profile missing. Please create your restaurant in Restaurant Settings to manage menu items.
                    <button
                        type="button"
                        className="dashboard-link-btn"
                        onClick={() => setActiveTab('settings')}
                    >
                        Go to Restaurant Settings
                    </button>
                </div>
            )}

            <div className="dashboard-tabs">
                <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>
                    Menu
                </button>
                <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>
                    Orders
                </button>
                <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>
                    Bookings
                </button>
                <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
                    Restaurant Settings
                </button>
            </div>

            {error && <div className="dashboard-alert error">{error}</div>}
            {success && <div className="dashboard-alert success">{success}</div>}
            {loading && <div className="dashboard-loading">Loading...</div>}

            {activeTab === 'menu' && (
                <section className="dashboard-section">
                    <div className="dashboard-form-card">
                        <h2>{editingMenuId ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
                        <form onSubmit={handleMenuSubmit}>
                            <div className="dashboard-form-grid">
                                <input
                                    name="name"
                                    value={menuForm.name}
                                    onChange={handleMenuChange}
                                    placeholder="Item name"
                                />
                                <input
                                    name="price"
                                    type="number"
                                    value={menuForm.price}
                                    onChange={handleMenuChange}
                                    placeholder="Price"
                                />
                                <input
                                    name="category"
                                    value={menuForm.category}
                                    onChange={handleMenuChange}
                                    placeholder="Category"
                                />
                                <input
                                    name="image"
                                    value={menuForm.image}
                                    onChange={handleMenuChange}
                                    placeholder="Image URL"
                                />
                            </div>
                            <textarea
                                name="description"
                                value={menuForm.description}
                                onChange={handleMenuChange}
                                placeholder="Description"
                                rows="3"
                            />
                            <label className="dashboard-checkbox">
                                <input
                                    type="checkbox"
                                    name="availability"
                                    checked={menuForm.availability}
                                    onChange={handleMenuChange}
                                />
                                Available
                            </label>
                            <div className="dashboard-form-actions">
                                <button type="submit">{editingMenuId ? 'Update' : 'Create'}</button>
                                {editingMenuId && (
                                    <button type="button" className="secondary" onClick={handleCancelEdit}>
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    <div className="dashboard-list">
                        {menuItems.map((item) => (
                            <div key={item._id} className="dashboard-card">
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description || 'No description'}</p>
                                    <span className={item.availability ? 'status available' : 'status unavailable'}>
                                        {item.availability ? 'Available' : 'Out of stock'}
                                    </span>
                                </div>
                                <div className="dashboard-card-actions">
                                    <button type="button" onClick={() => handleEditMenuItem(item)}>
                                        Edit
                                    </button>
                                    <button type="button" className="secondary" onClick={() => handleToggleAvailability(item)}>
                                        Toggle
                                    </button>
                                    <button type="button" className="danger" onClick={() => handleDeleteMenuItem(item._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'orders' && (
                <section className="dashboard-section">
                    <div className="dashboard-list">
                        {orders.map((order) => (
                            <div key={order._id} className="dashboard-card">
                                <div>
                                    <h3>Order #{order._id.slice(-6)}</h3>
                                    <p>Customer: {order.customer?.firstName || 'Guest'}</p>
                                    <p>Total: ₹{order.finalAmount}</p>
                                </div>
                                <div className="dashboard-card-actions">
                                    <select
                                        value={order.status}
                                        onChange={(event) => handleOrderStatusChange(order._id, event.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="preparing">Preparing</option>
                                        <option value="ready">Ready</option>
                                        <option value="out_for_delivery">Out for delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'bookings' && (
                <section className="dashboard-section">
                    <div className="dashboard-list">
                        {bookings.map((booking) => (
                            <div key={booking._id} className="dashboard-card">
                                <div>
                                    <h3>Booking #{booking._id.slice(-6)}</h3>
                                    <p>Guest: {booking.customer?.firstName || booking.email}</p>
                                    <p>
                                        {new Date(booking.bookingDate).toLocaleDateString()} at {booking.bookingTime}
                                    </p>
                                </div>
                                <div className="dashboard-card-actions">
                                    <select
                                        value={booking.status}
                                        onChange={(event) => handleBookingStatusChange(booking._id, event.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'settings' && (
                <section className="dashboard-section">
                    <div className="dashboard-form-card">
                        <h2>Restaurant Details</h2>
                        {isAdmin && !restaurantId ? (
                            <p className="dashboard-empty">Enter a restaurant ID above to manage settings.</p>
                        ) : (
                            <form onSubmit={handleRestaurantSubmit}>
                                <div className="dashboard-form-grid">
                                    <input
                                        name="name"
                                        value={restaurantForm.name}
                                        onChange={handleRestaurantChange}
                                        placeholder="Restaurant name"
                                    />
                                    <input
                                        name="phone"
                                        value={restaurantForm.phone}
                                        onChange={handleRestaurantChange}
                                        placeholder="Phone"
                                    />
                                    <input
                                        name="email"
                                        value={restaurantForm.email}
                                        onChange={handleRestaurantChange}
                                        placeholder="Email"
                                    />
                                    <input
                                        name="website"
                                        value={restaurantForm.website}
                                        onChange={handleRestaurantChange}
                                        placeholder="Website"
                                    />
                                </div>
                                <textarea
                                    name="description"
                                    value={restaurantForm.description}
                                    onChange={handleRestaurantChange}
                                    placeholder="Description"
                                    rows="3"
                                />
                                <div className="dashboard-form-grid">
                                    <input
                                        name="street"
                                        value={restaurantForm.address.street}
                                        onChange={handleAddressChange}
                                        placeholder="Street"
                                    />
                                    <input
                                        name="city"
                                        value={restaurantForm.address.city}
                                        onChange={handleAddressChange}
                                        placeholder="City"
                                    />
                                    <input
                                        name="state"
                                        value={restaurantForm.address.state}
                                        onChange={handleAddressChange}
                                        placeholder="State"
                                    />
                                    <input
                                        name="zipCode"
                                        value={restaurantForm.address.zipCode}
                                        onChange={handleAddressChange}
                                        placeholder="Zip Code"
                                    />
                                    <input
                                        name="country"
                                        value={restaurantForm.address.country}
                                        onChange={handleAddressChange}
                                        placeholder="Country"
                                    />
                                </div>
                                <div className="dashboard-hours">
                                    {Object.keys(restaurantForm.operatingHours || {}).map((day) => (
                                        <div key={day} className="dashboard-hours-row">
                                            <span>{day}</span>
                                            <input
                                                value={restaurantForm.operatingHours?.[day]?.open || ''}
                                                onChange={(event) => handleHoursChange(day, 'open', event.target.value)}
                                                placeholder="Open"
                                            />
                                            <input
                                                value={restaurantForm.operatingHours?.[day]?.close || ''}
                                                onChange={(event) => handleHoursChange(day, 'close', event.target.value)}
                                                placeholder="Close"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button type="submit">{restaurant ? 'Save Settings' : 'Create Restaurant'}</button>
                            </form>
                        )}
                    </div>
                </section>
            )}
        </div>
    );
};

export default Dashboard;
