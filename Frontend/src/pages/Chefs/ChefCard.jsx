import React from 'react';
import SpecialtyDisplay from './SpecialtyDisplay';
import "../../assets/styles/Chefs.css";

export default function ChefCard({ chef, index }) {
  const isReverse = index % 2 !== 0;
  const animationDelayClass = index === 0 ? 'delay-2' : 'delay-3';

  return (
    <div className={`chef-card ${isReverse ? 'reverse' : ''} animate-fade-up ${animationDelayClass}`}>
      <div className="chef-image-wrapper">
        <img src={chef.image} alt={`Portrait of ${chef.name}`} className="chef-image" />
      </div>
      
      <div className="chef-details">
        {/* Forced dark color for the name */}
        <h2 className="chef-name" style={{ color: '#1a050a', marginBottom: '8px' }}>
          {chef.name}
        </h2>
        
        {/* Forced color for the title */}
        <div className="chef-title" style={{ color: '#d97706', fontWeight: '500', marginBottom: '16px' }}>
          {chef.title}
        </div>
        
        {/* Forced dark grey color for the bio text so it is readable on white */}
        <p className="chef-bio" style={{ color: '#444444', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
          {chef.bio}
        </p>
        
        <SpecialtyDisplay specialty={chef.specialty} />
      </div>
    </div>
  );
}