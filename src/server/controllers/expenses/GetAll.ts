import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { ExpensesProvider } from '../../database/providers/expenses';
import * as yup from 'yup';

interface IBodyProps {
  page?: number;
  limit?: number;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IBodyProps>(
    yup.object().shape({
      page: yup.number().integer().moreThan(0).optional(),
      limit: yup.number().integer().moreThan(0).optional(),
    })
  ),
}));

export const getAll = async (
  req: Request<{}, {}, {}, IBodyProps>,
  res: Response
) => {
  const result = await ExpensesProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
