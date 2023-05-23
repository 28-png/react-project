import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import AboutMe from './components/AboutMe';
import Contact from './components/Contact';
// import SuccessPage from './SuccessPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PopupBox from './PopupBox';

function App() {
  const [isSuccessPageVisible, setIsSuccessPageVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleSuccessPage = () => {
    handlePopupOpen('Success! Your message has been sent.');
  };
  

  const handlePopupClose = () => {
    setIsSuccessPageVisible(false);
  };

  const handlePopupOpen = (message) => {
    setPopupMessage(message);
    setIsSuccessPageVisible(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/contact"
            element={<Contact handleSuccessPage={handleSuccessPage} handlePopupOpen={handlePopupOpen} />}
          />
          {/* <Route
            path="/success"
            element={<SuccessPage />}
          /> */}
        </Routes>
        {isSuccessPageVisible && (
          <PopupBox message={popupMessage} onClose={handlePopupClose} />
        )}
          <main>
            <section className="hero">
              <div className="container">
                <h1>Lawyer and Business Consultation Services</h1>
                <p>We provide legal and business consultation services to help individuals and companies make informed decisions.</p>
                <button>Learn More</button>
              </div>
            </section>

            <div className="mission-container">
              <h2>Our Mission</h2>
              <p>Our mission is to empower individuals and organizations to achieve their full potential through innovative solutions and exceptional service. We believe in building strong, long-lasting relationships with our clients and partners, and strive to create a culture of collaboration and continuous improvement. With a focus on integrity, excellence, and innovation, we are committed to delivering measurable results and making a positive impact in the communities we serve.</p>
            </div>

            <AboutMe />

            <section className="services">
              <div className="container">
                <h2>Our Services</h2>
                <div className="service-items">
                  <div className="service-item">
                    <h3>Legal Consultation</h3>
                    <p>We provide legal consultation services to help individuals and companies understand their legal rights and obligations.</p>
                  </div>
                  <div className="service-item">
                    <h3>Business Consultation</h3>
                    <p>We provide business consultation services to help individuals and companies make informed decisions about their business operations.</p>
                  </div>
                  <div className="service-item">
                    <h3>Contract Review</h3>
                    <p>We provide contract review services to help individuals and companies understand the terms and conditions of their contracts.</p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
