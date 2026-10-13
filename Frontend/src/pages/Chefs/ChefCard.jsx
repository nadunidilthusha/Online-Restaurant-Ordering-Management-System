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
        <h2 className="chef-name">{chef.name}</h2>
        <div className="chef-title">{chef.title}</div>
        <p className="chef-bio">{chef.bio}</p>
        
        <SpecialtyDisplay specialty={chef.specialty} />
      </div>
    </div>
  );
}