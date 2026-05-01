'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function MapComponent({ locations = [] }) {
  useEffect(() => {
    // Fix default marker icon issue in Next.js
    import('leaflet').then(L => {
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  // Generate consistent pseudo-random coordinates based on location ID near Jakarta
  const getCoordinates = (id) => {
    if (!id) return [-6.2088, 106.8456];
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const latOffset = ((hash % 100) - 50) * 0.002; 
    const lngOffset = (((hash * 3) % 100) - 50) * 0.002;
    return [-6.2088 + latOffset, 106.8456 + lngOffset];
  };

  return (
    <MapContainer center={[-6.2088, 106.8456]} zoom={12} style={{ height: '100%', width: '100%', borderRadius: '2.5rem' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {locations.map((loc) => {
        const position = getCoordinates(loc.id);
        return (
          <Marker key={loc.id} position={position}>
            <Popup>
              <div className="font-sans">
                <h3 className="font-bold text-sm mb-1">{loc.name}</h3>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider mb-2">{loc.category}</span>
                <p className="text-xs text-slate-600 mb-2">{loc.address}</p>
                <p className="text-[10px] text-slate-400">Disiarkan: {new Date(loc.created_at).toLocaleString('id-ID')}</p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}