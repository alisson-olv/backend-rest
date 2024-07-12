import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IPayments } from '../../models';

export const getAll = async (): Promise<IPayments[] | Error> => {
  try {
    const payments = await Knex(ETableNames.payments).select('*');

    return payments;
  } catch (error) {
    console.error(error);
    return new Error('Error retrieving payments');
  }
};
