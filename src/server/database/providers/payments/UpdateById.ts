import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPayments } from '../../models';

export const updateById = async (
  id: number,
  payment: Partial<Omit<IPayments, 'paymentId'>>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.payments)
      .update({ ...payment, updatedAt: Knex.fn.now() })
      .where('paymentId', id);

    if (result === 0) {
      return new Error('Error updating payment');
    }
  } catch (error) {
    console.error(error);
    return new Error('Error updating payment');
  }
};
