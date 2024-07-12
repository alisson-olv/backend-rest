import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.expense_participants)
      .where('expenseParticipantId', '=', id)
      .delete();

    if (result > 0) return;

    return new Error('Error deleting expense participant');
  } catch (error) {
    // TODO - Add proper error logging
    return new Error('Error deleting expense participant');
  }
};
