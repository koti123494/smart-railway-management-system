// frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Train APIs
export const searchTrains = (query = '', from = '', to = '') => {
  const params = {};
  if (from && to) {
    params.from = from;
    params.to = to;
  } else if (query) {
    params.q = query;
  }
  return api.get('/trains/search', { params });
};

export const getTrainDetails = (trainNumber) => {
  return api.get(`/trains/${trainNumber}`);
};

export const getTrainLiveStatus = (trainNumber) => {
  return api.get(`/trains/${trainNumber}/status`);
};

export const getAllLiveTrains = () => {
  return api.get('/trains/live');
};

// Station APIs
export const searchStations = (query = '') => {
  return api.get('/stations/search', { params: { q: query } });
};

export const getStationDetails = (stationCode) => {
  return api.get(`/stations/${stationCode}`);
};

// IoT & Telemetry APIs
export const getDevices = () => {
  return api.get('/iot/devices');
};

export const getDeviceById = (deviceId) => {
  return api.get(`/iot/devices/${deviceId}`);
};

export const getDeviceHistory = (deviceId, limit = 50) => {
  return api.get(`/iot/devices/${deviceId}/history`, { params: { limit } });
};

export const postLocation = (payload) => {
  return api.post('/iot/location', payload);
};

// Simulator APIs (for SIH Live Demonstration)
export const startSimulation = (trainNumber, intervalMs = 3000) => {
  return api.post('/iot/simulator/start', { trainNumber, intervalMs });
};

export const stopSimulation = (trainNumber) => {
  return api.post('/iot/simulator/stop', { trainNumber });
};

export const getSimulationStatus = () => {
  return api.get('/iot/simulator/status');
};

// Admin & Stats APIs
export const getSystemStats = () => {
  return api.get('/admin/stats');
};

export const getAuditLogs = () => {
  return api.get('/admin/logs');
};

export const registerDevice = (deviceData) => {
  return api.post('/admin/devices', deviceData);
};

export const assignDevice = (deviceId, trainNumber) => {
  return api.post('/admin/devices/assign', { deviceId, trainNumber });
};

export default api;
