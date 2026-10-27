import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ChefCard from './ChefCard';
import { useReveal } from '../../hooks/useReveal'; 
import "../../assets/styles/Chefs.css";

export default function ChefListPage() {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useReveal([]); 

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/chefs');
        if (!response.ok) throw new Error('Failed to fetch chefs');
        const data = await response.json();
        // Only show active chefs to the public
        setChefs(data.filter(chef => chef.active));
      } catch (error) {
        console.error('Error fetching chefs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
  }, []);

  return (
    <div className="chefs-page">
      <section className="chefs-hero reveal" style={{ textAlign: 'center', padding: '100px 20px 80px', backgroundColor: '#1a050a' }}>
        <nav aria-label="breadcrumb" style={{ color: '#a3a3a3', fontSize: '0.95rem', marginBottom: '24px', letterSpacing: '0.5px' }}>
          <Link to="/" style={{ color: '#a3a3a3', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 12px' }}>/</span>
          <span style={{ color: '#e8c99b' }}>Chefs</span>
        </nav>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: '4rem', color: '#ffffff', margin: '0 0 24px 0', fontWeight: '400' }}>
          Our <span style={{ color: '#e8c99b', fontStyle: 'italic' }}>Chefs</span>
        </h1>
        <p style={{ color: '#d4d4d4', fontSize: '1.1rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.8', letterSpacing: '0.5px' }}>
          The culinary minds behind Saffron & Fig. Dedicated to preserving heritage village recipes and mastering the art of wood-fired cooking.
        </p>
      </section>

      <section className="chefs-container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Loading chefs...</div>
        ) : (
          chefs.map((chef, index) => (
            <ChefCard key={chef.id} chef={chef} index={index} />
          ))
        )}
      </section>
    </div>
  );
}