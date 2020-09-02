import { AuthController } from '../controllers';
import { Router } from 'express';
import { checkJwt } from '../middleware';

const router = Router();

router.post('/login', AuthController.login);

router.post('/change-password', [checkJwt], AuthController.changePassword);

export default router;
