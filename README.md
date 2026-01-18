
      ## Restro Restaurant Platform

      Restro is a full-stack restaurant platform with a React frontend and a Node.js/Express backend. It supports browsing menus, cart management, orders, bookings, coupons, and an owner/admin dashboard.

      ## Tech Stack

      - Frontend: React, Vite, Tailwind utilities, custom CSS
      - Backend: Node.js, Express, MongoDB, Mongoose
      - Auth: JWT

      ## Project Structure

      - src/ (frontend)
      - backend/ (API server)

      ## Setup

      1) Install dependencies

      - Frontend
         - npm install
      - Backend
         - cd backend
         - npm install

      2) Environment configuration

      - Backend: create backend/.env with MongoDB and JWT settings.

      3) Run locally

      - Frontend
         - npm run dev
      - Backend
         - cd backend
         - npm run dev

      4) Seed data (optional)

      - cd backend
      - npm run seed

      ## Notes

      - The checkout flow uses a mock payment form and creates an order in the backend.
      - Owner accounts need a restaurant profile to manage menu items.
      ## Project Structure

      ```
      src/
      │
      ├── components/
      │   ├── Navbar.jsx
      │   ├── TopPicks.jsx
      │   ├── Menu.jsx
      │   ├── Contact.jsx
      │   ├── Services.jsx
      │   ├── Bookings.jsx
      │   ├── Coupons.jsx
      │   ├── Review.jsx
      │   ├── Footer.jsx
      │   ├── *.css
      │
      ├── App.js
      ├── index.js
      ```


      ## Getting Started

      1. **Clone the repository**
         ```bash
         git clone https://github.com/tanushbhootra576/restro.git
         cd restrolux
         ```

      2. **Install dependencies**
         ```bash
         npm install
         ```

      3. **Run the app**
         ```bash
         npm start
         ```

      4. Visit `http://localhost:3000` in your browser 🎉

      ##  Contributing

      Feel free to fork this project, make enhancements, and open pull requests!

      ###  Developed by Tanush Bhootra
