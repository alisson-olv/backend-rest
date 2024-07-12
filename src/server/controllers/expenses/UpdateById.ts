import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { IExpense } from '../../database/models';
import { ExpensesProvider } from '../../database/providers/expenses';

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<IExpense, 'expenseId' | 'createdAt'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      groupId: yup.number().integer().required().moreThan(0),
      amount: yup.number().required().positive(),
      description: yup.string().trim().required().max(255),
      updatedAt: yup.date().default(() => new Date()),
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
  const { id } = req.params;
  const result = await ExpensesProvider.updateById(Number(id), req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
