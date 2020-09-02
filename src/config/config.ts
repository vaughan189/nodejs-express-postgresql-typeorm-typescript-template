import 'dotenv/config';

export const CONFIG = {
  PORT: 3000,
  jwtSecret: process.env.JWT || 'testToken'
};

export const RESPONSE_CODE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UN_AUTHORIZED: 401,
  NO_CONTENT_SUCCESS: 204,
  NOT_FOUND: 404,
  CONFLICT: 409
};
