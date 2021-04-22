import { Request, Response, NextFunction, RequestHandler } from 'express';
import handler from 'express-async-handler';
import { RoleType } from '@prisma/client';
import { UnauthorizedException } from '@common/exceptions/unauthorized-exception';

export function roleMiddleware(roles: RoleType[]): RequestHandler {
  return handler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      // always valid for admin
      if (!roles.includes('ADMIN')) roles.push('ADMIN');
      if (!roles.includes(req.user.role)) throw new UnauthorizedException();

      next();
    } catch (error) {
      next(error);
    }
  });
}
