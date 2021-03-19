import { Request, Response } from 'express';
import { NUMBERS } from '../config/constants';
import { RESPONSE_CODE } from '../config/config';
import { User } from '../entities';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

class UserController {
  static listAll = async (_req: Request, res: Response): Promise<void> => {
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      select: ['id', 'username', 'role']
    });
    res.send(users);
  };

  static getOneById = async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id;

    const userRepository = getRepository(User);
    try {
      const user = await userRepository.findOneOrFail(id, {
        select: ['id', 'username', 'role']
      });
      res.send(user);
    } catch (error) {
      res.status(RESPONSE_CODE.NOT_FOUND).send('User not found');
    }
  };

  static newUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, role } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;

    const errors = await validate(user);
    if (errors.length > NUMBERS.ZERO) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(RESPONSE_CODE.CONFLICT).send('username already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(RESPONSE_CODE.NO_CONTENT_SUCCESS).send('User created');
  };

  static editUser = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    //Get values from the body
    const { username, role } = req.body;

    //Try to find user on database
    const userRepository = getRepository(User);
    let user;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(RESPONSE_CODE.NOT_FOUND).send('User not found');
      return;
    }

    //Validate the new values on model
    user.username = username;
    user.role = role;
    const errors = await validate(user);
    if (errors.length > NUMBERS.ZERO) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(RESPONSE_CODE.CONFLICT).send('username already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(RESPONSE_CODE.NO_CONTENT_SUCCESS).send();
  };

  static deleteUser = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
      res.send(user);
    } catch (error) {
      res.status(RESPONSE_CODE.NOT_FOUND).send('User not found');
      return;
    }
    userRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(RESPONSE_CODE.NO_CONTENT_SUCCESS).send();
  };
}

export default UserController;
