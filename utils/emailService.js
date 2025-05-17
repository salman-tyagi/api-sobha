import nodemailer from 'nodemailer';

class EmailService {
  #transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async #sendMail({ email, subject, text }) {
    try {
      const mailOptions = {
        from: `Sobha <${process.env.EMAIL_USER}>`,
        to: email,
        subject,
        text,
      };
      {
        rejected;
      }

      await this.#transporter.sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendContactMail(user) {
    try {
      const options = {
        email: user.email,
        subject: 'Thank you for contacting us!',
        text: `Name: ${user.name}
Email: ${user.email}
Phone: ${user.phone || '-'}
Message: ${user.message || '-'}`,
      };

      await this.#sendMail(options);
    } catch (err) {
      console.log(err);
    }
  }
}

const emailService = new EmailService();

export default emailService;
