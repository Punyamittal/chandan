# 📧 EmailJS Setup Guide (No Server Required!)

## ✅ Why EmailJS?

EmailJS allows you to send emails directly from your client-side code **without needing a backend server**. Perfect for quote forms, contact forms, and more!

---

## 🚀 Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (it's FREE for up to 200 emails/month)
3. Sign up with your email or Google account
4. Verify your email address

### Step 2: Connect Your Email Service

1. **After logging in**, click **"Add New Service"** in the dashboard
2. Choose **Gmail** (or any other email provider)
3. Click **"Connect Account"**
4. **For Gmail**:
   - Click **"Connect"**
   - Sign in with **chandantraders.comms@gmail.com**
   - Allow EmailJS permissions
5. Give your service a name: `"Chandan Trading Quotes"`
6. **Copy the Service ID** (looks like `service_xxxxxxx`) - you'll need this!
7. Click **"Create Service"**

### Step 3: Create Email Template

1. Go to **"Email Templates"** tab in EmailJS dashboard
2. Click **"Create New Template"**
3. **Template Name**: `Quote Request - Admin`
4. **Configure the template**:

#### Template Content (Copy & Paste):

**Subject:**
```
New Quote Request from {{from_name}} - {{company}}
```

**Email Body (HTML):**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    .container {
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
      font-size: 24px;
    }
    .content {
      padding: 30px;
    }
    .info-row {
      padding: 12px 0;
      border-bottom: 1px solid #f3f4f6;
    }
    .label {
      font-weight: 600;
      color: #ea580c;
      display: inline-block;
      width: 140px;
    }
    .value {
      color: #374151;
    }
    .message-box {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
    }
    .footer {
      background: #f9fafb;
      padding: 20px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
      border-top: 1px solid #e5e7eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 New Quote Request</h1>
      <p>Chandan Trading Company</p>
    </div>
    
    <div class="content">
      <div class="info-row">
        <span class="label">👤 Name:</span>
        <span class="value">{{from_name}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">🏢 Company:</span>
        <span class="value">{{company}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">📧 Email:</span>
        <span class="value">{{from_email}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">📞 Phone:</span>
        <span class="value">{{phone}}</span>
      </div>
      
      <div class="info-row">
        <span class="label">🛠️ Service:</span>
        <span class="value">{{service}}</span>
      </div>
      
      <div class="message-box">
        <h3 style="margin: 0 0 10px 0; color: #92400e;">💬 Project Details</h3>
        <p style="margin: 0; color: #78350f; white-space: pre-wrap;">{{message}}</p>
      </div>
    </div>
    
    <div class="footer">
      <p><strong>Chandan Trading Company</strong></p>
      <p>A-1, Main Road, Kewal Park Azadpur, Delhi - 110033</p>
      <p>Phone: +91 9873535400</p>
    </div>
  </div>
</body>
</html>
```

5. **Set recipient**: Under "To Email", enter `{{to_email}}`
6. **Set reply-to**: Enter `{{reply_to}}`
7. Click **"Save"**
8. **Copy the Template ID** (looks like `template_xxxxxxx`) - you'll need this!

### Step 4: Get Your Public Key

1. Go to **"Account"** tab in EmailJS dashboard
2. Find **"Public Key"** section
3. **Copy your Public Key** (looks like a long string of letters and numbers)

### Step 5: Update Your Code

Now open `src/components/QuoteDialog.tsx` and replace these three values:

```typescript
// Line ~97 - Replace this:
emailjs.init('YOUR_PUBLIC_KEY');

// With your actual Public Key:
emailjs.init('YOUR_ACTUAL_PUBLIC_KEY_HERE');

// Line ~110-111 - Replace these:
'YOUR_SERVICE_ID',      // Replace with your Service ID
'YOUR_TEMPLATE_ID',     // Replace with your Template ID

// With your actual IDs:
'service_xxxxxxx',      // Your Service ID from Step 2
'template_xxxxxxx',     // Your Template ID from Step 3
```

### Example (with dummy values):
```typescript
emailjs.init('abcdefghijklmnop123456789');

await emailjs.send(
  'service_abc123',
  'template_xyz789',
  templateParams
);
```

---

## 🎉 You're Done!

Your quote form will now send emails **without any backend server**!

### Testing

1. Run your app: `npm run dev`
2. Go to your website
3. Click "Get Quote"
4. Fill out the form
5. Submit
6. Check **punya.m215@gmail.com** for the email!

---

## 📊 EmailJS Free Plan

- ✅ **200 emails/month** FREE
- ✅ No credit card required
- ✅ No server setup needed
- ✅ Works with any email provider
- ✅ Beautiful HTML templates
- ✅ Easy setup

### If you need more emails:
- **1,000 emails/month**: $15/month
- **10,000 emails/month**: $70/month

---

## 🔒 Security

Your EmailJS keys are **public** (they're meant to be in client-side code). EmailJS has built-in security:

1. **reCAPTCHA v3** integration (optional but recommended)
2. **Domain whitelist** - restrict which domains can use your keys
3. **Rate limiting** - prevents spam

### Recommended: Enable reCAPTCHA

1. In EmailJS dashboard, go to **"Security"**
2. Enable **reCAPTCHA v3**
3. Add your domain to **"Allowed Domains"**

---

## 🆚 EmailJS vs Server Comparison

| Feature | EmailJS (Client-Side) | Node Server |
|---------|----------------------|-------------|
| Setup Complexity | ⭐ Easy | ⭐⭐⭐ Complex |
| Server Required | ❌ No | ✅ Yes |
| Maintenance | ❌ None | ✅ Required |
| Cost | Free (200/month) | Server hosting cost |
| Email Limit | 200-10,000/month | Unlimited |
| Security | Built-in | Manual setup |
| Speed | ⚡ Fast | ⚡ Fast |

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check browser console** for errors
2. **Verify all 3 IDs** are correct (Public Key, Service ID, Template ID)
3. **Check EmailJS dashboard** - see "Logs" tab for failed attempts
4. **Ensure Gmail is connected** properly in EmailJS
5. **Check spam folder** at punya.m215@gmail.com

### Common Errors:

**"Invalid public key"**
- Double-check you copied the full Public Key
- Make sure no extra spaces

**"Service not found"**
- Verify Service ID is correct
- Ensure service is active in EmailJS dashboard

**"Template not found"**
- Verify Template ID is correct
- Ensure template is saved in EmailJS dashboard

---

## 📞 Need Help?

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: [support@emailjs.com](mailto:support@emailjs.com)

---

## ✨ Advantages of EmailJS

1. ✅ **No backend** required
2. ✅ **No server** to maintain
3. ✅ **No hosting** costs
4. ✅ **Fast** setup (15 minutes)
5. ✅ **Reliable** delivery
6. ✅ **Beautiful** HTML templates
7. ✅ **Free** tier available
8. ✅ Works with **any email provider** (Gmail, Outlook, Yahoo, etc.)

Your quote form is now **production-ready** without any server infrastructure! 🚀

