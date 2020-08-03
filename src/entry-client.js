//挂载，激活APP
import { createApp } from './app'

const { app, router } = createApp()

// 挂载到静态HTML上
router.onReady(() => {
  app.$mount('#app')
})