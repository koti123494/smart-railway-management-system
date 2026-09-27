// backend/services/websocketService.js
// WebSocket Real-Time Communication Hub using Socket.IO

let ioInstance = null;

function initWebSocket(io) {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`🔌 Client connected [${socket.id}]`);

    // Client joins specific train room for real-time tracking
    socket.on('join:train', (trainNumber) => {
      const room = `train:${trainNumber}`;
      socket.join(room);
      console.log(`🚂 Socket [${socket.id}] joined ${room}`);
    });

    socket.on('leave:train', (trainNumber) => {
      const room = `train:${trainNumber}`;
      socket.leave(room);
      console.log(`🚪 Socket [${socket.id}] left ${room}`);
    });

    // Client joins IoT dashboard room
    socket.on('join:iot', () => {
      socket.join('iot:telemetry');
      console.log(`📡 Socket [${socket.id}] joined IoT telemetry stream`);
    });

    socket.on('leave:iot', () => {
      socket.leave('iot:telemetry');
    });

    socket.on('disconnect', (reason) => {
      console.log(`❌ Client disconnected [${socket.id}] - ${reason}`);
    });
  });

  return io;
}

function broadcastTrainUpdate(trainNumber, payload) {
  if (!ioInstance) return;
  // Send to specific train room
  ioInstance.to(`train:${trainNumber}`).emit('train:update', payload);
  // Send global live update
  ioInstance.emit('train:live-tick', {
    trainNumber,
    latitude: payload.location?.latitude,
    longitude: payload.location?.longitude,
    speed: payload.location?.speed,
    statusText: payload.position?.statusText,
    delay: payload.train?.currentDelayMinutes,
    timestamp: payload.location?.timestamp
  });
}

function broadcastDeviceTelemetry(devicePayload) {
  if (!ioInstance) return;
  ioInstance.to('iot:telemetry').emit('iot:telemetry', devicePayload);
  ioInstance.emit('iot:device-ping', {
    deviceId: devicePayload.deviceId,
    status: 'Online',
    battery: devicePayload.batteryLevel,
    speed: devicePayload.speed,
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  initWebSocket,
  broadcastTrainUpdate,
  broadcastDeviceTelemetry,
  getIO: () => ioInstance
};
