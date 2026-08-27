# 🏛️ Country Holidays Hotels & Resorts - Backend REST API

Production-ready backend for **Country Holidays Hotels & Resorts (CHHR)** built with **Node.js, Express, MongoDB Atlas, and Mongoose**.

---

## 📌 Features

- **MongoDB Atlas Integration**: Cloud cluster with automatic DNS resolution & seeding.
- **Executive CRM & Lead Desk**: Captures guest inquiries from Celebrations and Contact pages.
- **Accommodations CMS**: Manages signature suites & villas rendered on the landing page (`02 — ACCOMMODATION`).
- **Offers & Packages CMS**: Manages all-inclusive packages and seasonal privileges.
- **Media Vault CMS**: Curates categorized photography for the `/gallery` lightbox.
- **Global Settings API**: Central management for concierge hotlines, WhatsApp numbers, and addresses.
- **JWT & Role-Based Auth**: Secure administrator authentication with Bcrypt password hashing.

---

## ⚙️ Environment Variables (`.env`)

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://chhrcountryholidays_db_user:QlniLq104toQYGJj@chhr-cluster.jj8mzhx.mongodb.net/chhr_resorts?retryWrites=true&w=majority&appName=CHHR-Cluster
JWT_SECRET=chhr_luxury_sanctuary_secret_jwt_key_2026_secure
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

---

## 🚀 Running the Server

```bash
# Install dependencies
npm install

# Start in development mode (with nodemon)
npm run dev

# Start in production mode
npm start
```

---

## 🔑 Default Super Admin Credentials

* **Email**: `admin@countryholidays.com`
* **Password**: `admin123`

---

## 📡 REST API Reference

### 1. Authentication (`/api/v1/auth`)
* `POST /api/v1/auth/login` - Admin login (returns JWT token & user profile)
* `GET /api/v1/auth/me` - Get current admin session (`Bearer Token` required)

### 2. Inquiries & CRM Leads (`/api/v1/inquiries`)
* `POST /api/v1/inquiries` - Submit guest inquiry from Celebrations/Contact form
* `GET /api/v1/inquiries` - List all leads with filter & sorting (Admin)
* `GET /api/v1/inquiries/:id` - Get specific lead brief (Admin)
* `PATCH /api/v1/inquiries/:id/status` - Update status (`new`, `in-progress`, `resolved`) (Admin)
* `DELETE /api/v1/inquiries/:id` - Delete lead record (Admin)

### 3. Accommodations & Signature Suites (`/api/v1/accommodations`)
* `GET /api/v1/accommodations` - List all suites & villas
* `GET /api/v1/accommodations/:id` - Get suite details
* `POST /api/v1/accommodations` - Add new suite (Admin)
* `PUT /api/v1/accommodations/:id` - Update suite (Admin)
* `DELETE /api/v1/accommodations/:id` - Delete suite (Admin)

### 4. Offers & Packages (`/api/v1/offers`)
* `GET /api/v1/offers` - List all exclusive packages
* `GET /api/v1/offers/:id` - Get offer details
* `POST /api/v1/offers` - Create new package (Admin)
* `PUT /api/v1/offers/:id` - Update package (Admin)
* `DELETE /api/v1/offers/:id` - Delete package (Admin)

### 5. Media Vault & Gallery (`/api/v1/gallery`)
* `GET /api/v1/gallery` - List all gallery photos
* `POST /api/v1/gallery` - Add photo item (Admin)
* `PUT /api/v1/gallery/:id` - Edit photo item (Admin)
* `DELETE /api/v1/gallery/:id` - Delete photo item (Admin)

### 6. Global Site Settings (`/api/v1/settings`)
* `GET /api/v1/settings` - Retrieve global site & contact configuration
* `PUT /api/v1/settings` - Update contact hotlines & addresses (Admin)

---

## 🛡️ Security & Performance Standards

* **Helmet**: Security HTTP response headers.
* **CORS**: Configured for frontend origin whitelist.
* **Morgan**: HTTP request logger in development.
* **Mongoose Schema Sanitization**: Input trim, validation rules, and schema level constraints.

---

## 👨‍💻 Engineering & Development Team

### 🌟 Project Leadership & Guidance
* **Prityoush Raj**  
  *Head of Information Technology (HOD - IT)*  
  *Country Holidays Hotel & Resorts Pvt. Ltd.*

### 🛠️ Architecture & Core Full-Stack Development
* **Sunny Sharma**  
  *IT Executive & Full-Stack Developer*  
  *Country Holidays Hotel & Resorts Pvt. Ltd.*

---

## 🏢 Organization
**Country Holidays Hotel & Resorts Pvt. Ltd.**  
*Corporate Office:* 111, Rajiv Gandhi Salai, OMR, Kottivakkam, Chennai, Tamil Nadu 600041  
*Official Concierge Desk:* reservations@countryholidays-resorts.com
