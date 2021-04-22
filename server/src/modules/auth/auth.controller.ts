import { User } from '.prisma/client';
import { mapUserOutput } from '@modules/user/utils/map-user.out';
import { injectable } from 'tsyringe';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';

@injectable()
export class AuthController {
  constructor(private authService: AuthService, private jwtService: JwtService) {}
  public async login(req, res) {
    const input = req.body as LoginUserDto;
    const user: User = await this.authService.loginUser(input);

    const accessToken = this.jwtService.sign({ user });
    const refreshToken = this.jwtService.sign({ user }, true);
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
