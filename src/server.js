const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const twilio = require('twilio');

dotenv.config();

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
        <script>
          function sendSms(status, phone) {
            const accountSid = '${process.env.TWILIO_ACCOUNT_SID}';
            const authToken = '${process.env.TWILIO_AUTH_TOKEN}';
            const client = twilio(accountSid, authToken);
            let messageBody = '';
            if (status === 'accepted') {
              messageBody = 'We will take you on as a client.';
            } else if (status === 'denied') {
              messageBody = 'We are not taking any new clients.';
            }
  
            client.messages
              .create({
                body: messageBody,
                from: '${process.env.TWILIO_PHONE_NUMBER}',
                to: phone,
              })
              .then((message) => console.log(message.sid))
              .catch((error) => console.log(error));
          }
        </script>
        <button style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 5px;" onclick="sendSms('accepted', '${phone}')">Accept</button>
        <button style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 5px;" onclick="sendSms('denied', '${phone}')">Deny</button>
      </div>
    `
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
  

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});