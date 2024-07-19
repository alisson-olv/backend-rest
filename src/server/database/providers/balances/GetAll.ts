import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';
import { IBalances } from '../../models';

interface IQueryProps {
  userId?: number;
  groupId?: number;
}

export const getAll = async (
  query?: IQueryProps
): Promise<IBalances[] | Error> => {
  try {
    const knexQuery = Knex(ETableNames.balances).select('*');

    if (query?.userId) {
      knexQuery.where('userId', query.userId);
    }

    if (query?.groupId) {
      knexQuery.where('groupId', query.groupId);
    }

    const balances = await knexQuery;

    return balances;
  } catch (error) {
    console.error(error);
    return new Error('Error retrieving balances');
  }
};
