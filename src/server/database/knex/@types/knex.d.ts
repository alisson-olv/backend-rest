import {
  IBalances,
  IExpense,
  IExpensePariticipant,
  IGroups,
  IPayments,
  IUser,
  IUserGroups,
} from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    user: IUser;
    groups: IGroups;
    userGroups: IUserGroups;
    expenses: IExpense;
    expenseParticipants: IExpensePariticipant;
    payments: IPayments;
    balances: IBalances;
  }
}
