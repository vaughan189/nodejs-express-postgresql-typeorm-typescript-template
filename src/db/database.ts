/* eslint-disable @typescript-eslint/no-explicit-any */
import { createConnection } from 'typeorm';

export const connectDB = async (): Promise<any> => {
  try {
    await createConnection();
  } catch (err) {
    Error('Unable to connect to the database');
  }
};
