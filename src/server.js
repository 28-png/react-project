const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const twilio = require('twilio');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

app.post('/sendemail', async (req, res) => {
  const { name, phone, message, email, accept, deny } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: 'New message from website contact form',
    html: `
      <p>Name: ${name}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
      <button style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 5px;" onclick="accept()">Accept</button>
      <button style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 5px;" onclick="deny()">Deny</button>
    `
  };

//   <script>
//   function accept() {
//     fetch('/accept', { method: 'POST' })
//       .then(response => console.log(response))
//       .catch(error => console.error(error));
//   }
//   function deny() {
//     fetch('/deny', { method: 'POST' })
//       .then(response => console.log(response))
//       .catch(error => console.error(error));
//   }
// </script>

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    // const clientPhoneNumber = phone;
    // if (accept) {
    //   sendTextMessage(clientPhoneNumber, 'Your appointment has been accepted');
    // } else if (deny) {
    //   sendTextMessage(clientPhoneNumber, 'We are not taking on any new clients at this time.');
    // }

    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
});

// app.post('/accept', (req, res) => {
//   res.send('Accepted');
// });

// app.post('/deny', (req, res) => {
//   res.send('Denied');
// });

// const sendTextMessage = (phoneNumber, message) => {
//     const accountSid = process.env.TWILIO_ACCOUNT_SID;
//     const authToken = process.env.TWILIO_AUTH_TOKEN;
//     const client = twilio(accountSid, authToken);
  
//     client.messages.create({
//       body: message,
//       to: phoneNumber,
//       from: process.env.TWILIO_PHONE_NUMBER
//     })
//     .then(message => console.log(`Sent message to ${message.to}: ${message.body}`))
//     .catch(error => console.error(`Error sending message to ${phoneNumber}: ${error.message}`));
//   };
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
