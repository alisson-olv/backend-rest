import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IExpense } from '../../models';

export const getByGroupId = async (
  groupId: number
): Promise<IExpense[] | Error> => {
  try {
    const expenses = await Knex(ETableNames.expenses)
      .select()
      .where('groupId', '=', groupId);
    return expenses;
  } catch (error) {
    console.error('Error fetching expenses by groupId:', error);
    return new Error('Error fetching expenses by groupId');
  }
};
