const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');
const { mongoose, Types } = require('mongoose');
const AboutModel = require('./models/About.js');
const ServicesModel = require('./models/Services.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('./models/User');
const session = require('express-session');
const TestimonialModel = require('./models/Testimonies.js');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://matthew28:GQH3Jsylvd4GTIxe@cluster0.rityzgi.mongodb.net/NCL?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect to MongoDB:', error);
  });

app.use(
  session({
    secret: '9226430cd5355cf7d21b4eeef2ccb222f6bf30b877a5f8b07e089a5ab0ad59b0', 
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());


app.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await UserModel.findOne({ username });
    

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
      
    }

    if(!user.isAdmin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user._id;

    // Generate a JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      '9226430cd5355cf7d21b4eeef2ccb222f6bf30b877a5f8b07e089a5ab0ad59b0', // Replace with your own secret key
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, user: { username: user.username }, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/Testimonials/:testimonyId', async (req, res) => {
  const { testimonyId } = req.params;
  const { name, description } = req.body;

  try {
    const objectIdTestimonyId = new Types.ObjectId(testimonyId);
    await TestimonialModel.findOneAndUpdate(
      { 'testimonies.testimonyId': objectIdTestimonyId },
      {
        $set: {
          'testimonies.$[elem].name': name,
          'testimonies.$[elem].description': description,
        },
      },
      {
        arrayFilters: [{ 'elem.testimonyId': objectIdTestimonyId }],
        new: true,
        useFindAndModify: false,
      }
    );
    
    res.json({ message: 'Testimony updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid TestimonyId' });
  }
});

app.post('/Testimonials/add', async (req, res) => {
  const { name, description } = req.body;

  try {
    const newTestimonial = {
      testimonyId: new Types.ObjectId(),
      name,
      description,
    };

    await TestimonialModel.findOneAndUpdate(
      {},
      { $push: { testimonies: newTestimonial } },
      { new: true, useFindAndModify: false }
    );

    res.json({ message: 'Testimonial added successfully', newTestimonial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error adding testimonial' });
  }
});

app.delete("/Testimonials/delete/:testimonyId", async (req, res) => {
  try {
    const deletedTestimonial = await TestimonialModel.findOneAndUpdate(
      {},
      { $pull: { testimonies: { testimonyId: req.params.testimonyId } } },
      { new: true }
    );

    if (!deletedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found." });
    }

    res.json({ deletedTestimonial });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete testimonial." });
  }
});



app.get('/Admin/Dashboard', (req, res) => {
  // Check if user is logged in by verifying the presence of userId in session
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Fetch additional user data or perform authorized actions here
  // ...

  res.status(200).json({ message: 'Welcome to the dashboard' });
});

// Logout route
app.post('/admin/logout', (req, res) => {
  // Destroy the session and log the user out
  req.session.destroy();
  res.status(200).json({ message: 'Logout successful' });
});

app.get("/", (req, res) => {
  AboutModel.find({ })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/services", (req, res) => {
  ServicesModel.find({ })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/Testimonials", (req, res) => {
  TestimonialModel.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});



dotenv.config();

function generateUniqueToken() {
  // Generate a unique UUID token
  return uuidv4();
}

const acceptToken = generateUniqueToken();
const denyToken = generateUniqueToken();


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
    messageBody = 'Thank you for reaching out to NCL Consulting LLC. After reviewing your information, we believe we can help you. Please schedule a 30 minute free consultation.\n\nBest,\n\nNaphtalia C. Lafontant, Esq.\nNCL Consulting LLC\n312-620-6103';
  } else if (status === 'denied') {
    messageBody = 'Thank you for reaching out to NCL Consulting LLC. At this time, we are either not accepting new clients or we do not believe that we can help you. Please do not hesitate to contact us at a later date or if another matter arises. We look forward to working with you in the future.\n\nBest,\n\nNaphtalia C. Lafontant, Esq.\nNCL Consulting LLC';
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
        <a href="http://localhost:3001/sendsms/${acceptToken}/${phone}" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; margin: 25px;">Accept</a>
        <a href="http://localhost:3001/sendsms/${denyToken}/${phone}" style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 5px; text-decoration: none; margin: 25px;">Deny</a>
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
