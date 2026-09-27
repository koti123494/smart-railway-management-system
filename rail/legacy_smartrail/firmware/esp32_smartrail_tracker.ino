/*
 * SmartRail India — ESP32 Railway IoT Tracking Device
 * Smart India Hackathon (SIH) Prototype Firmware
 *
 * Microcontroller: ESP32 DevKit V1
 * GPS Module: u-blox NEO-6M / NEO-8M (connected via HardwareSerial2)
 * Transmission: WiFi / 4G Hotspot (or GSM SIM800L via AT commands)
 * Protocol: REST HTTPS/HTTP POST with JSON payload & device auth
 */

#include <WiFi.h>
#include <HTTPClient.h>
#include <TinyGPS++.h>
#include <time.h>

// ================= USER CONFIGURATION =================
const char* WIFI_SSID     = "Your_WiFi_Or_Hotspot_SSID";
const char* WIFI_PASSWORD = "Your_WiFi_Password";

// SmartRail Backend API Endpoint
// When testing locally, use your computer's LAN IP, e.g. "http://192.168.1.15:5000/api/iot/location"
const char* SERVER_URL    = "http://192.168.1.100:5000/api/iot/location";
const char* DEVICE_SECRET = "smartrail_esp32_super_secret_key_2026";

// Train and Device Identification
const char* DEVICE_ID     = "ESP32-TRAIN-001";
const char* TRAIN_NUMBER  = "12723"; // Telangana Express

// Telemetry Transmission Interval (milliseconds)
const unsigned long TRANSMIT_INTERVAL_MS = 3000; // 3 seconds

// ================= HARDWARE PIN DEFINITIONS =================
#define GPS_RX_PIN 16 // Connect to NEO-6M TX
#define GPS_TX_PIN 17 // Connect to NEO-6M RX
#define GPS_BAUD_RATE 9600

#define STATUS_LED_PIN 2    // Built-in blue LED for GPS fix / transmitting
#define VIBRATION_PIN  34   // Optional SW-420 vibration sensor or analog read
#define BATTERY_PIN    35   // Analog voltage divider for 18650 Li-ion battery

// ================= OBJECT DECLARATIONS =================
TinyGPSPlus gps;
HardwareSerial gpsSerial(2); // UART2

unsigned long lastTransmitTime = 0;
int packetCount = 0;

void setup() {
  Serial.begin(115200);
  pinMode(STATUS_LED_PIN, OUTPUT);
  digitalWrite(STATUS_LED_PIN, LOW);

  Serial.println("\n==================================================");
  Serial.println("🚄 SmartRail India — ESP32 GPS Tracker Booting...");
  Serial.println("==================================================");

  // Initialize GPS UART
  gpsSerial.begin(GPS_BAUD_RATE, SERIAL_8N1, GPS_RX_PIN, GPS_TX_PIN);
  Serial.println("📡 GPS Serial initialized on Pins 16 (RX) / 17 (TX)");

  // Connect to WiFi
  connectToWiFi();

  // Configure NTP time synchronization
  configTime(19800, 0, "pool.ntp.org", "time.nist.gov"); // UTC + 5:30 (IST)
}

void loop() {
  // Feed GPS NMEA stream into TinyGPS++ parser
  while (gpsSerial.available() > 0) {
    char c = gpsSerial.read();
    gps.encode(c);
  }

  // Periodic transmission check
  if (millis() - lastTransmitTime >= TRANSMIT_INTERVAL_MS) {
    lastTransmitTime = millis();

    // Check if GPS has a valid 2D/3D fix
    if (gps.location.isValid()) {
      digitalWrite(STATUS_LED_PIN, HIGH);
      sendTelemetryToServer();
      digitalWrite(STATUS_LED_PIN, LOW);
    } else {
      Serial.printf("⏳ Waiting for GPS Satellite Fix... (Sats visible: %d)\n", gps.satellites.value());
      // Quick blink to indicate searching
      digitalWrite(STATUS_LED_PIN, !digitalRead(STATUS_LED_PIN));
    }
  }

  // Maintain WiFi Connection
  if (WiFi.status() != WL_CONNECTED) {
    connectToWiFi();
  }
}

void connectToWiFi() {
  Serial.printf("🌐 Connecting to WiFi: %s ", WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 20) {
    delay(500);
    Serial.print(".");
    retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ WiFi Connected!");
    Serial.print("📡 IP Address: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n⚠️ WiFi Connection Failed! Will retry in loop.");
  }
}

void sendTelemetryToServer() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("❌ Cannot send telemetry: WiFi disconnected");
    return;
  }

  HTTPClient http;
  http.begin(SERVER_URL);
  http.addHeader("Content-Type", "application/json");
  http.addHeader("x-device-secret", DEVICE_SECRET);

  double lat = gps.location.lat();
  double lon = gps.location.lng();
  double speedKmh = gps.speed.kmph();
  double headingDeg = gps.course.deg();
  int satellites = gps.satellites.value();

  // Read simulated/analog battery and vibration
  int rawBat = analogRead(BATTERY_PIN);
  int batteryPct = map(constrain(rawBat, 2400, 4095), 2400, 4095, 0, 100);
  if (batteryPct == 0) batteryPct = 95; // default fallback if pin floating

  int rssiDbm = WiFi.RSSI();

  // Create ISO 8601 Timestamp
  time_t now;
  struct tm timeinfo;
  char timeStringBuff[30];
  time(&now);
  gmtime_r(&now, &timeinfo);
  strftime(timeStringBuff, sizeof(timeStringBuff), "%Y-%m-%dT%H:%M:%SZ", &timeinfo);

  // Construct JSON Payload
  String payload = "{";
  payload += "\"deviceId\":\"" + String(DEVICE_ID) + "\",";
  payload += "\"trainNumber\":\"" + String(TRAIN_NUMBER) + "\",";
  payload += "\"latitude\":" + String(lat, 6) + ",";
  payload += "\"longitude\":" + String(lon, 6) + ",";
  payload += "\"speed\":" + String(speedKmh, 2) + ",";
  payload += "\"direction\":" + String(headingDeg, 1) + ",";
  payload += "\"batteryLevel\":" + String(batteryPct) + ",";
  payload += "\"signalDbm\":" + String(rssiDbm) + ",";
  payload += "\"satellites\":" + String(satellites) + ",";
  payload += "\"timestamp\":\"" + String(timeStringBuff) + "\"";
  payload += "}";

  Serial.println("\n📤 Transmitting IoT Packet #" + String(++packetCount) + " -> " + payload);

  int httpCode = http.POST(payload);

  if (httpCode > 0) {
    String response = http.getString();
    Serial.printf("📥 Server Response [%d]: %s\n", httpCode, response.c_str());
  } else {
    Serial.printf("❌ HTTP POST Failed, Error: %s\n", http.errorToString(httpCode).c_str());
  }

  http.end();
}
