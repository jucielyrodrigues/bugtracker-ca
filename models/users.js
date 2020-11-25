const db = require('../db.js')();
const collection = 'users';
const nodemailer = require('nodemailer');
const sendEmail = process.env.EMAIL;
const sendPass = process.env.PASSWORD;

module.exports = () => {
  const get = async (email = null) => {
    try {
      if (!email) {
        const user = await db.get(collection);
        return { user };
      }
      const user = await db.get(collection, {
        email,
      });
      return { user };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };
  const getByKey = async (key) => {
    try {
      if (!key) {
        console.log('01: no key');
        return null;
      }
      const users = await db.get(collection, { key });
      if (users.length !== 1) {
        console.log('02: bad key');
      }
      return users[0];
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };
  const add = async (name, email, usertype, key) => {
    if (!name || !email || !usertype || !key) {
      return {
        error: 'Complete all the fields',
      };
    }
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: sendEmail, // generated ethereal user
        pass: sendPass, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'bugtracker52@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hey, WELCOME TO BUG TRACKER',
      html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    try {
      const user = await db.get(collection, {
        email,
      });
      if (user.length > 0) {
        return {
          results: 'User already registered',
        };
      }
      const results = await db.add(collection, {
        name: name,
        email: email,
        usertype: usertype,
        key: key,
      });
      return { results };
    } catch (err) {
      console.log(err);
      return {
        error: err,
      };
    }
  };
  return {
    get,
    add,
    getByKey,
  };
};
