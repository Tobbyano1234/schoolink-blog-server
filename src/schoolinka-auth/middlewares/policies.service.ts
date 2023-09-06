import { Request } from 'express';

export interface ITokenGeneratorFunc {
  (req: Request, Parameter?: string) : string | undefined;
}

// user token by header
export const headerBearerToken: ITokenGeneratorFunc = (request) => {
  const getTokenFromAuthHeader = (authorizationHeader: string) => {
    const tokenRegex = /Bearer (.+)/;
    const tokenMatch = tokenRegex.exec(authorizationHeader);
    return tokenMatch ? tokenMatch[1] : undefined;
  };
  return getTokenFromAuthHeader(request.header('Authorization')!);
};

// user token by route parameter
export const routeParamsToken: ITokenGeneratorFunc = (request , Parameter) => request.params[Parameter as string];

// user token by query string parameter
export const queryStringParamsToken: ITokenGeneratorFunc = (request, Parameter = 'ut') => request.query[Parameter as string] as string;

//user token from request body
export const requestBodyToken: ITokenGeneratorFunc = (request) => request.body.token;
