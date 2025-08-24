"use client"

import type { Startup } from "@/data/startups"
import { Card, CardContent } from "@/components/ui/card"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import type { LatLngExpression } from "leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix default icon issue in Leaflet with Webpack/Next.js and use a red marker
// (This must be in the client component)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom red marker icon for startups (same as default)
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom black marker icon for the special pinpoint
const blackIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface SriLankaMapProps {
  startups: Startup[]
  selectedStartup: Startup | null
  onStartupSelect: (startup: Startup) => void
}

function SriLankaMap({ startups, selectedStartup, onStartupSelect }: SriLankaMapProps) {
  // Default center of Sri Lanka
  const center: [number, number] = [7.8731, 80.7718]
  const zoom = 7.5

  return (
    <div className="sticky top-32 h-fit">
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
            <MapContainer 
              center={center} 
              zoom={zoom} 
              style={{ width: "100%", height: "100%" }} 
              scrollWheelZoom={true} 
              dragging={true} 
              zoomControl={true}
              className="rounded-lg"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Black pinpoint for Trace Expert City */}
              <Marker
                position={[6.930243, 79.861735]}
                icon={blackIcon}
              >
                <Popup>
                  <div className="text-xs sm:text-sm font-bold">Trace Expert City</div>
                  <div className="text-xs text-gray-600">Colombo 10, Sri Lanka</div>
                </Popup>
              </Marker>
              {/* Black pinpoint for Cinnamon Life at City of Dreams */}
              <Marker
                position={[6.925082, 79.847785]}
                icon={blackIcon}
              >
                <Popup>
                  <div className="text-xs sm:text-sm font-bold">Cinnamon Life</div>
                  <div className="text-xs text-gray-600">Colombo 2, Sri Lanka</div>
                </Popup>
              </Marker>
              {/* Startups temporarily hidden - showing only special locations */}
              {/* {startups.map((startup) => (
                <Marker
                  key={startup.id}
                  position={getLatLng(startup) as LatLngExpression}
                  icon={redIcon}
                  eventHandlers={{
                    click: () => onStartupSelect(startup),
                  }}
                >
                  <Popup>
                    <div className="text-xs sm:text-sm font-bold text-gray-900">{startup.startupName}</div>
                    <div className="text-xs text-gray-600">{startup.startupDomain}</div>
                    <div className="text-xs text-gray-600">{startup.fullName}</div>
                    <div className="text-xs text-gray-600">{startup.designation}</div>
                  </Popup>
                </Marker>
              ))} */}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SriLankaMap; 