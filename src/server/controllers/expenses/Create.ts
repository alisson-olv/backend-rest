import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { IExpense } from '../../database/models';
import { ExpensesProvider } from '../../database/providers/expenses';

interface IBodyProps extends Omit<IExpense, 'expenseId'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      groupId: yup.number().integer().required().moreThan(0),
      amount: yup.number().required().positive(),
      description: yup.string().trim().required().max(255),
      createdAt: yup.date().default(() => new Date()),
      updatedAt: yup.date().default(() => new Date()),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const result = await ExpensesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json({ expenseId: result });
};
