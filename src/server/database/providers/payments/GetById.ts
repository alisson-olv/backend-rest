import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPayments } from '../../models';

export const getById = async (id: number): Promise<IPayments | Error> => {
  try {
    const payment = await Knex(ETableNames.payments)
      .select('*')
      .where('paymentId', id)
      .first();

    if (!payment) {
      return new Error('Payment not found');
    }

    return payment;
  } catch (error) {
    console.error(error);
    return new Error('Error retrieving payment');
  }
};
