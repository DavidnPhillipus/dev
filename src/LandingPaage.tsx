import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import "./LandingPage.css";

const LandingPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">🌿</span> FarmSmart
        </div>
        <button className="hamburger-btn" onClick={toggleMenu}>
          <FaBars size={20} />
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#home" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" onClick={closeMenu}>About</a></li>
          <li><a href="#features" onClick={closeMenu}>Features</a></li>
          <li><a href="#why" onClick={closeMenu}>Why FarmSmart</a></li>
          <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
          <li><a href="#login" className="login-btn" onClick={closeMenu}>Login</a></li>
        </ul>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Manage. Track. Sell. All in One Place.</h1>
          <p>
            FarmSmart helps farmers organize their produce and livestock,
            manage their farms efficiently, and reach the right buyers —
            while giving buyers a trusted, transparent way to find quality
            products directly from farms.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Start as a Farmer</button>
            <button className="btn btn-outline">Explore as a Buyer</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1500595046743-ff22c0ab6d24?auto=format&fit=crop&w=800&q=80"
            alt="Farmer using tablet"
          />
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1581290964856-87d87d6e399b?auto=format&fit=crop&w=800&q=80"
            alt="Fresh produce"
          />
        </div>
        <div className="about-text">
          <h2>About FarmSmart</h2>
          <p>
            FarmSmart is an intelligent farm management and marketplace
            platform designed to simplify agriculture. From recording
            inventory to tracking harvests and connecting with buyers,
            FarmSmart ensures farmers have everything they need in one place.
          </p>
          <p>
            <strong>Our Mission:</strong> To empower farmers with smart
            technology, enhance transparency in agriculture, and connect
            producers directly with the markets that need them most.
          </p>
        </div>
      </section>

      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>🌾 For Farmers</h3>
            <ul>
              <li>Track crops and livestock in real time.</li>
              <li>Monitor harvests, stock levels, and sales.</li>
              <li>Access insights to optimize production.</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>🛒 For Buyers</h3>
            <ul>
              <li>Browse and buy farm products easily.</li>
              <li>Filter by product type, category, and price.</li>
              <li>Connect directly with local farmers.</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>💼 For Everyone</h3>
            <ul>
              <li>Secure accounts and real-time dashboards.</li>
              <li>Modern design accessible on all devices.</li>
              <li>Seamless transactions and records.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="how" id="how">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="icon">1</span>
            <h4>Register</h4>
            <p>Sign up as a Farmer or Buyer.</p>
          </div>
          <div className="step">
            <span className="icon">2</span>
            <h4>Add Products</h4>
            <p>Farmers list their crops or livestock.</p>
          </div>
          <div className="step">
            <span className="icon">3</span>
            <h4>Browse & Buy</h4>
            <p>Buyers explore and purchase products.</p>
          </div>
          <div className="step">
            <span className="icon">4</span>
            <h4>Track Progress</h4>
            <p>Monitor sales and farm data via dashboards.</p>
          </div>
        </div>
      </section>

      <section className="why" id="why">
        <div className="why-text">
          <h2>Why Choose FarmSmart?</h2>
          <p>
            FarmSmart isn't just a marketplace — it's a farm management partner.
            We help farmers understand their production, reach buyers faster,
            and reduce waste through smart tracking. Buyers enjoy fresher,
            direct-from-farm produce with transparency and trust.
          </p>
          <ul>
            <li>✔ Digital farm record management</li>
            <li>✔ Transparent buyer-seller relationships</li>
            <li>✔ Data-driven insights for better decisions</li>
            <li>✔ Trusted, secure transactions</li>
          </ul>
        </div>
        <div className="why-image">
          <img
            src="https://images.unsplash.com/photo-1501523460185-2aa5b82f5a32?auto=format&fit=crop&w=800&q=80"
            alt="Farmer with produce"
          />
        </div>
      </section>

      <section className="cta" id="contact">
        <h2>Take Control of Your Farm Today</h2>
        <p>Join thousands of farmers and buyers using FarmSmart to grow smarter.</p>
        <button className="btn btn-primary">Join FarmSmart</button>
      </section>

      <footer>
        <p>© 2025 FarmSmart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;