<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  beforeRouteEnter (to, from, next) {
    //需要首屏渲染的数据
    /* axios({
      url: "https://bird.ioliu.cn/v1?url=http://www.bing.com/HPImageArchive.aspx?format=js&idx=1&n=1"
    }).then(res => {
      to.meta.info = res.data;
      next()
    }).catch(err => {
      console.log(err);
      next()
    }) */

    next()

  },
  created() {
    //this.info = this.$route.meta.info
  },
  components: {
    HelloWorld
  }
}
</script>
