// CRITICAL: Load environment variables FIRST before any imports that need them
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables manually from .env file BEFORE other imports
try {
  const envPath = join(__dirname, '..', '.env');
  if (existsSync(envPath)) {
    const envFile = readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          let value = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
          // Remove any trailing whitespace/newlines
          value = value.replace(/\r?\n?$/, '').trim();
          // Always set, don't check if exists (override)
          process.env[key.trim()] = value;
        }
      }
    });
    console.log('✅ Loaded environment variables from .env');
    console.log('Environment check:', {
      DB_HOST: process.env.DB_HOST ? '✅ Set' : '❌ Missing',
      DB_USER: process.env.DB_USER ? '✅ Set' : '❌ Missing',
      DB_NAME: process.env.DB_NAME ? '✅ Set' : '❌ Missing',
      DB_PASSWORD: process.env.DB_PASSWORD ? '✅ Set (' + process.env.DB_PASSWORD.length + ' chars)' : '❌ Missing',
      DB_PORT: process.env.DB_PORT ? '✅ Set' : '❌ Missing',
    });
  } else {
    console.warn('⚠️ .env file not found at:', envPath);
  }
} catch (error) {
  console.warn('⚠️ Could not load .env file:', error.message);
}

// NOW import modules that don't depend on environment variables
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

// Import cart routes (which will import db.js, but db.js will now have env vars loaded)
import cartRoutes from './routes/cart.js';
// Import db functions after env vars are loaded
import { testConnection, query } from './database/db.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection on startup
testConnection().catch(console.error);

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'chandantraders.comms@gmail.com',
    pass: 'frfd ffwf asbn pdid',
  },
});

// Email endpoint
app.post('/api/send-quote', async (req, res) => {
  try {
    const { name, company, email, phone, service, message } = req.body;

    // Email template for admin
    const adminEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .info-row {
            display: flex;
            padding: 15px 0;
            border-bottom: 1px solid #f3f4f6;
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #ea580c;
            min-width: 140px;
            font-size: 14px;
          }
          .value {
            color: #374151;
            font-size: 14px;
            flex: 1;
          }
          .message-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .message-box h3 {
            margin: 0 0 10px 0;
            color: #92400e;
            font-size: 16px;
          }
          .message-box p {
            margin: 0;
            color: #78350f;
            line-height: 1.6;
            white-space: pre-wrap;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
          }
          .badge {
            display: inline-block;
            background: #fef3c7;
            color: #92400e;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>🎯 New Quote Request</h1>
            <p>Chandan Trading Company</p>
            <span class="badge">ACTION REQUIRED</span>
          </div>
          
          <div class="content">
            <div class="info-row">
              <span class="label">👤 Full Name:</span>
              <span class="value">${name}</span>
            </div>
            
            <div class="info-row">
              <span class="label">🏢 Company:</span>
              <span class="value">${company}</span>
            </div>
            
            <div class="info-row">
              <span class="label">📧 Email:</span>
              <span class="value"><a href="mailto:${email}" style="color: #ea580c; text-decoration: none;">${email}</a></span>
            </div>
            
            <div class="info-row">
              <span class="label">📞 Phone:</span>
              <span class="value"><a href="tel:${phone}" style="color: #ea580c; text-decoration: none;">${phone}</a></span>
            </div>
            
            <div class="info-row">
              <span class="label">🛠️ Service Type:</span>
              <span class="value">${service}</span>
            </div>
            
            <div class="message-box">
              <h3>💬 Project Details</h3>
              <p>${message}</p>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>Chandan Trading Company</strong></p>
            <p>A-1, Main Road, Kewal Park Azadpur, Delhi - 110033</p>
            <p>Phone: +91 9873535400 | Email: chandantrading2014@gmail.com</p>
            <p style="margin-top: 15px; opacity: 0.8;">This is an automated email from your website's quote request form.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email template for customer confirmation
    const customerEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .header p {
            margin: 10px 0 0 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .content {
            padding: 30px;
          }
          .greeting {
            font-size: 18px;
            color: #111827;
            margin-bottom: 20px;
          }
          .message {
            color: #374151;
            font-size: 15px;
            line-height: 1.8;
            margin-bottom: 20px;
          }
          .highlight-box {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
          }
          .highlight-box p {
            margin: 0;
            color: #78350f;
          }
          .details-box {
            background: #f9fafb;
            border: 1px solid #e5e7eb;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
          }
          .details-box h3 {
            margin: 0 0 15px 0;
            color: #ea580c;
            font-size: 16px;
          }
          .detail-item {
            padding: 8px 0;
            border-bottom: 1px dashed #e5e7eb;
          }
          .detail-item:last-child {
            border-bottom: none;
          }
          .detail-label {
            font-weight: 600;
            color: #6b7280;
            display: inline-block;
            min-width: 120px;
          }
          .detail-value {
            color: #111827;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 6px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            background: #f9fafb;
            padding: 20px;
            text-align: center;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
          }
          .contact-info {
            margin: 15px 0;
          }
          .contact-info a {
            color: #ea580c;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>✅ Quote Request Received</h1>
            <p>Thank you for choosing Chandan Trading Company</p>
          </div>
          
          <div class="content">
            <p class="greeting">Dear ${name},</p>
            
            <p class="message">
              Thank you for your interest in our services! We've successfully received your quote request and our team is already reviewing the details.
            </p>
            
            <div class="highlight-box">
              <p><strong>⏱️ Expected Response Time:</strong> Within 24 hours</p>
            </div>
            
            <div class="details-box">
              <h3>📋 Your Request Summary</h3>
              <div class="detail-item">
                <span class="detail-label">Company:</span>
                <span class="detail-value">${company}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${service}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Contact Email:</span>
                <span class="detail-value">${email}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Contact Phone:</span>
                <span class="detail-value">${phone}</span>
              </div>
            </div>
            
            <p class="message">
              Our printing specialists will carefully review your requirements and prepare a customized quote tailored to your needs. We'll reach out to you via email or phone to discuss the details further.
            </p>
            
            <p class="message">
              In the meantime, feel free to explore our website or contact us directly if you have any urgent questions.
            </p>
            
            <center>
              <a href="https://chandantrading.com" class="cta-button">Visit Our Website</a>
            </center>
          </div>
          
          <div class="footer">
            <p><strong>Chandan Trading Company</strong></p>
            <p>Premium Printing Solutions Since 2014</p>
            
            <div class="contact-info">
              <p>📍 A-1, Main Road, Kewal Park Azadpur, Delhi - 110033</p>
              <p>📞 <a href="tel:+919873535400">+91 9873535400</a></p>
              <p>📧 <a href="mailto:chandantrading2014@gmail.com">chandantrading2014@gmail.com</a></p>
            </div>
            
            <p style="margin-top: 15px; opacity: 0.8;">
              This is an automated confirmation email. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send email to admin
    await transporter.sendMail({
      from: '"Chandan Trading - Quote System" <chandantraders.comms@gmail.com>',
      to: 'punya.m215@gmail.com',
      subject: `🎯 New Quote Request from ${name} - ${company}`,
      html: adminEmailHtml,
    });

    // Send confirmation email to customer
    await transporter.sendMail({
      from: '"Chandan Trading Company" <chandantraders.comms@gmail.com>',
      to: email,
      subject: '✅ Quote Request Received - Chandan Trading Company',
      html: customerEmailHtml,
    });

    res.status(200).json({ 
      success: true, 
      message: 'Quote request sent successfully' 
    });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send quote request',
      error: error.message 
    });
  }
});

// API Routes
app.use('/api/cart', cartRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

// Database diagnostic endpoint
app.get('/api/db-check', async (req, res) => {
  try {
    // Check if tables exist
    const tablesCheck = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('carts', 'cart_items')
    `);
    
    const tables = tablesCheck.rows.map(r => r.table_name);
    
    res.json({
      status: 'ok',
      tablesExist: {
        carts: tables.includes('carts'),
        cart_items: tables.includes('cart_items'),
      },
      allTables: tables,
      message: tables.length === 2 
        ? 'All tables exist' 
        : 'Some tables are missing. Run the SQL from SUPABASE_SQL_ONLY.sql in Supabase SQL Editor',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database check failed',
      error: error.message,
      detail: error.detail,
      code: error.code,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Email API server running on port ${PORT}`);
});

