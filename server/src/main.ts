import 'reflect-metadata';
import { prismaClient } from 'src/providers/prisma.service';
import { AppModule } from './app';

export async function main() {
  const appModule = new AppModule();
  const app = appModule.app;
  app.listen(app.get('port'), () => {
    console.log('\x1b[36m%s\x1b[0m', `🌏 Express server started at http://localhost:${app.get('port')}`);
  });
}

main().catch(async (err) => {
  console.error(err);
  await prismaClient.$disconnect();
});
