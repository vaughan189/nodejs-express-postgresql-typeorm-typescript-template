import * as jwt from 'jsonwebtoken';
import { CONFIG, RESPONSE_CODE } from '../config';
import { NextFunction, Request, Response } from 'express';

export const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = <string>req.headers.auth;
  let jwtPayload;

  try {
    jwtPayload = <never>jwt.verify(token, CONFIG.jwtSecret);
    // eslint-disable-next-line no-param-reassign
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(RESPONSE_CODE.UN_AUTHORIZED).send();
    return;
  }

  const { userId, username } = jwtPayload;
  const newToken = jwt.sign({ userId, username }, CONFIG.jwtSecret, {
    expiresIn: '1h'
  });
  res.setHeader('token', newToken);
  next();
};
