import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IExpense } from '../../models';

export const getAll = async (): Promise<IExpense[] | Error> => {
  try {
    const expenses = await Knex(ETableNames.expenses).select();
    return expenses;
  } catch (error) {
    console.error('Error fetching all expenses:', error);
    return new Error('Error fetching all expenses');
  }
};
