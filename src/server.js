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
    messageBody = 'Thank you for reaching out to NCL Consulting LLC. After reviewing your information, we \nbelieve we can help you. Please schedule a 30 minute free consultation.\n\nBest,\n\nNaphtalia C. Lafontant, Esq.\nNCL Consulting LLC\n312-620-6103';
  } else if (status === 'denied') {
    messageBody = 'Thank you for reaching out to NCL Consulting LLC. At this time, we are either not accepting\nnew clients or we do not believe that we can help you. Please do not hesitate to contact us at a\nlater date or if another matter arises. We look forward to working with you in the future.\n\nBest,\n\nNaphtalia C. Lafontant, Esq.\nNCL Consulting LLC\n312-620-6103';
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

// ... (existing code)

app.get('/sendsms/:token/:phone', async (req, res) => {
  const { token, phone } = req.params;

  // Verify the token and perform the corresponding action
  if (token === acceptToken) {
    try {
      await sendSms('accepted', phone);
      console.log('SMS sent');

      res.send(`
        <html>
          <head>
            <style>
              /* Styles for the success message */

              body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: #f4f4f4;
              }

              .card {
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                text-align: center;
                font-family: 'Arial', sans-serif;
              }

              .success-icon {
                display: inline-block;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #4CAF50;
                color: #fff;
                font-size: 60px;
                line-height: 100px;
              }

              .success-icon svg {
                vertical-align: middle;
              }
            </style>
            <script>
              window.onload = function() {
                window.opener.postMessage({ success: true }, "*");
              };
            </script>
          </head>
          <body>
            <div class="card">
              <div class="success-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h1>SMS sent successfully!</h1>
              <p>You can close this window.</p>
            </div>
          </body>
        </html>
      `);
    } catch (error) {
      console.error(error);
      res.send(`
        <html>
          <head>
            <style>
              /* Styles for the error message */

              body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: #f4f4f4;
              }

              .card {
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                text-align: center;
                font-family: 'Arial', sans-serif;
              }

              .error-icon {
                display: inline-block;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #FF5722;
                color: #fff;
                font-size: 60px;
                line-height: 100px;
              }

              .error-icon svg {
                vertical-align: middle;
              }
            </style>
            <script>
              window.onload = function() {
                window.opener.postMessage({ error: true }, "*");
              };
            </script>
          </head>
          <body>
            <div class="card">
              <div class="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12" y2="16"></line>
                </svg>
              </div>
              <h1>Failed to send SMS</h1>
              <p>Please try again.</p>
            </div>
          </body>
        </html>
      `);
    }
  } else if (token === denyToken) {
    try {
      await sendSms('denied', phone);
      console.log('SMS sent');

      res.send(`
        <html>
          <head>
            <style>
              /* Styles for the deny message */

              body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: #f4f4f4;
              }

              .card {
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                text-align: center;
                font-family: 'Arial', sans-serif;
              }

              .deny-icon {
                display: inline-block;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #FF5722;
                color: #fff;
                font-size: 60px;
                line-height: 100px;
              }

              .deny-icon svg {
                vertical-align: middle;
              }
            </style>
            <script>
              window.onload = function() {
                window.opener.postMessage({ success: true }, "*");
              };
            </script>
          </head>
          <body>
            <div class="card">
              <div class="deny-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </div>
              <h1>SMS denied successfully!</h1>
              <p>You can close this window.</p>
            </div>
          </body>
        </html>
      `);
    } catch (error) {
      console.error(error);
      res.send(`
        <html>
          <head>
            <style>
              /* Styles for the error message */

              body {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
                background-color: #f4f4f4;
              }

              .card {
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                background-color: #fff;
                text-align: center;
                font-family: 'Arial', sans-serif;
              }

              .error-icon {
                display: inline-block;
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background-color: #FF5722;
                color: #fff;
                font-size: 60px;
                line-height: 100px;
              }

              .error-icon svg {
                vertical-align: middle;
              }
            </style>
            <script>
              window.onload = function() {
                window.opener.postMessage({ error: true }, "*");
              };
            </script>
          </head>
          <body>
            <div class="card">
              <div class="error-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12" y2="16"></line>
                </svg>
              </div>
              <h1>Failed to send SMS</h1>
              <p>Please try again.</p>
            </div>
          </body>
        </html>
      `);
    }
  } else {
    // Invalid token
    res.status(400).json({ success: false, message: 'Invalid token' });
  }
});







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
