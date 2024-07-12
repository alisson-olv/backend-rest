import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { ExpensesProvider } from '../../database/providers/expenses';
import * as yup from 'yup';

interface IParamProps {
  groupId?: number;
}

export const getByGroupIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      groupId: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getByGroupId = async (
  req: Request<IParamProps>,
  res: Response
) => {
  const { groupId } = req.params;
  const result = await ExpensesProvider.getByGroupId(Number(groupId));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
