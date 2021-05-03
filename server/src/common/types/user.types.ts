import { RoleType } from '@prisma/client';

export const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface UserOutput {
  id: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  role: RoleType;
  createdAt: Date;
  updatedAt: Date;
}
