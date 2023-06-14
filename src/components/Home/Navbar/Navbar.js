import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import LegalContentNav from './LegalContentNav';
import { Transition } from '@headlessui/react';
import BusContentNav from './BusContentNav';
import ContractNav from './ContractNav';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [showBus, setShowBus] = useState(false);
  const [showCont, setCont] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);

  function handleMenuClick() {
    setShowMenu(!showMenu);
    setShow(false);
    setShowBus(false);
    setCont(false);
  }

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

  const handleLegalConsultationClick = () => {
    setShow(!show);
  };

  const handleBusConsultationClick = () => {
    setShowBus(!showBus);
  };

  const handleContConsultationClick = () => {
    setCont(!showCont);
  };

  return (
    <nav className={`navbar ${isNavbarVisible ? '' : 'navbar--hidden'}`}>
      <input type="checkbox" className="hamburger-menu" id="menu-toggle" checked={showMenu} onChange={handleMenuClick} />
      <label htmlFor="menu-toggle" className="hamburger-menu-label">
        <div className="hamburger-menu-icon"></div>
      </label>
      <ul>
        <li key="home">
          <Link to="/">Home</Link>
        </li>
        <li key="about-us">
          <a href="#">About Us</a>
        </li>
        <li key="attorney-profile">
          <a href="#">Attorney Profile</a>
        </li>
        <li className="dropdown" key="how-we-help">
          <a href="#" className="dropdown-toggle" >
            How We Help
          </a>

            <ul className="dropdown-menu">
              <li>
                <Link onClick={handleLegalConsultationClick} to='/legal-consultation'>Legal consultation</Link>
              </li>
              <li>
                <Link onClick={handleBusConsultationClick} to="/business-consultation">Business Consultation</Link>
              </li>
              <li>
                <Link onClick={handleContConsultationClick} to="/contract-review">Contract Review</Link>
              </li>
            </ul>
          
        </li>

        <Transition.Root show={show}>
  <LegalContentNav setShow={setShow} />
</Transition.Root>

<Transition.Root show={showBus}>
  <BusContentNav setShowBus={setShowBus} />
</Transition.Root>

<Transition.Root show={showCont}>
  <ContractNav setCont={setCont} />
</Transition.Root>


        
        
              
        <li>
          <a href="#">Client Testimonials</a>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
