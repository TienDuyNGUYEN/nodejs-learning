import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import { sessionConfig } from './common/configs/session.config';
import { envConfig } from './common/configs/env.config';
import { errorMiddleware } from '@common/middlewares';
import notFoundMiddleware from '@common/middlewares/not-found.middleware';
import { container, injectable } from 'tsyringe';
import { AppController } from './app.controller';

@injectable()
export class AppModule {
  private env = envConfig();
  public app: express.Application;

  constructor() {
    this.app = this.build();
  }

  public listen(port: number) {
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
    this.app.set('port', process.env.PORT || 4014);
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

    // Register session
    const sessionOptions = sessionConfig();
    this.app.use(session(sessionOptions));

    // Init routes
    // Home route
    this.app.get('/', (req, res) => {
      res.send('Hi there!');
    });

    this.app.get('/health', (req, res) => {
      res.status(200).send();
    });

    // Loop through all controller of app and initialize router
    const appController = container.resolve(AppController);

    appController.all.forEach((c) => {
      this.app.use('/api', c.router);
    });

    // Handle not found error
    this.app.use(notFoundMiddleware);

    // Error handler - always put in the end
    this.app.use(errorMiddleware);

    return this.app;
  }
}
