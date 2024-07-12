import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { IUserGroups } from '../../database/models';
import { UserGroupsProvider } from '../../database/providers/userGroups';

interface IBodyProps extends Omit<IUserGroups, 'userGroupId'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      groupId: yup.number().integer().required().moreThan(0),
      createdAt: yup.date().default(() => new Date()),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await UserGroupsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
