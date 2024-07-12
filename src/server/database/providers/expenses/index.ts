import * as create from './Create';
import * as deleteById from './DeleteById';
import * as getAll from './GetAll';
import * as getByGroupId from './GetByGroupId';
import * as getById from './GetById';
import * as getByUserId from './GetByUserId';
import * as updateById from './UpdateById';

export const ExpensesProvider = {
  ...create,
  ...deleteById,
  ...getAll,
  ...getByGroupId,
  ...getById,
  ...getByUserId,
  ...updateById,
};
