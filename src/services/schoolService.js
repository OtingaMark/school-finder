export async function fetchNearbySchools(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=school&limit=20&bounded=1&viewbox=${lon - 0.02},${lat + 0.02},${lon + 0.02},${lat - 0.02}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
