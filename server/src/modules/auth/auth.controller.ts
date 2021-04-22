import { User } from '.prisma/client';
import { validationMiddleware } from '@common/middlewares/validation.middleware';
import { mapUserOutput } from '@modules/user/utils/map-user.out';
import express from 'express';
import { injectable } from 'tsyringe';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';
import handler from 'express-async-handler';

@injectable()
export class AuthController {
  public router = express.Router();

  constructor(private authService: AuthService, private jwtService: JwtService) {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.post('/auth/login', validationMiddleware(LoginUserDto), handler(this.login));
    this.router.post('/auth/register', validationMiddleware(RegisterUserDto), handler(this.register));
  }

  // ------------------------Private handler-------------------------
  private async login(req, res) {
    const input = req.body as LoginUserDto;
    const user: User = await this.authService.loginUser(input);

    const accessToken = this.jwtService.sign({ user });
    const refreshToken = this.jwtService.sign({ user }, true);
    req.session.authToken = { accessToken, refreshToken };

    res.send({ user: mapUserOutput(user), authToken: { accessToken } });
  }

  private async register(req, res) {
    const input = req.body as RegisterUserDto;
    const user: User = await this.authService.registerUser(input);

    const accessToken = this.jwtService.sign({ user });
    const refreshToken = this.jwtService.sign({ user }, true);
    req.session.authToken = { accessToken, refreshToken };

    res.send({ user: mapUserOutput(user), authToken: { accessToken } });
  }
}
