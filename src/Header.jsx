import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ showSellerForm, setShowSellerForm, navigate: navProp, showSignIn, setShowSignIn }) => {
  const navigate = navProp || useNavigate();
  const handleBrandClick = () => {
    const brandSection = document.getElementById('featured');
    if (brandSection) {
      brandSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('featured');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  };
  return (
    <header className="shoe-header">
      <div className="header-container">
        <div className="logo">
          <SneakrushLogo />
        </div>
        <div className="nav-center">
          <nav className="nav">
            <button className="nav-btn" onClick={() => {
              navigate('/');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 400);
            }}>Home</button>
            <button className="nav-btn" onClick={() => {
              navigate('/live-auction');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 400);
            }}>Live Auctions</button>
            <button className="nav-btn" onClick={handleBrandClick}>Brand</button>
            <button className="nav-btn" onClick={() => {
              navigate('/about');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 400);
            }}>About</button>
            <button className="nav-btn" onClick={() => {
              navigate('/contact');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }, 400);
            }}>Contact Us</button>
          </nav>
        </div>
        <div className="header-actions">
          <button className="btn-primary" onClick={() => setShowSignIn(true)}>Sign In</button>
        </div>
      </div>
    </header>
  );
};


import SneakrushLogo from './SneakrushLogo';
export default Header;
