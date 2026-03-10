const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const sendEmail = async (userEmail, userName, message) => {
  try {
    // 1. Updated Transporter with explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465, // SSL Port
      secure: true, // true for 465
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Your 16-digit App Password (NO SPACES)
      },
      // 2. THE FIX: Bypass local certificate issues that block the "Sent" folder
      tls: {
        rejectUnauthorized: false
      }
    });

    // 3. Updated Email Options
    const mailOptions = {
      from: `"BookStore Support" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "We received your enquiry! 📚",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; background-color: #ffffff;">
          <h2 style="color: #ec4899; text-align: center;">Hello ${userName}!</h2>
          <p>Thank you for reaching out to <b>BookStore</b>. We have received your message:</p>
          
          <div style="background-color: #fdf2f8; border-left: 4px solid #ec4899; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; font-style: italic; color: #4a5568;">"${message}"</p>
          </div>
          
          <p>Your enquiry is very important to us. Our team will review it and get back to you shortly.</p>
          <p>While you wait, feel free to browse our <b>Free Books</b> section!</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">
            Happy Reading!<br/>
            <b>The BookStore Team</b>
          </p>
        </div>
      `,
    };

    // 4. Send the mail and log the specific Info object
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ SUCCESS: Email dispatched!");
    console.log("Message ID:", info.messageId);
    return info;

  } catch (error) {
    // 5. Detailed error logging
    console.error("❌ FAILED: Nodemailer Error Log:");
    console.error(error.message);
    throw error; // This allows your route to know it failed
  }
};

module.exports = sendEmail;