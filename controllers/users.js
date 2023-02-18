import mongoose from 'mongoose';
import { User } from '../models/user.js';

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  if (id && mongoose.Types.ObjectId.isValid(id)) {
    try {
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (e) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).send('id not found or invalid');
  }
};

export const postUser = async (req, res) => {
  // const user = { id: crypto.randomUUID(), ...req.body };
  const user = User(req.body);

  try {
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const patchUser = async (req, res) => {
  const { id } = req.params;
  if (id && mongoose.Types.ObjectId.isValid(id)) {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      res.status(202).json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).send('Id not found found or invalid');
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (id && mongoose.Types.ObjectId.isValid(id)) {
    try {
      await User.findByIdAndDelete(id);
      res.send(`User with id: ${id} deleted`);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  } else {
    res.status(404).send('Id not found found or invalid');
  }
};
