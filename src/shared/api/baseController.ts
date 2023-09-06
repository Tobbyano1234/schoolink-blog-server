import { Request, Response, NextFunction } from 'express';

import { sendResponse } from '../response';
import { ResponseInterface } from '../types';


type handleRequestOutput = {
  status: number,
  message: string,
  data?: any
  errors?: object,
  token?: string,
};
export const BaseController = (handleRequest: (request: Request) => Promise<handleRequestOutput>) => {
  return async function(
  	request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<ResponseInterface | void> {
    try {
	  const {status, message, data, errors, token} = await handleRequest(request);
    return response
      .status(status)
      .json(sendResponse(status, message, data || '', errors || null, token || null));
    } catch (error: any) {
      next(error);
    }
  };
};
