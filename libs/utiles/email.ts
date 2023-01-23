import nodemailer from 'nodemailer';

const senderOptions = {
  service: 'naver',
  host: 'smtp.naver.com',
  port: 587,
  auth: {
    user: process.env.NEXT_PUBLICK_EMAIL_ID,
    pass: process.env.NEXT_PUBLICK_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const smtpTransport = nodemailer.createTransport(senderOptions);
export default smtpTransport;
