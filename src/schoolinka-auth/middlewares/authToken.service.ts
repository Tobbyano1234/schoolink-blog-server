import httpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';

import { verifyToken } from '../plugins/token.plugin';
import { AuthMiddleware } from './authMiddleware.service';
import { sendResponse } from '../../famwork-shared/response';
import { AccountTokenType } from '../../typings/Account.types';
import { ITokenGeneratorFunc } from './policies.service';

interface authTokenOptions {
  authPolicy: ITokenGeneratorFunc;
  allowExternalAccess: boolean;
  roleAccess?: typeof AuthMiddleware.IsUserOrAdmin;
};


export const authTokenService = (options: authTokenOptions) => {
  const {
    authPolicy,
    allowExternalAccess,
    roleAccess,
  } = options
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const token: string = (authPolicy(request) as unknown as string);
    if (allowExternalAccess && !token) {
      return next();
    } else if (token) {
      try {
        const verifiedToken = await verifyToken(token);
        (request as any).token = verifiedToken;
        roleAccess && roleAccess((request as Request & { token: AccountTokenType }).token);
        return next();
      } catch (error: any) {
        if (allowExternalAccess) {
          return next();
        }
        console.error(error);
        return response.status(httpStatus.UNAUTHORIZED).json(
          sendResponse(httpStatus.UNAUTHORIZED, error.message || `Invalid Token`, null, {
            error: error.message || `Invalid Token`,
          }),
        );
      }
    }
    return response.status(httpStatus.UNAUTHORIZED).json(
      sendResponse(httpStatus.UNAUTHORIZED, 'No Token found', null, {
        error: 'No Authorization found',
      }),
    );
  };
};
