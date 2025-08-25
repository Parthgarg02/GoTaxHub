# Email Configuration Setup for GoTaxHub Contact Form

## Overview
The contact form has been configured to send emails to `info@gotaxhub.com` using EmailJS service. This setup provides a reliable, free way to handle form submissions without needing a backend server.

## EmailJS Setup Instructions

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions to connect your email account
5. Note down the **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use the following template content:

**Subject:** New Contact Form Submission - GoTaxHub

**Body:**
```
New contact form submission from GoTaxHub website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Service Required: {{service}}
Message: {{message}}

This email was sent to: {{to_email}}
Submitted on: {{current_date}}
```

4. Save the template and note down the **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. In your EmailJS dashboard, go to "Account"
2. Find your **Public Key** (e.g., `abc123xyz789`)

### Step 5: Update Configuration
Edit the `app.js` file and replace the following placeholders:

```javascript
// Line 235: Replace with your EmailJS public key
emailjs.init('YOUR_PUBLIC_KEY');

// Line 287: Replace with your service ID and template ID
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

**Example:**
```javascript
emailjs.init('abc123xyz789');
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## Configuration Values Needed

| Placeholder | Description | Example |
|-------------|-------------|---------|
| `YOUR_PUBLIC_KEY` | EmailJS Public Key from Account settings | `abc123xyz789` |
| `YOUR_SERVICE_ID` | Service ID from Email Services | `service_gmail123` |
| `YOUR_TEMPLATE_ID` | Template ID from Email Templates | `template_contact456` |

## Email Template Variables

The form sends the following variables to the email template:

- `{{from_name}}` - Customer's full name
- `{{from_email}}` - Customer's email address
- `{{phone}}` - Customer's phone number
- `{{service}}` - Selected service (or "Not specified")
- `{{message}}` - Customer's message (or "No message provided")
- `{{to_email}}` - Destination email (info@gotaxhub.com)

## Testing

1. Complete the configuration steps above
2. Open the contact page on your website
3. Fill out and submit the form
4. Check the `info@gotaxhub.com` inbox for the email
5. If the email doesn't arrive, check the browser console for errors

## Troubleshooting

### Form not working:
1. Check browser console for JavaScript errors
2. Verify all EmailJS configuration values are correct
3. Ensure the email service is connected properly in EmailJS dashboard

### Emails not arriving:
1. Check spam/junk folder
2. Verify the email template is saved and published
3. Check EmailJS dashboard for send history and errors
4. Ensure the service is active (free plan has 200 emails/month limit)

### Fallback Behavior:
If EmailJS fails, the form automatically falls back to opening the user's default email client with a pre-filled message to `info@gotaxhub.com`.

## Security Notes

- EmailJS keys are public and safe to use in frontend code
- The service includes built-in spam protection
- Rate limiting is handled by EmailJS (200 emails/month on free plan)
- No sensitive information is exposed in the configuration

## Alternative Solutions

If EmailJS doesn't meet your needs, consider:

1. **Formspree** - Similar service with different features
2. **Netlify Forms** - If hosting on Netlify
3. **Custom backend** - Use the provided Node.js solution in `contact-handler.js`

---

After completing this setup, your contact form will successfully send emails to `info@gotaxhub.com` whenever visitors submit the form on your website.