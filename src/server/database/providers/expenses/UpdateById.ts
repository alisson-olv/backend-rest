import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IExpense } from '../../models';

export const updateById = async (
  id: number,
  expense: Partial<IExpense>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.expenses)
      .update({
        ...expense,
        updatedAt: Knex.fn.now(),
      })
      .where('expenseId', '=', id);

    if (result > 0) return;

    return new Error('Expense not found or error updating');
  } catch (error) {
    console.error('Error updating expense:', error);
    return new Error('Error updating expense');
  }
};
