import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || typeof username != 'string') {
    res
      .status(404)
      .json({ status: 'error', message: 'username non è una stringa' });
  }
  if (!password || typeof password != 'string') {
    res
      .status(404)
      .json({ status: 'error', message: 'password non è una stringa' });
  }
  if (password.length < 5) {
    res.status(404).json({
      status: 'error',
      message: 'password deve essere di almeno 5 caratteri',
    });
  }
  const passwordHashed = await bcrypt.hash(password, 10);
  const user = new User({ username, password: passwordHashed });
  try {
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    res.status(404).json({ status: 'error', message: error.message });
  }
};
