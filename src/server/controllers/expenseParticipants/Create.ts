import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IExpenseParticipant } from '../../database/models';
import { ExpenseParticipantsProvider } from '../../database/providers/expenseParticipants';

interface IBodyProps
  extends Omit<IExpenseParticipant, 'expenseParticipantId'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      expenseId: yup.number().integer().required().moreThan(0),
      amountOwed: yup.number().required().moreThan(0),
      createdAt: yup.date().default(() => new Date()),
    })
  ),
}));

export const create = async (req: Request, res: Response) => {
  const result = await ExpenseParticipantsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
