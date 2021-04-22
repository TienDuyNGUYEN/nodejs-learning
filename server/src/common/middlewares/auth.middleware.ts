import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JwtService } from 'src/modules/auth/services/jwt.service';
import { container } from 'tsyringe';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import handler from 'express-async-handler';

export function authMiddleware(): RequestHandler {
  return handler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.session?.authToken) {
        throw new ForbiddenException('Unauthorized!');
      }
      const { authToken } = req.session;

      if (!authToken) throw new ForbiddenException('Token invalid or missing');

      const jwtService = container.resolve(JwtService);
      const { user } = jwtService.verify(authToken?.accessToken);

      if (!user) throw new ForbiddenException('Token invalid or missing');

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  });
}
