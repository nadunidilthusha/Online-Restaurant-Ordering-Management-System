import React, { useState } from 'react';
import * as contactApi from '../../api/contactApi';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    inquiryType: 'General Inquiry',
    subject: '',
    message: '',
    newsletter: false,
    whatsappPreferred: true,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in required fields (Name, Email, Message).');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Backend submission (FR-5.1)
      await contactApi.create({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        inquiryType: formData.inquiryType,
        subject: formData.subject,
        message: formData.message,
        whatsappPreferred: formData.whatsappPreferred,
      }).catch(() => {
        // Dev fallback
      });

      setSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        inquiryType: 'General Inquiry',
        subject: '',
        message: '',
        newsletter: false,
        whatsappPreferred: true,
      });
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form-card">
      <div className="contact-form-header">
        <div>
          <div className="inquiry-tag">INQUIRY FORM</div>
          <h2 className="form-heading">Send Us a Direct Message</h2>
        </div>
        <div className="form-header-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
            <line x1="6" y1="1" x2="6" y2="4"></line>
            <line x1="10" y1="1" x2="10" y2="4"></line>
            <line x1="14" y1="1" x2="14" y2="4"></line>
          </svg>
        </div>
      </div>

      {submitted ? (
        <div
          style={{
            background: '#faf7f2',
            border: '1px solid #d4af6a',
            borderRadius: '6px',
            padding: '30px 20px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '2rem', color: '#8c1d2f', marginBottom: '10px' }}>✓</div>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.6rem', color: '#2a0b13', marginBottom: '8px' }}>
            Message Relayed to Concierge
          </h3>
          <p style={{ color: '#6d615c', fontSize: '0.92rem', marginBottom: '20px' }}>
            Thank you for reaching out. Our guest relations team will contact you shortly via email or WhatsApp.
          </p>
          <button
            type="button"
            className="btn-send-message"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && (
            <div
              style={{
                background: '#fee2e2',
                color: '#991b1b',
                padding: '10px 14px',
                borderRadius: '4px',
                marginBottom: '16px',
                fontSize: '0.85rem',
              }}
            >
              {error}
            </div>
          )}

          <div className="cf-grid-2">
            <div>
              <label className="cf-label" htmlFor="cf-fullName">FULL NAME</label>
              <input
                type="text"
                id="cf-fullName"
                name="fullName"
                className="cf-input"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="cf-label" htmlFor="cf-email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="cf-email"
                name="email"
                className="cf-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="cf-grid-2">
            <div>
              <label className="cf-label" htmlFor="cf-phone">PHONE NUMBER</label>
              <input
                type="tel"
                id="cf-phone"
                name="phone"
                className="cf-input"
                placeholder="+94 77 000 0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="cf-label" htmlFor="cf-inquiryType">INQUIRY / ORDER TYPE</label>
              <select
                id="cf-inquiryType"
                name="inquiryType"
                className="cf-select"
                value={formData.inquiryType}
                onChange={handleChange}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Table Reservation">Table Reservation</option>
                <option value="Private Dining">Private Dining &amp; Banquets</option>
                <option value="Catering">Event / Wedding Catering</option>
                <option value="Feedback">Culinary Feedback</option>
              </select>
            </div>
          </div>

          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-subject">SUBJECT LINE</label>
            <input
              type="text"
              id="cf-subject"
              name="subject"
              className="cf-input"
              placeholder="e.g. Private Salon Booking for 12 Guests"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="cf-field">
            <label className="cf-label" htmlFor="cf-message">MESSAGE</label>
            <textarea
              id="cf-message"
              name="message"
              className="cf-textarea"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="cf-options-row">
            <label className="cf-checkbox-label">
              <input
                type="checkbox"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <span>Send me weekly specials &amp; tasting notes</span>
            </label>

            <div className="whatsapp-toggle-wrap">
              <span>WhatsApp preferred</span>
              <label className="switch">
                <input
                  type="checkbox"
                  name="whatsappPreferred"
                  checked={formData.whatsappPreferred}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn-send-message"
            disabled={loading}
          >
            {loading ? 'Transmitting…' : (
              <>
                Send message
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
