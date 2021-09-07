# 登录相关接口和步骤

## 人机验证

人机验证登录前首先要申请验证码参数，通过接口 `/login/passport/captcha` 来获取验证码参数。

前端可以使用 [geetest](https://docs.geetest.com/sensebot/deploy/client/web#%E5%AE%89%E8%A3%85) 根据返回的内容展示验证器，或者根据[geetest-validator](https://github.com/kuresaru/geetest-validator)来通过验证器。

随后可以使用 **账号密码登录** 或 **手机验证码登录** 。

### 账号密码登录

调用 `/login/passport/getKey` 获取加密公钥及密码盐值。

### 手机验证码登录

## 扫码登录
