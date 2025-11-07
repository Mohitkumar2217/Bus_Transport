```markdown
# Smart Bus Tracker

A **real-time bus tracking web application** built with **MERN stack** (MongoDB, Express.js, React, Node.js) that allows users to track buses on a map, view live positions, and estimate arrival times at a stop. Includes authentication (signup/login) for a modern, secure experience.

---

## 🚀 Features

- **User Authentication**: Secure signup and login with JWT tokens.
- **Live Bus Tracking**: Real-time bus locations streamed via **Server-Sent Events (SSE)**.
- **Route Management**: Predefined routes with multiple buses per route.
- **ETA Calculation**: Approximate distance and estimated arrival time to a sample stop.
- **Interactive Map**: Leaflet.js map showing live bus locations with markers and popups.
- **Responsive Design**: Modern UI with navbar, sidebar, and mobile-friendly layout.

---

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, Leaflet.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (local or Atlas)
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, responsive layout

---

## 📂 Project Structure

```

Bus_Transport/
├─ backend/
│  ├─ controllers/
│  │  ├─ authController.js
│  │  ├─ busController.js
│  │  └─ routeController.js
│  ├─ data/
│  │  └─ routesData.js
│  ├─ middleware/
│  │  └─ authMiddleware.js
│  ├─ models/
│  │  └─ user.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  ├─ buses.js
│  │  └─ routes.js
│  └─ index.js
├─ frontend/
│  ├─ components/
│  │  ├─ BusList.jsx
│  │  ├─ MapView.jsx
│  │  ├─ Navbar.jsx
│  │  ├─ Login.jsx
│  │  ├─ Signup.jsx
│  │  └─ ProtectedRoute.jsx
│  ├─ context/
│  │  └─ AuthContext.jsx
│  ├─ App.jsx
│  ├─ main.jsx
│  └─ styles/
│     ├─ Navbar.css
│     └─ styles.css
├─ package.json
└─ README.md

````

---

## ⚡ Installation

### **Backend**

1. Navigate to `backend/` folder:

```bash
cd backend
````

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/smartbus
JWT_SECRET=your_jwt_secret
PORT=4000
```

4. Start the server:

```bash
node index.js
```

Server will run at: `http://localhost:4000`

---

### **Frontend**

1. Navigate to `frontend/` folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173` (or specified by Vite)

---

## 🔑 Usage

1. **Signup/Login**: Create an account or login using existing credentials.
2. **View Map**: See live buses moving along their routes on the map.
3. **Check ETA**: Distance and estimated arrival time to a sample stop displayed in the sidebar.
4. **Responsive Layout**: Works on desktop and mobile screens.

---

## 🌐 Demo

*(Optional: Add a live demo link if deployed)*

---

## 📌 Notes

* Ensure **MongoDB server is running locally** or use **MongoDB Atlas URI** in `.env`.
* SSE (Server-Sent Events) handles live bus updates every 1.5 seconds.
* Passwords are **hashed with bcrypt** before saving.

---

## 🛡️ Security

* JWT authentication secures API endpoints.
* Passwords are never stored in plain text.
* Protected routes redirect unauthenticated users to login page.

---

## 📫 Author

Mohit Kumar
[GitHub](https://github.com/Mohitkumar2217)

---

```

This README covers **all aspects**: project overview, features, tech stack, installation, usage, and security.  

If you want, I can also make a **short, resume-friendly 4-line version** for your portfolio.  

Do you want me to do that too?
```
