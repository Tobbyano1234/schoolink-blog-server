export interface CustomErrorInterface {
  handler: Function;
  converter: Function;
  errorHandler: Function;
  notFound: Function;
}

export interface HttpExceptionInterface {
  message: string;
  status: number;
  errors: object | null;
  stack?: string | undefined;
  isPublic?: boolean | undefined;
  payload?: object;
}

export interface JoiErrorInterface {
  message: string;
  path: string[];
  type: string;
}

export interface ResponseInterface {
  statusCode: number;
  message?: string;
  payload?: object | null;
  errors?: object | null;
  token?: string | null;
}

export class PaginationDTO {
  page?: number;
  limit?: number;
  ignoreNew?: boolean;
}
