const { VALIDATE_HOST, SIGN_LOGIN_KEY } = require('../config')
const { getSignParams } = require('../utils/appSign')
const request = require('../utils/request')

class LoginModel {
  static getPassportCaptcha(ctx) {
    return request(
      'GET',
      VALIDATE_HOST + '/web/captcha/combine',
      { plat: 6 },
      {},
    ).then((res) => {
      ctx.body = res
    })
  }

  static getPassportKey(ctx) {
    const query = ctx.query
    const platform = query.platform || 'pc'
    // pc 端
    if (platform === 'pc') {
      return request(
        'GET',
        VALIDATE_HOST + '/login',
        { act: 'getKey' },
        {},
      ).then((res) => {
        ctx.body = res
      })
    }

    // mobile 端
    else {
      const appKey = SIGN_LOGIN_KEY.appkey
      const sign = getSignParams({ appkey: appKey }, SIGN_LOGIN_KEY.appsec)
      return request(
        'POST',
        VALIDATE_HOST + '/api/oauth2/getKey',
        {
          appKey,
          sign,
        },
        {},
      ).then((res) => {
        ctx.body = res
      })
    }
  }

  static login(ctx) {
    const { username, password, key, challenge, validate, seccode } =
      ctx.request.body

    return request('POST', VALIDATE_HOST + '/web/login/v2', {
      captchaType: 6,
      username,
      password,
      keep: true,
      key,
      challenge,
      validate,
      seccode,
    }).then((res) => {
      ctx.body = res
    })
  }
}

module.exports = LoginModel
