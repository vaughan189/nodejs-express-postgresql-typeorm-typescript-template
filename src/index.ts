/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import { config, response } from './config';
import { connectDB } from './db/database';
import express from 'express';

const app = express();

app.get('/api', (_req: express.Request, res: express.Response) => {
  res.status(response.success).json({
    hello: 'World!'
  });
});

const port = process.env.PORT || config.PORT;
const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
};

(async () => {
  await connectDB();
  await startServer();
})();
