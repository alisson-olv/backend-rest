import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IBalances } from '../../database/models';
import { BalancesProvider } from '../../database/providers/balances';

interface IBodyProps extends Omit<IBalances, 'balanceId'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      userId: yup.number().integer().required().moreThan(0),
      groupId: yup.number().integer().required().moreThan(0),
      amount: yup.number().required().moreThan(0),
      updatedAt: yup.date().default(() => new Date()),
    })
  ),
}));

export const create = async (req: Request, res: Response) => {
  const result = await BalancesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
