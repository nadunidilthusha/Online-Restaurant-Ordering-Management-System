import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer
      style={{
        background: '#070405',
        borderTop: '1px solid rgba(212, 175, 106, 0.25)',
        padding: '60px 0 30px',
        color: '#b3a8a3',
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
        }}
      >
        {/* Brand & Story */}
        <div>
          <div
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2rem',
              fontWeight: 600,
              color: '#f8f3ea',
              marginBottom: '12px',
            }}
          >
            Saffron <span style={{ color: '#d4af6a', fontStyle: 'italic' }}>&amp;</span> Fig
          </div>
          <p style={{ fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '300px', marginBottom: '20px' }}>
            Seasonal food, cooked over open fire, since 2014.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['IG', 'FB', 'X'].map((s) => (
              <span
                key={s}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  border: '1px solid rgba(212, 175, 106, 0.35)',
                  color: '#ecd5a1',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Explore Links */}
        <div>
          <h4
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#ecd5a1',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            Explore
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
            <li><Link to="/about" style={{ color: '#b3a8a3', transition: 'color 0.2s' }}>About</Link></li>
            <li><Link to="/chefs" style={{ color: '#b3a8a3', transition: 'color 0.2s' }}>Chefs</Link></li>
            <li><Link to="/order" style={{ color: '#b3a8a3', transition: 'color 0.2s' }}>Order online</Link></li>
            <li><Link to="/contact" style={{ color: '#b3a8a3', transition: 'color 0.2s' }}>Contact</Link></li>
          </ul>
        </div>

        {/* Visit Us */}
        <div>
          <h4
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#ecd5a1',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            Visit us
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem' }}>
            <li>24 Galle Road, Colombo 03</li>
            <li>Mon to Sun, 11:00 to 22:30</li>
            <li><a href="tel:+94110000000" style={{ color: '#b3a8a3' }}>+94 11 000 0000</a></li>
            <li><a href="mailto:hello@saffronfig.com" style={{ color: '#b3a8a3' }}>hello@saffronfig.com</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="container"
        style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.8rem',
        }}
      >
        <div>&copy; {new Date().getFullYear()} Saffron &amp; Fig. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#privacy" style={{ color: '#b3a8a3' }}>Privacy</a>
          <a href="#terms" style={{ color: '#b3a8a3' }}>Terms</a>
        </div>
      </div>
    </footer>
  );
}
