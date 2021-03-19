import { Router } from 'express';
import auth from './auth';
import post from './post';
import user from './user';

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/post', post);

export default routes;
