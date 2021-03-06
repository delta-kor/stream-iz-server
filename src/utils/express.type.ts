import { Request, Response } from 'express';

export type TypedRequest<P, Q = {}> = Request<any, any, P, Q>;
export type TypedResponse<P> = Response<P>;
