import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IPayments } from '../../database/models';
import { PaymentsProvider } from '../../database/providers/payments';

interface IBodyProps extends Omit<IPayments, 'paymentId' | 'updatedAt'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      payerId: yup.number().integer().required().moreThan(0),
      payeeId: yup.number().integer().required().moreThan(0),
      groupId: yup.number().integer().required().moreThan(0),
      amount: yup.number().required().moreThan(0),
      description: yup.string().required().min(3).max(255),
      createdAt: yup.date().default(() => new Date()),
    })
  ),
}));

export const create = async (req: Request, res: Response) => {
  const result = await PaymentsProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
