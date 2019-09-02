<template>
  <div>

      <el-menu :default-active="$route.path"
               mode="horizontal"
               background-color="#324157"
               text-color="#bfcbd9"
               active-text-color="#20a0ff"
               unique-opened router
      >
        <template v-for="item in routes">
          <el-menu-item v-if="!item.hidden&&item.noDropdown&&item.children.length>0"
                        :to="item.path+'/'+item.children[0].path" :index="item.path+'/'+item.children[0].path">
              <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
          </el-menu-item>
          <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
            <template slot="title">
              <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
            </template>
            <template v-for="child in item.children" v-if='!child.hidden'>
              <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0' :routes='[child]'> </sidebar-item>
              <router-link v-else class="menu-indent" :to="item.path+'/'+child.path">
                <el-menu-item :index="item.path+'/'+child.path">
                  {{child.name}}
                </el-menu-item>
              </router-link>
            </template>
          </el-submenu>
        </template>
      </el-menu>

  </div>
</template>

<script>
export default {
  name: 'NavbarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}

</style>

