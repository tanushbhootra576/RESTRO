# 🍽️ RESTRO - Luxurious Restaurant Website

[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646cff.svg)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7.5.0-red.svg)](https://reactrouter.com/)

Welcome to **RESTRO**, a modern, responsive, and visually stunning restaurant website built with React and powered by Vite. This project showcases a complete restaurant experience with elegant design, smooth navigation, and interactive features including a shopping cart, festival coupons, and dynamic menu system.

![RESTRO Homepage](https://github.com/user-attachments/assets/3b882f76-c050-46c7-8903-4460779386b3)

*Experience luxury dining with our beautiful, responsive interface*

## ✨ Features

### 🧭 Navigation & Routing
- **Responsive Navbar** - Fixed navigation with smooth routing using React Router DOM
- **404 Error Page** - Custom not found page with navigation back to home

### 🏠 Home Page
- **Hero Section** - Welcoming restaurant introduction
- **Top Picks** - Dynamically generated random selection of 8 featured dishes
- **Star Ratings** - Visual rating system for menu items

### 🍽️ Menu System
- **Dynamic Menu** - Comprehensive menu with multiple categories:
  - Chocolates
  - Desserts  
  - Ice Cream
  - Drinks
- **Interactive Cards** - Each menu item includes image, description, price, and ratings
- **Add to Cart** - Functional shopping cart integration

### 🛒 Shopping Cart
- **Cart Context** - Global state management for cart items
- **Add/Remove Items** - Full cart functionality with quantity management
- **Persistent State** - Cart state maintained across navigation

### 🎊 Smart Coupons System
- **Festival Detection** - Automatically detects current festivals
- **Dynamic Coupon Generation** - Creates unique coupon codes for festival days
- **Seasonal Offers** - Special discounts tied to calendar events

### 📞 Contact & Services
- **Contact Information** - Complete contact details and social media links
- **Premium Services** - Showcase of restaurant services:
  - Home Delivery
  - Event Catering
  - Private Dining
  - Custom Cakes & Desserts
  - Live Music Nights

### 🔄 Coming Soon Features
- **Table Reservations** - Booking system (in development)
- **Advanced Coupons** - Extended coupon management (in development)

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.5
- **Routing**: React Router DOM 7.5.0
- **Styling**: Custom CSS with responsive design
- **State Management**: React Context API
- **Development**: ESLint for code quality

## 📁 Project Structure

```
RESTRO/
├── public/
│   ├── images/          # Logo, social media icons, dish images
│   └── vite.svg
├── src/
│   ├── components/      # React components
│   │   ├── Navbar.jsx   # Navigation component
│   │   ├── Home.jsx     # Landing page
│   │   ├── Menu.jsx     # Menu display
│   │   ├── Cart.jsx     # Shopping cart
│   │   ├── Contact.jsx  # Contact information
│   │   ├── Services.jsx # Restaurant services
│   │   ├── Bookings.jsx # Table reservations (coming soon)
│   │   ├── Coupons.jsx  # Festival coupons system
│   │   ├── TopPicks.jsx # Featured dishes
│   │   ├── Footer.jsx   # Site footer
│   │   ├── Review.jsx   # Customer reviews
│   │   ├── NotFound.jsx # 404 error page
│   │   └── *.css        # Component stylesheets
│   ├── context/
│   │   └── CartContext.jsx  # Shopping cart state management
│   ├── utils/
│   │   ├── festivals.js     # Festival dates and detection
│   │   └── topPicks.js      # Random menu item selection
│   ├── menu/            # Menu data files
│   │   ├── chocolates.json
│   │   ├── desserts.json
│   │   ├── ice-cream.json
│   │   └── drinks.json
│   ├── data/
│   │   └── menuItems.json   # Consolidated menu data
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── eslint.config.js     # ESLint configuration
└── vercel.json          # Deployment configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 16.0 or higher)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tanushbhootra576/RESTRO.git
   cd RESTRO
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Visit `http://localhost:5173` to view the application 🎉

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 🌟 Live Demo

The website includes several interactive features:

- **Navigation**: Seamless routing between different sections
- **Top Picks**: Dynamically generated featured menu items with ratings
- **Shopping Cart**: Add items and manage your order
- **Festival Coupons**: Automatic coupon generation for special occasions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🌐 Deployment

This project is configured for deployment on Vercel with the included `vercel.json` configuration file.

### Deploy to Vercel

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI if not already installed
   npm i -g vercel
   
   # Deploy
   vercel
   ```

### Other Deployment Options

- **Netlify**: Use `npm run build` and deploy the `dist` folder
- **GitHub Pages**: Use GitHub Actions with the build output
- **Any static hosting**: Deploy the contents of the `dist` folder after building

## 🔧 Configuration

### Adding New Menu Items

1. Add items to the appropriate JSON file in `src/menu/`
2. Update `src/data/menuItems.json` if needed
3. Ensure images are properly referenced

### Customizing Festivals

1. Edit `src/utils/festivals.js`
2. Add new festivals with dates and names
3. Coupon generation will automatically work with new festivals

### Styling Customization

- Component-specific styles are in their respective `.css` files
- Global styles are in `src/index.css`
- Responsive breakpoints are defined in individual component styles

## 🧪 Development

### Code Quality

This project uses ESLint for code quality and consistency:

```bash
# Run linter
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

### Project Guidelines

- Follow React best practices and hooks guidelines
- Maintain responsive design for all components
- Use semantic HTML and accessible markup
- Keep components modular and reusable
- Update documentation when adding new features

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes** and test thoroughly
4. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
5. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Contribution Guidelines

- Ensure your code follows the existing style
- Add appropriate comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Follow React and JavaScript best practices

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Tanush Bhootra**
- GitHub: [@tanushbhootra576](https://github.com/tanushbhootra576)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vite team for the lightning-fast build tool
- All contributors who help improve this project

---

<div align="center">
  <p>Made with ❤️ by Tanush Bhootra</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>