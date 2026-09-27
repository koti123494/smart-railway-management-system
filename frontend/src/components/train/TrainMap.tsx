import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { TimelineStop, TrainLiveStatus } from '../../types';
import { Navigation, MapPin, Maximize2, LocateFixed } from 'lucide-react';

interface TrainMapProps {
  status: TrainLiveStatus;
  selectedStop?: TimelineStop | null;
  onSelectStop?: (stop: TimelineStop) => void;
  className?: string;
}

// Sub-component to manage map views dynamically
function MapViewController({
  center,
  bounds,
  zoom,
}: {
  center?: [number, number];
  bounds?: L.LatLngBoundsExpression;
  zoom?: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (bounds) {
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
    } else if (center) {
      map.setView(center, zoom || 9);
    }
  }, [center, bounds, map, zoom]);

  return null;
}

export const TrainMap: React.FC<TrainMapProps> = ({
  status,
  selectedStop,
  onSelectStop,
  className = '',
}) => {
  const mapRef = useRef<L.Map | null>(null);

  // Train position coordinates
  const trainCoords: [number, number] = useMemo(() => {
    if (status.currentStation && status.currentStation.coordinates) {
      return [status.currentStation.coordinates.latitude, status.currentStation.coordinates.longitude];
    }
    return [20.5937, 78.9629]; // Default India center
  }, [status.currentStation]);

  // Extract all valid route stop coordinates
  const routeCoords: [number, number][] = useMemo(() => {
    return status.timeline
      .filter((s) => s.station?.coordinates?.latitude && s.station?.coordinates?.longitude)
      .map((s) => [s.station.coordinates.latitude, s.station.coordinates.longitude]);
  }, [status.timeline]);

  // Compute map bounds
  const bounds = useMemo(() => {
    if (routeCoords.length > 0) {
      return L.latLngBounds(routeCoords);
    }
    return undefined;
  }, [routeCoords]);

  // Train Marker Icon (Distinguishing Live GPS vs Last Reported Station)
  const trainIcon = useMemo(() => {
    const isGps = status.locationType === 'LIVE_GPS';
    const markerColor = isGps ? '#10b981' : '#0284c7';
    const label = isGps ? 'LIVE GPS' : 'LAST REPORTED';

    return L.divIcon({
      className: 'train-custom-marker',
      html: `
        <div class="relative flex items-center justify-center" style="width: 44px; height: 44px;">
          <div class="train-pulse-ring" style="background-color: ${markerColor}; opacity: 0.4;"></div>
          <div style="background-color: ${markerColor}; border: 3px solid white; box-shadow: 0 4px 14px rgba(0,0,0,0.35);" class="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg z-10 transition-transform hover:scale-110">
            🚆
          </div>
          <div class="absolute -bottom-5 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow z-20">
            ${label}
          </div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -22],
    });
  }, [status.locationType]);

  // Station Marker Icons
  const createStationIcon = (stop: TimelineStop) => {
    let bgColor = '#94a3b8'; // upcoming
    let size = 12;

    if (stop.status === 'COMPLETED') {
      bgColor = '#10b981';
      size = 14;
    } else if (stop.status === 'CURRENT') {
      bgColor = '#0284c7';
      size = 20;
    }

    if (stop.stopNumber === 1) {
      bgColor = '#6366f1'; // Origin
      size = 16;
    } else if (stop.stopNumber === status.timeline.length) {
      bgColor = '#ec4899'; // Destination
      size = 16;
    }

    return L.divIcon({
      className: 'station-custom-marker',
      html: `
        <div style="width: ${size}px; height: ${size}px; background-color: ${bgColor}; border: 2.5px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>
      `,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2],
    });
  };

  const handleCenterTrain = () => {
    if (mapRef.current) {
      mapRef.current.setView(trainCoords, 10, { animate: true });
    }
  };

  const handleFitRoute = () => {
    if (mapRef.current && bounds) {
      mapRef.current.fitBounds(bounds, { padding: [50, 50], animate: true });
    }
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl bg-slate-900 ${className}`}>
      {/* Map Header Floating Overlay */}
      <div className="absolute top-4 left-4 right-4 z-[500] flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <span className="text-xl">🚆</span>
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              {status.trainNumber} {status.trainName}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {status.locationType === 'LIVE_GPS'
                ? 'Live GPS Tracked'
                : `Last reported at ${status.currentStation.name}`}
            </span>
          </div>
        </div>

        {/* Quick Map Controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg">
          <button
            onClick={handleCenterTrain}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Center on Train"
          >
            <LocateFixed className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
          </button>
          <button
            onClick={handleFitRoute}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Fit Entire Route"
          >
            <Maximize2 className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      {/* Leaflet Map Container */}
      <MapContainer
        center={trainCoords}
        zoom={7}
        className="w-full h-full min-h-[420px] sm:min-h-[500px]"
        ref={mapRef}
      >
        <MapViewController bounds={bounds} />

        {/* OpenStreetMap Base Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {/* Train Route Polyline */}
        {routeCoords.length > 1 && (
          <>
            {/* Outline path */}
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: '#0284c7', weight: 6, opacity: 0.8, lineCap: 'round', lineJoin: 'round' }}
            />
            {/* Inner dashed line for rail track aesthetic */}
            <Polyline
              positions={routeCoords}
              pathOptions={{ color: '#ffffff', weight: 2, opacity: 0.9, dashArray: '6, 8' }}
            />
          </>
        )}

        {/* Station Markers */}
        {status.timeline.map((stop) => {
          if (!stop.station?.coordinates) return null;
          const pos: [number, number] = [stop.station.coordinates.latitude, stop.station.coordinates.longitude];
          const isSelected = selectedStop?.station.code === stop.station.code;

          return (
            <Marker
              key={stop.station.code}
              position={pos}
              icon={createStationIcon(stop)}
              eventHandlers={{
                click: () => onSelectStop && onSelectStop(stop),
              }}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-2">
                    <strong className="text-sm font-bold text-slate-900 dark:text-white">
                      {stop.station.name}
                    </strong>
                    <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {stop.station.code}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scheduled Arr:</span>
                      <span className="font-semibold">{stop.scheduledArrival}</span>
                    </div>
                    {stop.actualArrival && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Actual Arr:</span>
                        <span className="font-semibold">{stop.actualArrival}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-slate-400">Scheduled Dep:</span>
                      <span className="font-semibold">{stop.scheduledDeparture}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Platform:</span>
                      <span className="font-semibold">PF #{stop.platform}</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                      <span className="text-slate-400">Delay:</span>
                      <span
                        className={`font-bold ${
                          stop.delayArrivalMinutes > 15 ? 'text-amber-600' : 'text-emerald-600'
                        }`}
                      >
                        {stop.delayArrivalMinutes > 0 ? `+${stop.delayArrivalMinutes} min` : 'On Time'}
                      </span>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Live / Last Reported Train Marker */}
        <Marker position={trainCoords} icon={trainIcon} zIndexOffset={1000}>
          <Popup>
            <div className="p-1 min-w-[220px]">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1.5 mb-2">
                <span className="text-lg">🚆</span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Train {status.trainNumber}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{status.trainName}</p>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Status:</span>
                  <span
                    className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                      status.delayMinutes > 15
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {status.status} (+{status.delayMinutes} min)
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Current Station:</span>
                  <span className="font-semibold">{status.currentStation.name}</span>
                </div>

                {status.nextStation && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Next Station:</span>
                    <span className="font-semibold">{status.nextStation.name}</span>
                  </div>
                )}

                <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 italic">
                  {status.locationType === 'LIVE_GPS'
                    ? 'Satellite GPS Telemetry'
                    : 'Last Reported Railway Station'}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
