# Lead Management Dashboard (Mini CRM)

A full-stack Lead Management Dashboard (mini CRM) built as part of a fresher hiring assignment.

This app includes:
- JWT based Login (demo credentials)
- Leads list (server-side search, filters, sorting, pagination)
- Lead details view
- Dashboard analytics metrics
- MongoDB Atlas integration
- Seeder script (500 dummy leads)

---

## 🚀 Live Demo
- Frontend: https://lead-management-dashboard-lemon.vercel.app

### ✅ Demo Credentials
- Email: `admin@gmail.com`
- Password: `admin123`

---

## 🧰 Tech Stack

### Frontend
- React (Vite)
- Axios
- React Router DOM
- Inline CSS styling

### Backend
- Node.js
- Express.js
- MongoDB Atlas (Free Tier)
- Mongoose
- JWT Authentication

---

## 📁 Folder Structure

```

Lead_Dashboard/
backend/
src/
config/
db.js
models/
Lead.js
routes/
auth.routes.js
leads.routes.js
controllers/
auth.controller.js
leads.controller.js
middlewares/
auth.middleware.js
utils/
seed.js
.env
server.js
package.json

frontend/
src/
api/
axios.js
components/
Navbar.jsx
LeadsTable.jsx
MetricsCards.jsx
Pagination.jsx
pages/
Login.jsx
Dashboard.jsx
LeadDetails.jsx
utils/
auth.js
App.jsx
index.css

````

---

## 🔑 Environment Variables

### Backend `.env` (inside `/backend`)
Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
````

---

## ⚙️ Local Setup Instructions

### 1) Clone the repository

```bash
git clone <PASTE_GITHUB_REPO_LINK_HERE>
cd Lead_Dashboard
```

---

## 🔥 Backend Setup

### 1) Install dependencies

```bash
cd backend
npm install
```

### 2) Run backend server

```bash
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

## 🌱 Seed Dummy Leads (500 records)

To seed leads into MongoDB:

```bash
cd backend
npm run seed
```

This will:

* delete existing leads
* insert 500 dummy leads into MongoDB

---

## 🎨 Frontend Setup

### 1) Install dependencies

```bash
cd frontend
npm install
```

### 2) Run frontend

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📌 API Endpoints

### ✅ Auth API

#### Login

`POST /api/auth/login`

Request Body:

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

Response:

* returns JWT token

---

### ✅ Leads API (Protected)

All leads APIs require header:

```
Authorization: Bearer <TOKEN>
```

#### Fetch Leads (Search / Filter / Sort / Pagination)

`GET /api/leads`

Query Params Supported:

* `search`
* `stage`
* `source`
* `sortBy`
* `sortOrder`
* `page`
* `limit`

Example:

```
GET /api/leads?search=yahoo&stage=Converted&source=LinkedIn&page=1&limit=10
```

#### Fetch Lead By ID

`GET /api/leads/:id`

Example:

```
GET /api/leads/65b8ac9d3e4c8c2b12345678
```

---

### ✅ Metrics API

`GET /api/leads/metrics`

Returns:

* totalLeads
* convertedLeads
* stageBreakdown

Example Response:

```json
{
  "totalLeads": 500,
  "convertedLeads": 100,
  "stageBreakdown": [
    { "_id": "New", "count": 93 },
    { "_id": "Converted", "count": 100 }
  ]
}
```

---

## 📦 Deployment

Recommended free hosting:

* Frontend → Vercel / Netlify
* Backend → Render / Railway
* Database → MongoDB Atlas

---

## 👤 Author

Surjeet Karan


