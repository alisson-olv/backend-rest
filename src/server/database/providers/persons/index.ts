import * as getById from './GetById';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as count from './Count';
import * as create from './Create';
import * as updateById from './UpdateById';

export const PersonsProvider = {
  ...getById,
  ...deleteById,
  ...getAll,
  ...count,
  ...create,
  ...updateById,
};
