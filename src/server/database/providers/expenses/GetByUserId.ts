import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IExpense } from '../../models';

export const getByUserId = async (
  userId: number
): Promise<IExpense[] | Error> => {
  try {
    const expenses = await Knex(ETableNames.expenses)
      .select()
      .where('userId', '=', userId);
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses by userId:', error);
    return new Error('Error fetching expenses by userId');
  }
};
