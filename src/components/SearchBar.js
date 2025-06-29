import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    // Use Nominatim API to geocode the place
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await res.json();

    if (data.length > 0) {
      const location = data[0];
      onSearch([parseFloat(location.lat), parseFloat(location.lon)]);
    }

    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} style={{ textAlign: 'center', margin: '1rem' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a town or place..."
        style={{ padding: '0.5rem', width: '250px', marginRight: '10px' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem' }}>Search</button>
    </form>
  );
};

export default SearchBar;
