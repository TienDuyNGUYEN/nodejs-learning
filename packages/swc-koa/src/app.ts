import Koa from 'koa'
import bodyParser from "koa-bodyparser"
import koaRouter from '@koa/router'

const port = 2022
const startServer = async (): Promise<Koa> => {
    const app = new Koa()
    const router = new koaRouter()
    app.use(bodyParser())

    router.get('/', (ctx, next) => {
        ctx.body = {
            persons: [{
                id: '1',
                name: 'N T D'
            }]
        }
        next()
    });

    app
        .use(router.routes())
        .use(router.allowedMethods())

    return app
}

startServer()
    .then((app) => app.listen(port))
    .catch(console.error)