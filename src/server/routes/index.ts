import { Router } from 'express';
import {
  CitiesController,
  PersonsController,
  UsersController,
} from '../controllers';
import { ensureAuthenticated } from '../shared/middleware';

const router = Router();

router.get('/', (req, res) => {
  console.log(req.body);
  return res.send('Ola');
});

// /CITIES
router.post(
  '/cities',
  ensureAuthenticated,
  CitiesController.createValidation,
  CitiesController.create
);

router.get(
  '/cities',
  ensureAuthenticated,
  CitiesController.getAllValidation,
  CitiesController.getAll
);

router.get(
  '/cities/:id',
  ensureAuthenticated,
  CitiesController.getByIdValidation,
  CitiesController.getById
);

router.put(
  '/cities/:id',
  ensureAuthenticated,
  CitiesController.updateByIdValidation,
  CitiesController.updateById
);

router.delete(
  '/cities/:id',
  ensureAuthenticated,
  CitiesController.deleteByIdValidation,
  CitiesController.deleteById
);

// /PERSONS
router.post(
  '/persons',
  ensureAuthenticated,
  PersonsController.createValidation,
  PersonsController.create
);

router.get(
  '/persons',
  ensureAuthenticated,
  PersonsController.getAllValidation,
  PersonsController.getAll
);

router.get(
  '/persons/:id',
  ensureAuthenticated,
  PersonsController.getByIdValidation,
  PersonsController.getById
);

router.put(
  '/persons/:id',
  ensureAuthenticated,
  PersonsController.updateByIdValidation,
  PersonsController.updateById
);

router.delete(
  '/persons/:id',
  ensureAuthenticated,
  PersonsController.deleteByIdValidation,
  PersonsController.deleteById
);

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
