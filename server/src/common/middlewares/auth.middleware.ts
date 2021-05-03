import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JwtService } from 'src/modules/auth/services/jwt.service';
import { container } from 'tsyringe';
import { ForbiddenException } from '../exceptions/forbidden.exception';
import handler from 'express-async-handler';

export function authMiddleware(): RequestHandler {
  return handler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers['authorization'];
      if (!bearerToken) {
        throw new ForbiddenException('Unauthorized!');
      }
      const token = bearerToken.split(' ')[1];

      if (!token) throw new ForbiddenException('Token invalid');

      const jwtService = container.resolve(JwtService);
      const { user } = jwtService.verify(token);

      if (!user) throw new ForbiddenException('Token invalid');
      next();
    } catch (error) {
      next(error);
    }
  });
}
