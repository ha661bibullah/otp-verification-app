const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: "ইমেইল দেওয়া হয়নি!" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "আপনার OTP কোড",
      text: `আপনার OTP কোড হলো: ${otp}`,
    });

    res.json({ success: true, otp }); // ডেভেলপমেন্টে otp ফেরত দিচ্ছি
  } catch (err) {
    console.error("OTP পাঠাতে সমস্যা:", err);
    res.status(500).json({ success: false, message: "সার্ভার ত্রুটি!" });
  }
});

app.listen(port, () => {
  console.log(`Server চলছে: http://localhost:${port}`);
});


