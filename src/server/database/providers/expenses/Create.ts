import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IExpense } from '../../models';

export const create = async (
  expense: Omit<IExpense, 'expenseId'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.expenses)
      .insert(expense)
      .returning('expenseId');

    if (typeof result === 'object' && 'expenseId' in result) {
      return result.expenseId;
    }

    return new Error('Unexpected response format when creating expense');
  } catch (error) {
    console.error('Error creating expense:', error);
    return new Error('Error creating expense');
  }
};
