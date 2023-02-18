import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../controllers/auth.js';

export const authenticateToken = (req, res, next) => {
  const authHeder = req.headers['authorization'];
  const token = authHeder && authHeder.split(' ')[1];
  if (!token) {
    return res.status(401).json({ status: 'error', message: 'token mancante' });
  } else {
    jwt.verify(token, JWT_SECRET, (error, user) => {
      if (error) {
        console.log(error);
        return res.status(403);
      } else {
        req.user = user;
        next();
      }
    });
  }
};
