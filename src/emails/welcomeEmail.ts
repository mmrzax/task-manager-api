import { createTransport } from 'nodemailer';

const sendWelcomeEmail = async (email: string, name: string) => {
  const transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Welcome to the Task-App, ${name}`,
    html: `<body><h2>Hello ${name},</h2><br><p>Welcome to the Task-Manager App, your account was created successfully.</p></body>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('Email not send, Error: ', err);
    }
  });
};

export default sendWelcomeEmail;
