import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JWTService } from '../services';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Not authenticated',
      },
    });
  }

  const [type, token] = authorization.split(' ');

  const acessToken = JWTService.verify(token);

  console.log(acessToken);
  console.log(type);

  if (type !== 'Bearer') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid token type',
      },
    });
  }

  if (acessToken === 'JWT_SECRET_NOT_FOUND') {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: 'Internal error, error to verify token',
      },
    });
  } else if (acessToken === 'INVALID_TOKEN') {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Invalid token, you are not authenticated',
      },
    });
  }

  return next();
};
