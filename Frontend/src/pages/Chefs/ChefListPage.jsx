import React from 'react';
import { Link } from 'react-router-dom';
import ChefCard from './ChefCard';
import "../../assets/styles/Chefs.css";

const chefsData = [
  {
    id: 1,
    name: 'Kamal Perera',
    title: 'Executive Chef & Founder',
    bio: "With over two decades of experience in heritage Sri Lankan cuisine, Chef Kamal brings traditional village recipes to the modern table. His journey began in his grandmother's kitchen, where he learned the delicate balance of roasted spices and the patience required for earthen clay pot cooking.\n\nAt Saffron & Fig, he orchestrates the open-fire kitchen, ensuring every dish carries the authentic smoky depth that defines our culinary repertoire.",
    specialty: 'Heritage Clay Pot Feasts',
    image: 'https://placehold.co/400x550/2a0b13/d4af6a?text=Chef+Kamal'
  },
  {
    id: 2,
    name: 'Sarah Silva',
    title: 'Head Pastry Chef',
    bio: "Chef Sarah is a master of delicate heirloom sweets, seamlessly blending local spices with classic European pastry techniques. After training in premier culinary institutes, she returned to her roots to elevate traditional desserts.\n\nHer creations at Saffron & Fig are a testament to local ingredients—utilizing kithul treacle, Ceylon cinnamon, and fresh coconut to craft desserts that perfectly conclude a rich, wood-fired meal.",
    specialty: 'Botanical & Heirloom Sweets',
    image: 'https://placehold.co/400x550/2a0b13/d4af6a?text=Chef+Sarah'
  }
];

export default function ChefListPage() {
  return (
    <div className="chefs-page">
      <section className="chefs-hero animate-fade-up delay-1" style={{ textAlign: 'center', padding: '100px 20px 80px', backgroundColor: '#1a050a' }}>
        
        {/* The Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" style={{ color: '#a3a3a3', fontSize: '0.95rem', marginBottom: '24px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 12px' }}>/</span>
          <span style={{ color: '#e8c99b' }}>Chefs</span>
        </nav>

        {/* Styled Main Title matching "Our story" */}
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '4rem', color: '#ffffff', margin: '0 0 24px 0', fontWeight: '400' }}>
          Our <span style={{ color: '#e8c99b', fontStyle: 'italic' }}>Chefs</span>
        </h1>
        
        {/* Styled Description Paragraph */}
        <p style={{ color: '#d4d4d4', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8', letterSpacing: '0.5px' }}>
          The culinary minds behind Saffron & Fig. Dedicated to preserving heritage village recipes and mastering the art of wood-fired cooking.
        </p>
      </section>

      <section className="chefs-container">
        {chefsData.map((chef, index) => (
          <ChefCard key={chef.id} chef={chef} index={index} />
        ))}
      </section>
    </div>
  );
}