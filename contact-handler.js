const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' }
});

app.use('/contact', limiter);

// Configure nodemailer transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com', // You can change this based on your email provider
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Configure this
    pass: process.env.EMAIL_PASS || 'your-app-password'     // Configure this
  }
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields.'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // Prepare email content
    const emailContent = `
New contact form submission from GoTaxHub website:

Name: ${name}
Email: ${email}
Phone: ${phone}
Service Required: ${service || 'Not specified'}
Message: ${message || 'None provided'}

Submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `;

    // Email configuration
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@gotaxhub.com',
      to: 'info@gotaxhub.com',
      subject: 'New Contact Form Submission - GoTaxHub',
      text: emailContent,
      replyTo: email
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Contact form service is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Contact form server running on port ${PORT}`);
});

module.exports = app;