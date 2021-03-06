import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpException from '../exceptions/http.exception';

export default function ValidateHelper(
  type: any,
  query: boolean = false,
  skipMissingProperties = false
): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    validate(plainToClass(type, query ? req.query : req.body), { skipMissingProperties }).then(
      err => {
        if (err.length > 0) {
          const values = Object.values(err[0].constraints!);
          next(new HttpException(400, values[values.length - 1]));
        } else {
          next();
        }
      }
    );
  };
}
