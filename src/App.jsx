import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignInModal from "./SignInModal";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ShoeAuction from "./ShoeAuction";
import LiveAuction from "./LiveAuction";
import About from "./About";
import ContactUs from "./ContactUs";
import Payment from "./pages/Payment.jsx";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <Navbar openSignIn={() => setShowSignIn(true)} />
        {showSignIn && <SignInModal onClose={() => setShowSignIn(false)} />}
        <Routes>
          <Route path="/" element={<ShoeAuction />} />
          <Route path="/live-auction" element={<LiveAuction />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
