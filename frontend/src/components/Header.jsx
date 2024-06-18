import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar fixed-top">
      <div className="container">
        <Link to="/" className="navbar-brand">RTS Tracker</Link>
      </div>
    </header>
  );
};

export default Header;
