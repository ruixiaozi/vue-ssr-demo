import Vue from 'vue'
import VueRouter from 'vue-router'

//解决点击重复路由时报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  }
]


export function createRouter(){
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}
