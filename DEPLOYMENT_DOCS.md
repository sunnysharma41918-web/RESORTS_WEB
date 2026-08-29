# 🏛️ Country Holidays Hotels & Resorts (CHHR)
## 📚 Complete Production Deployment & Architecture Documentation

---

## 🌐 1. Live Production Deployment Links

| Resource | URL | Service Provider | Status |
|---|---|---|---|
| **Official Website (Apex Domain)** | [https://countryholidaysresorts.com](https://countryholidaysresorts.com) | GoDaddy DNS $\rightarrow$ Vercel Global Edge CDN | 🟢 Live & SSL Secured |
| **Official Website (WWW Subdomain)** | [https://www.countryholidaysresorts.com](https://www.countryholidaysresorts.com) | GoDaddy DNS $\rightarrow$ Vercel Global Edge CDN | 🟢 Live & Auto-Redirect |
| **Admin Concierge Portal** | [https://countryholidaysresorts.com/admin/login](https://countryholidaysresorts.com/admin/login) | Vercel Edge Server | 🟢 Protected by JWT & Auth Guards |
| **Backend REST API** | [https://resorts-web.onrender.com](https://resorts-web.onrender.com) | Render Web Service | 🟢 Live & Connected to MongoDB Atlas |
| **API Health Check Endpoint** | [https://resorts-web.onrender.com/api/health](https://resorts-web.onrender.com/api/health) | Render Web Service | 🟢 Returns 200 OK |
| **Source Code Repository** | [https://github.com/sunnysharma41918-web/RESORTS_WEB](https://github.com/sunnysharma41918-web/RESORTS_WEB) | GitHub (Branch: `main`) | 🟢 Continuous Deployment Enabled |

---

## 🏗️ 2. System Architecture & Traffic Flow

```
[ User Browser / Client ]
           │
           │ HTTPS Request (e.g. https://countryholidaysresorts.com)
           ▼
┌─────────────────────────────────────────────────────────────┐
│                    GoDaddy DNS Management                   │
│   • A Record (@)      ──► 216.198.79.1 (Vercel Anycast IP)  │
│   • CNAME Record (www)──► cname.vercel-dns.com              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                      │
│   • React 18 SPA (Vite Production Build)                    │
│   • Global CDN Asset Caching (dist/assets)                  │
│   • SPA Route Fallback (vercel.json)                        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ REST API Calls (VITE_API_URL)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     Render Web Service                      │
│   • Node.js & Express.js REST API Server                    │
│   • CORS Whitelist for countryholidaysresorts.com           │
│   • Helmet Security Headers & JWT Auth Middleware           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               │ Mongoose Driver (SRV DNS Pool)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                   MongoDB Atlas Cloud DB                    │
│   • Production Database: chhr_resorts                       │
│   • Collections: Inquiries, Accommodations, Offers, Users   │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ 3. Component Details & Deployment Setup

### A. Backend Service on Render

- **Platform**: [Render.com](https://render.com)
- **Service Name**: `RESORTS_WEB`
- **Runtime**: `Node`
- **Branch**: `main`
- **Root Directory**: `server` *(or root with auto-forwarders)*
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Health Check Path**: `/api/health`

#### Environment Variables Configured on Render:
| Variable Name | Production Value | Purpose |
|---|---|---|
| `NODE_ENV` | `production` | Enables production optimizations & secure cookie configs |
| `PORT` | `5000` | Internal application listening port |
| `MONGODB_URI` | `mongodb+srv://chhrcountryholidays_db_user:****@chhr-cluster.jj8mzhx.mongodb.net/chhr_resorts?retryWrites=true&w=majority` | Cloud MongoDB Connection String |
| `JWT_SECRET` | `chhr_luxury_sanctuary_secret_jwt_key_2026_secure` | Cryptographic secret for signing tokens |
| `CLIENT_URL` | `https://countryholidaysresorts.com,https://www.countryholidaysresorts.com` | Allowed CORS origins |

---

### B. Frontend Application on Vercel

- **Platform**: [Vercel.com](https://vercel.com)
- **Framework Preset**: `Vite`
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables Configured on Vercel:
| Variable Name | Value | Purpose |
|---|---|---|
| `VITE_API_URL` | `https://resorts-web.onrender.com/api` | Base URL for all Axios/Fetch backend API calls |
| `VITE_SITE_NAME` | `Country Holidays Travel Resorts` | Global brand name injected into page titles & meta |
| `VITE_ENABLE_3D` | `true` | Enables WebGL & 3D Interactive Three.js/Fiber elements |

---

### C. GoDaddy DNS Configuration Table

In [GoDaddy DNS Management for `countryholidaysresorts.com`](https://dcc.godaddy.com/control/portfolio/countryholidaysresorts.com/settings):

| Record Type | Host / Name | Target / Points To | TTL | Status |
|---|---|---|---|---|
| **A** | `@` | `216.198.79.1` | `600 seconds (1/2 Hour)` | Active (Vercel IP) |
| **CNAME** | `www` | `cname.vercel-dns.com.` | `600 seconds (1/2 Hour)` | Active (Vercel Alias) |

---

## 🔐 4. Super Administrator CMS Access

- **Portal URL**: `https://countryholidaysresorts.com/admin/login`
- **Super Administrator ID**: `CHHR0012`
- **Super Administrator Password**: `CHR456`
- **Session Lifespan**: 10 minutes rolling inactivity timeout with automated JWT security revocation.

---

## 🔄 5. Continuous Deployment (CI/CD) Workflow

Every time changes are committed and pushed to the `main` branch on GitHub:
1. **Vercel** automatically triggers a production rebuild of the React client.
2. **Render** automatically pulls the latest commit and restarts the Node.js backend without downtime.

```powershell
# Standard Workflow to deploy updates
git add .
git commit -m "Describe your update here"
git push origin main
```

---

## 💡 6. 24/7 Backend Keep-Alive (Zero Cold Start Delay)

Because Render free-tier instances sleep after 15 minutes of idle traffic:
1. Register a free account at [UptimeRobot.com](https://uptimerobot.com) or [cron-job.org](https://cron-job.org).
2. Create an **HTTP(s) Monitor**:
   - **Monitor URL**: `https://resorts-web.onrender.com/api/health`
   - **Monitoring Interval**: `10 minutes`
3. This sends a lightweight ping every 10 minutes, keeping the backend 24/7 active with 0ms cold-start latency.

---

## 👨‍💻 Engineering Team & Governance

- **Project Leadership**: *Prityoush Raj (HOD - IT, Country Holidays Hotel & Resorts Pvt. Ltd.)*
- **Architecture & Full-Stack Development**: *Sunny Sharma (IT Executive & Full-Stack Developer)*
- **Organization**: *Country Holidays Hotel & Resorts Pvt. Ltd., Chennai, Tamil Nadu, India*
