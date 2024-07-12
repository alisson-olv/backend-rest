import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IExpenseParticipant } from '../../database/models';
import { ExpenseParticipantsProvider } from '../../database/providers/expenseParticipants';

interface IParamProps {
  id?: number;
}

interface IBodyProps
  extends Omit<IExpenseParticipant, 'expenseParticipantId' | 'createdAt'> {}

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      expenseId: yup.number().integer().required().moreThan(0),
      amountOwed: yup.number().required().moreThan(0),
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
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'id need to be informed',
      },
    });
  }

  const result = await ExpenseParticipantsProvider.updateById(
    req.params.id,
    req.body
  );
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send();
};
