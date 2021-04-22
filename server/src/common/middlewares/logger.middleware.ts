import { NextFunction, Request, Response } from 'express';
import { LoggerService } from 'src/providers/logger.service';
import { container } from 'tsyringe';

const logger = container.resolve(LoggerService);

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  logger.info(`${req.method} ${req.path}`);
  next();
}
