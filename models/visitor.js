const { SOURCE_HOST } = require('../config')
const request = require('../utils/request')

class VisitorModel {
  static getList(ctx) {
    const query = ctx.query
    const platform = query.platform || 'pc'
    return request(
      'GET',
      SOURCE_HOST + '/xlive/web-interface/v1/webMain/getList',
      { platform },
      {},
    ).then(res => {
      ctx.body = res
    })
  }
}

module.exports = VisitorModel
