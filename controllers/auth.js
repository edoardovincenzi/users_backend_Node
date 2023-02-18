import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'assdfdsfjodsofosdjfojsdfojfdsojojJOSDFJOOPJ23DAS';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res
      .status(401)
      .json({ status: 'error', message: 'utente o password errata' });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET
    );
    return res.json({ status: 'ok', data: token });
  } else {
    res
      .status(401)
      .json({ status: 'error', message: 'utente o password errata' });
  }
};

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
  } else {
    const passwordHashed = await bcrypt.hash(password, 10);
    const user = new User({ username, password: passwordHashed });
    try {
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      res.status(404).json({ status: 'error', message: error.message });
    }
  }
};
