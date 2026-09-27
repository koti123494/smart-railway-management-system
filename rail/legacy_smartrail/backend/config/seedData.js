// backend/config/seedData.js
// Authentic Indian Railways seed dataset for SmartRail India SIH prototype

const stations = [
  { code: 'HYB', name: 'Hyderabad Deccan Nampally', city: 'Hyderabad', state: 'Telangana', latitude: 17.3917, longitude: 78.4735, zone: 'SCR' },
  { code: 'SC', name: 'Secunderabad Junction', city: 'Hyderabad', state: 'Telangana', latitude: 17.4334, longitude: 78.5044, zone: 'SCR' },
  { code: 'KZJ', name: 'Kazipet Junction', city: 'Kazipet', state: 'Telangana', latitude: 17.9788, longitude: 79.5222, zone: 'SCR' },
  { code: 'WL', name: 'Warangal', city: 'Warangal', state: 'Telangana', latitude: 17.9689, longitude: 79.5941, zone: 'SCR' },
  { code: 'KMT', name: 'Khammam', city: 'Khammam', state: 'Telangana', latitude: 17.2473, longitude: 80.1514, zone: 'SCR' },
  { code: 'BZA', name: 'Vijayawada Junction', city: 'Vijayawada', state: 'Andhra Pradesh', latitude: 16.5186, longitude: 80.6195, zone: 'SCR' },
  { code: 'TEL', name: 'Tenali Junction', city: 'Tenali', state: 'Andhra Pradesh', latitude: 16.2430, longitude: 80.6400, zone: 'SCR' },
  { code: 'RJY', name: 'Rajahmundry', city: 'Rajahmundry', state: 'Andhra Pradesh', latitude: 17.0005, longitude: 81.7774, zone: 'SCR' },
  { code: 'SLO', name: 'Samalkot Junction', city: 'Samalkot', state: 'Andhra Pradesh', latitude: 17.0506, longitude: 82.1706, zone: 'SCR' },
  { code: 'VSKP', name: 'Visakhapatnam Junction', city: 'Visakhapatnam', state: 'Andhra Pradesh', latitude: 17.7215, longitude: 83.2872, zone: 'ECoR' },
  { code: 'RDM', name: 'Ramagundam', city: 'Ramagundam', state: 'Telangana', latitude: 18.7617, longitude: 79.4746, zone: 'SCR' },
  { code: 'MCI', name: 'Manchiryal', city: 'Mancherial', state: 'Telangana', latitude: 18.8711, longitude: 79.4589, zone: 'SCR' },
  { code: 'BPA', name: 'Bellampalli', city: 'Bellampalli', state: 'Telangana', latitude: 19.0625, longitude: 79.4975, zone: 'SCR' },
  { code: 'SKZR', name: 'Sirpur Kaghaznagar', city: 'Sirpur Kaghaznagar', state: 'Telangana', latitude: 19.3400, longitude: 79.4883, zone: 'SCR' },
  { code: 'BPQ', name: 'Balharshah Junction', city: 'Balharshah', state: 'Maharashtra', latitude: 19.8519, longitude: 79.3517, zone: 'CR' },
  { code: 'CD', name: 'Chandrapur', city: 'Chandrapur', state: 'Maharashtra', latitude: 19.9575, longitude: 79.2961, zone: 'CR' },
  { code: 'NGP', name: 'Nagpur Junction', city: 'Nagpur', state: 'Maharashtra', latitude: 21.1525, longitude: 79.0888, zone: 'CR' },
  { code: 'BPL', name: 'Bhopal Junction', city: 'Bhopal', state: 'Madhya Pradesh', latitude: 23.2676, longitude: 77.4126, zone: 'WCR' },
  { code: 'RKMP', name: 'Rani Kamlapati', city: 'Bhopal', state: 'Madhya Pradesh', latitude: 23.2054, longitude: 77.4396, zone: 'WCR' },
  { code: 'VGLJ', name: 'VGL Jhansi Junction', city: 'Jhansi', state: 'Uttar Pradesh', latitude: 25.4484, longitude: 78.5685, zone: 'NCR' },
  { code: 'GWL', name: 'Gwalior Junction', city: 'Gwalior', state: 'Madhya Pradesh', latitude: 26.2183, longitude: 78.1828, zone: 'NCR' },
  { code: 'AGC', name: 'Agra Cantt', city: 'Agra', state: 'Uttar Pradesh', latitude: 27.1592, longitude: 77.9902, zone: 'NCR' },
  { code: 'MTJ', name: 'Mathura Junction', city: 'Mathura', state: 'Uttar Pradesh', latitude: 27.4924, longitude: 77.6737, zone: 'NCR' },
  { code: 'NZM', name: 'Hazrat Nizamuddin', city: 'New Delhi', state: 'Delhi', latitude: 28.5889, longitude: 77.2534, zone: 'NR' },
  { code: 'NDLS', name: 'New Delhi', city: 'New Delhi', state: 'Delhi', latitude: 28.6415, longitude: 77.2209, zone: 'NR' },
  { code: 'MAS', name: 'MGR Chennai Central', city: 'Chennai', state: 'Tamil Nadu', latitude: 13.0827, longitude: 80.2707, zone: 'SR' },
  { code: 'SBC', name: 'KSR Bengaluru City', city: 'Bengaluru', state: 'Karnataka', latitude: 12.9781, longitude: 77.5696, zone: 'SWR' },
  { code: 'HWH', name: 'Howrah Junction', city: 'Kolkata', state: 'West Bengal', latitude: 22.5838, longitude: 88.3426, zone: 'ER' }
];

const trains = [
  {
    trainNumber: '12723',
    trainName: 'Telangana Express',
    trainType: 'Superfast Express',
    sourceCode: 'HYB',
    sourceName: 'Hyderabad Deccan',
    destinationCode: 'NDLS',
    destinationName: 'New Delhi',
    totalDistance: 1677,
    durationHours: '26h 15m',
    avgSpeed: 64,
    status: 'Running',
    currentDelayMinutes: 8,
    activeDeviceId: 'ESP32-TRAIN-001',
    route: [
      { stopOrder: 1, stationCode: 'HYB', stationName: 'Hyderabad Deccan', arrivalTime: '--:--', departureTime: '06:00', haltMinutes: 0, distanceKm: 0, platform: '5', day: 1 },
      { stopOrder: 2, stationCode: 'SC', stationName: 'Secunderabad Jn', arrivalTime: '06:20', departureTime: '06:25', haltMinutes: 5, distanceKm: 9, platform: '1', day: 1 },
      { stopOrder: 3, stationCode: 'KZJ', stationName: 'Kazipet Jn', arrivalTime: '08:03', departureTime: '08:05', haltMinutes: 2, distanceKm: 141, platform: '2', day: 1 },
      { stopOrder: 4, stationCode: 'RDM', stationName: 'Ramagundam', arrivalTime: '09:18', departureTime: '09:20', haltMinutes: 2, distanceKm: 234, platform: '1', day: 1 },
      { stopOrder: 5, stationCode: 'MCI', stationName: 'Manchiryal', arrivalTime: '09:34', departureTime: '09:35', haltMinutes: 1, distanceKm: 248, platform: '1', day: 1 },
      { stopOrder: 6, stationCode: 'BPA', stationName: 'Bellampalli', arrivalTime: '09:49', departureTime: '09:50', haltMinutes: 1, distanceKm: 267, platform: '1', day: 1 },
      { stopOrder: 7, stationCode: 'SKZR', stationName: 'Sirpur Kaghaznagar', arrivalTime: '10:19', departureTime: '10:20', haltMinutes: 1, distanceKm: 306, platform: '1', day: 1 },
      { stopOrder: 8, stationCode: 'BPQ', stationName: 'Balharshah Jn', arrivalTime: '11:45', departureTime: '11:55', haltMinutes: 10, distanceKm: 376, platform: '4', day: 1 },
      { stopOrder: 9, stationCode: 'CD', stationName: 'Chandrapur', arrivalTime: '12:13', departureTime: '12:15', haltMinutes: 2, distanceKm: 390, platform: '1', day: 1 },
      { stopOrder: 10, stationCode: 'NGP', stationName: 'Nagpur Jn', arrivalTime: '15:20', departureTime: '15:25', haltMinutes: 5, distanceKm: 584, platform: '2', day: 1 },
      { stopOrder: 11, stationCode: 'BPL', stationName: 'Bhopal Jn', arrivalTime: '21:45', departureTime: '21:55', haltMinutes: 10, distanceKm: 974, platform: '1', day: 1 },
      { stopOrder: 12, stationCode: 'VGLJ', stationName: 'VGL Jhansi Jn', arrivalTime: '01:50', departureTime: '01:58', haltMinutes: 8, distanceKm: 1266, platform: '3', day: 2 },
      { stopOrder: 13, stationCode: 'GWL', stationName: 'Gwalior Jn', arrivalTime: '03:09', departureTime: '03:11', haltMinutes: 2, distanceKm: 1363, platform: '2', day: 2 },
      { stopOrder: 14, stationCode: 'AGC', stationName: 'Agra Cantt', arrivalTime: '05:05', departureTime: '05:07', haltMinutes: 2, distanceKm: 1481, platform: '1', day: 2 },
      { stopOrder: 15, stationCode: 'MTJ', stationName: 'Mathura Jn', arrivalTime: '05:43', departureTime: '05:45', haltMinutes: 2, distanceKm: 1535, platform: '2', day: 2 },
      { stopOrder: 16, stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '09:05', departureTime: '--:--', haltMinutes: 0, distanceKm: 1677, platform: '6', day: 2 }
    ]
  },
  {
    trainNumber: '20833',
    trainName: 'Vande Bharat Express',
    trainType: 'Vande Bharat',
    sourceCode: 'VSKP',
    sourceName: 'Visakhapatnam',
    destinationCode: 'SC',
    destinationName: 'Secunderabad',
    totalDistance: 699,
    durationHours: '8h 30m',
    avgSpeed: 82,
    status: 'Running',
    currentDelayMinutes: 0,
    activeDeviceId: 'ESP32-TRAIN-002',
    route: [
      { stopOrder: 1, stationCode: 'VSKP', stationName: 'Visakhapatnam', arrivalTime: '--:--', departureTime: '05:45', haltMinutes: 0, distanceKm: 0, platform: '1', day: 1 },
      { stopOrder: 2, stationCode: 'SLO', stationName: 'Samalkot Jn', arrivalTime: '07:14', departureTime: '07:15', haltMinutes: 1, distanceKm: 151, platform: '3', day: 1 },
      { stopOrder: 3, stationCode: 'RJY', stationName: 'Rajahmundry', arrivalTime: '07:53', departureTime: '07:55', haltMinutes: 2, distanceKm: 201, platform: '1', day: 1 },
      { stopOrder: 4, stationCode: 'BZA', stationName: 'Vijayawada Jn', arrivalTime: '09:50', departureTime: '09:55', haltMinutes: 5, distanceKm: 350, platform: '6', day: 1 },
      { stopOrder: 5, stationCode: 'KMT', stationName: 'Khammam', arrivalTime: '11:00', departureTime: '11:01', haltMinutes: 1, distanceKm: 449, platform: '1', day: 1 },
      { stopOrder: 6, stationCode: 'WL', stationName: 'Warangal', arrivalTime: '12:05', departureTime: '12:06', haltMinutes: 1, distanceKm: 556, platform: '1', day: 1 },
      { stopOrder: 7, stationCode: 'SC', stationName: 'Secunderabad Jn', arrivalTime: '14:15', departureTime: '--:--', haltMinutes: 0, distanceKm: 699, platform: '10', day: 1 }
    ]
  },
  {
    trainNumber: '12433',
    trainName: 'Rajdhani Express',
    trainType: 'Rajdhani',
    sourceCode: 'MAS',
    sourceName: 'MGR Chennai Central',
    destinationCode: 'NZM',
    destinationName: 'Hazrat Nizamuddin',
    totalDistance: 2175,
    durationHours: '28h 10m',
    avgSpeed: 77,
    status: 'Running',
    currentDelayMinutes: 12,
    activeDeviceId: 'ESP32-TRAIN-003',
    route: [
      { stopOrder: 1, stationCode: 'MAS', stationName: 'Chennai Central', arrivalTime: '--:--', departureTime: '06:05', haltMinutes: 0, distanceKm: 0, platform: '2', day: 1 },
      { stopOrder: 2, stationCode: 'BZA', stationName: 'Vijayawada Jn', arrivalTime: '11:50', departureTime: '12:00', haltMinutes: 10, distanceKm: 431, platform: '1', day: 1 },
      { stopOrder: 3, stationCode: 'WL', stationName: 'Warangal', arrivalTime: '14:48', departureTime: '14:50', haltMinutes: 2, distanceKm: 638, platform: '1', day: 1 },
      { stopOrder: 4, stationCode: 'BPQ', stationName: 'Balharshah Jn', arrivalTime: '18:10', departureTime: '18:15', haltMinutes: 5, distanceKm: 881, platform: '4', day: 1 },
      { stopOrder: 5, stationCode: 'NGP', stationName: 'Nagpur Jn', arrivalTime: '20:55', departureTime: '21:00', haltMinutes: 5, distanceKm: 1090, platform: '1', day: 1 },
      { stopOrder: 6, stationCode: 'BPL', stationName: 'Bhopal Jn', arrivalTime: '02:05', departureTime: '02:15', haltMinutes: 10, distanceKm: 1479, platform: '1', day: 2 },
      { stopOrder: 7, stationCode: 'VGLJ', stationName: 'VGL Jhansi Jn', arrivalTime: '05:20', departureTime: '05:25', haltMinutes: 5, distanceKm: 1771, platform: '4', day: 2 },
      { stopOrder: 8, stationCode: 'GWL', stationName: 'Gwalior Jn', arrivalTime: '06:23', departureTime: '06:25', haltMinutes: 2, distanceKm: 1869, platform: '2', day: 2 },
      { stopOrder: 9, stationCode: 'AGC', stationName: 'Agra Cantt', arrivalTime: '07:50', departureTime: '07:52', haltMinutes: 2, distanceKm: 1987, platform: '1', day: 2 },
      { stopOrder: 10, stationCode: 'NZM', stationName: 'Hazrat Nizamuddin', arrivalTime: '10:30', departureTime: '--:--', haltMinutes: 0, distanceKm: 2175, platform: '6', day: 2 }
    ]
  },
  {
    trainNumber: '12627',
    trainName: 'Karnataka Express',
    trainType: 'Superfast Express',
    sourceCode: 'SBC',
    sourceName: 'KSR Bengaluru',
    destinationCode: 'NDLS',
    destinationName: 'New Delhi',
    totalDistance: 2409,
    durationHours: '38h 20m',
    avgSpeed: 63,
    status: 'Running',
    currentDelayMinutes: 5,
    activeDeviceId: null,
    route: [
      { stopOrder: 1, stationCode: 'SBC', stationName: 'KSR Bengaluru', arrivalTime: '--:--', departureTime: '19:20', haltMinutes: 0, distanceKm: 0, platform: '1', day: 1 },
      { stopOrder: 2, stationCode: 'SC', stationName: 'Secunderabad Jn', arrivalTime: '07:35', departureTime: '07:45', haltMinutes: 10, distanceKm: 650, platform: '1', day: 2 },
      { stopOrder: 3, stationCode: 'KZJ', stationName: 'Kazipet Jn', arrivalTime: '09:28', departureTime: '09:30', haltMinutes: 2, distanceKm: 782, platform: '2', day: 2 },
      { stopOrder: 4, stationCode: 'NGP', stationName: 'Nagpur Jn', arrivalTime: '16:45', departureTime: '16:50', haltMinutes: 5, distanceKm: 1225, platform: '2', day: 2 },
      { stopOrder: 5, stationCode: 'BPL', stationName: 'Bhopal Jn', arrivalTime: '23:30', departureTime: '23:35', haltMinutes: 5, distanceKm: 1615, platform: '1', day: 2 },
      { stopOrder: 6, stationCode: 'VGLJ', stationName: 'VGL Jhansi Jn', arrivalTime: '03:30', departureTime: '03:38', haltMinutes: 8, distanceKm: 1907, platform: '3', day: 3 },
      { stopOrder: 7, stationCode: 'AGC', stationName: 'Agra Cantt', arrivalTime: '06:45', departureTime: '06:50', haltMinutes: 5, distanceKm: 2122, platform: '1', day: 3 },
      { stopOrder: 8, stationCode: 'NDLS', stationName: 'New Delhi', arrivalTime: '10:10', departureTime: '--:--', haltMinutes: 0, distanceKm: 2409, platform: '3', day: 3 }
    ]
  }
];

const initialDevices = [
  {
    deviceId: 'ESP32-TRAIN-001',
    trainNumber: '12723',
    status: 'Online',
    firmwareVersion: 'v2.4.1',
    batteryLevel: 94,
    signalDbm: -68,
    lastSeen: new Date().toISOString()
  },
  {
    deviceId: 'ESP32-TRAIN-002',
    trainNumber: '20833',
    status: 'Online',
    firmwareVersion: 'v2.4.1',
    batteryLevel: 88,
    signalDbm: -72,
    lastSeen: new Date().toISOString()
  },
  {
    deviceId: 'ESP32-TRAIN-003',
    trainNumber: '12433',
    status: 'Online',
    firmwareVersion: 'v2.3.9',
    batteryLevel: 76,
    signalDbm: -81,
    lastSeen: new Date().toISOString()
  },
  {
    deviceId: 'ESP32-TRAIN-004',
    trainNumber: null,
    status: 'Offline',
    firmwareVersion: 'v2.4.0',
    batteryLevel: 52,
    signalDbm: -95,
    lastSeen: new Date(Date.now() - 3600000).toISOString()
  }
];

// Initial live location seed:
// Train 12723: Between Ramagundam (RDM: 18.7617, 79.4746) and Manchiryal (MCI: 18.8711, 79.4589)
// Train 20833: Between Vijayawada (BZA: 16.5186, 80.6195) and Khammam (KMT: 17.2473, 80.1514)
const initialLocations = [
  {
    trainNumber: '12723',
    deviceId: 'ESP32-TRAIN-001',
    latitude: 18.8150,
    longitude: 79.4670,
    speed: 78.5,
    direction: 355,
    temperature: 28.4,
    vibration: 0.14,
    timestamp: new Date().toISOString()
  },
  {
    trainNumber: '20833',
    deviceId: 'ESP32-TRAIN-002',
    latitude: 16.8830,
    longitude: 80.3850,
    speed: 112.0,
    direction: 325,
    temperature: 26.8,
    vibration: 0.09,
    timestamp: new Date().toISOString()
  },
  {
    trainNumber: '12433',
    deviceId: 'ESP32-TRAIN-003',
    latitude: 15.0210,
    longitude: 80.0520,
    speed: 95.0,
    direction: 350,
    temperature: 29.1,
    vibration: 0.18,
    timestamp: new Date().toISOString()
  }
];

module.exports = {
  stations,
  trains,
  initialDevices,
  initialLocations
};
