import React from 'react';


export default function SpecialtyDisplay({ specialty }) {
  if (!specialty) return null;

  return (
    <div className="specialty-box">
      <div className="specialty-label">Signature Expertise</div>
      <div className="specialty-text">{specialty}</div>
    </div>
  );
}