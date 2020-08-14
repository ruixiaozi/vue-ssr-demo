import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'

//点击路由时加一个签名查询字符串
//捕获错误信息
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {

  //点击路由时加一个签名查询字符串
  /*
  if(typeof(location) == "string")
    location = {path: location,query:{}}

  location.query.__sign = md5(new Date().getTime().toString());
  */

  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  }
]


export function createRouter(){
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })
}
