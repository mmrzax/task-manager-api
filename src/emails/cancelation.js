const mailchimp = require('@mailchimp/mailchimp_transactional')(process.env.MAILCHIMP_API_KEY);

const sendCancelationEmail = async (email, name) => {
  const message = {
    to: [
      {
        email,
        type: 'to',
      }
    ],
    from_email: 'SENDER_EMAIL',
    subject: 'Your Task-Manager App Account Was Deleted',
    text: `${name}, Your Task-Manager App Account was deleted.\nI hope to see you back soon.\nBest Regards.`,
  };
  await mailchimp.messages.send({ message });
};

module.exports = sendCancelationEmail;
