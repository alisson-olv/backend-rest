import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IGroups } from '../../models';

export const create = async (group: IGroups): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.groups)
      .insert(group)
      .returning('groupId');

    if (typeof result === 'object') {
      return result.groupId;
    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Unexpected response format when creating group');
  } catch (error) {
    // TODO - How to monitore error logs with framework
    return Error('Error creating group');
  }
};
