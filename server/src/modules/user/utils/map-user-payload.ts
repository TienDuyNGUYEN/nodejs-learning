import { UserFromRequest } from '@common/types';
import { RoleType, User } from '@prisma/client';

export function mapUserPayload(user: User): UserFromRequest {
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role as RoleType,
  };
}
