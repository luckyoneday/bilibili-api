const Router = require('koa-router')
const VisitorModel = require('../models')

const visitor = new Router()

visitor.get('/getList', VisitorModel.getList)

module.exports = visitor