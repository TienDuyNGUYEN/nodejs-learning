import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import RateLimit from 'express-rate-limit';
import session from 'express-session';
import { sessionConfig } from './common/configs/session.config';
import { envConfig } from './common/configs/env.config';

const app = express();
const env = envConfig();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4014);
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hi there!');
});

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

// Session
const sessionOptions = sessionConfig();
app.use(session(sessionOptions));

export default app;