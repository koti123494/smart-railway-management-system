// backend/server.js
// SmartRail India - Real-Time Railway Tracking & IoT Backend Server

require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');

const { initWebSocket } = require('./services/websocketService');
const { notFoundHandler, errorHandler } = require('./middleware/errorMiddleware');

const trainRoutes = require('./routes/trainRoutes');
const stationRoutes = require('./routes/stationRoutes');
const iotRoutes = require('./routes/iotRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
initWebSocket(io);

// Security & Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'SmartRail India API',
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime()),
    features: ['Real-Time GPS', 'ESP32 Ingestion', 'Haversine Detection', 'WebSockets']
  });
});

// Mount Routes
app.use('/api/trains', trainRoutes);
app.use('/api/stations', stationRoutes);
app.use('/api/iot', iotRoutes);
app.use('/api/admin', adminRoutes);

// Error Handling
app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚄 SmartRail India Server running on port ${PORT}`);
  console.log(`📡 WebSocket server active and listening`);
  console.log(`🌍 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

module.exports = { app, server };
