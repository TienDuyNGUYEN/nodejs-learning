import { injectable } from 'tsyringe';
import { PasswordService } from './password.service';
import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from 'src/providers/prisma.service';
import { LoginUserDto, RegisterUserDto } from '../dto';
import { emailRegex, UserFromRequest } from '@common/types';
import { BadRequestException } from '@common/exceptions';
import { JwtService } from './jwt.service';

@injectable()
export class AuthService {
  private _db: PrismaClient;
  constructor(prismaService: PrismaService, private passwordService: PasswordService, private jwtService: JwtService) {
    this._db = prismaService.client;
  }

  public async registerUser(input: RegisterUserDto): Promise<User> {
    const user = await this._db.user.create({
      data: { ...input, password: await this.passwordService.hash(input.password) },
    });
    return user;
  }

  public async loginUser(input: LoginUserDto): Promise<User> {
    const { usernameOrEmail, password } = input;
    const isEmail = emailRegex.test(usernameOrEmail);
    let user: User;
    if (isEmail) user = await this._db.user.findUnique({ where: { email: usernameOrEmail } });
    else user = await this._db.user.findUnique({ where: { username: usernameOrEmail } });
    if (!user) throw new BadRequestException('Invalid credentials');

    // check password
    const isMatch = await this.passwordService.verify(user.password, password);
    if (!isMatch) throw new BadRequestException('Invalid credentials');

    return user;
  }

  public async getUserFromRefreshToken(refreshToken: string): Promise<User | UserFromRequest> {
    const { user } = this.jwtService.verify(refreshToken, true);
    if (!user) return null;

    const isMatch = await this.passwordService.verify(user.currentHashedRefreshToken, refreshToken);
    if (!isMatch) return null;
    return user;
  }
  public async resetCurrentHashedToken(userId: string, refreshToken: string) {
    const user = await this._db.user.update({
      where: { id: userId },
      data: {
        currentHashedRefreshToken: await this.passwordService.hash(refreshToken),
      },
    });
    return user;
  }
}
