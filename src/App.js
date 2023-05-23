import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Services from './components/Services';
import Contact from './components/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PopupBox from './PopupBox';

function App() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const handlePopupOpen = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            path="/contact"
            element={<Contact handlePopupOpen={handlePopupOpen} />}
          />
        </Routes>
        {isPopupVisible && (
          <PopupBox message={popupMessage} onClose={handlePopupClose} />
        )}
        <Services />
      </div>
    </BrowserRouter>
  );
}

export default App;
