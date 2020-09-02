import { NextFunction, Request, Response } from 'express';
import { NUMBERS } from '../config/constants';
import { RESPONSE_CODE } from '../config/config';
import { User } from '../entities';
import { getRepository } from 'typeorm';

export const checkRole = (roles: Array<string>) => {
  return async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = res.locals.jwtPayload.userId;
    const userRepository = getRepository(User);

    const user: User = await userRepository.findOneOrFail(id);
    if (!user) {
      res.status(RESPONSE_CODE.UN_AUTHORIZED).send();
    }

    if (roles.indexOf(user.role) > NUMBERS.NEGATIVE_ONE) {
      next();
    } else {
      res.status(RESPONSE_CODE.UN_AUTHORIZED).send();
    }
  };
};
