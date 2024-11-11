import jwt from 'jsonwebtoken';
import moment from 'moment';

const tokenConfiguration = {
  ACCESS_TOKEN_EXPIRY_IN_MINUTES: 15,
  REFRESH_TOKEN_EXPIRY_IN_DAYS: 15,
  MOBILE_USER_JWT_EXPIRY_IN_DAYS: 15,
};

interface JwtPayload {
  iat: number;
  expires: number;
}

const generateToken = (data: object, expires: moment.Moment): string => {
  const payload: JwtPayload = {
    ...data,
    iat: moment().unix(),
    expires: expires.unix(),
  };
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

const verifyToken = (token: string): JwtPayload => {
  const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload; // Cast to JwtPayload
  return payload;
};

const generateAuthTokens = async (payload: object) => {
  const accessTokenExpires = moment().add(
    tokenConfiguration.ACCESS_TOKEN_EXPIRY_IN_MINUTES,
    'minutes',
  );
  const accessToken = generateToken({ ...payload, type: 'ACCESS' }, accessTokenExpires);

  const refreshTokenExpires = moment().add(tokenConfiguration.REFRESH_TOKEN_EXPIRY_IN_DAYS, 'days');
  const refreshToken = generateToken({ ...payload, type: 'REFRESH' }, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

export { generateToken, verifyToken, generateAuthTokens };
