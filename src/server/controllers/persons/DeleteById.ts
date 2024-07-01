import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { PersonsProvider } from '../../database/providers/persons';

interface IParamProps {
  id?: number;
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().required().moreThan(0),
    })
  ),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'You need to inform a "id" to delete the person',
      },
    });
  }

  try {
    const result = await PersonsProvider.deleteById(req.params.id);

    if (result instanceof Error) {
      if (result.message === 'Person not found') {
        return res.status(StatusCodes.NOT_FOUND).json({
          errors: {
            default: result.message,
          },
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Error deleting Persons',
      },
    });
  }
};
