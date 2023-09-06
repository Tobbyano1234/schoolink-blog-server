import jwt from 'jsonwebtoken';

import { config } from '../../famwork-web-api/config';
import { AccountTokenType } from '../../typings/Account.types';


export const issueToken = (payload: AccountTokenType): Promise<string> => {
  return new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      config.credentials.jwt.secret,
      { expiresIn: config.credentials.jwt.expirationInterval },
      (error, decoded) => {
        if (error) return reject(error);
        // match decoded parameter argument conflict
        return resolve(decoded as string | Promise<string>);
      },
    ),
  );
};

export const verifyToken = (token: string): Promise<any> => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, config.credentials.jwt.secret, (error, decoded) => {
      if (error) return reject(error);
      return resolve(decoded);
    }),
  );
};

export const verifyTokenSync = (token: string) => {
  let err = null as unknown as { name: string; message: string };
  let res = null as unknown as AccountTokenType;
  jwt.verify(token, config.credentials.jwt.secret, (error, decoded) => {
    if (error) {
      const _err = {
        name: error.name,
        message: error.message
      }
      err = _err;
    }
    res = decoded as AccountTokenType;
  });
  return { err, res };
};
