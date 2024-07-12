import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { ExpensesProvider } from '../../database/providers/expenses';
import { validation } from '../../shared/middleware';

interface IParamProps {
  id?: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const { id } = req.params;
  const expense = await ExpensesProvider.getById(Number(id));

  if (!expense) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: 'Expense not found',
      },
    });
  }

  return res.status(StatusCodes.OK).json(expense);
};
