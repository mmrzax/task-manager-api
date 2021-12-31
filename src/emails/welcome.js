const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY);

const sendWelcomeEmail = async (email, name) => {
  const message = {
    to: [
      {
        email,
        type: 'to',
      }
    ],
    from_email: 'SENDER_EMAIL',
    subject: 'Welcome to the Task-Manager App',
    text: `Welcome to the Task-Manager App, ${name}.\nLet me know how you get along with the app.`,
  };
  await mailchimp.messages.send({ message });
};

module.exports = sendWelcomeEmail;
