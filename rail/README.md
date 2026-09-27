# SmartRail India — Real-Time Railway Tracking & IoT Monitoring Platform

> **Smart India Hackathon (SIH) Prototype**  
> An edge IoT train tracking and passenger information platform combining "Where Is My Train" real-time navigation with ESP32-based hardware telemetry, Haversine station detection, dynamic ETA prediction, and zero-refresh WebSockets.

---

## 🌟 Key Features

1. **"Where Is My Train" Style Real-Time Tracking**:
   - Live location cards with *"Between Station A and Station B"* or *"At Station (Platform X)"*.
   - Route timeline with color-coded stops: Green (Departed), Blue (Current / In-transit), Gray (Upcoming).
   - Platform numbers, scheduled vs estimated arrival and departure times, and delay tags.

2. **Edge IoT ESP32 Integration**:
   - Arduino C++ firmware for ESP32 + NEO-6M GPS modules.
   - HTTP/HTTPS REST packet ingestion with device authentication.
   - Real-time battery voltage, cellular signal (dBm), locomotive speed, heading azimuth, coach temperature, and vibration telemetry.

3. **Interactive Leaflet GIS Live Map**:
   - Custom SVG train marker with direction rotation and animated pulsing radar beacon.
   - Route polylines and interactive station pins with popups.
   - Follow-train auto-centering mode.

4. **Automated Mathematical Station Detection**:
   - Haversine Great-Circle distance formula calculates train proximity to all railway stations along the route.
   - Dynamic thresholding (< 1.5 km = docked at station).

5. **Dynamic Predictive ETA Engine**:
   - Computes arrival times dynamically using current GPS speed, remaining track distance, and historical delays.

6. **WebSockets Live Updates**:
   - Socket.IO rooms push new coordinate packets directly to user screens without page reloads.

7. **Zero-Config Portability**:
   - Pre-seeded with authentic Indian Railway routes (Telangana Express 12723, Vande Bharat Express 20833, Rajdhani Express 12433, Karnataka Express 12627) and station geocodes.
   - Runs out-of-the-box on any evaluator's computer without pre-installing database servers.

8. **In-App Live GPS Simulator for SIH Presentations**:
   - Interactive widget right in the browser to start/pause live simulated train journeys and send manual GPS packets for live demonstration to judges indoors.

---

## 📁 Project Architecture

```
rail/
├── backend/
│   ├── config/
│   │   ├── db.js                     # Persistent data store & access layer
│   │   └── seedData.js               # Indian Railway trains, stations & schedules
│   ├── controllers/
│   │   ├── adminController.js        # Device registration, assignment, stats, logs
│   │   ├── iotController.js          # ESP32 REST ingest & simulator endpoints
│   │   ├── stationController.js      # Station directory & live boards
│   │   └── trainController.js        # Search, details, and live status
│   ├── middleware/
│   │   ├── authMiddleware.js         # ESP32 device & admin secret verification
│   │   └── errorMiddleware.js        # Unified JSON error handling
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── iotRoutes.js
│   │   ├── stationRoutes.js
│   │   └── trainRoutes.js
│   ├── services/
│   │   ├── etaCalculationService.js  # Dynamic ETA & schedule calculator
│   │   ├── iotService.js             # Telemetry validation & broadcast
│   │   ├── railwayApiService.js      # Pluggable Railway API (Mock + Real)
│   │   ├── stationDetectionService.js# Haversine distance & station detection
│   │   └── websocketService.js       # Socket.IO rooms & event fan-out
│   ├── simulator/
│   │   ├── simulate.js               # Standalone CLI simulator runner
│   │   └── trainSimulator.js         # Route waypoint interpolation engine
│   ├── package.json
│   └── server.js                     # Express app + HTTP + Socket.IO server
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/               # Header, Footer, Badges, Spinners
│   │   │   ├── iot/                  # DeviceCard, DeviceTable, GpsSimulatorWidget
│   │   │   ├── search/               # TrainSearchTabs, TrainCard
│   │   │   └── tracking/             # TrainMap, StationTimeline, LiveLocationCard, TelemetryCard
│   │   ├── context/
│   │   │   ├── SocketContext.jsx     # WebSocket client provider
│   │   │   └── ThemeContext.jsx      # Dark/Light mode switcher
│   │   ├── hooks/
│   │   │   └── useTrainTracking.js   # Real-time WebSocket hook
│   │   ├── pages/
│   │   │   ├── AboutPage.jsx         # SIH architecture & presentation
│   │   │   ├── AdminPage.jsx         # Device management & system logs
│   │   │   ├── HomePage.jsx          # Hero search, live stats & innovations
│   │   │   ├── IoTOverviewPage.jsx   # ESP32 fleet telemetry dashboard
│   │   │   ├── LiveTrainsPage.jsx    # Active fleet overview
│   │   │   ├── SearchPage.jsx        # Train search & route filters
│   │   │   ├── StationsPage.jsx      # Station directory & platform boards
│   │   │   └── TrackTrainPage.jsx    # Live map + timeline tracking (/track/:trainNumber)
│   │   ├── services/
│   │   │   └── api.js                # Axios REST client
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── firmware/
│   ├── esp32_smartrail_tracker.ino   # Complete Arduino C++ sketch for ESP32 + NEO-6M
│   └── HARDWARE_GUIDE.md             # Pinouts, wiring diagrams, and deployment guide
│
├── .env.example
├── package.json                      # Monorepo root with concurrently scripts
└── README.md
```

---

## 🚀 Quick Start (Running the Application)

### 1. Prerequisites
- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)

### 2. Install Dependencies
Run the install command from the root directory:
```bash
npm run install:all
```
*(Or install in root, `backend/`, and `frontend/` separately).*

### 3. Start Development Servers Concurrently
To start both the Backend (port 5000) and Frontend (port 5173) together:
```bash
npm run dev
```

- **Frontend Dashboard**: Open [http://localhost:5173](http://localhost:5173)
- **Backend API Health**: Open [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 REST API Specifications

### Train Endpoints
- `GET /api/trains/search?q=12723` — Search trains by number or name
- `GET /api/trains/search?from=HYB&to=NDLS` — Search trains between stations
- `GET /api/trains/live` — Active trains currently being tracked
- `GET /api/trains/:trainNumber` — Train schedule and route stops
- `GET /api/trains/:trainNumber/status` — Real-time tracking status, station detection, and dynamic ETAs

### Station Endpoints
- `GET /api/stations/search?q=BZA` — Search stations by code or city
- `GET /api/stations/:stationCode` — Station details and live arrival/departure board

### IoT & Telemetry Endpoints
- `POST /api/iot/location` — ESP32 REST Ingestion Endpoint
  - Headers: `Content-Type: application/json`, `x-device-secret: smartrail_esp32_super_secret_key_2026`
  - Payload:
    ```json
    {
      "deviceId": "ESP32-TRAIN-001",
      "trainNumber": "12723",
      "latitude": 18.8150,
      "longitude": 79.4670,
      "speed": 78.5,
      "direction": 355,
      "batteryLevel": 94,
      "signalDbm": -68,
      "timestamp": "2026-09-10T10:30:00Z"
    }
    ```
- `GET /api/iot/devices` — List all registered IoT devices & online status
- `GET /api/iot/devices/:deviceId/history` — Historical GPS trail
- `POST /api/iot/simulator/start` — Start continuous route simulation
- `POST /api/iot/simulator/stop` — Stop simulation

### Admin Endpoints
- `POST /api/admin/devices` — Register new ESP32 tracker
- `POST /api/admin/devices/assign` — Assign device to train
- `GET /api/admin/stats` — System health, memory, and active WebSocket connections
- `GET /api/admin/logs` — Audit trail

---

## 🧪 How to Demonstrate During Smart India Hackathon (SIH)

### Demonstration Step-by-Step Script for Judges:

1. **Show the Home Page (`/`)**:
   - Point out the **"SmartRail India"** railway design, dark/light mode, and live stats.
   - In the search bar, search `12723` or click **"12723 Telangana Exp"**.

2. **Demonstrate Real-Time "Where Is My Train" Tracking (`/track/12723`)**:
   - Show the **Live Location Card**: Notice *"Between Ramagundam and Manchiryal"*, Next Station countdown, and speed.
   - Show the **Leaflet Live Map**: Point out the custom animated train marker and route polyline.
   - Show the **Station Timeline**: Explain the color coding (Green = departed, Blue = current, Gray = upcoming) and platform numbers.

3. **Demonstrate Live Moving Telemetry (Zero-Refresh Updates)**:
   - On the same page or on `/iot-dashboard`, look at the **SIH Live GPS Simulator** widget.
   - Click **"Start Continuous Route Simulation"**.
   - **Show the judges**: The train marker moves smoothly along the railway tracks on the Leaflet map, the speed updates, and the station detection recalculates distances and ETAs in real-time without refreshing the browser!

4. **Demonstrate the IoT Telemetry Dashboard (`/iot-dashboard`)**:
   - Show the **ESP32 Fleet Telemetry Table**: Green online pills, battery percentages, and GPS coordinates.
   - Show the hardware profiles and signal dBm values.

5. **Demonstrate Physical Hardware (If bringing ESP32 DevKit to SIH)**:
   - Connect ESP32 to power bank.
   - Flash `firmware/esp32_smartrail_tracker.ino` using Arduino IDE.
   - Connect to mobile hotspot and observe live pings logged in the backend and displayed on the UI!
