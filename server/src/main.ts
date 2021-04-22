import 'reflect-metadata';
import { prismaClient } from 'src/providers/prisma.service';
import { AppModule } from './app';

export async function main() {
  const appModule = new AppModule();
  const port = Number(process.env.PORT) || 4014;
  appModule.listen(port);
}

main().catch(async (err) => {
  console.error(err);
  await prismaClient.$disconnect();
});
