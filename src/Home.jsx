import React, { useState } from 'react';
import './CSS/Home.css';
import { Link } from 'react-router-dom';

const Home1 = () => {
  // State to manage the visibility of the mobile menu
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Function to toggle the mobile menu visibility
  const toggleMobileMenu = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Function to close the mobile menu
  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <div>
      {/* Header section with navigation bar */}
      <header className={`navbar ${showMobileMenu ? 'show-mobile-menu' : ''}`}>
        <nav className="navbar">
          <a href="#" className="logo">
            <span className="logo-text">TURNERS</span>
          </a>
          {/* Navigation links */}
          <ul className="menu-links">
            <li><a href="#">Turners Business</a></li>
            <li><a href="#">Explore</a></li>
            <li className="language-item">
              <a href="#">
                <span className="material-symbols-outlined">language</span>
                English
              </a>
            </li>
            <li><a href="#">Become a Customer</a></li>
            {/* Link to the login page */}
            <li className="join-btn"><Link to="/login">Join Us</Link></li>
            {/* Close menu button for mobile view */}
            <span id="close-menu-btn" className="material-symbols-outlined" onClick={closeMobileMenu}>close</span>
          </ul>
          {/* Hamburger menu button for mobile view */}
          <span id="hamburger-btn" className="material-symbols-outlined" onClick={toggleMobileMenu}>menu</span>
        </nav>
      </header>

      {/* Hero section with background image */}
      <section className="hero-section"
        style={{
          height: '75vh',
          backgroundImage: 'url("images/pexel3.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          display: 'flex',
          padding: '0 20px',
          alignItems: 'right',
        }}
      >
        <div className="content">
          <h1 style={{ color: "white", marginTop: "10px" }}>Find the right Car Services, right away</h1>

          {/* Popular tags section */}
          <div className="popular-tags" style={{ color: "white", marginTop: "300px", font: "20px" }}>
            Popular:
            <ul className="tags">
              <li><a href="#">Choose your Car</a></li>
              <li><a href="#">Insurance Services</a></li>
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Emergency Services</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home1;
