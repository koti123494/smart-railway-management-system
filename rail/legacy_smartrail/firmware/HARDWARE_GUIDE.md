# SmartRail India — ESP32 Hardware Integration & Deployment Guide

This guide details the physical hardware setup for the **SmartRail India** IoT train tracking device designed for the Smart India Hackathon (SIH).

---

## 1. Hardware Components Bill of Materials (BOM)

| Component | Specification | Purpose | Approx. Cost (INR) |
|---|---|---|---|
| **ESP32 DevKit V1** | Dual-core Tensilica Xtensa 32-bit, WiFi + BLE, 30-pin | Main Microcontroller & Edge Processor | ₹350 |
| **u-blox NEO-6M / NEO-8M** | High-sensitivity GPS receiver with ceramic patch antenna | Real-time GPS coordinate acquisition | ₹400 |
| **GSM / 4G Module (Optional)** | SIM800L (2G) or SIM7600 (4G LTE) | Cellular uplink when coach WiFi is unavailable | ₹650 / ₹1800 |
| **Li-ion Battery Pack** | 18650 3.7V 2600mAh + TP4056 charging module | Standalone portable power backup | ₹250 |
| **LM2596 Buck Converter** | DC-DC Step-Down (input 7V-35V, output 5V 2A) | Coach 110V/24V to 5V DC regulation | ₹120 |
| **Status LEDs & Resistors** | Blue (GPS Lock), Green (Server Ping), Red (Fault) | Physical debugging indicators | ₹20 |

---

## 2. Wiring & Pinout Diagram

```
+-------------------------------------------------------------+
|                     ESP32 DevKit V1                         |
|                                                             |
|   [GND]   -------------------------   [GND]  NEO-6M GPS     |
|   [3V3]   -------------------------   [VCC]  NEO-6M GPS     |
|   [GPIO16] (RX2) <-----------------   [TX]   NEO-6M GPS     |
|   [GPIO17] (TX2) ----------------->   [RX]   NEO-6M GPS     |
|                                                             |
|   [GPIO2]  --------[ 220Ω ]--------> [Status Blue LED]      |
|   [GPIO34] ------------------------- [SW-420 Vibration DO]  |
|   [GPIO35] ------------------------- [Battery Voltage Div]  |
+-------------------------------------------------------------+
```

### Pin Connections:
- **NEO-6M GPS VCC** -> ESP32 **3V3** (or 5V if module has onboard 3.3V LDO)
- **NEO-6M GPS GND** -> ESP32 **GND**
- **NEO-6M GPS TX**  -> ESP32 **GPIO 16** (Hardware Serial RX2)
- **NEO-6M GPS RX**  -> ESP32 **GPIO 17** (Hardware Serial TX2)
- **Built-in LED**   -> ESP32 **GPIO 2**

---

## 3. How the Hardware Operates

1. **Cold Boot**: Upon powering on, the ESP32 initializes its serial ports and connects to the designated WiFi AP / 4G Mobile hotspot.
2. **GPS Acquisition**: The NEO-6M GPS module acquires satellite ephemeris data. The onboard status LED on the NEO-6M begins blinking once a valid 3D GPS fix (3+ satellites) is locked.
3. **NMEA Parsing**: Raw `$GPRMC` and `$GPGGA` NMEA sentences are streamed at 9600 baud to ESP32 HardwareSerial2. The `TinyGPS++` library decodes latitude, longitude, speed in km/h, heading angle, and altitude.
4. **Data Packaging**: An authenticated JSON payload is formatted with `deviceId`, `trainNumber`, `latitude`, `longitude`, `speed`, and ISO 8601 UTC timestamp.
5. **Secure Transmission**: The packet is transmitted via HTTP/HTTPS POST to `/api/iot/location`.
6. **Low Latency Pipeline**: Backend processes the point with Haversine station detection and fans out the update via WebSocket to connected passengers in < 200 milliseconds.

---

## 4. Demonstrating at SIH (Judge Walkthrough)

### Scenario A: With Physical Hardware
1. Power the ESP32 via USB power bank.
2. Place the GPS patch antenna near an open window or outdoors to get a satellite fix.
3. Observe the Blue LED on the ESP32 blinking during transmission.
4. On the SmartRail India Web Dashboard (`/track/12723` and `/iot-dashboard`), observe the train marker moving and telemetry table updating in real time!

### Scenario B: Indoor Demonstration (No GPS Signal)
When presenting in indoor exhibition halls where satellite reception is shielded:
1. Open the built-in **Live GPS Simulator** right on the SmartRail India dashboard.
2. Click **"Start Live Simulation"** to automatically interpolate GPS waypoints along the actual route.
3. Alternatively, run `npm run simulate` in the terminal to simulate real-time GPS telemetry from an external device.
