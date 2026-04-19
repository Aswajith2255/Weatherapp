import React from 'react';

const svgStyle = { width: '100%', height: '100%', display: 'block' };

export const SunIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <circle cx="50" cy="50" r="22" fill="#FFD700" />
    <g stroke="#FFD700" strokeWidth="6" strokeLinecap="round">
      <line x1="50" y1="10" x2="50" y2="20" />
      <line x1="50" y1="80" x2="50" y2="90" />
      <line x1="10" y1="50" x2="20" y2="50" />
      <line x1="80" y1="50" x2="90" y2="50" />
      <line x1="22" y1="22" x2="29" y2="29" />
      <line x1="71" y1="71" x2="78" y2="78" />
      <line x1="22" y1="78" x2="29" y2="71" />
      <line x1="71" y1="29" x2="78" y2="22" />
    </g>
  </svg>
);

export const MoonIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <path d="M55,20 A30,30 0 1,1 30,75 A40,40 0 0,0 55,20 Z" fill="#E2E8F0" />
  </svg>
);

export const CloudyIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <path d="M25,60 a15,15 0 0,1 10,-28 a20,20 0 0,1 35,-5 a15,15 0 0,1 5,28 z" fill="#FFFFFF" opacity="0.9" />
    <circle cx="45" cy="55" r="18" fill="#FFFFFF" opacity="0.9" />
  </svg>
);

export const PartlyCloudyIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <circle cx="65" cy="40" r="18" fill="#FFD700" />
    <path d="M25,65 a12,12 0 0,1 8,-22 a18,18 0 0,1 32,-2 a12,12 0 0,1 2,22 z" fill="#FFFFFF" opacity="0.85" />
  </svg>
);

export const RainIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <path d="M25,50 a15,15 0 0,1 10,-28 a20,20 0 0,1 35,-5 a15,15 0 0,1 5,28 z" fill="#CBD5E1" />
    <g stroke="#3B82F6" strokeWidth="4" strokeLinecap="round">
      <line x1="35" y1="60" x2="30" y2="75" />
      <line x1="50" y1="65" x2="45" y2="80" />
      <line x1="65" y1="60" x2="60" y2="75" />
    </g>
  </svg>
);

export const ShowersIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <path d="M25,50 a15,15 0 0,1 10,-28 a20,20 0 0,1 35,-5 a15,15 0 0,1 5,28 z" fill="#94A3B8" />
    <g stroke="#3B82F6" strokeWidth="4" strokeLinecap="round">
      <line x1="30" y1="60" x2="25" y2="75" />
      <line x1="45" y1="60" x2="40" y2="75" />
      <line x1="60" y1="60" x2="55" y2="75" />
      <line x1="75" y1="60" x2="70" y2="75" />
    </g>
  </svg>
);

export const SnowIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <path d="M25,45 a15,15 0 0,1 10,-28 a20,20 0 0,1 35,-5 a15,15 0 0,1 5,28 z" fill="#E2E8F0" />
    <g stroke="#BAE6FD" strokeWidth="4" strokeLinecap="round">
      <line x1="35" y1="60" x2="35" y2="65" />
      <line x1="50" y1="65" x2="50" y2="70" />
      <line x1="65" y1="60" x2="65" y2="65" />
      <line x1="40" y1="75" x2="40" y2="80" />
      <line x1="60" y1="75" x2="60" y2="80" />
    </g>
  </svg>
);

export const StormIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <path d="M25,50 a15,15 0 0,1 10,-28 a20,20 0 0,1 35,-5 a15,15 0 0,1 5,28 z" fill="#64748B" />
    <path d="M55,55 L40,75 L50,75 L45,95 L65,70 L55,70 Z" fill="#FBBF24" />
  </svg>
);

export const FogIcon = ({ size = 64 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={svgStyle}>
    <g stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round">
      <line x1="20" y1="40" x2="80" y2="40" opacity="0.8"/>
      <line x1="30" y1="55" x2="70" y2="55" opacity="0.6"/>
      <line x1="40" y1="70" x2="90" y2="70" opacity="0.5"/>
      <line x1="10" y1="85" x2="60" y2="85" opacity="0.4"/>
    </g>
  </svg>
);

export const DrizzleIcon = RainIcon;
