import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IBalances } from '../../models';

export const getById = async (id: number): Promise<IBalances | Error> => {
  try {
    const balance = await Knex(ETableNames.balances)
      .select('*')
      .where('balanceId', '=', id)
      .first();

    if (!balance) {
      return new Error('Balance not found');
    }

    return balance;
  } catch (error) {
    console.error(error);
    return new Error('Error retrieving balance');
  }
};
