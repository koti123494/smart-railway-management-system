// backend/services/etaCalculationService.js
// Dynamic ETA and Schedule Calculation Service

/**
 * Format minutes into HH:MM (24h) or readable time string
 */
function formatMinutesToTime(totalMinutes) {
  let normalized = Math.round(totalMinutes) % 1440;
  if (normalized < 0) normalized += 1440;
  const hours = Math.floor(normalized / 60);
  const minutes = normalized % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

/**
 * Parse time string "HH:MM" into total minutes from start of day
 */
function parseTimeToMinutes(timeStr) {
  if (!timeStr || timeStr === '--:--') return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

/**
 * Calculate dynamic ETA for the next station and all subsequent stations on the route
 */
function calculateRouteETAs(routeWithCoordinates, currentPosition, currentSpeed, currentDelayMinutes = 0) {
  const effectiveSpeed = currentSpeed > 15 ? currentSpeed : 65; // fallback average speed in km/h if stopped/slow
  const delay = currentDelayMinutes || 0;

  return routeWithCoordinates.map((station, index) => {
    const isPassed = currentPosition.passedStationCodes.includes(station.stationCode);
    const isCurrent = currentPosition.isAtStation && currentPosition.currentStation?.stationCode === station.stationCode;
    const isNext = currentPosition.nextStation?.stationCode === station.stationCode;

    const schedArrMin = parseTimeToMinutes(station.arrivalTime);
    const schedDepMin = parseTimeToMinutes(station.departureTime);

    let actualArrTime = station.arrivalTime;
    let actualDepTime = station.departureTime;
    let status = 'Upcoming';
    let delayText = delay > 0 ? `${delay} min late` : 'On Time';

    if (isPassed) {
      status = 'Completed';
      delayText = 'Departed';
    } else if (isCurrent) {
      status = 'Current';
      delayText = delay > 0 ? `${delay}m Late` : 'On Time';
    } else if (isNext) {
      status = 'Next';
      // Compute ETA based on distance
      if (currentPosition.distanceToNextKm !== null) {
        const travelHours = currentPosition.distanceToNextKm / effectiveSpeed;
        const travelMinutes = travelHours * 60;
        const now = new Date();
        const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
        const etaMinutes = currentTotalMinutes + travelMinutes;
        actualArrTime = formatMinutesToTime(etaMinutes);
      }
    } else if (!isPassed) {
      // Upcoming future station: adjust scheduled time by current delay
      if (schedArrMin !== null) {
        actualArrTime = formatMinutesToTime(schedArrMin + delay);
      }
      if (schedDepMin !== null) {
        actualDepTime = formatMinutesToTime(schedDepMin + delay);
      }
    }

    return {
      ...station,
      actualArrivalTime: actualArrTime,
      actualDepartureTime: actualDepTime,
      status, // 'Completed', 'Current', 'Next', 'Upcoming'
      delayMinutes: isPassed ? 0 : delay,
      delayBadge: delayText,
      platform: station.platform || '1'
    };
  });
}

/**
 * Compute high-level ETA overview card data
 */
function computeNextStationETA(distanceKm, speedKmh, scheduledTime, currentDelayMinutes) {
  const effectiveSpeed = speedKmh > 10 ? speedKmh : 65;
  const travelMinutes = Math.round((distanceKm / effectiveSpeed) * 60);

  const now = new Date();
  const arrivalTimestamp = new Date(now.getTime() + travelMinutes * 60000);
  const formattedETA = arrivalTimestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  let humanDuration = '';
  if (travelMinutes < 60) {
    humanDuration = `${travelMinutes} mins`;
  } else {
    const hrs = Math.floor(travelMinutes / 60);
    const mins = travelMinutes % 60;
    humanDuration = `${hrs}h ${mins}m`;
  }

  return {
    etaTime: formattedETA,
    remainingMinutes: travelMinutes,
    remainingTimeHuman: humanDuration,
    expectedDelayText: currentDelayMinutes > 0 ? `${currentDelayMinutes} min late` : 'Running on time',
    effectiveSpeed: Math.round(effectiveSpeed)
  };
}

module.exports = {
  calculateRouteETAs,
  computeNextStationETA,
  formatMinutesToTime,
  parseTimeToMinutes
};
