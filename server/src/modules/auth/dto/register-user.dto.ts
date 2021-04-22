import { UserExitsValidator } from '@common/decorators/user-exists.validator';
import { IsEmail, IsNumber, IsOptional, IsString, Matches, MinLength, Validate } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @Matches(/[a-zA-Z0-9_-\.]{2,30}/)
  @Validate(UserExitsValidator)
  username!: string;

  @Validate(UserExitsValidator)
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(3)
  password!: string;
}
