import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SearchBar from './SearchBar';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapView = () => {
  const [position, setPosition] = useState([-1.2921, 36.8219]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);
      },
      () => {
        console.warn('Geolocation failed, using default.');
      }
    );

    setSchools([
      {
        name: 'Nairobi School',
        lat: -1.2884,
        lon: 36.8219,
      },
      {
        name: 'Starehe Boys',
        lat: -1.2864,
        lon: 36.8172,
      },
    ]);
  }, []);

  const handleSearch = (coords) => {
    setPosition(coords);
    setSchools([
      {
        name: 'Example School A',
        lat: coords[0] + 0.005,
        lon: coords[1] + 0.003,
      },
      {
        name: 'Example School B',
        lat: coords[0] - 0.004,
        lon: coords[1] - 0.006,
      },
    ]);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <MapContainer center={position} zoom={14} style={{ height: '90vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        {schools.map((school, index) => (
          <Marker key={index} position={[school.lat, school.lon]}>
            <Popup>{school.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
