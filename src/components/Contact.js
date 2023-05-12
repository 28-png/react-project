import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
    const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3000/sendemail',
      headers: { 'content-type': 'application/json' },
      data: {
        name: name,
        phone: phone,
        message: message,
        email: 'murphy.d.matthew28@gmail.com.com' // replace with your email
      }
    })
    .then(response => {
      if (response.data.success) {
        setEmailSent(true);
        axios({
          method: 'post',
          url: 'http://localhost:3000/sendtext',
          headers: { 'content-type': 'application/json' },
          data: {
            phone: phone,
            message: 'You have been accepted as a client. Please call us at (123) 456-7890 to schedule an appointment.'
          }
        });
      } else {
        setEmailSent(false);
        axios({
          method: 'post',
          url: 'http://localhost:3000/sendtext',
          headers: { 'content-type': 'application/json' },
          data: {
            phone: phone,
            message: 'We are not taking on any new clients at this time.'
          }
        });
      }
    })
    .catch(error => {
      setEmailSent(false);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
      <label>Phone:</label>
      <input type="text" name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
      <label>Message:</label>
      <textarea name="message" value={message} onChange={e => setMessage(e.target.value)}></textarea>
      <button type="submit">Submit</button>
      {emailSent === true && <p>Thank you for contacting us. We will get back to you shortly.</p>}
      {emailSent === false && <p>Sorry, there was a problem submitting your message. Please try again later.</p>}
    </form>
  );
};

export default Contact;