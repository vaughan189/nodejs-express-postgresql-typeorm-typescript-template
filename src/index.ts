/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import { CONFIG } from './config/config';
import { connectDB } from './db/database';
import cors from 'cors';
import express from 'express';
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

const port = process.env.PORT || CONFIG.PORT;
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

(async () => {
  await connectDB();
  await startServer();
})();
