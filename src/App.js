import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Contact from './components/Contact';
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
        </Routes>
        {isSuccessPageVisible && (
          <PopupBox message={popupMessage} onClose={handlePopupClose} />
        )}
        <Services />
          </div>
    </BrowserRouter>
  );
}

export default App;
