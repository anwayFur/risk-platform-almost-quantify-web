<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '../node_modules/normalize.css/normalize.css'; // normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  @import './styles/stock.scss'; // 全局自定义的css样式
  @import './styles/fund.scss'; // 全局自定义的css样式
</style>
