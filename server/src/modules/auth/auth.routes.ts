import { validationMiddleware } from '@common/middlewares/validation.middleware';
import express from 'express';
import { container } from 'tsyringe';
import { AuthController } from './auth.controller';
import handler from 'express-async-handler';
import { LoginUserDto, RegisterUserDto } from './dto';

const authRouter = express.Router();
const authController = container.resolve(AuthController);

// Login
authRouter.post('/auth/login', validationMiddleware(LoginUserDto), handler(authController.login));

// Register
authRouter.post('/auth/register', validationMiddleware(RegisterUserDto), handler(authController.register));

export { authRouter };
export default authRouter;
