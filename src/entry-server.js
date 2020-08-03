//渲染首屏
import { createApp } from './app'

//这个让node服务器调用
export default context => {

  return new Promise((resolve,reject) => {
    //创建app
    const { app,router } = createApp();

    const meta = app.$meta() // 这行

    context.meta = meta;

    //进入对应页面（可能存在异步）
    router.push(context.url);

    //当准备好的时候，进行处理
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      // Promise 应该 resolve 应用程序实例，以便它可以渲染
      resolve(app)
    },reject)

  })
}
