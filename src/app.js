//创建app

import Vue from 'vue'
import App from './App.vue'
import {createRouter} from './router'
import {createStore} from './store'
import Meta from 'vue-meta'
import {sync} from 'vuex-router-sync'

import '../public/css/global.css'

Vue.use(Meta);

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
export function createApp () {
  const router = createRouter()
  const store = createStore();

  sync(store,router)

  //拦截路由，获取标题等信息
  router.beforeEach((to, from, next) => {
    store.commit({
      type: 'setMetaInfo',
      title: '测试'+to.path,
      keywords: '',
      description: ''
    })
    next();
  })

  const app = new Vue({
    store,
    router,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store }
}
