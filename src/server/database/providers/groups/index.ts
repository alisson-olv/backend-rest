import * as create from './Create';
import * as deleteById from './DeleteById';
import * as updateById from './UpdateById';
import * as getById from './GetById';

export const GroupsProvider = {
  ...create,
  ...deleteById,
  ...updateById,
  ...getById,
};
