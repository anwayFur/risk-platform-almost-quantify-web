<template>
  <el-dialog title="用户登录"
             :visible.sync="loginDialog"
             :close-on-click-modal="false"
             class="loginDialog"
             append-to-body center>
    <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm">
      <el-form-item prop="phoneNumber" label="手机号码">
        <el-input name="phoneNumber" type="text"
                  v-model="loginForm.phoneNumber"
                  autoComplete="on" placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input name="password" type="password" v-model="loginForm.password"
                  autoComplete="on"
                  placeholder="密码"
                  @keyup.enter.native="handleLogin"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading"
                   @click.native.prevent="handleLogin">
          登 录
        </el-button>
      </el-form-item>

      <el-form-item style="text-align: right">
        <!--<el-button type="text">忘记密码</el-button>-->
        <el-button type="text" @click='register'>注册账号</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script type="es6">
  import {isvalidPassword, isvalidPhoneNumber} from '@/utils/validate'
  import {login} from '@/api/user'
  import md5 from 'js-md5';

  export default {
    name: 'login',
    data() {
      /* 验证手机号码是否正确 */
      const validatePhoneNumber = (rule, value, cb) => {
        if (value === '') {
          cb(new Error('请输入手机号'))
        } else if (!isvalidPhoneNumber(value)) {
          cb(new Error('请输入正确手机号'))
        } else {
          cb()
        }
      };
      /* 验证密码格式 */
      const validatePass = (rule, value, callback) => {
        if (!isvalidPassword(value)) {
          callback(new Error('密码格式错误，必须是6-20位的非空白字符'))
        } else {
          callback()
        }
      };
      return {
        loginForm: {
          phoneNumber: '',
          password: ''
        },
        loginRules: {
          phoneNumber: [{required: true, trigger: 'blur', validator: validatePhoneNumber}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        loginDialog: false,
      }
    },
    methods: {
      register() {
        this.loginDialog = false;
        this.$emit('register-method')
      },
      showLoginDialog: function () {
        this.loginDialog = true
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true; // 登陆按钮loading
            login(this.loginForm.phoneNumber, md5(this.loginForm.phoneNumber + this.loginForm.password))
              .then(response => {
                if (response.stat){
                  // 登陆成功 清空输入框 关闭登陆框 发送成功信号
                  this.loginForm.phoneNumber = '';
                  this.loginForm.password = '';
                  this.loading = false;
                  this.loginDialog = false;
                  this.$emit('login-succ-method', response.msg)
                } else {
                  // 登陆失败
                  this.loading = false;
                  this.$message({
                    message:response.msg,
                    type:'error',
                    duration: 3 * 1000
                  })
                }
              }).catch(() => {
              this.loading = false
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";

</style>
