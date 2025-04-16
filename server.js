const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ CORS সেটআপ (শুধু একবার এবং সঠিকভাবে)
app.use(cors({
  origin: "https://otp-verification-app-nj90.onrender.com", // তোমার frontend live URL
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true
}));

app.use(express.json());

// ✅ Static frontend serve (HTML, CSS, JS ফাইল public ফোল্ডার থেকে দেখাবে)
app.use(express.static(path.join(__dirname, "public")));

let otpStore = {};

// ✅ Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send OTP route
app.post("/send-otp", (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send("Email send failed");
    res.send("OTP sent successfully");
  });
});

// ✅ Verify OTP route
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  if (otpStore[email] === otp) {
    delete otpStore[email];
    res.send("OTP verified successfully");
  } else {
    res.status(400).send("Invalid OTP");
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
