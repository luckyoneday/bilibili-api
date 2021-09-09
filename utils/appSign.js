const Crypto = require('crypto')

const getSignParams = (data, key = '') => {

  const hash = Crypto.createHash('md5')

  let params = ''

  const keyList = Object.keys(data ? data : {})
  if (keyList.length > 0) {
    params = keyList.reduce((prev, cur, idx) => {
      if (idx !== 0) return prev + cur + '=' + data[cur]
      else return prev + '&' + cur + '=' + data[cur]
    }, params)
  }

  const secParam = params + key
  const signedHash = hash.update(secParam)

  return signedHash.digest('hex')
}

module.exports = { getSignParams }

