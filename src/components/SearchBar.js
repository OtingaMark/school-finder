import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data && data[0]) {
      const { lat, lon } = data[0];
      onSearch([parseFloat(lat), parseFloat(lon)]);
    } else {
      alert('Location not found');
    }

    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} style={{ textAlign: 'center', margin: '1rem' }}>
      <input
        type="text"
        placeholder="Search a town or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '0.5rem', width: '250px' }}
      />
      <button type="submit" style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
