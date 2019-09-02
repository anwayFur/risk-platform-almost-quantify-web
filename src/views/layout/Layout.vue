<template>
  <div>
    <!--页面顶部菜单栏-->
    <navbar></navbar>
    <!--页面-->
    <app-main></app-main>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import AppMain from './AppMain'

  export default {
    name: 'layout',
    components: {
      Navbar,
      AppMain
    },
    computed: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
