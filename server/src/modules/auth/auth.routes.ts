import { validationMiddleware } from '@common/middlewares/validation.middleware';
import express from 'express';
import { container } from 'tsyringe';
import { AuthController } from './auth.controller';
import handler from 'express-async-handler';
import { LoginUserDto, RegisterUserDto } from './dto';

const authRouter = express.Router();

// Login
authRouter.post(
  '/auth/login',
  validationMiddleware(LoginUserDto),
  handler((req, res) => {
    const authController = container.resolve(AuthController);
    authController.login(req, res);
  }),
);

// Register
authRouter.post(
  '/auth/register',
  validationMiddleware(RegisterUserDto),
  handler((req, res) => {
    const authController = container.resolve(AuthController);
    authController.register(req, res);
  }),
);

export { authRouter };
export default authRouter;
