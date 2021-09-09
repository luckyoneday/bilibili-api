# 登录相关接口和步骤

## 人机验证

人机验证登录前首先通过接口 `/x/passport-login/captcha` 来获取验证码参数。

| url           | `/x/passport-login/captcha` |
| ------------- | --------------------------- |
| method        | `get`                       |
| requestParams | 无                          |

| responseParams |                                   |
| -------------- | --------------------------------- |
| type           | 验证码 type，当前值为 `"geetest"` |
| geetest        | 验证码参数                        |
|                | gt                                |
|                | challenge                         |
| token          | 后续登录要使用的 `token`          |

前端可以使用 [geetest](https://docs.geetest.com/sensebot/deploy/client/web#%E5%AE%89%E8%A3%85) 根据返回数据展示验证器，或者根据 [geetest-validator](https://github.com/kuresaru/geetest-validator) 来通过验证器获取验证通过后的验证参数。

验证码验证通过之后会得到 `geetest_challenge`、`geetest_validate` 和 `geetest_seccode` ，会用于接下来的登录步骤。

随后可以使用 **账号密码登录** 或 **手机验证码登录** 。

### 账号密码登录

调用 `/x/passport-login/getKey` 获取加密公钥及密码盐值。

| url    | `/x/passport-login/getKey` |
| ------ | -------------------------- |
| method | `get`                      |

| requestParams |                      |
| ------------- | -------------------- |
| platform      | `"mobile"` / `"web"` |

| responseParams |              |
| -------------- | ------------ |
| hash           | 密码加密盐值 |
| key            | rsa 加密公钥 |

前端可以用 [jsEncypt](https://github.com/travist/jsencrypt) 使用加密公钥 `key` 加密 `密码盐值+登录密码(hash + password)`，并调用 `/x/passport-login/login` 接口来登录。

| url    | `/x/passport-login/login` |
| ------ | ------------------------- |
| method | `post`                    |

| requestParams |                                  |
| ------------- | -------------------------------- |
| source        | `"main_web"` 固定值              |
| go_url        | 跳转 url                         |
| username      | 用户名                           |
| password      | 加密后的密码                     |
| challenge     | 验证结束后的 `geetest_challenge` |
| validate      | 验证结束后的 `geetest_validate`  |
| seccode       | 验证结束后的 `geetest_seccode`   |
| token         | 获取验证参数的 `token`           |

| responseParams |                  |
| -------------- | ---------------- |
| code           | 返回值           |
| message        | 失败时会有提示   |
| data           | 成功时会有返回值 |
|                | isLogin          |
|                | goUrl            |

### 手机验证码登录

## 扫码登录
