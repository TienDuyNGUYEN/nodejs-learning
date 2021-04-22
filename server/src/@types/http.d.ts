import { UserFromRequest } from '@common/types';
import 'express-session';
import 'express';

declare module 'express' {
  interface Request {
    user?: UserFromRequest;
  }
}
declare module 'express-session' {
  interface SessionData {
    authToken?: {
      accessToken?: string;
      refreshToken?: string;
    };
  }
}
