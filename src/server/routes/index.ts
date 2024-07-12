import { ExpensesController } from './../controllers/expenses/index';
import { Router } from 'express';
import {
  UsersController,
  GroupsController,
  UserGroupsController,
  ExpenseParticipantsController,
} from '../controllers';

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

// /GROUPS
router.get(
  '/groups/:id',
  GroupsController.getByIdValidation,
  GroupsController.getById
);

router.post(
  '/groups/create',
  GroupsController.createValidation,
  GroupsController.create
);

router.delete(
  '/groups/:id',
  GroupsController.deleteByIdValidation,
  GroupsController.deleteById
);

router.put(
  '/groups/:id',
  GroupsController.updateByIdValidation,
  GroupsController.updateById
);

// /USERGROUPS
router.get(
  '/user_groups/:id',
  UserGroupsController.getByIdValidation,
  UserGroupsController.getById
);

router.post(
  '/user_groups/create',
  UserGroupsController.createValidation,
  UserGroupsController.create
);

router.delete(
  '/user_groups/:id',
  UserGroupsController.deleteByIdValidation,
  UserGroupsController.deleteById
);

router.put(
  '/user_groups/:id',
  UserGroupsController.updateByIdValidation,
  UserGroupsController.updateById
);

// /EXPENSES
router.post(
  '/expenses',
  ExpensesController.createValidation,
  ExpensesController.create
);

router.put(
  '/expenses/:id',
  ExpensesController.updateByIdValidation,
  ExpensesController.updateById
);

router.get(
  '/expenses/:id',
  ExpensesController.getByIdValidation,
  ExpensesController.getById
);

router.delete(
  '/expenses/:id',
  ExpensesController.deleteByIdValidation,
  ExpensesController.deleteById
);

router.get(
  '/expenses',
  ExpensesController.getAllValidation,
  ExpensesController.getAll
);

router.get(
  '/expenses/user/:userId',
  ExpensesController.getByUserIdValidation,
  ExpensesController.getByUserId
);

router.get(
  '/expenses/group/:groupId',
  ExpensesController.getByGroupIdValidation,
  ExpensesController.getByGroupId
);

// /EXPENSEPARTICIPANTS

router.post(
  '/expense_participants',
  ExpenseParticipantsController.createValidation,
  ExpenseParticipantsController.create
);

router.put(
  '/expense_participants/:id',
  ExpenseParticipantsController.updateByIdValidation,
  ExpenseParticipantsController.updateById
);

router.get(
  '/expense_participants/:id',
  ExpenseParticipantsController.getByIdValidation,
  ExpenseParticipantsController.getById
);

router.delete(
  '/expense_participants/:id',
  ExpenseParticipantsController.deleteByIdValidation,
  ExpenseParticipantsController.deleteById
);

router.get(
  '/expense_participants',
  ExpenseParticipantsController.getAllValidation,
  ExpenseParticipantsController.getAll
);

export { router };
