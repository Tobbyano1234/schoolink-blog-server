import { Request, Response, NextFunction } from 'express';

import { sendResponse } from '../response';
import { ResponseInterface } from '../types';

type handleRequestOutput = {
  status: number,
  message: string,
  data?: any
  errors?: object,
  token?: string,
  redirect?: {
    url: string,
    data?: any
  },
};
export const BaseController = (handleRequest: (request: Request) => Promise<handleRequestOutput>) => {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<ResponseInterface | void> {
    try {

      const { status, message, data, errors, token,
         redirect
      } = await handleRequest(request);

      if (redirect) {
        // If redirect URL is provided, perform the redirect
        const redirectUrl = new URL(redirect.url);

        if (redirect.data) {
          // Append the data to the query parameters of the redirect URL
          for (const key in redirect.data) {
            redirectUrl.searchParams.append(key, redirect.data[key]);
          }
        }
       
        return response.redirect(redirectUrl.toString());
      }

     
      return response
        .status(status)
        .json(sendResponse(status, message, data || '', errors || null, token || null));
    } catch (error: any) {
      next(error);
    }
  };
};
