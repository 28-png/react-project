import React from 'react';
import './PopupBox.css';

const PopupBox = ({ message, onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup-box">
        <h1>Success!</h1>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PopupBox;
