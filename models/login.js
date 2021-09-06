const { VALIDATE_HOST } = require('../config')
const request = require('../utils/request')

class LoginModel {
  static getList(ctx) {
    const query = ctx.query
    const platform = query.platform || 'pc'
    return request(
      'GET',
      VALIDATE_HOST + '/xlive/web-interface/v1/webMain/getList',
      { platform },
      {},
    ).then(res => {
      ctx.body = res
    })
  }
}

module.exports = LoginModel
