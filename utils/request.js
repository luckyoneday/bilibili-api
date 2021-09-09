const axios = require('axios')
const qs = require('Qs')

const chooseUserAgent = (ua = 'web') => {
  const userAgentList = {
    mobile:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1',
    web: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.30 Safari/537.36',
  }
  const tempUA = ua ? ua : 'web'
  return userAgentList[tempUA]
}

const createRequest = (method, url, data, options) => {
  return new Promise((resolve, reject) => {
    let headers = {
      ['User-Agent']: chooseUserAgent(options.ua),
      Referer: 'https://www.bilibili.com/',
      Origin: 'https://www.bilibili.com/',
    }
    if (method.toUpperCase() === 'POST') {
      headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (typeof options.cookie === 'object') {
      headers['Cookie'] = Object.keys(options.cookie)
        .map(
          (key) =>
            encodeURIComponent(key) +
            '=' +
            encodeURIComponent(options.cookie[key]),
        )
        .join('; ')
    } else if (options.cookie) {
      headers['Cookie'] = options.cookie
    }

    let settings = {
      method,
      headers,
    }
    if (method.toUpperCase() === 'GET') {
      const tempQuery = Object.keys(data).reduce((prev, cur, idx) => {
        if (idx === 0) {
          return (
            prev + encodeURIComponent(cur) + '=' + encodeURIComponent(data[cur])
          )
        } else
          return (
            prev +
            '&' +
            encodeURIComponent(cur) +
            '=' +
            encodeURIComponent(data[cur])
          )
      }, '?')

      const newUrl = url + tempQuery
      settings.url = newUrl
    } else {
      settings.url = url
      settings.data = qs.stringify(data)
    }

    console.log(settings, 'request')

    axios
      .request(settings)
      .then((res) => {
        console.log('res,', res.data)
        resolve(res.data)
      })
      .catch(reject)
  })
}

module.exports = createRequest
