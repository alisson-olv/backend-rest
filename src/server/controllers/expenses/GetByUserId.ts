import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { ExpensesProvider } from '../../database/providers/expenses';
import * as yup from 'yup';

interface IParamProps {
  userId?: number;
}

export const getByUserIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getByUserId = async (req: Request<IParamProps>, res: Response) => {
  const { userId } = req.params;
  const result = await ExpensesProvider.getByUserId(Number(userId));

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
