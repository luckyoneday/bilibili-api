# bilibili nodejs api

灵感来自 [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)，参考 [bilibili-API-collect](https://github.com/SocialSisterYi/bilibili-API-collect)

## 当前功能

<details>
<summary> 1、 无登录态首页列表</summary>

| url    | `/visit/getList` |
| ------ | ---------------- |
| method | `get`            |

| requestParams |                      |
| ------------- | -------------------- |
| platform      | `"mobile"` / `"web"` |

返回参数自己看吧。

</details>

<details>
<summary> 2、 登录</summary>

[登录相关接口和步骤](./notes/login.md)

</details>

<details>
<summary> 3、 用户信息</summary>

[用户信息](./notes/userinfo.md)

</details>
