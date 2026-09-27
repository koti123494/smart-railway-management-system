// frontend/src/components/tracking/TrainMap.jsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Compass, Navigation, Maximize2 } from 'lucide-react';

// Custom Map Controller to smoothly pan/zoom when train moves
function MapController({ center, autoFollow }) {
  const map = useMap();
  useEffect(() => {
    if (autoFollow && center && center[0] && center[1]) {
      map.panTo(center, { animate: true, duration: 1 });
    }
  }, [center, autoFollow, map]);
  return null;
}

// Custom Train Marker Icon using CSS & SVG
function createTrainIcon(direction = 0, isLive = true) {
  return L.divIcon({
    className: 'custom-train-marker-wrapper',
    html: `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
        <!-- Pulsing Radar Glow -->
        <div class="absolute w-12 h-12 rounded-full ${isLive ? 'bg-blue-500/25 animate-ping' : 'bg-slate-400/20'} pointer-events-none"></div>
        <div class="absolute w-10 h-10 rounded-full ${isLive ? 'bg-blue-600/30' : 'bg-slate-400/20'} pointer-events-none"></div>

        <!-- Train Capsule Pin -->
        <div class="relative w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-xl flex items-center justify-center transform transition-transform duration-500" style="transform: rotate(${direction}deg)">
          <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 15.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V5c0-3.5-3.58-4-8-4s-8 .5-8 4v10.5zm8 1.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6-7H6V5h12v5z"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });
}

// Station Marker Icon
function createStationIcon(isCurrent, isPassed) {
  let bgColor = 'bg-slate-400 border-slate-200';
  if (isCurrent) bgColor = 'bg-blue-600 border-blue-200 ring-4 ring-blue-500/30 animate-pulse';
  else if (isPassed) bgColor = 'bg-emerald-600 border-emerald-200';

  return L.divIcon({
    className: 'custom-station-pin',
    html: `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
        <div class="w-4 h-4 rounded-full ${bgColor} border-2 shadow-md"></div>
      </div>
    `,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
}

export default function TrainMap({
  location,
  route = [],
  position,
  trainName = '',
  trainNumber = '',
  autoFollow = true
}) {
  const [follow, setFollow] = React.useState(autoFollow);

  // Train current coordinate
  const currentCoords = [
    location?.latitude || 17.3917,
    location?.longitude || 78.4735
  ];

  // Route path polyline points
  const routePolyline = (route || [])
    .filter(s => s.latitude && s.longitude)
    .map(s => [s.latitude, s.longitude]);

  return (
    <div className="relative w-full h-[450px] lg:h-[540px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg bg-slate-900">
      {/* Map Action Controls Overlay */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col space-y-2">
        <button
          onClick={() => setFollow(!follow)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-md transition-all backdrop-blur-md ${
            follow
              ? 'bg-blue-600 text-white shadow-blue-500/30'
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
          title="Auto center on train GPS"
        >
          <Navigation className={`w-3.5 h-3.5 ${follow ? 'animate-spin' : ''}`} />
          <span>{follow ? 'Tracking GPS' : 'Follow Train'}</span>
        </button>
      </div>

      {/* Real-Time Speed & Telemetry Overlay */}
      <div className="absolute bottom-4 left-4 z-[400] bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 px-3.5 py-2 rounded-xl shadow-lg flex items-center space-x-3 text-xs font-mono">
        <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-bold">
          <Compass className="w-4 h-4" />
          <span>{Math.round(location?.speed || 0)} km/h</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <div className="text-slate-600 dark:text-slate-400">
          Heading: <span className="font-semibold text-slate-900 dark:text-white">{Math.round(location?.direction || 0)}°</span>
        </div>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Live IoT Stream</span>
        </div>
      </div>

      <MapContainer
        center={currentCoords}
        zoom={9}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <MapController center={currentCoords} autoFollow={follow} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Railway Route Polyline */}
        {routePolyline.length > 1 && (
          <Polyline
            positions={routePolyline}
            color="#2563eb"
            weight={5}
            opacity={0.75}
            dashArray="1, 8"
          />
        )}

        {/* Station Markers */}
        {(route || []).map((stn, idx) => {
          if (!stn.latitude || !stn.longitude) return null;
          const isPassed = position?.passedStationCodes?.includes(stn.stationCode);
          const isCurrent = position?.currentStation?.stationCode === stn.stationCode;

          return (
            <Marker
              key={`${stn.stationCode}-${idx}`}
              position={[stn.latitude, stn.longitude]}
              icon={createStationIcon(isCurrent, isPassed)}
            >
              <Popup className="custom-rail-popup">
                <div className="p-1 font-sans text-xs">
                  <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>{stn.stationName}</span>
                    <span className="px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-[10px]">
                      {stn.stationCode}
                    </span>
                  </div>
                  <div className="mt-1 space-y-0.5 text-slate-600 dark:text-slate-300">
                    <div>Platform: <span className="font-semibold text-slate-900 dark:text-white">{stn.platform || '1'}</span></div>
                    <div>Scheduled Arr/Dep: <span className="font-mono">{stn.arrivalTime} / {stn.departureTime}</span></div>
                    {stn.delayBadge && (
                      <div className="text-amber-600 dark:text-amber-400 font-medium">{stn.delayBadge}</div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Live Train Moving Marker */}
        <Marker
          position={currentCoords}
          icon={createTrainIcon(location?.direction || 0, true)}
        >
          <Popup>
            <div className="p-1 font-sans text-xs">
              <div className="font-bold text-blue-600">
                #{trainNumber} {trainName}
              </div>
              <div className="mt-1 space-y-0.5 text-slate-700">
                <div>Speed: <span className="font-bold font-mono">{Math.round(location?.speed || 0)} km/h</span></div>
                <div>Status: <span className="font-medium text-emerald-600">{position?.statusText || 'In Transit'}</span></div>
                <div className="text-[10px] text-slate-500 font-mono">
                  GPS: {location?.latitude?.toFixed(4)}, {location?.longitude?.toFixed(4)}
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
