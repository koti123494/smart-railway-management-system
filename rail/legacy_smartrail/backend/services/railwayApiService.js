// backend/services/railwayApiService.js
// Modular Railway API Service - Pluggable provider for Indian Railways / IRCTC data

const db = require('../config/db');

class RailwayApiService {
  constructor() {
    this.provider = process.env.RAILWAY_API_PROVIDER || 'mock';
    this.apiKey = process.env.RAILWAY_API_KEY;
  }

  /**
   * Search trains by query (number, name, or route)
   */
  async searchTrains(query) {
    if (this.provider === 'real' && this.apiKey) {
      return await this._fetchFromExternalApi(`/search?q=${encodeURIComponent(query)}`);
    }
    // High-fidelity fallback / mock service
    return db.searchTrains(query);
  }

  /**
   * Search trains between source and destination stations
   */
  async getTrainsBetweenStations(fromStationCode, toStationCode) {
    if (this.provider === 'real' && this.apiKey) {
      return await this._fetchFromExternalApi(`/between?from=${fromStationCode}&to=${toStationCode}`);
    }
    return db.searchTrainsBetween(fromStationCode, toStationCode);
  }

  /**
   * Get train full metadata and route
   */
  async getTrainDetails(trainNumber) {
    if (this.provider === 'real' && this.apiKey) {
      return await this._fetchFromExternalApi(`/train/${trainNumber}`);
    }
    return db.getTrainByNumber(trainNumber);
  }

  /**
   * Get station metadata by station code
   */
  async getStationDetails(stationCode) {
    return db.getStationByCode(stationCode);
  }

  /**
   * External HTTP fetch wrapper for future real API integration (e.g. RapidAPI / IRCTC)
   */
  async _fetchFromExternalApi(endpoint) {
    try {
      // Placeholder for production HTTPS client
      // const response = await fetch(`${process.env.RAILWAY_API_BASE_URL}${endpoint}`, {
      //   headers: { 'X-RapidAPI-Key': this.apiKey }
      // });
      // return await response.json();
      throw new Error('External provider not configured. Falling back to internal dataset.');
    } catch (err) {
      console.warn('⚠️ External railway API error:', err.message);
      return null;
    }
  }
}

module.exports = new RailwayApiService();
