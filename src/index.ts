/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import { CONFIG } from './config/config';
import { connectDB } from './db/database';
import express from 'express';
import routes from './routes';

const app = express();
app.use('/', routes);

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
