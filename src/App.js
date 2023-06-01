import React, { useState } from 'react';
import Navbar from './components/Home/Navbar';
import Services from './components/Home/Services';
import Contact from './components/ContactAndServer/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PopupBox from './components/ContactAndServer/PopupBox';
import { motion } from "framer-motion"


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

  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,
      transition: {
        duration: 1.5,
        ease: [0.87, 0, 0.13, 1],
      },
    },
  };
  
  return (
    <BrowserRouter>
     <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative z-50 w-full bg-black"
        initial="initial"
        animate="animate"
          variants={blackBox}
      />
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
      </div>
    </BrowserRouter>
  );
}

export default App;
