const { SOURCE_API_HOST, ACCOUNT_HOST } = require('../config')
const request = require('../utils/request')

class AuthorizedModel {
  static navUserInfo(ctx) {
    return request(
      'GET',
      SOURCE_API_HOST + '/x/web-interface/nav',
      null,
      {cookie: ctx.headers['cookie']},
    ).then((res) => {
      ctx.body = res.data
    })
  }

  static navStat(ctx) {
    return request(
      'GET',
      SOURCE_API_HOST + '/x/web-interface/nav/stat',
      null,
      {cookie: ctx.headers['cookie']},
    ).then((res) => {
      ctx.body = res.data
    })
  }

  static getCoin(ctx) {
    return request(
        'GET',
        ACCOUNT_HOST + '/site/getCoin',
        null,
        {cookie: ctx.headers['cookie']},
      ).then((res) => {
        ctx.body = res.data
      })
  }
}

module.exports = AuthorizedModel
