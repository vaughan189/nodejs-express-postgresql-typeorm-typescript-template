import { checkJwt, checkRole } from '../middleware';
import { Router } from 'express';
import { UserController } from '../controllers';

const router = Router();

router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);

router.get('/:id', [checkJwt, checkRole(['ADMIN'])], UserController.getOneById);

router.post('/', [checkJwt, checkRole(['ADMIN'])], UserController.newUser);

router.put('/:id', [checkJwt, checkRole(['ADMIN'])], UserController.editUser);

router.delete(
  '/:id',
  [checkJwt, checkRole(['ADMIN'])],
  UserController.deleteUser
);

export default router;
