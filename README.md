# 📊 Smart Leads Dashboard

A professional, full-stack Lead Management System built with the **MERN Stack** (MongoDB, Express, React, Node.js) and written strictly in **TypeScript**.

## 🚀 Features

- **Robust Authentication:** Secure JWT-based registration and login system with Role-Based Access Control (Admin / Sales User).
- **Advanced Data Management:** Complete CRUD functionality for handling sales leads.
- **Enterprise-Grade Data Table:** 
  - Server-Side Pagination (fetches 10 items per page for extreme performance).
  - Multi-Parameter Filtering (Filter by Status and Source simultaneously).
  - Debounced Global Search (Instantly searches by Name or Email without spamming the API).
  - Column Sorting (Sort by creation date).
- **Responsive UI & Dark Mode:** Built with Tailwind CSS v4, featuring a sleek, flawless dark mode and a fully responsive mobile sidebar.
- **Excel/CSV Export:** One-click data export that perfectly downloads your currently filtered view into an Excel-ready CSV format.

---

## 🛠️ Tech Stack

**Frontend:**
- React (Vite)
- TypeScript
- Tailwind CSS v4
- Zustand (Global State)
- @tanstack/react-query (Server State & Caching)
- React Hook Form
- Lucide React (Icons)

**Backend:**
- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- Zod (API Input Validation)
- JSON Web Tokens (JWT) & bcrypt (Security)

---

## 💻 Local Setup Instructions

Follow these steps to run the project locally on your machine.

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed locally OR a MongoDB Atlas connection string.

### 1. Clone & Install Dependencies
First, install the dependencies for both the frontend and backend.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment Variables
You need to set up your environment variables for the backend server.

Navigate to the `backend` folder and copy the example environment file:
```bash
cd backend
cp .env.example .env
```
Open the `.env` file and ensure the `MONGODB_URI` points to your local MongoDB database (e.g., `mongodb://127.0.0.1:27017/smart_leads`) or your cloud database.

### 3. Run the Development Servers
You will need to open two terminal windows to run the frontend and backend simultaneously.

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
*The backend server will start on http://localhost:5000*

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
*The frontend React app will start on http://localhost:5173 (or 5174 depending on availability)*

### 4. How to Use the App
1. Open your browser and go to the frontend URL (e.g., `http://localhost:5173`).
2. Click **Sign up** at the bottom of the login form to create a new account.
3. Once logged in, you will be redirected to the Dashboard.
4. Click **+ New Lead** to add a lead to the database.
5. Use the search bar and filter dropdowns to test the server-side queries.
6. Click **Export** to download your leads into an Excel-compatible CSV file.

---

## 🐳 Docker Setup (Optional)

If you prefer to run the application using Docker, Dockerfiles have been provided for both the frontend and backend.

1. Build the backend image:
```bash
cd backend
docker build -t smart-leads-backend .
```

2. Build the frontend image:
```bash
cd frontend
docker build -t smart-leads-frontend .
```

*(Note: You will need to connect the backend container to a running MongoDB container network for it to function properly).*
