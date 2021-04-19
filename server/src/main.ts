import app from './app';
import { prismaService } from 'src/providers/db';

export async function main() {
  app.listen(app.get('port'), () => {
    console.log('\x1b[36m%s\x1b[0m', `🌏 Express server started at http://localhost:${app.get('port')}`);
  });
}

main().catch(async (err) => {
  console.error(err);
  await prismaService.$disconnect();
});
