import React, { useEffect, useState, useContext } from "react";
import "./AuctionDetailModal.css";
import { toast } from "sonner";
import { AuthContext } from "./context/AuthContext"; // ✅ Use your real AuthContext

// ✅ PaymentModal Component
const PaymentModal = ({ auction, winningBid, onClose, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const paymentData = {
        auctionId: auction.id,
        bidId: winningBid.id,
        amount: winningBid.amount,
        paymentMethod,
        status: "completed",
        paidAt: new Date().toISOString(),
      };

      console.log("Payment saved:", paymentData);
      toast.success("💰 Payment completed successfully!");
      onPaymentSuccess();
      onClose();
    } catch (error) {
      toast.error("❌ Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-modal-header">
          <h2>Complete Your Purchase</h2>
          <button className="payment-modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="payment-summary">
          <h3>Order Summary</h3>
          <div className="payment-item">
            <span>{auction.name}</span>
            <span>${winningBid.amount}</span>
          </div>
          <div className="payment-total">
            <span>Total</span>
            <span>${winningBid.amount}</span>
          </div>
        </div>

        <form onSubmit={handlePayment} className="payment-form">
          <div className="payment-methods">
            <label>
              <input
                type="radio"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit/Debit Card
            </label>
            <label>
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="card-form">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVC</label>
                  <input
                    type="text"
                    placeholder="123"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "paypal" && (
            <div className="paypal-info">
              <p>You will be redirected to PayPal to complete your payment.</p>
            </div>
          )}

          <div className="payment-actions">
            <button type="button" className="payment-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="payment-submit" disabled={loading}>
              {loading ? "Processing..." : `Pay $${winningBid.amount}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Sign In Prompt Component
const SignInPrompt = ({ onClose, onSignIn }) => {
  return (
    <div className="signin-prompt-overlay">
      <div className="signin-prompt-modal">
        <div className="signin-prompt-header">
          <span className="signin-prompt-title">Sign In Required</span>
          <button className="signin-prompt-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="signin-prompt-content">
          <div className="signin-prompt-icon">🔐</div>
          <p className="signin-prompt-message">
            You need to be signed in to place bids on auctions.
          </p>
          <p className="signin-prompt-submessage">
            Sign in to start bidding on your favorite sneakers!
          </p>
        </div>
        <div className="signin-prompt-actions">
          <button className="signin-prompt-cancel" onClick={onClose}>
            Maybe Later
          </button>
          <button className="signin-prompt-signin" onClick={onSignIn}>
            Sign In Now
          </button>
        </div>
      </div>
    </div>
  );
};

// ✅ Helper functions
function parseTimeLeft(timeLeft) {
  if (!timeLeft) return 0;
  let h = 0,
    m = 0;
  const hMatch = timeLeft.match(/(\d+)h/);
  const mMatch = timeLeft.match(/(\d+)m/);
  if (hMatch) h = parseInt(hMatch[1], 10);
  if (mMatch) m = parseInt(mMatch[1], 10);
  return h * 3600 + m * 60;
}

function formatTimeLeft(seconds) {
  if (seconds < 0) seconds = 0;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h.toString().padStart(2, "0")}:${m
    .toString()
    .padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

// ✅ Main Auction Modal
const AuctionDetailModal = ({ auction, onClose, openSignInModal }) => {
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  const [secondsLeft, setSecondsLeft] = useState(() =>
    parseTimeLeft(auction?.timeLeft)
  );
  const [mainImage, setMainImage] = useState(auction?.image);
  const [showBidInput, setShowBidInput] = useState(false);
  const [bidValue, setBidValue] = useState(
    auction?.price ? parseInt(auction.price.replace(/[^\d]/g, "")) + 10 : ""
  );
  const [currentBids, setCurrentBids] = useState([]);
  const [isWinner, setIsWinner] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [winningBid, setWinningBid] = useState(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  const images = auction?.images || [auction?.image];

  useEffect(() => {
    if (!auction) return;
    setSecondsLeft(parseTimeLeft(auction.timeLeft));
    setMainImage(auction.image);
  }, [auction]);

  useEffect(() => {
    if (!auction) return;
    if (secondsLeft <= 0) {
      checkIfWinner();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [auction, secondsLeft]);

  const fetchCurrentBids = async (auctionId) => {
    const mockBids = [
      { id: 1, userId: "user123", userName: "SneakerLover", amount: 250, timestamp: "2025-10-22T10:30:00Z" },
      { id: 2, userId: "user456", userName: "Collector42", amount: 230, timestamp: "2025-10-22T09:15:00Z" },
    ];
    setCurrentBids(mockBids);
  };

  const checkIfWinner = () => {
    if (user && currentBids.length > 0 && currentBids[0].userId === user.id) {
      setIsWinner(true);
      setWinningBid(currentBids[0]);
    }
  };

  const placeBid = async (bidData) => {
    try {
      toast.success("🎉 Bid placed successfully!");
      fetchCurrentBids(auction.id);
      setShowBidInput(false);
    } catch (error) {
      toast.error("❌ Failed to place bid");
    }
  };

  const handlePlaceBidClick = () => {
    if (!isAuthenticated) {
      setShowSignInPrompt(true);
      return;
    }
    setShowBidInput(true);
  };

  const handleSignInClick = () => {
    if (openSignInModal) openSignInModal();
    setShowSignInPrompt(false);
  };

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please sign in first!");
      return;
    }

    const currentPrice = parseInt(auction.price.replace(/[^\d]/g, ""));
    if (bidValue <= currentPrice) {
      toast.warning(`Your bid must be higher than $${currentPrice}`);
      return;
    }

    placeBid({
      auctionId: auction.id,
      amount: bidValue,
      userId: user.id,
    });
  };

  const handlePaymentSuccess = () => {
    setIsWinner(false);
    toast.success("🎊 Purchase completed! Thank you for your order.");
  };

  if (!auction) return null;

  return (
    <div className="auction-modal-overlay">
      <div className="auction-modal-box">
        <button className="auction-modal-close" onClick={onClose}>
          &times;
        </button>

        {/* Winner Popup */}
        {isWinner && (
          <div className="winner-notification">
            <div className="winner-content">
              <div className="winner-icon">🎉</div>
              <h3>Congratulations! You Won This Auction!</h3>
              <p>Your winning bid: <strong>${winningBid?.amount}</strong></p>
              <button className="payment-button" onClick={() => setShowPaymentModal(true)}>
                Proceed to Payment
              </button>
              <button
                className="payment-later-button"
                onClick={() => setIsWinner(false)}
              >
                I'll Pay Later
              </button>
            </div>
          </div>
        )}

        {/* Payment Modal */}
        {showPaymentModal && winningBid && (
          <PaymentModal
            auction={auction}
            winningBid={winningBid}
            onClose={() => setShowPaymentModal(false)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Sign-In Prompt */}
        {showSignInPrompt && (
          <SignInPrompt
            onClose={() => setShowSignInPrompt(false)}
            onSignIn={handleSignInClick}
          />
        )}

        {/* Main Auction Detail Content */}
        <div className="auction-modal-content details-layout">
          <div className="auction-modal-images">
            <img src={mainImage} alt={auction.name} className="auction-modal-main-img" />
            <div className="auction-modal-thumbnails">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="thumb"
                  className={`auction-modal-thumb${mainImage === img ? " active" : ""}`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          </div>

          <div className="auction-modal-details">
            <div className="auction-modal-title">{auction.name}</div>
            <div className="auction-modal-bidinfo">
              <div>
                <div className="label">Current Bid</div>
                <div className="value yellow">{auction.price}</div>
              </div>
              <div>
                <div className="label">Time Left</div>
                <div className="value">{formatTimeLeft(secondsLeft)}</div>
              </div>
            </div>

            <button
              className="auction-modal-bid-btn main"
              onClick={handlePlaceBidClick}
              disabled={showBidInput || secondsLeft <= 0}
            >
              {secondsLeft <= 0 ? "Auction Ended" : `Place Bid (${auction.price}+)`}
            </button>

            {/* Bid Input */}
            {showBidInput && (
              <div className="bid-modal-overlay">
                <div className="bid-modal">
                  <div className="bid-modal-header">
                    <span className="bid-modal-title">Place Your Bid</span>
                    <button className="bid-modal-close" onClick={() => setShowBidInput(false)}>
                      &times;
                    </button>
                  </div>
                  <form className="bid-modal-form-group" onSubmit={handleBidSubmit}>
                    <label htmlFor="bidAmount" className="bid-modal-form-label">
                      Your Bid Amount
                    </label>
                    <input
                      id="bidAmount"
                      className="bid-modal-input"
                      type="number"
                      min={auction?.price ? parseInt(auction.price.replace(/[^\d]/g, "")) + 10 : 1}
                      value={bidValue}
                      onChange={(e) => setBidValue(e.target.value)}
                      required
                      autoFocus
                    />
                    <div className="bid-modal-actions">
                      <button
                        type="button"
                        className="bid-modal-cancel"
                        onClick={() => setShowBidInput(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="bid-modal-submit">
                        Place Bid
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetailModal;
