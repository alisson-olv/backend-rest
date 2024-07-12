import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { IUserGroups } from '../../database/models';
import { UserGroupsProvider } from '../../database/providers/userGroups';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IUserGroups, 'userGroupId'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      groupId: yup.number().integer().required().moreThan(0),
      createdAt: yup.date().default(() => new Date()),
    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'You need to inform a "id" to update the user group',
      },
    });
  }
  const result = await UserGroupsProvider.updateById(req.params.id, req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
