import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUserGroups } from '../../models';

export const updateById = async (
  id: number,
  group: Partial<IUserGroups>
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.user_groups)
      .update({
        ...group,
        updatedAt: Knex.fn.now(),
      })
      .where('userGroupId', '=', id);

    if (result > 0) return;

    return new Error('Error updating user group');
  } catch (error) {
    console.error(error);
    return new Error('Error updating user group');
  }
};
