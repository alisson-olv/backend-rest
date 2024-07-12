import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IExpenseParticipant } from '../../models';

export const getAll = async (): Promise<IExpenseParticipant[] | Error> => {
  try {
    const result = await Knex(ETableNames.expense_participants).select('*');

    if (result) return result;

    return new Error('Error retrieving expense participants');
  } catch (error) {
    // TODO - Add proper error logging
    return new Error('Error retrieving expense participants');
  }
};
