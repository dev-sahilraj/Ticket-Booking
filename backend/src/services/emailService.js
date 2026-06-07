const nodemailer = require('nodemailer');

// Mock or Real Transporter depending on ENV
const createTransporter = () => {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // If no credentials, we return a mock transporter
  return {
    sendMail: async (mailOptions) => {
      console.log('----- MOCK EMAIL SENT -----');
      console.log(`To: ${mailOptions.to}`);
      console.log(`Subject: ${mailOptions.subject}`);
      console.log(`Body: \n${mailOptions.text}`);
      console.log('---------------------------');
      return true;
    }
  };
};

const transporter = createTransporter();

const sendBookingConfirmation = async (userEmail, userName, bookingDetails) => {
  const mailOptions = {
    from: '"EventHub" <noreply@eventhub.com>',
    to: userEmail,
    subject: `Booking Confirmation - ${bookingDetails.eventTitle}`,
    text: `Hi ${userName},

Thank you for your booking!

Here are your details:
Booking ID: ${bookingDetails.bookingId}
Event: ${bookingDetails.eventTitle}
Tickets: ${bookingDetails.tickets}
Status: Confirmed

You can download your PDF ticket from your dashboard.

Best regards,
EventHub Team
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendBookingConfirmation,
};
