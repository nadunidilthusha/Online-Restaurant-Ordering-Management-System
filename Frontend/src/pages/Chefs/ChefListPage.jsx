import React from 'react';
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
      <section className="chefs-hero animate-fade-up delay-1">
        <div className="subtitle">Meet the masters</div>
        <h1>Our Chefs</h1>
        <p>The culinary minds behind Saffron & Fig. Dedicated to preserving heritage village recipes and mastering the art of wood-fired cooking.</p>
      </section>

      <section className="chefs-container">
        {chefsData.map((chef, index) => (
          <ChefCard key={chef.id} chef={chef} index={index} />
        ))}
      </section>
    </div>
  );
}