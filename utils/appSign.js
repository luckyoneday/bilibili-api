const Crypto = require('crypto')
const { Buffer } = require('buffer')

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

const encryptoSign = (publicKey, value) => {
  const bufferV = Buffer.from(value, 'utf8')
  const tempV = Crypto.publicEncrypt(publicKey, bufferV)
  return tempV.toString('base64')
}

module.exports = { getSignParams, encryptoSign }

