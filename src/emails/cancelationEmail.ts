import { createTransport } from 'nodemailer';

const sendCancelationEmail = async (email: string, name: string) => {
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
    subject: `Your Task-App Was Deleted`,
    html: `<body><h2>Hello ${name},</h2><br><p>Sorry to see you leave us, your account was deleted.</p></body>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log('Error: ', err);
    }
    console.log(info);
  });
};

export default sendCancelationEmail;
