import React, { useState } from 'react';
import Navbar from './components/Home/Navbar';
import Services from './components/Home/Services';
import Contact from './components/ContactAndServer/Contact';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PopupBox from './components/ContactAndServer/PopupBox';
import InitialTransition from './InitialTransition';
import { motion } from "framer-motion"; 





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
  
  const content = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 2.8 },
    },
  };
  
  const nav = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };
  
  const services = {
    initial: { y: -20, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <div>
      <motion.section exit={{ opacity: 0 }}>
      <InitialTransition />
      <motion.div
        initial="initial"
        animate="animate"
        variants={content}
        className="space-y-12"
      >
     <BrowserRouter>
     <div className="App">
      <motion.section variants={nav}>
       <Navbar />
       </motion.section>
        <Routes>
          <Route 
             path="/contact"
             element={<Contact handlePopupOpen={handlePopupOpen} />}
          />
         </Routes>
         {isPopupVisible && (
           <PopupBox message={popupMessage} onClose={handlePopupClose} />
         )}
         <motion.section variants={services}>
         <Services />
         </motion.section>
         </div>
   </BrowserRouter>
   </motion.div>
   </motion.section>
   </div>
   
  );
}

export default App;
