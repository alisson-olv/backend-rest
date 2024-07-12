import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.payments)
      .delete()
      .where('paymentId', id);

    if (result === 0) {
      return new Error('Error deleting payment');
    }
  } catch (error) {
    console.error(error);
    return new Error('Error deleting payment');
  }
};
