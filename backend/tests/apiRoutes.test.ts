import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../src/app.js';

const app = createApp();

describe('API Routes Integration Tests', () => {
  it('GET /api/health returns health status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
    expect(res.body.mockMode).toBe(true);
  });

  it('GET /api/trains/search returns train results', async () => {
    const res = await request(app).get('/api/trains/search?q=Purushottam');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.data[0].trainNumber).toBe('12801');
  });

  it('GET /api/trains/:trainNumber returns train details', async () => {
    const res = await request(app).get('/api/trains/12801');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.trainNumber).toBe('12801');
    expect(res.body.data.locationType).toBe('LAST_REPORTED_STATION');
  });

  it('GET /api/trains/:trainNumber/schedule returns station timetable', async () => {
    const res = await request(app).get('/api/trains/12801/schedule');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stops.length).toBeGreaterThan(0);
  });

  it('GET /api/trains/:trainNumber/status returns live status', async () => {
    const res = await request(app).get('/api/trains/12801/status');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.currentStation).toBeDefined();
  });

  it('GET /api/trains/:trainNumber/location returns location and accuracy flag', async () => {
    const res = await request(app).get('/api/trains/12801/location');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.hasGps).toBe(false);
    expect(res.body.data.locationType).toBe('LAST_REPORTED_STATION');
  });

  it('Rejects invalid train numbers with 400 Bad Request', async () => {
    const res = await request(app).get('/api/trains/invalid-train-number');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('Validation Error');
  });

  it('Returns 404 for non-existent train number', async () => {
    const res = await request(app).get('/api/trains/99999');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error).toBe('TrainNotFound');
  });

  it('GET /api/stations/search finds stations', async () => {
    const res = await request(app).get('/api/stations/search?q=NDLS');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data[0].code).toBe('NDLS');
  });

  it('GET /api/stations/:code returns station details', async () => {
    const res = await request(app).get('/api/stations/NDLS');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('New Delhi');
  });

  it('Rejects invalid station code with 400 Bad Request', async () => {
    const res = await request(app).get('/api/stations/WAY_TOO_LONG_STATION_CODE');
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/dashboard/stats returns aggregate metrics', async () => {
    const res = await request(app).get('/api/dashboard/stats');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.trackedTrainsCount).toBeGreaterThan(0);
  });
});
