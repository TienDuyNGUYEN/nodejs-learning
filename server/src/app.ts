import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import { sessionConfig } from './common/configs/session.config';
import { envConfig } from './common/configs/env.config';
import { useContainer } from 'class-validator';
import { errorMiddleware } from '@common/middlewares';
import appRouter from './app.routes';
import notFoundMiddleware from '@common/middlewares/not-found.middleware';

const app = express();
const env = envConfig();

// Middlewares
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 4014);
app.use(cors());

if (env.mode === 'production') {
  app.set('trust proxy', 1); // trust first cookie
  app
    .use(compression())
    .use(helmet())
    .use(
      RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
    );

  // Enable cors middleware
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', env.clientUrl); // update to match the domain you will make the request from
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
      res.sendStatus(204);
      return;
    }
    next();
  });

  // Disable console.log() in production
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  console.log = function () {};
}

// Register session
const sessionOptions = sessionConfig();
app.use(session(sessionOptions));

// Init routes
app.use(appRouter);

// Handle not found error

app.use(notFoundMiddleware);
// Error handler - always put in the end
app.use(errorMiddleware);

export default app;
