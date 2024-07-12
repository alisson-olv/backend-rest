import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.groups)
      .where('groupId', '=', id)
      .del();

    if (result > 0) return;

    return new Error('This group does not exist');
  } catch (error) {
    // TODO - How to monitore error logs with framework
    return Error('Error deleting group');
  }
};
