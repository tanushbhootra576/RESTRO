import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
    getDashboardMenuItems,
    createDashboardMenuItem,
    updateDashboardMenuItem,
    deleteDashboardMenuItem,
    updateDashboardMenuStatus
} from '../controllers/dashboardMenuController.js';
import { getDashboardOrders, updateDashboardOrderStatus } from '../controllers/dashboardOrderController.js';
import { getDashboardBookings, updateDashboardBooking } from '../controllers/dashboardBookingController.js';
import { getDashboardRestaurant, updateDashboardRestaurant } from '../controllers/dashboardRestaurantController.js';

const router = express.Router();

router.use(authenticate, authorize('owner'));

// Menu management
router.get('/menu', getDashboardMenuItems);
router.post('/menu', createDashboardMenuItem);
router.put('/menu/:id', updateDashboardMenuItem);
router.delete('/menu/:id', deleteDashboardMenuItem);
router.patch('/menu/:id/status', updateDashboardMenuStatus);

// Orders
router.get('/orders', getDashboardOrders);
router.patch('/orders/:id/status', updateDashboardOrderStatus);

// Bookings
router.get('/bookings', getDashboardBookings);
router.patch('/bookings/:id', updateDashboardBooking);

// Restaurant settings
router.get('/restaurant', getDashboardRestaurant);
router.put('/restaurant', updateDashboardRestaurant);

export default router;
