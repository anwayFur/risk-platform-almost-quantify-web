<template>
  <div>
    <el-dialog :close-on-click-modal="false" title="用户注册" :visible.sync="registerDialog" class="registerDialog"
               append-to-body center>
      <el-form :label-position="labelPos" label-width="100px" :model="registerForm" :rules="registerRules"
               ref="registerForm">

        <el-form-item label="手机号码" prop="phoneNumber">
          <el-input name="phoneNumber" type="text" v-model="registerForm.phoneNumber" autoComplete="on"
                    placeholder="请输入手机号">
          </el-input>
        </el-form-item>

        <el-form-item prop="password" label="密码">
          <el-input name="password" type="password" v-model="registerForm.password" autoComplete="on"
                    placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="checkPwd" label="确认密码">
          <el-input name="checkPwd" type="password" v-model="registerForm.checkPwd" autoComplete="on"
                    placeholder="请确认密码"></el-input>
        </el-form-item>

        <div>
          <el-button type="primary" style="width:100%;" @click.native.prevent="verifyBeforeCaptcha"
                     :loading="captchaButtonLoading">
            <span v-show="sms_interval_show">获取验证码</span>
            <span v-show="!sms_interval_show" class="count">验证码已发送，{{sms_interval_count}}秒后可重新获取。</span>
          </el-button>
        </div>
        <p></p>

        <el-form-item prop="captcha" v-if="!sms_interval_show" label="输入验证码">
          <el-input name="captcha" type="text" v-model="registerForm.captcha" autoComplete="on"
                    placeholder="请输入短信验证码"></el-input>
        </el-form-item>

        <div v-if="!sms_interval_show">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleRegister">
            立即注册
          </el-button>
        </div>

        <div style="text-align: left">
          <el-button type="text" @click='login'>已有账号？返回登录页面。</el-button>
        </div>

      </el-form>
    </el-dialog>

    <el-dialog title="输入图片中的验证码" :visible.sync="verifyDialogVisible" class="verifyDialog" :append-to-body="true">
      <el-form autoComplete="on" :model="verifyDialogForm" :rules="verifyDialogRules" ref="verifyDialogForm"
               label-position="left"
               label-width="0px">
        <el-row>
          <el-col :span="12">
            <div>
              <img :src='verifyDialogForm.verifyImg' @click="refreshVerifyImg">
            </div>
          </el-col>
          <el-col :span="12">
            <div style="padding-top: 20px">
              <el-form-item prop="verifyImgCode" label="" :error="verifyImgCodeErrorMsg">
                <el-input name="verifyImgCode" type="text" v-model="verifyDialogForm.verifyImgCode"
                          autoComplete="on" placeholder="请输入图片验证码"></el-input>
              </el-form-item>
            </div>
          </el-col>
        </el-row>

        <div style="text-align: right">
          <el-button type="primary" @click="requestSendCaptcha">确 定</el-button>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script type="es6">
  import {isvalidPassword, isvalidPhoneNumber} from '@/utils/validate'
  import {verifyPhoneNumber, getVerifyImageId, requestSendVerifySms, register} from '@/api/user'
  import md5 from 'js-md5';

  export default {
    name: 'register',
    data() {
      /* 验证手机号码是否正确 */
      const validatePhoneNumber = (rule, value, cb) => {

        if (value === '') {
          cb(new Error('请输入手机号'))
        } else if (!isvalidPhoneNumber(value)) {
          cb(new Error('请输入正确手机号'))
        } else {
          verifyPhoneNumber(this.registerForm.phoneNumber).then(response => {
            if (response.stat) {
              cb()
            }
            else {
              cb(new Error(response.msg))
            }
          });
        }
      };

      const validatePwd = (rule, value, cb) => {
        if (value === '') {
          cb(new Error('请输入密码'))
        } else if (!isvalidPassword(value)) {
          cb(new Error('请输入6-20个非空白字符'))
        } else {
          if (this.registerForm.checkPwd !== '') {
            this.$refs.registerForm.validateField('checkPwd')
          }
          cb()
        }
      };

      const validateCheckPwd = (rule, value, cb) => {
        if (value === '') {
          cb(new Error('请再次输入密码'))
        } else if (value !== this.registerForm.password) {
          cb(new Error('两次输入密码不一致!'))
        } else {
          cb()
        }
      };

      const validateCaptcha = (rule, value, cb) => {
        value = value.replace(/[^0-9]/ig, "");
        const pattern = /^[\1-9]{4}$/g;
        if (value === '') {
          cb(new Error('请输入短信验证码'))
        } else if (!pattern.test(value)) {
          cb(new Error('短信验证码格式错误'))
        } else {
          cb()
        }
      };

      const validateVerifyImgCode = (rule, value, cb) => {
        const pattern = /^[\w\1-9]{4}$/g;
        if (value === '' || value === null) {
          cb(new Error('请输入图片校验码'))
        } else if (!pattern.test(value)) {
          cb(new Error('图片校验码格式错误'))
        } else {
          this.verifyImgCodeErrorMsg='';
          cb()
        }
      };

      return {

        labelPos: 'left',

        // 短信时间计时器功能参数
        sms_interval_show: true,
        sms_interval_count: '',
        sms_interval_timer: null,

        // 注册表单
        registerForm: {
          phoneNumber: '',
          password: '',
          checkPwd: '',
          captcha: ''
        },
        // 验证
        registerRules: {
          password: [{required: true, trigger: 'blur', validator: validatePwd}],
          checkPwd: [{required: true, trigger: 'blur', validator: validateCheckPwd}],
          phoneNumber: [{required: true, trigger: 'blur', validator: validatePhoneNumber}],
          captcha: [{required: true, trigger: 'blur', validator: validateCaptcha}]
        },
        // 获取验证码按钮
        captchaButtonLoading: false,
        // 是否显示发送短信验证框
        verifyDialogVisible: false,
        // 发送短信验证码表单
        verifyDialogForm: {
          verifyImgId: '',
          verifyImg: '',
          verifyImgCode: ''
        },
        // 发送短信验证码表单验证
        verifyDialogRules: {
          verifyImgCode: [{required: true, trigger: 'blur', validator: validateVerifyImgCode}],
        },
        verifyImgCodeErrorMsg:'',

        registerDialog: false,
      }
    },
    methods: {
      login() {
        this.registerDialog = false;
        this.$emit('login-method')
      },
      showRegisterDialog: function () {
        this.registerDialog = true
      },
      // 在请求发送验证码之前进行图片验证，校验输入项，获取验证码图片，打开验证码窗口
      verifyBeforeCaptcha() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            this.refreshVerifyImg();
            this.verifyDialogVisible = true
          }
        })
      },
      // 刷新验证码图片
      refreshVerifyImg() {
        getVerifyImageId().then(response => {
          this.verifyDialogForm.verifyImgId = response;
          this.verifyDialogForm.verifyImg =
            'https://hs-1251509664.cos.ap-beijing.myqcloud.com/quantify/verifyImage/' + this.verifyDialogForm.verifyImgId + '.jpg';
          //'http://monkeysjourney.xyz:9601/verifyImage/' + this.verifyDialogForm.verifyImgId + '.jpg'
          this.verifyDialogForm.verifyImgCode = '';
        });
      },

      // 请求发送手机验证码
      requestSendCaptcha() {
        this.$refs.verifyDialogForm.validate(valid => {
          if (valid) {
            // 请求发送验证码，传送的参数包括 手机号、图片id、用户输入的图片验证码
            requestSendVerifySms(this.registerForm.phoneNumber,
              this.verifyDialogForm.verifyImgId,
              this.verifyDialogForm.verifyImgCode).then(response => {
              // 如果发送成功
              if (response.stat) {
                // 关闭验证图片框
                this.verifyDialogForm.verifyImgCode = '';
                this.verifyDialogVisible = false;
                // 显示短信验证码计时
                this.captchaButtonLoading = true;
                //短信校验码计时器
                this.getCode()
              }
              else {
                this.verifyImgCodeErrorMsg=response.msg;
                this.refreshVerifyImg()
              }
            })
          }
        })
      },

      getCode() {
        const TIME_COUNT = 60;
        if (!this.sms_interval_timer) {
          this.sms_interval_count = TIME_COUNT;
          this.sms_interval_show = false;
          this.sms_interval_timer = setInterval(() => {
            if (this.sms_interval_count > 0 && this.sms_interval_count <= TIME_COUNT) {
              this.sms_interval_count--;
            } else {
              this.sms_interval_show = true;
              clearInterval(this.sms_interval_timer);
              this.sms_interval_timer = null;
              this.captchaButtonLoading = false
            }
          }, 1000)
        }
      },

      // 注册
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            register(this.registerForm.phoneNumber,
              md5(this.registerForm.phoneNumber + this.registerForm.password),
              this.registerForm.captcha).then(response => {
              // 如果注册成功
              if (response.stat) {
                // 关闭注册框
                this.registerForm.phoneNumber = '';
                this.registerForm.password = '';
                this.registerForm.checkPwd = '';
                this.registerForm.captcha = '';
                this.registerDialog = false;
                // 登陆成功信号
                this.$emit('login-succ-method', response.msg)

              } else {
                this.$message({
                  message: response.msg,
                  type: 'error',
                  duration: 3 * 1000
                });
              }
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../../src/styles/mixin.scss";

</style>
