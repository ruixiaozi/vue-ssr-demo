<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {

  //仅用于clint模式下
  mounted() {
    //路由跳转前执行
    this.$router.beforeEach((to, from, next) => {

      next();
    })
    //跳转完成执行
    this.$router.afterEach((to, from) => {
      ;

    })
  },
  metaInfo() {
    return {
      title: this.$store.state.metaInfo.title,
      meta: [
        {
          name: "keywords",
          content: this.$store.state.metaInfo.keywords
        },
        {
          name: "description",
          content: this.$store.state.metaInfo.description
        }
      ]
    };
  }
}
</script>


<style>

#app{
  position: absolute;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
