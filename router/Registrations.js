const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const User = require("../model/userModel");

router.post("/registrations", async (req, res) => {
  const { name, email, address } = req.body;

  const createUser = await User.create({
    name,
    email,
    address,
  });

  if (createUser) {
    res.status(200).json({
      message: "registration successfully",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "gunnarrr08@gmail.com",
        pass: "qyuesnwhtreloggm",
        // pass: "gunnar1234",
      },
    });

    const mailOptions = {
      from: "gunnarrr08@gmail.com",
      to: email,
      subject: "Verify Your Email",
      text: "Hi",
      html: `<h1>Registrations Success!!</h1>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send verification email" });
      } else {
        console.log("Email sent:", info.response);
        res.json({ message: "Verification email sent successfully" });
      }
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
