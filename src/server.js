const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

function generateUniqueToken() {
  // Generate a unique UUID token
  return uuidv4();
}

const acceptToken = generateUniqueToken();
const denyToken = generateUniqueToken();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(allowCrossDomain);

const sendSms = (status, phone) => {  
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  let messageBody = '';

  if (status === 'accepted') {
    messageBody = 'We will take you on as a client.';
  } else if (status === 'denied') {
    messageBody = 'We are not taking any new clients.';
  }

  return client.messages
    .create({
      body: messageBody,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });
};

app.post('/sendemail', async (req, res) => {
  const { name, phone, message, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });



  const mailOptions = {
    from: email,
    to: process.env.EMAIL_ADDRESS,
    subject: 'New message from website contact form',
    html: `
      <div style="background-color: #F4F4F4; padding: 20px; border-radius: 10px; font-family: 'Open Sans', sans-serif;">
        <p style="font-size: 16px; margin-bottom: 10px;">Name: ${name}</p>
        <p style="font-size: 16px; margin-bottom: 10px;">Phone: ${phone}</p>
        <p style="font-size: 16px; margin-bottom: 20px;">Message: ${message}</p>
        <a href="http://localhost:3001/sendsms/${acceptToken}/${phone}" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none;">Accept</a>
        <a href="http://localhost:3001/sendsms/${denyToken}/${phone}" style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none;">Deny</a>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.send({ success: false });
  }
});

app.get('/sendsms/:token/:phone', async (req, res) => {
  const { token, phone } = req.params;

  // Verify the token and perform the corresponding action
  if (token === acceptToken) {
    try {
      await sendSms('accepted', phone);
      console.log('SMS sent');

      res.json({ success: true, message: 'SMS sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  } else if (token === denyToken) {
    try {
      await sendSms('denied', phone);
      console.log('SMS sent');

      res.json({ success: true, message: 'SMS sent' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  } else {
    // Invalid token
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
