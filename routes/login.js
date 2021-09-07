const Router = require('koa-router')
const { LoginModel } = require('../models')

const login = new Router()

login.get('/passport/captcha', LoginModel.getPassportCaptcha)
login.get('/passport/getKey', LoginModel.getPassportKey)


module.exports = login