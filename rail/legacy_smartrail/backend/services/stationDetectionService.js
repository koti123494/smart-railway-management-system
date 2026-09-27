// backend/services/stationDetectionService.js
// Station Detection Engine using the Haversine Mathematical Formula

const EARTH_RADIUS_KM = 6371.0;
const AT_STATION_THRESHOLD_KM = 1.5; // Within 1.5 km is considered at station

/**
 * Calculate Great-Circle distance between two coordinates in kilometers using Haversine formula.
 */
function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/**
 * Detect train's relative position along its route:
 * - Current station if within threshold
 * - "Between Station A and Station B"
 * - Next station and distance remaining
 * - Passed stations vs upcoming stations
 */
function detectStationPosition(currentLat, currentLon, currentSpeed, routeWithCoordinates) {
  if (!routeWithCoordinates || routeWithCoordinates.length === 0) {
    return {
      statusText: 'Location Unknown',
      currentStation: null,
      previousStation: null,
      nextStation: null,
      distanceToNextKm: null,
      nearestStation: null,
      nearestDistanceKm: null,
      passedStationCodes: [],
      upcomingStationCodes: []
    };
  }

  // 1. Calculate distance from current position to every station on the route
  const stationDistances = routeWithCoordinates.map((stop, index) => {
    const dist = calculateHaversineDistance(
      currentLat,
      currentLon,
      stop.latitude,
      stop.longitude
    );
    return {
      index,
      stop,
      distanceKm: dist
    };
  });

  // Sort to find nearest station
  stationDistances.sort((a, b) => a.distanceKm - b.distanceKm);
  const nearest = stationDistances[0];

  // 2. Check if currently halted/arriving at the station
  if (nearest.distanceKm <= AT_STATION_THRESHOLD_KM) {
    const atIndex = nearest.index;
    const currentStop = routeWithCoordinates[atIndex];
    const prevStop = atIndex > 0 ? routeWithCoordinates[atIndex - 1] : null;
    const nextStop = atIndex < routeWithCoordinates.length - 1 ? routeWithCoordinates[atIndex + 1] : null;

    const passedCodes = routeWithCoordinates.slice(0, atIndex).map(s => s.stationCode);
    const upcomingCodes = routeWithCoordinates.slice(atIndex + 1).map(s => s.stationCode);

    return {
      isAtStation: true,
      statusText: `At ${currentStop.stationName} (Platform ${currentStop.platform || '1'})`,
      currentStation: currentStop,
      previousStation: prevStop,
      nextStation: nextStop,
      distanceToNextKm: nextStop ? calculateHaversineDistance(currentLat, currentLon, nextStop.latitude, nextStop.longitude) : 0,
      distanceFromPrevKm: prevStop ? calculateHaversineDistance(currentLat, currentLon, prevStop.latitude, prevStop.longitude) : 0,
      nearestStation: currentStop,
      nearestDistanceKm: Math.round(nearest.distanceKm * 10) / 10,
      passedStationCodes: passedCodes,
      upcomingStationCodes: upcomingCodes,
      activeLegIndex: atIndex
    };
  }

  // 3. Train is in-transit between two stations.
  // We evaluate each route segment (A -> B) to find which segment the train is currently traveling along.
  // Segment detour score: dist(current, A) + dist(current, B) - dist(A, B)
  let bestLegIndex = 0;
  let minDetour = Infinity;

  for (let i = 0; i < routeWithCoordinates.length - 1; i++) {
    const stationA = routeWithCoordinates[i];
    const stationB = routeWithCoordinates[i + 1];

    const distAB = calculateHaversineDistance(stationA.latitude, stationA.longitude, stationB.latitude, stationB.longitude);
    const distToA = calculateHaversineDistance(currentLat, currentLon, stationA.latitude, stationA.longitude);
    const distToB = calculateHaversineDistance(currentLat, currentLon, stationB.latitude, stationB.longitude);

    const detour = (distToA + distToB) - distAB;
    if (detour < minDetour) {
      minDetour = detour;
      bestLegIndex = i;
    }
  }

  const prevStop = routeWithCoordinates[bestLegIndex];
  const nextStop = routeWithCoordinates[bestLegIndex + 1];

  const distToNext = calculateHaversineDistance(currentLat, currentLon, nextStop.latitude, nextStop.longitude);
  const distFromPrev = calculateHaversineDistance(currentLat, currentLon, prevStop.latitude, prevStop.longitude);
  const legDistance = distFromPrev + distToNext;
  const legProgress = legDistance > 0 ? Math.min(100, Math.max(0, (distFromPrev / legDistance) * 100)) : 50;

  const passedCodes = routeWithCoordinates.slice(0, bestLegIndex + 1).map(s => s.stationCode);
  const upcomingCodes = routeWithCoordinates.slice(bestLegIndex + 1).map(s => s.stationCode);

  return {
    isAtStation: false,
    statusText: `Between ${prevStop.stationName} and ${nextStop.stationName}`,
    currentStation: null,
    previousStation: prevStop,
    nextStation: nextStop,
    distanceToNextKm: Math.round(distToNext * 10) / 10,
    distanceFromPrevKm: Math.round(distFromPrev * 10) / 10,
    legProgressPercent: Math.round(legProgress),
    nearestStation: nearest.stop,
    nearestDistanceKm: Math.round(nearest.distanceKm * 10) / 10,
    passedStationCodes: passedCodes,
    upcomingStationCodes: upcomingCodes,
    activeLegIndex: bestLegIndex
  };
}

module.exports = {
  calculateHaversineDistance,
  detectStationPosition,
  EARTH_RADIUS_KM
};
