import express from 'express';
import {
  deleteUser,
  getAllUser,
  getUserById,
  patchUser,
  postUser,
} from '../controllers/users.js';

const router = express.Router();

router.get('/', getAllUser);

router.get('/:id', getUserById);

router.post('/', postUser);

router.patch('/:id', patchUser);

router.delete('/:id', deleteUser);

export default router;
