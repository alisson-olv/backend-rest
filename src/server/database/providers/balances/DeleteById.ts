import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.balances)
      .delete()
      .where('balanceId', id);

    if (result === 0) {
      return new Error('Error deleting balance');
    }
  } catch (error) {
    console.error(error);
    return new Error('Error deleting balance');
  }
};
