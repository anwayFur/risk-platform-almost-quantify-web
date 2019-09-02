<template>
  <div class="app-Navbar-back">
    <div class="app-Navbar">
      <el-row class="el-row-style" mode="horizontal" :gutter="24">
        <!--logo-->
        <el-col :xs="3" :sm="3" :md="3" :lg="3" class="logo_style">
          <a href="/">
            <img src="../../assets/mainPage/LOGO_1.png" style="width: 100%;height: 12%;">
          </a>
        </el-col>

        <!--菜单-->
        <el-col :xs="11" :sm="11" :md="11" :lg="11">
          <NavbarItem :routes="routes"/>
        </el-col>

        <!--搜索框 只在不是在首页的时候显示-->
        <el-col :xs="6" :sm="6" :md="6" :lg="6" class="search-style">
          <Searchbar v-if="$route.path !== '/index'" searchType="navbar"/>
        </el-col>

        <!--用户区-->
        <el-col :xs="4" :sm="4" :md="4" :lg="4" class="user-style">

          <div v-if="is_login">
            <el-dropdown trigger="click">
              <div style="color: white">
                <span>{{user_name}}</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="signOut" style="display:block;">退出登录</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else>
            <el-button class="button_login" @click="login()">登录</el-button>
            <el-button class="button_register" @click="register()">注册</el-button>
          </div>

          <loginDialog ref="login" @register-method="register()" @login-succ-method="loginSuccess"/>
          <registerDialog ref="register" @login-method="login()" @login-succ-method="loginSuccess"/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script type="es6">
  import Searchbar from './Searchbar'
  import NavbarItem from './NavbarItem'
  import loginDialog from '../user/login.vue'
  import registerDialog from '../user/register.vue'
  import store from '@/store'
  import {logout} from '@/api/user'


  export default {
    name:'navbar',
    data() {
      return {
        is_login: true
      };
    },
    components: {
      NavbarItem,
      Searchbar,
      loginDialog,
      registerDialog,
    },
    mounted() {
      // 判断是否有用户名
      this.UpdateUserName()
    },
    computed: {
      routes: function () {
        return this.$router.options.routes
      },
      user_name: function () {
        return this.$store.getters.name
      }
    },
    watch: {
      user_name: function(a, b) {
        this.is_login = (a !== null);
      }
    },
    methods: {
      login() {
        this.$refs.login.showLoginDialog();
      },
      register() {
        this.$refs.register.showRegisterDialog();
      },
      loginSuccess(msg) {
        // 成功提示
        this.$message({
          message:msg,
          type:'success',
          duration: 3 * 1000
        });
        this.UpdateUserName()
      },
      UpdateUserName() {
        // 拉取用户信息
        store.dispatch('UpdateUserName')
      },
      signOut() {
        logout().then(response=>{
          // 登出成功
          if (response.stat){
            // 成功提示
            this.$message({
              message:response.msg,
              type:'success',
              duration: 3 * 1000
            });
          }
          this.UpdateUserName()
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .app-Navbar-back {
    width: 100%;
    margin: 0 auto;
    background-color: rgb(50, 65, 87);
  }

  .app-Navbar {
    width: 1200px;
    margin: 0 auto;
    background-color: rgb(50, 65, 87);
  }

  .el-row-style {
    width: 100%;
    height: 60px;
    background: #324157;
    z-index: 99;
    margin-right: 0 !important;
    margin-left: 0 !important;
    color: #FFF;
    border-bottom: 1px solid #1F2D3D;

    .el-menu--horizontal {
      border-bottom: solid 0 #e6e6e6;
    }

    .logo_style {
      text-align: center;
      padding-top: 10px;
    }

    .search-style {
      padding-top: 10px;
    }

    .user-style {
      text-align: right;
      padding-top: 20px;
      font-size: 18px;

      .button_login {
        margin-top: -8px;
        padding: 10px 20px;
        float: left;
      }
      .button_register {
        margin-top: -8px;
        padding: 10px 20px;
        float: left;
      }
    }
  }


</style>

