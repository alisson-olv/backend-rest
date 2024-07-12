import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IExpenseParticipant } from '../../models';

export const create = async (
  participant: Omit<IExpenseParticipant, 'expenseParticipantId'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.expense_participants)
      .insert(participant)
      .returning('expenseParticipantId');

    if (typeof result === 'object') {
      return result.expenseParticipantId;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error(
      'Unexpected response format when creating expense participant'
    );
  } catch (error) {
    // TODO - Add proper error logging
    return new Error('Error creating expense participant');
  }
};
