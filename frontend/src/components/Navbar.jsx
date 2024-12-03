  import React, { useState } from "react";
  import "../styles/Navbar.css";

  const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
      <nav className="navbar">
        <div className="navbar-logo">
          <a href="/">College Manager</a>
        </div>
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/">Features</a></li>
          <li><a href="/login" className="btn btn-primary">Login</a></li>
        </ul>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </div>
      </nav>
    );
  };

  export default Navbar;
