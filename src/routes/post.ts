import { PostController } from '../controllers';
import { Router } from 'express';
import { checkJwt } from '../middleware';

const router = Router();

router.get('/', [checkJwt], PostController.getAll);

router.get('/:id', [checkJwt], PostController.getById);

router.post('/', [checkJwt], PostController.create);

router.put('/:id', [checkJwt], PostController.update);

router.delete('/:id', [checkJwt], PostController.delete);

export default router;
