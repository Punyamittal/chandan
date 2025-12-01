# Email API for Quote Form

## Overview
This API handles sending quote request emails to the admin and confirmation emails to customers.

## Email Configuration

- **Sender Email**: chandantraders.comms@gmail.com
- **App Password**: frfd ffwf asbn pdid
- **Recipient**: punya.m215@gmail.com

## Features

### Admin Email
When a quote request is submitted, an email is sent to `punya.m215@gmail.com` with:
- Beautiful HTML formatting with orange/white branding
- All customer details (name, company, email, phone, service type)
- Project details/message
- Professional layout with proper styling

### Customer Confirmation Email
A confirmation email is sent to the customer with:
- Professional thank you message
- Summary of their request
- Expected response time (24 hours)
- Company contact information
- Call-to-action button

## Running the API

### Start API Server Only
```bash
npm run api
```

### Start Both Frontend and API
```bash
npm run dev:all
```

The API will run on `http://localhost:3001`

## Endpoints

### POST /api/send-quote
Send a quote request email

**Request Body:**
```json
{
  "name": "John Doe",
  "company": "ABC Company",
  "email": "john@example.com",
  "phone": "+91-1234567890",
  "service": "offset-digital",
  "message": "Project details..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request sent successfully"
}
```

### GET /api/health
Health check endpoint

**Response:**
```json
{
  "status": "ok",
  "message": "Email API is running"
}
```

## Email Templates

Both emails feature:
- Responsive HTML design
- Orange (#ea580c, #f97316) and white color scheme
- Professional typography
- Mobile-friendly layout
- Branded header and footer
- Clear call-to-action elements

## Security Notes

⚠️ **Important**: The Gmail app password is currently hardcoded in the server file. For production:
1. Move credentials to environment variables
2. Use a `.env` file with `dotenv` package
3. Never commit `.env` to version control
4. Consider using a dedicated email service (SendGrid, AWS SES, etc.)

## Troubleshooting

### Email Not Sending
1. Check if the API server is running on port 3001
2. Verify Gmail credentials are correct
3. Ensure 2-factor authentication is enabled on Gmail
4. Check if app password is still valid

### CORS Issues
The API has CORS enabled for all origins during development. For production, configure specific origins.

### Port Already in Use
If port 3001 is already in use, you can change it by setting the PORT environment variable:
```bash
PORT=3002 npm run api
```

