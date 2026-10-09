import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    // TODO: send the email to your backend
    setEmail('');
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link to="/" className="logo">Saffron<span>&amp;</span>Fig</Link>
            <p>Seasonal food, cooked over open fire, since 2014.</p>
            <div className="socials">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="X">X</a>
            </div>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/chefs">Chefs</Link></li>
              <li><Link to="/order">Order online</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Visit us</h4>
            <ul>
              <li>24 Galle Road, Colombo 03</li>
              <li>Mon to Sun, 11:00 to 22:30</li>
              <li><a href="tel:+94110000000">+94 11 000 0000</a></li>
              <li><a href="mailto:hello@saffronfig.com">hello@saffronfig.com</a></li>
            </ul>
          </div>
          <div>
            <h4>Get weekly specials</h4>
            <p>One email a week. Unsubscribe anytime.</p>
            <form className="newsletter" onSubmit={subscribe}>
              <input type="email" required placeholder="Your email" aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <button className="btn btn-primary" type="submit">Subscribe</button>
            </form>
            {done && <p className="subscribed" role="status">Subscribed. Thank you!</p>}
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Saffron &amp; Fig. All rights reserved.</span>
          <span><a href="#">Privacy</a> &nbsp; <a href="#">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}