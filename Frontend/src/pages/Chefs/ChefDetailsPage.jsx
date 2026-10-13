import React from 'react';
import { Link, useParams } from 'react-router-dom';
import SafeImage from '../../components/common/SafeImage';

export default function ChefDetailsPage() {
  const { id } = useParams();

  return (
    <article className="page">
      {/* Dark Page Header (Matches the 'Our story' About page style) */}
      <header style={{ backgroundColor: '#1a050a', color: '#fff', padding: '100px 20px 80px', textAlign: 'center' }}>
        <div className="container">
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb" style={{ color: '#a3a3a3', fontSize: '0.95rem', marginBottom: '24px', letterSpacing: '0.5px' }}>
            <Link to="/" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
            <span style={{ margin: '0 12px' }}>/</span>
            <Link to="/chefs" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Chefs</Link>
            <span style={{ margin: '0 12px' }}>/</span>
            <span style={{ color: '#e8c99b' }}>Chef Profile</span>
          </nav>
          
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: '4rem', margin: '0 0 16px 0', fontWeight: '400' }}>
            Chef <span style={{ color: '#e8c99b', fontStyle: 'italic' }}>Kamal</span>
          </h1>
          <p style={{ color: '#d4d4d4', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', letterSpacing: '0.5px' }}>
            Executive Chef • Clay Pot Feasts
          </p>
        </div>
      </header>

      {/* Bio Section with readable dark text on white background */}
      <section className="section light" style={{ backgroundColor: '#ffffff', padding: '80px 20px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'start' }}>
          
          {/* Chef Image with the rounded arch top */}
          <div className="chef-portrait" style={{ borderRadius: '200px 200px 0 0', overflow: 'hidden', backgroundColor: '#f1f3f5', border: '1px solid #eaeaea' }}>
            <SafeImage 
              src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80" 
              alt="Chef Kamal" 
              style={{ width: '100%', display: 'block', objectFit: 'cover', aspectRatio: '3/4' }} 
            />
          </div>

          {/* Biography Text - Explicitly colored dark for visibility */}
          <div className="chef-bio" style={{ color: '#333333' }}>
            <h2 style={{ fontFamily: 'var(--serif)', color: '#1a050a', fontSize: '2.5rem', marginBottom: '32px', fontWeight: '400' }}>
              The Journey
            </h2>
            
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '24px', color: '#444444' }}>
              With over two decades of experience in heritage Sri Lankan cuisine, Chef Kamal brings traditional village recipes to the modern table. His journey began in his grandmother's kitchen, where he learned the delicate balance of roasted spices and the patience required for earthen clay pot cooking.
            </p>
            
            <p style={{ fontSize: '1.15rem', lineHeight: '1.8', marginBottom: '48px', color: '#444444' }}>
              At Saffron & Fig, he orchestrates the open-fire kitchen, ensuring every dish carries the authentic smoky depth that defines our culinary repertoire.
            </p>

            <h3 style={{ fontFamily: 'var(--serif)', color: '#1a050a', fontSize: '1.8rem', marginBottom: '20px', fontWeight: '400' }}>
              Signature Expertise
            </h3>
            
            <ul style={{ listStyleType: 'disc', paddingLeft: '24px', color: '#444444', lineHeight: '2', fontSize: '1.1rem' }}>
              <li>Wood-fired clay pot preparations</li>
              <li>Traditional spice roasting and blending</li>
              <li>Heritage seafood curation</li>
              <li>Farm-to-table village recipes</li>
            </ul>
          </div>

        </div>
      </section>
    </article>
  );
}