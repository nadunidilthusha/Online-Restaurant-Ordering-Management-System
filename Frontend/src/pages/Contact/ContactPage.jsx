import React from 'react';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import MapEmbed from './MapEmbed';
import '../../assets/styles/Contact.css';

export default function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-container">
        {/* Page Hero Header */}
        <header className="contact-header">
          <div className="contact-tag">
            <span className="contact-tag-dot"></span>
            CONCIERGE &amp; RESERVATIONS
          </div>
          <h1 className="contact-title">
            Get in Touch with <em>Saffron &amp; Fig</em>
          </h1>
          <p className="contact-subtitle">
            We welcome your table inquiries, private dining requests, catering bookings, or culinary feedback. Our guest relations team responds promptly within the day.
          </p>
        </header>

        {/* 2-Column Split: Message Form & Contact Info */}
        <div className="contact-main-grid">
          <ContactForm />
          <ContactInfo />
        </div>

        {/* Full-width Stats Counter Strip */}
        <div className="contact-stats-banner">
          <div className="cs-item">
            <span className="cs-num">12</span>
            <span className="cs-label">Years of Cooking</span>
          </div>
          <div className="cs-item">
            <span className="cs-num">85</span>
            <span className="cs-label">Dishes on Menu</span>
          </div>
          <div className="cs-item">
            <span className="cs-num">2,400+</span>
            <span className="cs-label">Happy Diners</span>
          </div>
          <div className="cs-item">
            <span className="cs-num">4.9</span>
            <span className="cs-label">Average Rating</span>
          </div>
        </div>

        {/* Interactive Location / Map Section */}
        <MapEmbed />

        {/* Bespoke Engagements Banner */}
        <div className="bespoke-banner">
          <div className="bespoke-content">
            <div className="bespoke-tag">BESPOKE ENGAGEMENTS</div>
            <h3 className="bespoke-title">
              Planning an exclusive banquet or private celebration?
            </h3>
            <p className="bespoke-desc">
              Our master sommelier and Executive Chef Amara Perera provide tailored multi-course menu creations with curated vintage pairings.
            </p>
          </div>
          <div className="bespoke-actions">
            <button
              type="button"
              className="btn-deck"
              onClick={() => alert('Event Deck request dispatched to sommelier.')}
            >
              Request Event Deck
            </button>
            <a href="tel:+94112345678" className="btn-host-line">
              Direct Host Line
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
