import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

export const prismaClient = new PrismaClient();

@injectable()
export class PrismaService extends PrismaClient {
  public client: PrismaClient;
  constructor() {
    super({
      log: ['query', 'info', `warn`, `error`],
    });
    this.client = new PrismaClient();
  }
  public async initDb() {
    await this.$connect();
  }
  public async close() {
    await this.client?.$disconnect();
  }
}
