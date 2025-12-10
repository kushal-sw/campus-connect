const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../utils/emailservice");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-this";

// ----------------------------------
// REGISTER  (sign up + send OTP)
// ----------------------------------
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      branch,
      year,
      bio,
      relationship_status,
    } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required." });
    }

    // 1) restrict to @isu.ac.in
    if (!email.endsWith("@isu.ac.in")) {
      return res.status(400).json({
        message: "Sign up is only allowed with @isu.ac.in college email.",
      });
    }

    // 2) check existing user
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing && existing.isVerified) {
      return res
        .status(400)
        .json({ message: "Account already exists. Please log in." });
    }

    const password_hash = await bcrypt.hash(password, 8);

    // 3) generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000)); // "123456"
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    let user;
    if (existing) {
      // re-use unverified account
      user = await prisma.user.update({
        where: { email },
        data: {
          name,
          password_hash,
          branch,
          year,
          bio,
          relationship_status,
          isVerified: false,
          otpCode: otp,
          otpExpiresAt,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          name,
          email,
          password_hash,
          branch,
          year,
          bio,
          relationship_status,
          isVerified: false,
          otpCode: otp,
          otpExpiresAt,
        },
      });
    }

    // TODO: send OTP email properly using nodemailer
    console.log("DEBUG OTP for", email, "=>", otp); // dev mode

    try {
      await sendOtpEmail(email, otp);
    } catch (e) {
      console.error("Error sending OTP email:", e);
      // keep going even if email fails so you can still see OTP in logs during dev
    }

    return res.status(200).json({
      message: "OTP sent to your college email. Verify to complete signup.",
    });
  } catch (err) {
    console.error("Register error:", err);
    return res
      .status(500)
      .json({ message: "Server error during registration." });
  }
});

// ----------------------------------
// VERIFY OTP
// ----------------------------------
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res
        .status(400)
        .json({ message: "Email and OTP are required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (!user.otpCode || !user.otpExpiresAt) {
      return res
        .status(400)
        .json({ message: "No active OTP. Please sign up again." });
    }

    if (new Date(user.otpExpiresAt) < new Date()) {
      return res.status(400).json({ message: "OTP expired. Please sign up again." });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    const updated = await prisma.user.update({
      where: { email },
      data: {
        isVerified: true,
        otpCode: null,
        otpExpiresAt: null,
      },
    });

    const token = jwt.sign(
      { userId: updated.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Email verified. Signup complete.",
      user: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
      },
      token,
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res
      .status(500)
      .json({ message: "Server error verifying OTP." });
  }
});

// ----------------------------------
// LOGIN  (block unverified)
// ----------------------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Your email is not verified. Please complete signup.",
      });
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res
      .status(500)
      .json({ message: "Server error during login." });
  }
});

// -----------------------------
// (keep your /me or other routes
//       already below here)
// -----------------------------

module.exports = router;