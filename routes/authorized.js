const Router = require('koa-router')
const AuthorizedModel = require('../models/authorized')

const authorized = new Router()

// prefix: '/x/web-interface'
authorized.get('/nav', AuthorizedModel.navUserInfo)
authorized.get('/nav/stat', AuthorizedModel.navStat)
authorized.get('/site/getCoin', AuthorizedModel.getCoin)


module.exports = authorized