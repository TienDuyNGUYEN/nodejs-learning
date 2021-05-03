import { User } from '.prisma/client';
import { PayloadUserForJwtToken } from '@common/types';
import { mapUserOutput } from '@modules/user/utils/map-user-output';
import { mapUserPayload } from '@modules/user/utils/map-user-payload';
import express from 'express';
import { injectable } from 'tsyringe';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';

@injectable()
export class AuthController {
  public router = express.Router();

  constructor(private authService: AuthService, private jwtService: JwtService) {}

  public async login(req, res) {
    const input = req.body as LoginUserDto;
    const user: User = await this.authService.loginUser(input);

    const payload: PayloadUserForJwtToken = {
      user: mapUserPayload(user),
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, true);
    req.session.authToken = { accessToken, refreshToken };

    res.send({ user: mapUserOutput(user), authToken: { accessToken } });
  }

  public async register(req, res) {
    const input = req.body as RegisterUserDto;
    const user: User = await this.authService.registerUser(input);

    const accessToken = this.jwtService.sign({ user });
    const refreshToken = this.jwtService.sign({ user }, true);
    req.session.authToken = { accessToken, refreshToken };

    res.send({ user: mapUserOutput(user), authToken: { accessToken } });
  }
}
