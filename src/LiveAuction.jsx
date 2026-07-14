import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuctionDetailModal from './AuctionDetailModal';
import SignInModal from './SignInModal';
import './LiveAuction.css';

const auctionData = [
  { id: 1, name: 'Air Jordan', price: '$1,250', timeLeft: '2h 45m', bids: 23, image: '/assets/Air Jordan.jpg' },
  { id: 2, name: 'Yeezy Boost', price: '$850', timeLeft: '5h 12m', bids: 18, image: '/assets/Yeezy Boost.jpg' },
  { id: 3, name: 'Nike', price: '$720', timeLeft: '1h 33m', bids: 31, image: '/assets/Nike.jpg' },
  { id: 4, name: 'New Balance', price: '$420', timeLeft: '8h 09m', bids: 14, image: '/assets/New Balance.jpg' },
  { id: 5, name: 'Puma', price: '$390', timeLeft: '3h 21m', bids: 11, image: '/assets/puma.jpg' },
  { id: 6, name: 'Addidas', price: '$510', timeLeft: '6h 45m', bids: 19, image: '/assets/Addidas.jpg' },
  { id: 7, name: 'Yeezy Boost', price: '$950', timeLeft: '4h 10m', bids: 22, image: '/assets/Yeezy Boost.jpg' },
  { id: 8, name: 'Nike', price: '$780', timeLeft: '2h 55m', bids: 27, image: '/assets/Nike.jpg' },
  { id: 9, name: 'Air Jordan', price: '$1,350', timeLeft: '1h 15m', bids: 25, image: '/assets/Air Jordan.jpg' },
  { id: 10, name: 'New Balance', price: '$440', timeLeft: '7h 30m', bids: 13, image: '/assets/New Balance.jpg' },
  { id: 11, name: 'Puma', price: '$400', timeLeft: '5h 50m', bids: 16, image: '/assets/puma.jpg' },
  { id: 12, name: 'Addidas', price: '$530', timeLeft: '9h 05m', bids: 21, image: '/assets/Addidas.jpg' },
  { id: 13, name: 'New Balance', price: '$420', timeLeft: '8h 09m', bids: 14, image: '/assets/New Balance.jpg' },
  { id: 14, name: 'Nike', price: '$780', timeLeft: '2h 55m', bids: 27, image: '/assets/Nike.jpg' },
  { id: 15, name: 'Yeezy Boost', price: '$950', timeLeft: '4h 10m', bids: 22, image: '/assets/Yeezy Boost.jpg' },
  { id: 16, name: 'Air Jordan', price: '$1,350', timeLeft: '1h 15m', bids: 25, image: '/assets/Air Jordan.jpg' },
];

const LiveAuction = () => {
  const [showSellerForm, setShowSellerForm] = useState(false);
  const [modalAuction, setModalAuction] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  return (
    <>
      <Header showSellerForm={showSellerForm} setShowSellerForm={setShowSellerForm} showSignIn={showSignIn} setShowSignIn={setShowSignIn} />
      {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
      <div className="live-auction-page">
        <div className="live-auction-hero">
          <h1>Live Auctions</h1>
          <p>Welcome to the SneakRush Live Auction – where every second counts!<br /> Place your bids in real-time and claim the most exclusive sneakers before anyone else.</p>
        </div>
        <div className="auction-card-grid">
          {auctionData.map((item) => (
            <div className="auction-card" key={item.id}>
              <div className="auction-card-img-wrap">
                <img src={item.image} alt={item.name} className="auction-card-img" />
                <span className="auction-card-timer">{item.timeLeft} left</span>
              </div>
              <div className="auction-card-content">
                <div className="auction-card-title">{item.name}</div>
                <div className="auction-card-price">{item.price}</div>
                <div className="auction-card-bids">{item.bids} bids</div>
                <button className="auction-card-bid-btn" onClick={() => setModalAuction(item)}>Place Bid</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AuctionDetailModal auction={modalAuction} onClose={() => setModalAuction(null)} />
      <Footer />
    </>
  );
};

export default LiveAuction;
