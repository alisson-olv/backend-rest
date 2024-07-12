import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IExpenseParticipant } from '../../models';

export const updateById = async (
  id: number,
  participant: Omit<IExpenseParticipant, 'expenseParticipantId' | 'createdAt'>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.expense_participants)
      .update(participant)
      .where('expenseParticipantId', '=', id);

    if (result > 0) return;

    return new Error('Error updating expense participant');
  } catch (error) {
    // TODO - Add proper error logging
    return new Error('Error updating expense participant');
  }
};
