import { UserOutput } from '@common/types';
import { User } from '@prisma/client';

export function mapUserOutput(user: User): UserOutput {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
