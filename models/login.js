const { VALIDATE_HOST, SIGN_LOGIN_KEY } = require('../config')
const { getSignParams } = require('../utils/appSign')
const request = require('../utils/request')

class LoginModel {
  static getPassportCaptcha(ctx) {
    return request(
      'GET',
      VALIDATE_HOST + '/x/passport-login/captcha',
      { source: 'main_web' },
      {},
    ).then((res) => {
      ctx.body = res.data
    })
  }

  static getPassportKey(ctx) {
    const query = ctx.query
    const platform = query.platform || 'web'

    // web 端
    if (platform === 'web') {
      return request(
        'GET',
        VALIDATE_HOST + '/x/passport-login/web/key',
        { r: Math.random() },
        {},
      ).then((res) => {
        ctx.body = res.data
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
        ctx.body = res.data
      })
    }
  }

  static login(ctx) {
    const { username, password, token, challenge, validate, seccode, source, go_url } =
      ctx.request.body

    return request(
      'POST',
      VALIDATE_HOST + '/x/passport-login/web/login',
      {
        source,
        go_url,
        keep: true,
        username,
        password,
        token,
        challenge,
        validate,
        seccode,
      },
      {
        Origin: 'https://passport.bilibili.com',
        Referer: 'https://passport.bilibili.com',
      },
    ).then((res) => {
      for(let key in res.headers) {
        ctx.set(key, res.headers[key])
      }
      ctx.body = res.data
    })
  }
}

module.exports = LoginModel
