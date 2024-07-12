import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ExpenseParticipantsProvider } from '../../database/providers/expenseParticipants';

export const getAllValidation = validation((getSchema) => ({
  query: getSchema(
    yup.object().shape({
      limit: yup.number().integer().optional().default(10),
      offset: yup.number().integer().optional().default(0),
    })
  ),
}));

export const getAll = async (req: Request, res: Response) => {
  const result = await ExpenseParticipantsProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
