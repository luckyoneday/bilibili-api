const koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('koa-router')
const {login, visitor, authorized} = require('./routes')
const cors = require('koa2-cors')
const { encryptoSign } = require('./utils/appSign')


const app = new koa()
app.use(bodyParser())

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


console.log(encryptoSign("-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDjb4V7EidX/ym28t2ybo0U6t0n\n6p4ej8VjqKHg100va6jkNbNTrLQqMCQCAYtXMXXp2Fwkk6WR+12N9zknLjf+C9sx\n/+l48mjUU8RqahiFD1XT/u2e0m2EN029OhCgkHx3Fc/KlFSIbak93EH/XlYis0w+\nXl69GV6klzgxW6d2xQIDAQAB\n-----END PUBLIC KEY-----\n", '8e0db05c46f4052cBiShi22332323'))

app.listen(PORT)

console.log('app start success at', PORT)