import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar({ onSearch, onLocate }) {
  const [inputVal, setInputVal] = useState('');

  const handleSearchClick = () => {
    if (inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      onSearch(inputVal.trim());
    }
  };

  return (
    <div className="search-section">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />
        <button className="search-btn" onClick={handleSearchClick} aria-label="Search">🔍</button>
      </div>
      <button className="location-btn" onClick={onLocate} aria-label="Use My Location">📍 Your Location</button>
    </div>
  );
}
