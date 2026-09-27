# 🚆 RailTrack India — Live Indian Train Monitoring & Tracking Website

A modern, responsive web application for Indian Railway commuters, rail enthusiasts, and travelers. Search trains, inspect complete route timetables, monitor real-time running status and delay predictions, and trace train journeys on an interactive OpenStreetMap layer with vertical station progression timelines.

---

## 📸 Key Features

* **Real-Time Train Search**: Search by train number (e.g. `12801`, `12723`, `22436`, `12951`) or train name with instant filtering.
* **Interactive Leaflet Map**: Renders full train route polylines and intermediate station markers with Leaflet and OpenStreetMap (no paid Google Maps API required).
* **Vertical Station Timeline**: Clear visual status indicators for **Completed** (departed), **Current / Last Reported** (pulsing radar beacon), **Upcoming**, and **Delayed** stops.
* **Strict Data Accuracy Guarantee**: Distinguishes transparently between **Live GPS Location**, **Latest Reported Station**, and **Scheduled Location**. The app **never** fabricates or hallucinates GPS coordinates.
* **Station Directory & Live Boards**: Search any Indian railway station (e.g., `BZA`, `NDLS`, `HWH`, `SBC`) to view operational platforms, division, zone, and scheduled passing trains.
* **Automated Status Refresh**: Auto-refresh interval (15s, 30s, 60s, 2m, or paused) with relative time counters ("Last updated 32 seconds ago") and request throttling.
* **Swappable Provider Architecture**: Backend abstraction layer (`RailwayService`) supports seamless toggling between realistic offline mock simulation and real external APIs (e.g. RapidAPI IRCTC).
* **Dark & Light Mode**: Accessible, high-contrast dashboard with railway color palette (Green = Running, Amber = Delayed, Red = Cancelled).

---

## 🛠️ Technology Stack

### Frontend
* **React 18** with **Vite** & **TypeScript**
* **Tailwind CSS** (responsive mobile/tablet/desktop layout & dark mode)
* **Leaflet & React-Leaflet** (OpenStreetMap tiles, custom SVG markers)
* **Lucide React** (icons and accessible status badges)
* **React Router DOM v6** (client-side routing)
* **Axios** (API requests)

### Backend
* **Node.js** & **Express.js** with **TypeScript**
* **RailwayService Abstraction Layer**
* **In-Memory TTL Cache** (prevents external API quota exhaustion)
* **Express Rate Limiter** (prevents client hammering)
* **Vitest & Supertest** (unit and integration tests)

---

## 📁 Project Structure

```text
c:\Users\yetur\OneDrive\Documents\Appp\
├── .env.example                       # Root environment variables sample
├── .gitignore                         # Git ignore rules
├── README.md                          # Project documentation
├── package.json                       # Root workspace orchestrator
│
├── backend/                           # Express + TypeScript API Server
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   ├── .env
│   ├── src/
│   │   ├── config/
│   │   │   └── railway.ts             # Typed config loader
│   │   ├── types/
│   │   │   └── railway.ts             # Domain models (Train, Stop, Status, Location)
│   │   ├── services/
│   │   │   └── railway/
│   │   │       ├── RailwayApiProvider.ts   # Provider interface
│   │   │       ├── MockRailwayProvider.ts  # Realistic mock dataset (10+ trains, 40+ stns)
│   │   │       ├── RealRailwayProvider.ts  # External API client (RapidAPI/IRCTC)
│   │   │       └── RailwayService.ts       # Singleton with cache & throttling
│   │   ├── middleware/
│   │   │   ├── rateLimiter.ts         # Express rate limiter
│   │   │   ├── validator.ts           # Train number & station code validators
│   │   │   └── errorHandler.ts        # Normalized error responses
│   │   ├── controllers/
│   │   │   ├── trainController.ts
│   │   │   ├── stationController.ts
│   │   │   └── dashboardController.ts
│   │   ├── routes/
│   │   │   ├── trainRoutes.ts
│   │   │   ├── stationRoutes.ts
│   │   │   └── dashboardRoutes.ts
│   │   ├── app.ts                     # Express app factory
│   │   └── index.ts                   # Server bootstrap
│   └── tests/
│       ├── railwayService.test.ts     # Provider unit tests
│       └── apiRoutes.test.ts          # Supertest route integration tests
│
└── frontend/                          # React + Vite + Tailwind Client
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts                 # Proxy to backend on port 5000
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── types/                     # Frontend TypeScript types
        ├── services/
        │   └── api.ts                 # Axios client
        ├── context/
        │   └── ThemeContext.tsx       # Dark/Light mode provider
        ├── components/
        │   ├── layout/                # Navbar, Footer, ThemeToggle
        │   ├── common/                # StatusBadge, LocationSourceBadge, AutoRefreshControl, SearchBar
        │   ├── train/                 # TrainCard, TrainMap, RouteTimeline, ScheduleTable
        │   └── dashboard/             # StatsOverview, RecentSearches
        ├── pages/
        │   ├── HomePage.tsx           # Hero search & network overview
        │   ├── TrainSearchPage.tsx    # Search & filters
        │   ├── LiveTrackingPage.tsx   # Map & vertical journey timeline
        │   ├── TrainSchedulePage.tsx  # Timetable halt table
        │   ├── TrainDetailsPage.tsx   # Detailed multi-tab breakdown
        │   ├── StationSearchPage.tsx  # Station directory
        │   ├── StationDetailPage.tsx  # Station live board
        │   ├── AboutPage.tsx          # Telemetry & accuracy policy
        │   └── NotFoundPage.tsx
        ├── App.tsx
        ├── main.tsx
        └── index.css
```

---

## 🚀 How to Install and Run Locally

### Prerequisites
* **Node.js**: v18 or later (v24.x LTS recommended)
* **npm**: v9 or later

### 1. Install Dependencies

In the backend directory:
```bash
cd backend
npm install
```

In the frontend directory:
```bash
cd ../frontend
npm install
```

---

### 2. Configure Environment Variables

Create `backend/.env` (or copy from `.env.example`):
```env
PORT=5000
NODE_ENV=development
USE_MOCK_RAILWAY_API=true
RAILWAY_API_KEY=
RAILWAY_API_BASE_URL=https://irctc1.p.rapidapi.com/api/v1
RAILWAY_API_HOST=irctc1.p.rapidapi.com
CACHE_TTL_LIVE_STATUS=30
CACHE_TTL_SCHEDULE=3600
RATE_LIMIT_MAX=200
FRONTEND_URL=http://localhost:5173
```

> **Note**: When `USE_MOCK_RAILWAY_API=true`, no API key is required. The system automatically runs with realistic mock telemetry for major Indian trains.

---

### 3. Start the Application

You can start backend and frontend concurrently from the root directory or in separate terminals:

#### Terminal 1 — Backend:
```bash
cd backend
npm run dev
```
The API server will listen on `http://localhost:5000`.

#### Terminal 2 — Frontend:
```bash
cd frontend
npm run dev
```
Vite will start the client on `http://localhost:5173`. Open `http://localhost:5173` in your browser.

---

### 4. Running Backend Tests

Run the test suite using Vitest:
```bash
cd backend
npm test
```

Tests cover:
* Train searching by number and name
* Schedule retrieval
* Live status with delay calculation
* **Data accuracy assertion**: Confirms `hasGps: false` and `locationType: 'LAST_REPORTED_STATION'`
* Station searches and passing train listings
* Invalid train number validation (HTTP 400)
* Missing train handling (HTTP 404)
* Health endpoint check

---

## 🔑 How to Configure a Free Railway API

To switch from Mock mode to a live Railway API:

1. Sign up on [RapidAPI](https://rapidapi.com/) and subscribe to a free tier Indian Railways / IRCTC API (e.g., `IRCTC API` or `Indian Railways - Free Tier`).
2. Obtain your RapidAPI key (`x-rapidapi-key`).
3. Update `backend/.env`:
   ```env
   USE_MOCK_RAILWAY_API=false
   RAILWAY_API_KEY=your_rapidapi_key_here
   RAILWAY_API_BASE_URL=https://irctc1.p.rapidapi.com/api/v1
   RAILWAY_API_HOST=irctc1.p.rapidapi.com
   ```
4. Restart the backend server. The application will immediately begin dispatching requests through `RealRailwayProvider`.
5. **Fail-Safe Fallback**: If the external API key expires, encounters network timeouts, or exhausts its daily free quota, `RealRailwayProvider` will automatically log a warning and fallback smoothly to `MockRailwayProvider` without interrupting user service.

---

## 🔌 API Endpoints Reference

All endpoints return normalized, consistent JSON:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Service uptime and active provider mode |
| `GET` | `/api/trains/search?q={query}` | Search trains by number or name |
| `GET` | `/api/trains/:trainNumber` | Complete train overview & status |
| `GET` | `/api/trains/:trainNumber/schedule` | Complete station timetable and halt table |
| `GET` | `/api/trains/:trainNumber/status` | Live running status, delay, and station timeline |
| `GET` | `/api/trains/:trainNumber/location` | Geographic coordinates with explicit locationType |
| `GET` | `/api/stations/search?q={query}` | Search stations by code or name |
| `GET` | `/api/stations/:code` | Station details with operational platforms & calling trains |
| `GET` | `/api/dashboard/stats` | Aggregated counts of tracked, running, and delayed trains |

---

## 🛡️ Important Data Accuracy Policy

Unlike conventional flight or ship radar trackers that utilize continuous ADS-B / AIS transponders, Indian Railways primarily tracks passenger trains using station block signal logs (via NTES/COA feeds) rather than continuous public GPS feeds.

RailTrack India strictly follows these ethical accuracy rules:
1. **Never Falsify GPS**: We never fabricate continuous lat/lng coordinates between stations.
2. **Clear Location Classification**:
   * `LAST_REPORTED_STATION`: The train was physically logged at this station block.
   * `LIVE_GPS`: Displayed only when hardware satellite telemetry is confirmed.
   * `ESTIMATED`: Position mathematically calculated from departure time, section distance, and delay.
3. **Transparent Timestamping**: Every status update clearly indicates when it was last received and from which data provider.

---

## 📄 License
MIT License. Crafted for Indian Railway commuters.
