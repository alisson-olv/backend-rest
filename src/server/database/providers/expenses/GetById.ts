import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IExpense } from '../../models';

export const getById = async (id: number): Promise<IExpense | null> => {
  try {
    const expense = await Knex(ETableNames.expenses)
      .select()
      .where('expenseId', '=', id)
      .first();

    return expense || null;
  } catch (error) {
    console.error('Error fetching expense:', error);
    return null;
  }
};
