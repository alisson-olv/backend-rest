import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { IGroups } from '../../database/models';
import { GroupsProvider } from '../../database/providers/groups';

interface IBodyProps extends Omit<IGroups, 'groupId'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      name: yup.string().required().min(3).max(150),
      createdAt: yup.date().default(() => new Date()),
      updatedAt: yup.date().default(() => new Date()),
    })
  ),
}));

export const create = async (req: Request<{}, {}, IGroups>, res: Response) => {
  const result = await GroupsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
