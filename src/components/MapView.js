import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchNearbySchools } from '../services/schoolService';
import SearchBar from './SearchBar';

const MapView = () => {
  const [userPosition, setUserPosition] = useState([0, 0]);
  const [schools, setSchools] = useState([]);

  // Get current location when the map first loads
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const coords = [latitude, longitude];
        setUserPosition(coords);

        const schoolResults = await fetchNearbySchools(latitude, longitude);
        setSchools(schoolResults);
      },
      (err) => console.error("Geolocation error:", err)
    );
  }, []);

  // Called when user searches a place
  const handleSearchLocation = async (newCoords) => {
    setUserPosition(newCoords);

    const [latitude, longitude] = newCoords;
    const schoolResults = await fetchNearbySchools(latitude, longitude);
    setSchools(schoolResults);
  };

  return (
    <>
      <SearchBar onSearch={handleSearchLocation} />

      <MapContainer center={userPosition} zoom={15} style={{ height: '90vh', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Your Location Marker */}
        <Marker position={userPosition}>
          <Popup>You are here</Popup>
        </Marker>

        {/* School Markers */}
        {schools.map((school, index) => (
          <Marker key={index} position={[school.lat, school.lon]}>
            <Popup>{school.display_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapView;
