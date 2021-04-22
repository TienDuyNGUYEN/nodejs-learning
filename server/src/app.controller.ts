import { HttpController } from '@common/types';
import { AuthController } from '@modules/auth/auth.controller';
import { container, injectable } from 'tsyringe';

@injectable()
export class AppController {
  private _appControllers: HttpController[] = [];

  constructor() {
    this._getAllController();
  }
  public get all(): HttpController[] {
    return this._appControllers;
  }

  private _getAllController() {
    const authController = container.resolve(AuthController);

    this._appControllers.push(authController);
  }
}
