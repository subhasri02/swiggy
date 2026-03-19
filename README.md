# 🍔 Swiggy Clone (MERN Stack)

A full-stack **Swiggy-inspired food ordering web application** built using the **MERN stack (MongoDB, Express.js, React.js, Node.js)**.  
The application allows users to browse restaurants, view menus, add items to the cart, and place orders with payment integration.

The project follows **industry-standard MERN architecture and MVC design pattern** for maintainability and scalability.

---

## 🚀 Features

- Browse restaurant listings
- View restaurant menus
- Add and manage items in cart
- User authentication
- Secure payment integration using **Stripe**
- Responsive UI using **Tailwind CSS**
- Dynamic restaurant data fetching
- Modular and scalable folder structure

---

## 🛠 Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5
- CSS3
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Additional Tools
- Firebase (authentication / services)
- Stripe Payment Gateway
- REST APIs

---

## 🏗 Project Architecture

The project follows a **standard MERN architecture** with clear separation of frontend and backend.

### Frontend Structure


client
│
├── api
├── components
├── context
├── pages
├── routes
├── styles
├── App.jsx
├── index.jsx
└── configuration files


### Backend Structure (MVC Pattern)


server
│
├── config
├── controllers
├── middlewares
├── models
├── routes
├── utils
└── index.js


### MVC Architecture

- **Models** → Define database schemas
- **Controllers** → Handle application logic
- **Routes** → Define API endpoints
- **Middlewares** → Handle authentication & request processing
- **Utils / Config** → Utility functions and configuration

This structure improves **code maintainability, modularity, and scalability**.

---

## ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/subhasri02/swiggy.git
2️⃣ Navigate to the project directory
cd swiggy
3️⃣ Install backend dependencies
cd server
npm install
4️⃣ Install frontend dependencies
cd ../client
npm install
▶️ Running the Application
Start the backend server
cd server
npm start
Start the frontend application
cd client
npm start

The application will run on:

http://localhost:3000