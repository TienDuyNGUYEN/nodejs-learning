import 'reflect-metadata';
import { prismaClient } from 'src/providers/prisma.service';
import { AppModule } from './app';

export async function main() {
  const appModule = new AppModule();
  appModule.listen(appModule.app.get('port'));
}

main().catch(async (err) => {
  console.error(err);
  await prismaClient.$disconnect();
});
