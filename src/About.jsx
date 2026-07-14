import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './About.css';
import TeamSection from './TeamSection';
import SignInModal from './SignInModal';

const About = () => {
  const [showSignIn, setShowSignIn] = React.useState(false);
  return (
    <>
      <Header showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      <div className="about-page">
        <div className="about-container">
    <h1>About Us</h1>
    <p className="about-lead">Sneakrush is the premier destination for exclusive sneaker auctions and rare finds.<br /> Our mission is to connect sneaker enthusiasts, collectors, and sellers in a secure, transparent, and exciting marketplace.</p>
          <div className="about-section">
            <h2>Our Story</h2>
            <p className="about-lead">Founded by sneaker lovers, Sneakrush was created to make it easy for anyone to buy or sell authentic, limited-edition sneakers.<br /> We believe in trust, community, and the thrill of the auction experience.</p>
          </div>
          <div className="about-section">
            <h2>Why Choose Us?</h2>
            <ul>
              <li>100% Authenticity Guarantee</li>
              <li>Secure Payments & Fast Shipping</li>
              <li>Expert Authentication Team</li>
              <li>Vibrant Sneaker Community</li>
            </ul>
          </div>
          </div>
          <div className="about-section">
            <TeamSection />
          </div>
          <div className="about-section">
            <h3>Contact</h3>
            <p>Have questions? <a href="mailto:support@shoeauction.com">Contact our support team</a> and we’ll be happy to help!</p>
          </div>
        
      </div>
      <Footer />
    </>
  );
};

export default About;
