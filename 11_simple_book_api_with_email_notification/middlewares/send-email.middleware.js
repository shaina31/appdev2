const nodemailer = require("nodemailer");
const pug = require("pug");
const path = require("path");
require("dotenv").config();

const sendBookEmail = async (book) => {
  const { title, author, year } = book;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const html = pug.renderFile(
    path.join(__dirname, "../views/bookCreated.pug"),
    { title, author, year }
  );

  const mailOptions = {
    from: `"Book System" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: `New Book Added: ${title}`,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendBookEmail;

