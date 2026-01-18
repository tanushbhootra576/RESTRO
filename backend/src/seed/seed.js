import dotenv from 'dotenv';
import connectDB from '../config/database.js';
import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';
import MenuItem from '../models/MenuItem.js';
import Coupon from '../models/Coupon.js';
import Booking from '../models/Booking.js';
import Order from '../models/Order.js';
import Review from '../models/Review.js';
import Cart from '../models/Cart.js';

dotenv.config();

const randomFrom = (list) => list[Math.floor(Math.random() * list.length)];

const buildAddress = (street, city) => ({
    street,
    city,
    state: 'MH',
    zipCode: '400001',
    country: 'India'
});

const buildHours = () => ({
    monday: { open: '10:00', close: '22:00' },
    tuesday: { open: '10:00', close: '22:00' },
    wednesday: { open: '10:00', close: '22:00' },
    thursday: { open: '10:00', close: '22:00' },
    friday: { open: '10:00', close: '23:00' },
    saturday: { open: '10:00', close: '23:00' },
    sunday: { open: '10:00', close: '21:00' }
});

const seed = async () => {
    await connectDB();

    await Promise.all([
        Order.deleteMany(),
        Booking.deleteMany(),
        Review.deleteMany(),
        Coupon.deleteMany(),
        Cart.deleteMany(),
        MenuItem.deleteMany(),
        Restaurant.deleteMany(),
        User.deleteMany()
    ]);

    const [admin, owner1, owner2, customer1, customer2] = await User.create([
        {
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@restro.com',
            phone: '9990001111',
            password: 'Password123!',
            role: 'admin'
        },
        {
            firstName: 'Riya',
            lastName: 'Kapoor',
            email: 'owner1@restro.com',
            phone: '9990002222',
            password: 'Password123!',
            role: 'owner'
        },
        {
            firstName: 'Arjun',
            lastName: 'Mehta',
            email: 'owner2@restro.com',
            phone: '9990003333',
            password: 'Password123!',
            role: 'owner'
        },
        {
            firstName: 'Aanya',
            lastName: 'Sharma',
            email: 'customer1@restro.com',
            phone: '9990004444',
            password: 'Password123!',
            role: 'customer'
        },
        {
            firstName: 'Kabir',
            lastName: 'Singh',
            email: 'customer2@restro.com',
            phone: '9990005555',
            password: 'Password123!',
            role: 'customer'
        }
    ]);

    const [rest1, rest2] = await Restaurant.create([
        {
            name: 'Restro Signature',
            owner: owner1._id,
            description: 'Luxury dining with chef-curated seasonal menus.',
            cuisine: ['Indian', 'Continental'],
            address: buildAddress('12 Marina Road', 'Mumbai'),
            phone: '9991112222',
            email: 'signature@restro.com',
            website: 'https://restro.example/signature',
            operatingHours: buildHours()
        },
        {
            name: 'Restro Garden',
            owner: owner2._id,
            description: 'Garden-inspired plates with vibrant flavors.',
            cuisine: ['Mediterranean', 'Asian'],
            address: buildAddress('55 Orchard Lane', 'Pune'),
            phone: '9993334444',
            email: 'garden@restro.com',
            website: 'https://restro.example/garden',
            operatingHours: buildHours()
        }
    ]);

    await Promise.all([
        User.findByIdAndUpdate(owner1._id, { restaurant: rest1._id }),
        User.findByIdAndUpdate(owner2._id, { restaurant: rest2._id })
    ]);

    const menuItems = await MenuItem.create([
        {
            restaurant: rest1._id,
            restaurantId: rest1._id,
            name: 'Truffle Butter Naan',
            description: 'Warm naan with truffle butter and sea salt.',
            category: 'appetizer',
            price: 320,
            isVegetarian: true,
            tags: ['bestseller']
        },
        {
            restaurant: rest1._id,
            restaurantId: rest1._id,
            name: 'Signature Butter Chicken',
            description: 'Classic butter chicken with a silkier tomato gravy.',
            category: 'main',
            price: 540,
            isSpicy: false,
            tags: ['chef-special']
        },
        {
            restaurant: rest1._id,
            restaurantId: rest1._id,
            name: 'Smoked Paneer Tikka',
            description: 'Charred paneer, mint yogurt, and pickled onions.',
            category: 'appetizer',
            price: 410,
            isVegetarian: true,
            isSpicy: true
        },
        {
            restaurant: rest1._id,
            restaurantId: rest1._id,
            name: 'Saffron Risotto',
            description: 'Creamy risotto infused with saffron and parmesan.',
            category: 'main',
            price: 620,
            isVegetarian: true
        },
        {
            restaurant: rest1._id,
            restaurantId: rest1._id,
            name: 'Dark Chocolate Soufflé',
            description: 'Served with vanilla bean ice cream.',
            category: 'dessert',
            price: 360,
            isVegetarian: true
        },
        {
            restaurant: rest1._id,
            restaurantId: rest1._id,
            name: 'Rose Lime Cooler',
            description: 'Rose syrup, lime, and sparkling soda.',
            category: 'beverage',
            price: 180,
            isVegetarian: true
        },
        {
            restaurant: rest2._id,
            restaurantId: rest2._id,
            name: 'Mediterranean Mezze',
            description: 'Falafel, hummus, and pita platter.',
            category: 'appetizer',
            price: 390,
            isVegetarian: true
        },
        {
            restaurant: rest2._id,
            restaurantId: rest2._id,
            name: 'Grilled Sea Bass',
            description: 'Herb crusted sea bass with citrus salad.',
            category: 'main',
            price: 760,
            isSpicy: false
        },
        {
            restaurant: rest2._id,
            restaurantId: rest2._id,
            name: 'Miso Glazed Tofu Bowl',
            description: 'Tofu, soba, and seasonal vegetables.',
            category: 'main',
            price: 520,
            isVegetarian: true
        },
        {
            restaurant: rest2._id,
            restaurantId: rest2._id,
            name: 'Matcha Panna Cotta',
            description: 'Silky panna cotta with matcha glaze.',
            category: 'dessert',
            price: 340,
            isVegetarian: true
        },
        {
            restaurant: rest2._id,
            restaurantId: rest2._id,
            name: 'Yuzu Spritz',
            description: 'Yuzu, tonic, and rosemary.',
            category: 'beverage',
            price: 210,
            isVegetarian: true
        },
        {
            restaurant: rest2._id,
            restaurantId: rest2._id,
            name: 'Spiced Tomato Soup',
            description: 'Slow roasted tomato soup with basil oil.',
            category: 'appetizer',
            price: 260,
            isVegetarian: true
        }
    ]);

    const [coupon1, coupon2] = await Coupon.create([
        {
            restaurant: rest1._id,
            code: 'RESTRO10',
            description: '10% off on orders above ₹800.',
            discountType: 'percentage',
            discountValue: 10,
            maxDiscount: 150,
            minOrderAmount: 800,
            startDate: new Date(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        },
        {
            restaurant: rest2._id,
            code: 'GARDEN200',
            description: 'Flat ₹200 off on orders above ₹1200.',
            discountType: 'fixed',
            discountValue: 200,
            minOrderAmount: 1200,
            startDate: new Date(),
            endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45)
        }
    ]);

    await Booking.create([
        {
            customer: customer1._id,
            restaurant: rest1._id,
            numberOfGuests: 2,
            bookingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
            bookingTime: '19:30',
            specialRequests: 'Window seat if available.',
            status: 'confirmed',
            phoneNumber: customer1.phone,
            email: customer1.email
        },
        {
            customer: customer2._id,
            restaurant: rest2._id,
            numberOfGuests: 4,
            bookingDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4),
            bookingTime: '20:00',
            specialRequests: 'Birthday celebration.',
            status: 'pending',
            phoneNumber: customer2.phone,
            email: customer2.email
        }
    ]);

    const rest1Items = menuItems.filter((item) => item.restaurant.toString() === rest1._id.toString());
    const rest2Items = menuItems.filter((item) => item.restaurant.toString() === rest2._id.toString());

    const order1Items = [
        { menuItem: rest1Items[0]._id, quantity: 2, price: rest1Items[0].price },
        { menuItem: rest1Items[1]._id, quantity: 1, price: rest1Items[1].price }
    ];
    const order1Total = order1Items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order2Items = [
        { menuItem: rest2Items[1]._id, quantity: 1, price: rest2Items[1].price },
        { menuItem: rest2Items[4]._id, quantity: 2, price: rest2Items[4].price }
    ];
    const order2Total = order2Items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await Order.create([
        {
            customer: customer1._id,
            restaurant: rest1._id,
            items: order1Items,
            totalAmount: order1Total,
            discountAmount: 80,
            coupon: coupon1._id,
            deliveryCharge: 30,
            tax: 45,
            finalAmount: order1Total - 80 + 30 + 45,
            status: 'confirmed',
            orderType: 'delivery',
            paymentMethod: 'card',
            paymentStatus: 'completed',
            deliveryAddress: buildAddress('88 Palm Street', 'Mumbai')
        },
        {
            customer: customer2._id,
            restaurant: rest2._id,
            items: order2Items,
            totalAmount: order2Total,
            discountAmount: 0,
            deliveryCharge: 0,
            tax: 32,
            finalAmount: order2Total + 32,
            status: 'preparing',
            orderType: 'pickup',
            paymentMethod: 'upi',
            paymentStatus: 'pending'
        }
    ]);

    await Review.create([
        {
            restaurant: rest1._id,
            user: customer1._id,
            rating: 5,
            title: 'Absolutely stunning experience',
            comment: 'The butter chicken was phenomenal and service was impeccable.',
            isVerifiedPurchase: true,
            helpful: 3
        },
        {
            restaurant: rest2._id,
            user: customer2._id,
            rating: 4,
            title: 'Loved the ambience',
            comment: 'Beautiful plating and relaxing environment.',
            isVerifiedPurchase: true,
            helpful: 1
        }
    ]);

    await Cart.create([
        {
            user: customer1._id,
            restaurant: rest1._id,
            items: [
                { menuItem: rest1Items[2]._id, quantity: 1, price: rest1Items[2].price },
                { menuItem: rest1Items[5]._id, quantity: 2, price: rest1Items[5].price }
            ],
            totalAmount: rest1Items[2].price * 1 + rest1Items[5].price * 2
        },
        {
            user: customer2._id,
            restaurant: rest2._id,
            items: [
                { menuItem: rest2Items[0]._id, quantity: 1, price: rest2Items[0].price }
            ],
            totalAmount: rest2Items[0].price
        }
    ]);

    console.log('✅ Seed data created successfully.');
    console.log('Sample accounts:');
    console.log('Admin: admin@restro.com / Password123!');
    console.log('Owner 1: owner1@restro.com / Password123!');
    console.log('Owner 2: owner2@restro.com / Password123!');
    console.log('Customer 1: customer1@restro.com / Password123!');
    console.log('Customer 2: customer2@restro.com / Password123!');

    process.exit(0);
};

seed().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
