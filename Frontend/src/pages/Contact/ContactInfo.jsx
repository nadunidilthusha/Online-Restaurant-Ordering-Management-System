import React from 'react';

export default function ContactInfo() {
  const scrollToMap = () => {
    const el = document.getElementById('interactive-map');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="contact-info-list">
      {/* 1. Location & Estate */}
      <div className="info-card">
        <div className="info-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <div className="info-card-content">
          <div className="info-card-label">LOCATION &amp; ESTATE</div>
          <h3 className="info-card-main">42 Pavilion Boulevard</h3>
          <p className="info-card-sub">Cinnamon Gardens, Colombo 07</p>
          <div className="info-card-link" onClick={scrollToMap} role="button" tabIndex={0}>
            View on map &amp; directions →
          </div>
        </div>
      </div>

      {/* 2. Reservations Desk */}
      <div className="info-card">
        <div className="info-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
        <div className="info-card-content">
          <div className="info-card-label">RESERVATIONS DESK</div>
          <h3 className="info-card-main">+94 11 234 5678</h3>
          <p className="info-card-sub">+94 77 890 1234 (WhatsApp Direct)</p>
          <a href="tel:+94112345678" className="btn-call-now">
            📞 Call Now
          </a>
        </div>
      </div>

      {/* 3. Direct Inquiries */}
      <div className="info-card">
        <div className="info-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <div className="info-card-content">
          <div className="info-card-label">DIRECT INQUIRIES</div>
          <h3 className="info-card-main" style={{ fontSize: '1.1rem' }}>
            reservations@letoile-dining.com
          </h3>
          <p className="info-card-sub">events@letoile-dining.com</p>
        </div>
      </div>

      {/* 4. Service Hours */}
      <div className="info-card">
        <div className="info-card-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <div className="info-card-content">
          <div className="info-card-label">SERVICE HOURS</div>
          <table className="hours-table">
            <tbody>
              <tr>
                <td>Monday – Thursday</td>
                <td>5:00 PM – 11:00 PM</td>
              </tr>
              <tr>
                <td>Friday – Sunday</td>
                <td>12:00 PM – Midnight</td>
              </tr>
              <tr>
                <td>Weekend High Tea</td>
                <td>3:30 PM – 5:30 PM</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Kitchen Host Desk */}
      <div className="info-card" style={{ borderLeft: '3px solid var(--wine)' }}>
        <div className="info-card-icon" style={{ background: '#240a12', color: '#ecd5a1' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a5 5 0 0 1 5 5c0 1.5-.6 2.8-1.5 3.7.3.7.5 1.5.5 2.3v1H8v-1c0-.8.2-1.6.5-2.3C7.6 9.8 7 8.5 7 7a5 5 0 0 1 5-5z"></path>
            <rect x="6" y="16" width="12" height="6" rx="2"></rect>
          </svg>
        </div>
        <div className="info-card-content">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
            <span className="info-card-label">KITCHEN HOST DESK</span>
            <span className="chef-badge">
              <span className="pulse-dot"></span>
              Active On Floor
            </span>
          </div>
          <h3 className="info-card-main">Amara Perera</h3>
          <p className="info-card-sub">Head Chef &amp; Woodfire Specialist</p>
        </div>
      </div>
    </div>
  );
}
