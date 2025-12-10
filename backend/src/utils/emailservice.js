const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"Campus Connect" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your Campus Connect OTP",
    text: `Your verification code is: ${otp}`,
    html: `
       <div style="font-family: system-ui, -apple-system, sans-serif; padding: 20px; background: linear-gradient(135deg, #ffd2ff, #c3b8ff); border-radius: 14px; color: #1a1a1a;">
    <h2 style="font-size: 26px; margin-bottom: 10px;">
      🔥 Your Campus Connect OTP Just Dropped
    </h2>

    <p style="font-size: 16px; margin-bottom: 6px;">
      Someone (hopefully you 👀) is trying to enter the campus drama portal.
    </p>

    <p style="font-size: 16px; margin-bottom: 6px;">
      Here’s your spicy one‑time code:
    </p>

    <div style="font-size: 32px; font-weight: 700; letter-spacing: 6px; margin: 16px 0; text-align: center; padding: 10px 0; background: #ffffffaa; border-radius: 12px;">
      ${otp}
    </div>

    <p style="font-size: 14px; color: #333;">
      Don’t share it unless you want someone else to steal your spotlight 😭✨
    </p>

    <p style="font-size: 12px; margin-top: 14px; color: #444;">
      Valid for 10 minutes. After that... it disappears like your ex 🫥
    </p>

    <hr style="border: none; border-top: 1px solid #ffffff55; margin: 18px 0;" />

    <p style="font-size: 12px; opacity: 0.8;">
      Campus Connect · Where the secrets live 😈💌
    </p>
  </div>
`,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };