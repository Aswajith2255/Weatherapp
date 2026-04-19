import React from 'react';
import './Navbar.css';

export default function Navbar({ cityName }) {
  return (
    <nav className="navbar-mobile">
      <h1 className="city-title">{cityName}</h1>
    </nav>
  );
}
