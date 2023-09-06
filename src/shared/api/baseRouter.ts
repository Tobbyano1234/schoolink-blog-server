import * as QueryString from 'qs';
import e, { Router } from 'express';
import * as core from 'express-serve-static-core';

type ExpressMiddleware = e.RequestHandler<core.ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>

export const baseRouter = () => {
  const router = Router();

  const GET = (route: string, middlewares: ExpressMiddleware[]) => {
    router.route(route).get(...middlewares);
  };
  const POST = (route: string, middlewares: ExpressMiddleware[]) => {
    router.route(route).post(...middlewares);
  };
  const PUT = (route: string, middlewares: ExpressMiddleware[]) => {
    router.route(route).put(...middlewares);
  };
  const DELETE = (route: string, middlewares: ExpressMiddleware[]) => {
    router.route(route).delete(...middlewares);
  };

  return { GET, POST, PUT, DELETE, router };
}; 
