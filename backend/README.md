# Restro Backend - MERN SaaS API

A production-ready Node.js + Express.js backend for the Restro multi-tenant restaurant platform built with MongoDB and Mongoose.

## Features

- ✅ JWT-based Authentication (Access & Refresh Tokens)
- ✅ Role-Based Access Control (Admin, Restaurant Owner, Customer)
- ✅ MongoDB with Mongoose ODM
- ✅ RESTful API with proper error handling
- ✅ CORS & Security (Helmet.js)
- ✅ Input validation (express-validator)
- ✅ Async error handling
- ✅ Comprehensive logging (Morgan)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Security**: bcryptjs, helmet
- **Validation**: express-validator, Joi
- **HTTP Client**: Axios
- **Environment**: dotenv

## Installation

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB instance
- npm or yarn

### Setup

1. **Clone and navigate to backend**

```bash
cd backend
```

2. **Install dependencies**

```bash
npm install
```

3. **Create `.env` file** (copy from `.env.example`)

```bash
cp .env.example .env
```

4. **Configure environment variables**

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/restro
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
CORS_ORIGIN=http://localhost:5173
```

5. **Start the server**

```bash
npm run dev    # Development with auto-reload
npm start      # Production
```

Server will run on `http://localhost:5000`

## API Endpoints

### Authentication

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
POST   /api/auth/refresh-token - Refresh access token
GET    /api/auth/me            - Get current user (protected)
```

### Restaurants

```
POST   /api/restaurants        - Create restaurant (owner)
GET    /api/restaurants        - Get all restaurants
GET    /api/restaurants/:id    - Get restaurant details
PUT    /api/restaurants/:id    - Update restaurant (owner)
DELETE /api/restaurants/:id    - Delete restaurant (owner/admin)
```

### Menu Items

```
POST   /api/menu               - Create menu item (owner)
GET    /api/menu               - Get all menu items (with filters)
GET    /api/menu/:id           - Get menu item details
PUT    /api/menu/:id           - Update menu item (owner)
DELETE /api/menu/:id           - Delete menu item (owner)
```

### Orders

```
POST   /api/orders             - Create order (customer)
GET    /api/orders             - Get user's orders (customer)
GET    /api/orders/:id         - Get order details
PUT    /api/orders/:id/status  - Update order status (owner/admin)
PUT    /api/orders/:id/cancel  - Cancel order (customer)
```

### Bookings

```
POST   /api/bookings           - Create booking (customer)
GET    /api/bookings           - Get user's bookings (customer)
GET    /api/bookings/:id       - Get booking details
PUT    /api/bookings/:id       - Update booking (customer)
DELETE /api/bookings/:id       - Cancel booking (customer)
```

## Request/Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    "user": { ... }
  }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description",
  "errors": { ... }
}
```

## Authentication Flow

### Register

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210"
  }'
```

Response:

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1...",
      "refreshToken": "eyJhbGciOiJIUzI1..."
    }
  }
}
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Protected Request

```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Database Models

### User

- firstName, lastName, email, phone
- password (hashed)
- role: 'customer' | 'owner' | 'admin'
- restaurant: ObjectId (for owners)
- address, profilePicture
- timestamps

### Restaurant

- name, description, cuisine
- owner: ObjectId (ref: User)
- address (with coordinates)
- phone, email, website
- operatingHours
- rating, reviewCount
- subscriptionPlan: 'free' | 'basic' | 'premium'
- timestamps

### MenuItem

- restaurant: ObjectId
- name, description, category
- price, discountPrice
- image, images[]
- isVegetarian, isSpicy
- preparationTime, availability
- tags[]
- timestamps

### Order

- customer: ObjectId
- restaurant: ObjectId
- items[] (menuItem, quantity, price)
- totalAmount, discountAmount, tax, finalAmount
- status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
- orderType: 'delivery' | 'pickup' | 'dine-in'
- paymentMethod, paymentStatus
- timestamps

### Booking

- customer: ObjectId
- restaurant: ObjectId
- numberOfGuests, bookingDate, bookingTime
- status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
- phoneNumber, email
- timestamps

### Coupon

- restaurant: ObjectId
- code, description
- discountType: 'percentage' | 'fixed'
- discountValue, maxDiscount
- startDate, endDate
- maxUses, currentUses
- timestamps

### Review

- restaurant: ObjectId
- user: ObjectId
- rating (1-5), title, comment
- photos[], isVerifiedPurchase
- timestamps

### Cart

- user: ObjectId
- restaurant: ObjectId
- items[] (menuItem, quantity, price)
- totalAmount
- timestamps

## Middleware

### Authentication (`auth.js`)

- `authenticate`: Verify JWT token
- `authorize(...roles)`: Check user role
- `ownerOrAdmin`: Check owner or admin

### Error Handling (`errorHandler.js`)

- Global error handler for all routes
- Mongoose validation errors
- JWT errors
- Duplicate key errors

## Environment Variables

Create `.env` file with:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/restro

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=15m
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRE=7d

CORS_ORIGIN=http://localhost:5173
```

## Project Structure

```
backend/
├── src/
│   ├── models/              # Mongoose schemas
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   ├── Order.js
│   │   ├── Booking.js
│   │   ├── Coupon.js
│   │   ├── Review.js
│   │   └── Cart.js
│   │
│   ├── routes/              # API route handlers
│   │   ├── authRoutes.js
│   │   ├── restaurantRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── orderRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── controllers/         # Business logic
│   │   ├── authController.js
│   │   ├── restaurantController.js
│   │   ├── menuController.js
│   │   ├── orderController.js
│   │   └── bookingController.js
│   │
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js
│   │   └── errorHandler.js
│   │
│   ├── config/              # Configuration
│   │   └── database.js
│   │
│   ├── utils/               # Utility functions
│   │   ├── tokenUtils.js
│   │   └── responses.js
│   │
│   └── server.js            # Express app entry point
│
├── package.json
├── .env.example
└── README.md
```

## Testing API Endpoints

### Using Postman

1. Import the API endpoints
2. Set the base URL: `http://localhost:5000`
3. For protected routes, add header:
   ```
   Authorization: Bearer YOUR_ACCESS_TOKEN
   ```

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","password":"password123","phone":"9876543210"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Get current user
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer ACCESS_TOKEN"
```

## Deployment

### MongoDB Atlas

1. Create cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get connection string
3. Add to `.env` as `MONGODB_URI`

### Hosting Options

- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **Render**: Connect GitHub repo
- **Vercel**: Edge functions support

## Security Best Practices

1. ✅ Hash passwords with bcryptjs (10 salt rounds)
2. ✅ Use JWT with short expiry times
3. ✅ Implement CORS with specific origins
4. ✅ Validate all user inputs
5. ✅ Use environment variables for secrets
6. ✅ Enable HTTPS in production
7. ✅ Implement rate limiting
8. ✅ Use Helmet.js for security headers
9. ✅ Log all errors securely
10. ✅ Keep dependencies updated

## Next Steps

1. **Add more routes**: Create controllers for Coupons and Reviews
2. **Image Upload**: Setup Cloudinary for image storage
3. **Email Notifications**: Integrate Nodemailer or SendGrid
4. **Payment Gateway**: Add Stripe integration
5. **Real-time Updates**: Implement Socket.io for order tracking
6. **Analytics**: Create dashboard endpoints
7. **Testing**: Add unit and integration tests
8. **Documentation**: Generate Swagger API docs

## Troubleshooting

### MongoDB Connection Error

- Check MongoDB URI in `.env`
- Ensure IP whitelist on MongoDB Atlas
- Verify network connectivity

### JWT Token Expired

- Use refresh token endpoint to get new access token
- Check token expiry configuration

### CORS Error

- Verify `CORS_ORIGIN` in `.env`
- Update frontend API base URL

## Support & Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Tutorial](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)
- [Security Checklist](https://owasp.org/www-project-top-ten/)

## License

MIT

## Author

Restro Development Team

---

**Last Updated**: January 15, 2026  
**Version**: 1.0.0
