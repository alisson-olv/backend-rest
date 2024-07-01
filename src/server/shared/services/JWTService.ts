import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

interface IJwtData {
  uid: number;
}

const sign = (data: IJwtData): string | 'JWT_SECRET_NOT_FOUND' => {
  if (!JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  return jwt.sign(data, JWT_SECRET, {
    expiresIn: '24h',
  });
};

const verify = (
  token: string
): IJwtData | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
  if (!JWT_SECRET) return 'JWT_SECRET_NOT_FOUND';

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === 'string') {
      return 'INVALID_TOKEN';
    }

    return decoded as IJwtData;
  } catch (error) {
    return 'INVALID_TOKEN';
  }
};

export const JWTService = {
  sign,
  verify,
};
