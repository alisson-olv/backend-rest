import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middleware';
import { IUser } from '../../database/models';
import { UsersProvider } from '../../database/providers/users';
import { JWTService, PasswordCrypto } from '../../shared/services';

interface IBodyProps extends Omit<IUser, 'id' | 'name'> {}

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      email: yup.string().required().email().min(5),
      password: yup.string().required().min(6),
    })
  ),
}));

export const signIn = async (
  req: Request<{}, {}, IBodyProps>,
  res: Response
) => {
  const { email, password } = req.body;

  const user = await UsersProvider.getByEmail(email);

  if (user instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid Email or password',
      },
    });
  }

  const passwordMatch = await PasswordCrypto.verifyPassword(
    password,
    user.password
  );

  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid Email or password',
      },
    });
  } else {
    const acessToken = JWTService.sign({
      uid: user.id,
    });

    if (acessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Internal error to generate access token',
        },
      });
    }

    return res.status(StatusCodes.OK).json({
      acessToken: acessToken,
    });
  }
};
