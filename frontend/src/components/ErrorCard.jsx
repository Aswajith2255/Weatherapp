import React from 'react';
import './ErrorCard.css';

export default function ErrorCard({ message, onRetry }) {
  return (
    <div className="error-card">
      <h2>⚠️ Error</h2>
      <p>{message}</p>
      <button className="retry-btn" onClick={onRetry}>Try Again</button>
    </div>
  );
}
