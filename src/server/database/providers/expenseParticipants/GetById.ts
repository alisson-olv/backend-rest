import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IExpenseParticipant } from '../../models';

export const getById = async (
  id: number
): Promise<IExpenseParticipant | Error> => {
  try {
    const result = await Knex(ETableNames.expense_participants)
      .where('expenseParticipantId', '=', id)
      .first();

    if (result) return result;

    return new Error('Expense participant not found');
  } catch (error) {
    // TODO - Add proper error logging
    return new Error('Error retrieving expense participant');
  }
};
