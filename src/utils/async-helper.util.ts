import { NextFunction, Request, Response } from 'express';

type Route = (req: Request<any, any, any, any>, res: Response) => Promise<any>;

export default function AsyncHelper(route: Route) {
  return function (req: Request, res: Response, next: NextFunction) {
    route(req, res).catch(next);
  };
}
