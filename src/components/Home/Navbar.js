import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    function handleMenuClick() {
      setShowMenu(!showMenu);
    }
    
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  useEffect(() => {
    let prevScrollPos = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setIsNavbarVisible(prevScrollPos > currentScrollPos);
      prevScrollPos = currentScrollPos;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${isNavbarVisible ? '' : 'navbar--hidden'}`}>
          <input type="checkbox" className="hamburger-menu" id="menu-toggle" checked={showMenu} onChange={handleMenuClick} />
          <label htmlFor="menu-toggle" className="hamburger-menu-label">
            <div className="hamburger-menu-icon"></div>
          </label>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><a href="#">About Us</a></li>
            <li><a href="#">Attorney Profile</a></li>
            <li><a href="#">How we Help</a></li>
            <li><a href="#">Client Testimonials</a></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
    </nav>
  );
}

export default Navbar;
