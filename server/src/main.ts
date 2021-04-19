import app from './app';

export async function main() {
  app.listen(app.get('port'), () => {
    console.log('\x1b[36m%s\x1b[0m', `🌏 Express server started at http://localhost:${app.get('port')}`);
  });
}

main().catch((err) => {
  console.error(err);
  // db.close();
});
