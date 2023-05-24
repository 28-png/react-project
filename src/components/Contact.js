import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = ({ handlePopupOpen }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      const { success, error } = event.data;

      if (success) {
        handlePopupOpen('Success! Your message has been sent.');
      } else if (error) {
        handlePopupOpen('Failed to send message. Please try again.');
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handlePopupOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/sendemail', {
        name,
        phone,
        message,
      });

      if (response.data.success) {
        handlePopupOpen('Email sent! Please check your inbox.');

          setName('');
          setPhone('');
          setMessage('');
      } else {
        handlePopupOpen('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error(error);
      handlePopupOpen('An error occurred. Please try again.');
    }
  };

  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
