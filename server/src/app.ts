import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import { envConfig } from './common/configs/env.config';
import { errorMiddleware } from '@common/middlewares';
import notFoundMiddleware from '@common/middlewares/not-found.middleware';
import { injectable } from 'tsyringe';
import appRouter from './app.routes';
import cookieParser from 'cookie-parser';

//global app
@injectable()
export class AppModule {
  private env = envConfig();
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  public listen(port: number) {
    this.app = this.build();
    this.app.listen(port, () => {
      console.log('\x1b[36m%s\x1b[0m', `🌏 Express server started at http://localhost:${port}`);
    });
  }

  public build() {
    this.app = express();
    // Middlewares
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cookieParser(this.env.cookieSecret));

    this.app.use(cors());

    if (this.env.mode === 'production') {
      this.app.set('trust proxy', 1); // trust first cookie
      this.app
        .use(compression())
        .use(helmet())
        .use(
          RateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
          }),
        );

      // Enable cors middleware
      const clientUrl = this.env.clientUrl;
      this.app.use(function (req: Request, res: Response, next: NextFunction) {
        res.header('Access-Control-Allow-Origin', clientUrl); // update to match the domain you will make the request from
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

    // Init routes
    this.app.use(appRouter);

    // Handle not found error
    this.app.use(notFoundMiddleware);

    // Error handler - always put in the end
    this.app.use(errorMiddleware);

    return this.app;
  }
}
