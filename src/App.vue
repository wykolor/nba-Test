<template>
  <div id="app">
    <!-- 是否使用缓存 -->
    <keep-alive exclude="homeProduct">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
// 暴露组件
export default {
  name: "App",
  components: {}
};
</script>

<style>
@import "./less/reset.less";
@import "./assets/icon/iconfont.css";
</style>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #5b5859;
  font-size: 1rem;
  min-height: 100%;
}
</style>
