import { Router } from 'express';
import { UsersController } from '../controllers';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

// ADICIONAR NAS ROTAS PROTEGIDAS
// import { ensureAuthenticated } from '../shared/middleware';
// /USERS
router.post(
  '/users/signup',
  UsersController.signUpValidation,
  UsersController.signUp
);

router.post(
  '/users/signin',
  UsersController.signInValidation,
  UsersController.signIn
);

export { router };
