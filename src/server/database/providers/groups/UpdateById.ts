import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IGroups } from '../../models';

export const updateById = async (
  id: number,
  group: Omit<IGroups, 'groupId' | 'createdAt'>
): Promise<void | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.groups)
      .where('groupId', '=', id)
      .count<[{ count: number }]>('* as count');

    if (count === 0) {
      return new Error('This group id was not found');
    }

    const result = await Knex(ETableNames.groups)
      .where('groupId', '=', id)
      .update({
        ...group,
        updatedAt: Knex.fn.now(),
      });

    if (result > 0) return;

    return new Error('Error updating the group');
  } catch (error) {
    return new Error('Some error updating the group');
  }
};
