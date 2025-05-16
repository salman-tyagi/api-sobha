import User from '../models/userModel.js';
import sendEmail from '../utils/email.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: 'success',
      results: users.length,
      data: { users },
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide name, email and phone number',
      });
    }

    const user = await User.create({ name, email, phone, message });

    sendEmail(user);

    res.status(201).json({
      status: 'success',
      data: { user },
    });
  } catch (err) {
    next(err);
  }
};
