import * as jwt from 'jsonwebtoken';
import { CONFIG, RESPONSE_CODE } from '../config/config';
import { Request, Response } from 'express';
import { NUMBERS } from '../config/constants';
import { User } from '../entities';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

class AuthController {
  static login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(RESPONSE_CODE.BAD_REQUEST);
      res.send({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: 'username or password not defined'
      });
      return;
    }

    const userRepository = getRepository(User);
    const user: User = await userRepository.findOneOrFail({
      where: { username }
    });

    if (!user.password) {
      res.status(RESPONSE_CODE.UN_AUTHORIZED).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      CONFIG.jwtSecret,
      { expiresIn: '1h' }
    );
    //Send the jwt in the response
    res.send({ token, data: { userId: user.id, username: user.username } });
  };

  static changePassword = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const id = res.locals.jwtPayload.userId;

    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send();
    }

    const userRepository = getRepository(User);
    const user: User = await userRepository.findOneOrFail(id);

    if (!user.checkIfUnEncryptedPasswordIsValid(oldPassword)) {
      res.status(RESPONSE_CODE.UN_AUTHORIZED).send();
      return;
    }

    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > NUMBERS.ZERO) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(errors);
      return;
    }

    user.hashPassword();
    userRepository.save(user);

    res.status(RESPONSE_CODE.NO_CONTENT_SUCCESS).send();
  };
}
export default AuthController;
