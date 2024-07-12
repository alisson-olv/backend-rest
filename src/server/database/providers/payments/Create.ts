import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPayments } from '../../models';

export const create = async (
  payment: Omit<IPayments, 'paymentId'>
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.payments)
      .insert(payment)
      .returning('paymentId');

    if (typeof result === 'object') {
      return result.paymentId;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Unexpected response format when creating payment');
  } catch (error) {
    console.error(error);
    return new Error('Error creating payment');
  }
};
