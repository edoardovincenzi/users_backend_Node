import express from 'express';
import usersRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import mongoose from 'mongoose';
import cors from 'cors';
import { authenticateToken } from './middlewares/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

const CONNECTION_URL = 'mongodb://localhost:27017/corsoapinode';

mongoose.set('strictQuery', true);
mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use('/users', authenticateToken, usersRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => res.send('Homepage'));
