import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IBalances } from '../../models';

export const updateById = async (
  id: number,
  balance: Partial<Omit<IBalances, 'balanceId'>>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.balances)
      .update(balance)
      .where('balanceId', '=', id);

    if (result === 0) {
      return new Error('Error updating balance');
    }
  } catch (error) {
    console.error(error);
    return new Error('Error updating balance');
  }
};
