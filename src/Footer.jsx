import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="shoe-footer">
    <div className="container">
      <div className="footer-content">
  <div className="footer-section footer-section-logo">
          <div className="logo">
            <SneakrushLogo />
          </div>
          <p>The premier destination for exclusive sneaker auctions and rare finds. Welcome to Sneakrush!</p>
          <div className="social-links">
            <a href="https://www.instagram.com/nsbmgreenuniversity/?hl=en" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="#twitter"><i className="fab fa-twitter"></i></a>
            <a href="https://www.facebook.com/nsbm.lk/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
          </div>
        </div>
  <div className="footer-section footer-section-links">
          <h4>QUICK LINKS</h4>
          <a href="#auctions">Live Auctions</a>
          <a href="#sell">Sell With Us</a>
          <a href="#authentication">Authentication</a>
          <a href="#shipping">Shipping Info</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2023 SNEAKRUSH. ALL RIGHTS RESERVED.</p>
      </div>
    </div>
  </footer>
);

import SneakrushLogo from './SneakrushLogo';
export default Footer;
