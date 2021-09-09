const Router = require('koa-router')
const { LoginModel } = require('../models')

// prefix: '/x/passport-login'
const login = new Router()

login.get('/captcha', LoginModel.getPassportCaptcha)
login.get('/getKey', LoginModel.getPassportKey)
login.post('/login', LoginModel.login)

module.exports = login
