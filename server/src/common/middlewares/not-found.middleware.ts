import { NotFoundException } from '@common/exceptions';
import { RequestHandler } from 'express';

const notFoundMiddleware: RequestHandler = (req, res, next) => next(new NotFoundException(`Not found`));

export { notFoundMiddleware };
export default notFoundMiddleware;
