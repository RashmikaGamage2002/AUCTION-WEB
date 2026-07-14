import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

export default function Navbar({ openSignIn }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div style={{display:'flex', alignItems:'center'}}>
        <h2 style={{margin:0, marginRight:12}}>AUCTION</h2>
        <Link to="/">Home</Link>
        <Link to="/live-auction">Live</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div style={{display:'flex', alignItems:'center'}}>
        {user ? (
          <>
            <span style={{marginRight:12}}>Hi, {user.name || user.email}</span>
            <Link to="/profile" style={{marginRight:8}}>Profile</Link>
            {user.isAdmin && <Link to="/admin" style={{marginRight:8}}>Admin</Link>}
            <button className="btn" onClick={() => { logout(); navigate('/'); }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{marginRight:8}} className="btn">Login</Link>
            <Link to="/register" style={{marginRight:8}}>Register</Link>
          </>
        )}
      </div>
    </div>
  );
}