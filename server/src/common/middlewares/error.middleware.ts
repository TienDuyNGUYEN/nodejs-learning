import { HttpException } from '../exceptions';

import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: HttpException, req: Request, res: Response, _next: NextFunction) {
  res.status(err.status || 500);
  res.send({
    message: `${req.method}: ${req.url} error`,
    error: err.message || 'Internal server error',
    status: err.status || 500,
  });
}
