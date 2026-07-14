import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './Header';
import SignInModal from './SignInModal';
import Footer from './Footer';
import './ShoeAuction.css';
import AuctionDetailModal from './AuctionDetailModal';
import SellerRegister from './SellerRegister';


// =============================
// 1. BASIC STATE & DATA
// =============================

// Banner slider
const banners = [
  {
    title: 'Bid Before It is Gone!',
    highlight: 'Own the Heat.',
    description: 'Virtual reality (VR) is a simulated experience that can be similar to or completely different from the real world. Applications of VR include entertainment, education and business.',
    button: 'BID NOW',
    image: '/assets/bg1.png',
    bgCircle: '/assets/bg.png',
    deal: 'DEAL OF THE DAY',
    timer: { hours: 11, minutes: 6, seconds: 1 }
  },
  {
    title: 'One Chance. One Winner.',
    highlight: 'One Pair.',
    description: 'Step into tomorrow with our latest VR technology. Perfect for gaming, learning, and more. Limited time offer!',
    button: 'BID NOW',
    image: '/assets/bg2.png',
    bgCircle: '/assets/bg.png',
    deal: 'LIMITED TIME',
    timer: { hours: 8, minutes: 30, seconds: 45 }
  },
  {
    title: ' Kicks Up for Grabs!',
    highlight: 'The Crown Jewel of',
    description: 'Upgrade your setup with immersive VR headsets. Enjoy seamless experiences for work and play. Don\'t miss out!',
    button: 'BID NOW',
    image: '/assets/bg.png',
    bgCircle: '/assets/bg.png',
    deal: 'HOT DEAL',
    timer: { hours: 5, minutes: 12, seconds: 10 }
  }
];

// =============================
// 2. MAIN COMPONENT
// =============================
const ShoeAuction = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner(prev => (prev + 1) % banners.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 6,
    minutes: 23,
    seconds: 47
  });

  // =============================
  // 3. AUCTION DATA
  // =============================
  const auctions = [
    { id: 1, name: 'Air Jordan', price: '$1,250', timeLeft: '2h 45m', bids: 23, image: '/assets/Air Jordan.jpg' },
    { id: 2, name: 'Yeezy Boost', price: '$850', timeLeft: '5h 12m', bids: 18, image: '/assets/Yeezy Boost.jpg' },
    { id: 3, name: 'Nike', price: '$720', timeLeft: '1h 33m', bids: 31, image: '/assets/Nike.jpg' },
    { id: 4, name: 'New Balance', price: '$420', timeLeft: '8h 09m', bids: 14, image: '/assets/New Balance.jpg' },
    { id: 5, name: 'puma', price: '$420', timeLeft: '8h 09m', bids: 14, image: '/assets/puma.jpg' },
    { id: 6, name: 'Addidas', price: '$420', timeLeft: '8h 09m', bids: 14, image: '/assets/Addidas.jpg' },
    { id: 7, name: 'New Balance', price: '$420', timeLeft: '8h 09m', bids: 14, image: '/assets/New Balance.jpg' },
    { id: 8, name: 'Yeezy Boost', price: '$850', timeLeft: '5h 12m', bids: 18, image: '/assets/Yeezy Boost.jpg' },
  ];

  // =============================
  // 4. BRANDS DATA
  // =============================
  const brands = [
    { name: 'Puma', image: '/assets/puma1.jpg' },
    { name: 'Adidas', image: '/assets/adidas1.jpg' },
    { name: 'Nike', image: '/assets/Nike1.jpg' },
    { name: 'Air Jordan', image: '/assets/Jordan1.jpg' },
    { name: 'Reebok', image: '/assets/Reebok1.jpg' },
  ];

  // =============================
  // 5. CUSTOMER REVIEWS DATA
  // =============================
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Michael",
      rating: 5,
      date: "2023-10-15",
      comment: "The authentication process was flawless and the sneakers arrived in perfect condition. Will definitely use ShoeAuction again for my rare finds!",
      verified: true,
      image: "/assets/michael.jpg"
    },
    {
      id: 2,
      name: "Sarah K.",
      rating: 4,
      date: "2023-10-10",
      comment: "Great experience overall. The bidding process was exciting and transparent. Shipping was a bit slow but the product was worth the wait.",
      verified: true,
      image: "/assets/sarah k.jpg"
    },
    {
      id: 3,
      name: "James L.",
      rating: 5,
      date: "2023-10-05",
      comment: "I've been looking for these limited edition Dunks for years. ShoeAuction made the process so easy and secure. 100% authentic!",
      verified: true,
      image: "/assets/james L.jpg"
    }
  ]);

  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // =============================
  // 6. MODAL & FORM STATE
  // =============================
  const [modalAuction, setModalAuction] = useState(null);

  // =============================
  // 7. REVIEW FUNCTIONS
  // =============================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value
    });
  };

  const handleRatingChange = (rating) => {
    setNewReview({
      ...newReview,
      rating: rating
    });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    const review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: parseInt(newReview.rating),
      date: new Date().toISOString().split('T')[0],
      comment: newReview.comment,
      verified: false
    };
    
    setReviews([review, ...reviews]);
    setNewReview({
      name: '',
      rating: 5,
      comment: ''
    });
    setShowForm(false);
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>★</span>
    ));
  };

  // =============================
  // 8. RENDER SECTIONS
  // =============================
  return (
    <div className="shoe-auction">
      <Header showSellerForm={showSellerForm} setShowSellerForm={setShowSellerForm} navigate={navigate} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}

      {/* 2. HERO SECTION */}
      <section className="shoe-hero shr">
        <div className="hero-content hero-content-overlay">
          <div className="hero-text">
            <h1>
              EXCLUSIVE SNEAKER<br />
              <span className="gold-text">AUCTIONS</span>
            </h1>
            <p div className="hero-text">Discover rare, limited edition, and premium sneakers from the world's most sought-after collections</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => navigate('/live-auction')}>View Live Auctions</button>
              <button className="btn-secondary">Consign Your Pair</button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">247</div>
                <div className="stat-label">Live Auctions</div>
              </div>
              <div className="stat">
                <div className="stat-number">$1.2M</div>
                <div className="stat-label">In Total Bids</div>
              </div>
              <div className="stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Authenticity Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VIDEO SECTION */}
      <section className="hero-video-section">
        <video autoPlay muted loop>
          <source src="/assets/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      {/* 4. LIVE AUCTION SECTION */}
      <section className="live-auctions">
        <div className="container">
          <h2>LIVE <span className="gold-text">AUCTIONS</span></h2>
          <p className="section-subtitle">Bid on the most exclusive sneakers in the market</p>
          <div className="auctions-grid">
            {auctions.map(auction => (
              <div key={auction.id} className="auction-card">
                <div className="auction-image">
                  <img
                    src={auction.image}
                    alt={auction.name}
                    className="auction-img aim"
                  />
                  <div className="time-badge">{auction.timeLeft} left</div>
                </div>
                <div className="auction-details">
                  <h3>{auction.name}</h3>
                  <div className="auction-price">{auction.price}</div>
                  <div className="auction-bids">{auction.bids} bids</div>
                  <button className="bid-btn" onClick={() => setModalAuction(auction)}>Place Bid</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BANNER SECTION */}
      <section className="banner-slider-section">
        <h2 className="banner-slider-t">BEST <span className="gold-text">DEALS</span></h2>
        <div className="banner-slider-card">
          <div className="banner-slider-content">
            <span className="banner-deal">{banners[currentBanner].deal}</span>
            <h1 className="banner-title">
              <span className="banner-highlight">{banners[currentBanner].highlight}</span><br />
              {banners[currentBanner].title.replace(banners[currentBanner].highlight, '')}
            </h1>
            <p className="banner-desc">{banners[currentBanner].description}</p>
            <div className="banner-actions">
              <button className="banner-btn" onClick={() => setModalAuction(auctions[0])}>{banners[currentBanner].button}</button>
              <div className="banner-timer">
                <span>{banners[currentBanner].timer.hours}</span>
                <span className="banner-timer-label">Hours</span>
                <span>{banners[currentBanner].timer.minutes}</span>
                <span className="banner-timer-label">Minutes</span>
                <span>{banners[currentBanner].timer.seconds}</span>
                <span className="banner-timer-label">Second</span>
              </div>
            </div>
          </div>
          <div className="banner-slider-image-wrap">
            <img src={banners[currentBanner].bgCircle} alt="background circle" className="banner-bg-circle" />
            <img src={banners[currentBanner].image} alt="banner visual" className="banner-main-img" />
          </div>
          <button className="banner-arrow-btn" onClick={() => setCurrentBanner((currentBanner + 1) % banners.length)} aria-label="Next banner">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#faed00ff"/><path d="M13 10l5 6-5 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </section>

      {/* 6. OUR BRAND SECTION */}
      <section id="featured" className="brand-section">
        <div className="container">
          <h2>OUR<span className="gold-text"> BRANDS</span></h2>
          <p className="section-subtitle">Discover the top sneaker brands in our marketplace</p>
          <div className="brand-grid">
            {brands.map((brand, idx) => (
              <div key={idx} className="brand-card">
                <img src={brand.image} alt={brand.name} className="brand-img bim" />
                <h3>{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CUSTOMER REVIEW SECTION REMOVED */}

      {/* 8. CTA SECTION */}
      <section className="cta-section">
        <div className="container">
          <h2>READY TO <span className="gold-text">SELL WITH US?</span>?</h2>
          <p>Join thousands of sneaker enthusiasts in our exclusive auction community</p>
          <div className="cta-buttons">
            <button className="btn-primary" onClick={() => setShowSellerForm(true)}>Create Account</button>
            <button className="btn-secondary">Learn More</button>
          </div>
        </div>
        {showSellerForm && (
          <div className="seller-modal-overlay" onClick={() => setShowSellerForm(false)}>
            <div className="seller-modal" onClick={e => e.stopPropagation()}>
              <button className="seller-modal-close" onClick={() => setShowSellerForm(false)}>&times;</button>
              <SellerRegister />
            </div>
          </div>
        )}
      </section>

      <Footer />

      {/* Auction Detail Modal */}
      <AuctionDetailModal auction={modalAuction} onClose={() => setModalAuction(null)} />
    </div>
  );
}

export default ShoeAuction;