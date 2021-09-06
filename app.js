const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')
const {login, visitor, authorized} = require('./routes')
const cors = require('koa2-cors')


const app = new koa()
const PORT = process.env.PORT || 4545
const routes = new router()

routes.use('/visit', visitor.routes(), visitor.allowedMethods())
routes.use('/login', login.routes(), login.allowedMethods())
routes.use('/', authorized.routes(), authorized.allowedMethods())
app.use(routes.routes(), routes.allowedMethods())

app.use(cors({
  origin: '*',
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())


app.listen(PORT)

console.log('app start success at', PORT)