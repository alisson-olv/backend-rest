import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IBalances } from '../../models';

export const create = async (
  balance: Omit<IBalances, 'balanceId'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.balances)
      .insert(balance)
      .returning('balanceId');

    if (typeof result === 'object') {
      return result.balanceId;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Unexpected response format when creating balance');
  } catch (error) {
    console.error(error);
    return new Error('Error creating balance');
  }
};
