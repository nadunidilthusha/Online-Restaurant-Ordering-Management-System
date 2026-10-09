import React, { useState } from 'react';

export default function MapEmbed() {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard?.writeText('Saffron & Fig, 24 Galle Road, Colombo 03');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="contact-map-section" id="interactive-map">
      <div className="map-section-header">
        <div>
          <div className="contact-tag">
            <span className="contact-tag-dot"></span>
            INTERACTIVE LOCATION
          </div>
          <h2 className="map-section-title">
            Find Your Way to <em>Saffron &amp; Fig</em>
          </h2>
        </div>
        <div className="valet-badge">
          <span>🅿</span>
          <span>Complimentary valet parking available at west entrance</span>
        </div>
      </div>

      <div className="luxury-map-canvas">
        {/* Live Traffic Pill */}
        <div className="traffic-pill">
          <span className="traffic-dot"></span>
          <span>Live Traffic: Normal Flow • Cinnamon Gardens</span>
        </div>

        {/* Map Zoom Controls */}
        <div className="map-zoom-controls">
          <button
            type="button"
            className="zoom-btn"
            onClick={() => setZoomLevel((z) => Math.min(z + 0.15, 1.45))}
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            type="button"
            className="zoom-btn"
            onClick={() => setZoomLevel((z) => Math.max(z - 0.15, 0.85))}
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="zoom-btn"
            onClick={() => setZoomLevel(1)}
            aria-label="Center location"
            title="Recenter"
          >
            ⌖
          </button>
        </div>

        {/* Dark Luxury Map Graphic Canvas */}
        <svg
          className="map-svg-roads"
          viewBox="0 0 1000 500"
          preserveAspectRatio="none"
          style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease' }}
        >
          <rect width="1000" height="500" fill="#0e1215" />

          {/* Water Body (Beira Lake / Reservoir) */}
          <path
            d="M 680 320 C 740 300, 840 330, 920 380 C 960 410, 980 480, 890 500 C 800 510, 720 480, 690 420 Z"
            fill="#101e28"
          />
          <text x="820" y="420" fill="#243d4f" fontSize="13" letterSpacing="2" fontFamily="sans-serif">
            BEIRA RESERVOIR
          </text>

          {/* Secondary road network */}
          <path d="M 0 120 L 1000 180" stroke="#1c242c" strokeWidth="8" fill="none" />
          <path d="M 0 350 L 1000 310" stroke="#1c242c" strokeWidth="10" fill="none" />
          <path d="M 180 0 L 220 500" stroke="#1c242c" strokeWidth="8" fill="none" />
          <path d="M 620 0 L 660 500" stroke="#1c242c" strokeWidth="8" fill="none" />

          {/* Primary Arterials */}
          <path d="M 50 480 L 450 120 L 850 80" stroke="#26333f" strokeWidth="12" fill="none" />
          <path d="M 200 480 L 600 240 L 980 220" stroke="#2d3c4a" strokeWidth="14" fill="none" />

          {/* Pavilion Boulevard & Galle Road Highlight */}
          <path
            d="M 120 380 Q 420 280 650 270 T 950 260"
            stroke="#d4af6a"
            strokeWidth="3"
            strokeOpacity="0.45"
            fill="none"
            strokeDasharray="6 4"
          />
          <path
            d="M 80 420 L 520 250 L 850 240"
            stroke="url(#goldRoadGlow)"
            strokeWidth="5"
            fill="none"
          />

          {/* Area Labels */}
          <text x="210" y="320" fill="#4d5c6a" fontSize="12" letterSpacing="3" fontFamily="sans-serif">
            PAVILION BOULEVARD (CINNAMON GARDENS)
          </text>
          <text x="140" y="220" fill="#354452" fontSize="11" letterSpacing="2" fontFamily="sans-serif">
            ALBERT CRESCENT
          </text>
          <text x="640" y="290" fill="#354452" fontSize="11" letterSpacing="2" fontFamily="sans-serif">
            INDEPENDENCE AVENUE
          </text>

          <defs>
            <linearGradient id="goldRoadGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#8c1d2f" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#d4af6a" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ecd5a1" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulsing Beacon Marker on Map */}
        <div className="map-beacon">
          <div className="beacon-pulse"></div>
          <div className="beacon-label">
            <strong>Saffron &amp; Fig</strong> · 24 Galle Road, Colombo 03
          </div>
        </div>

        {/* Floating Details Card */}
        <div className="map-floating-card">
          <div className="mfc-title-row">
            <h4 className="mfc-name">Saffron &amp; Fig</h4>
            <span className="mfc-rating">★ 4.9 (1,240+)</span>
          </div>
          <p className="mfc-addr">24 Galle Road, Colombo 03</p>

          <div className="mfc-actions">
            <a
              href="https://maps.google.com/?q=24+Galle+Road+Colombo+03"
              target="_blank"
              rel="noreferrer"
              className="mfc-btn"
            >
              🧭 Directions
            </a>

            <button
              type="button"
              className="mfc-btn"
              onClick={() => setSaved(!saved)}
            >
              {saved ? '✓ Saved' : '🔖 Save'}
            </button>

            <button
              type="button"
              className="mfc-btn"
              onClick={handleShare}
            >
              {copied ? '✓ Copied' : '🔗 Share'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
