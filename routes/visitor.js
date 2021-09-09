const Router = require('koa-router')
const { VisitorModel } = require('../models')

const visitor = new Router()

// prefix: '/visit'
visitor.get('/getList', VisitorModel.getList)

module.exports = visitor