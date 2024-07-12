import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.user_groups)
      .where('userGroupId', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Error deleting user group');
  } catch (error) {
    console.error(error);
    return new Error('Error deleting user group');
  }
};
