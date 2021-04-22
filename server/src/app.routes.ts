import authRouter from '@modules/auth/auth.routes';
import express from 'express';

const appRouter = express.Router();

// Home route
appRouter.get('/', (req, res) => {
  res.send('Hi there!');
});

appRouter.get('/health', (req, res) => {
  res.status(200).send();
});

appRouter.use('/api', authRouter);

export { appRouter };
export default appRouter;
