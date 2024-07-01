import * as create from './Create';
import * as getAll from './GetAll';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as updateById from './UpdateById';
import * as count from './Count';

export const CitiesProvider = {
  ...create,
  ...getAll,
  ...deleteById,
  ...getById,
  ...updateById,
  ...count,
};
