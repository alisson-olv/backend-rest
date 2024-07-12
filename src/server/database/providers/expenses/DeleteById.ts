import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.expenses)
      .where('expenseId', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Expense not found or error deleting');
  } catch (error) {
    console.error('Error deleting expense:', error);
    return new Error('Error deleting expense');
  }
};
