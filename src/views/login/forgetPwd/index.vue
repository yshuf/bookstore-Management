<template>
  <div class="logon-box">
    <div class="center-box">
      <div class="app-logo" @click="$router.push({path: '/login'})">
        <!-- <img src="~@/assets/login/logo_black.png" alt=""> -->
        <div class="sperate"></div>
         <div class="logo_title">{{logoTitle}}</div>
      </div>
    </div>
    <div class="content">
        <div class="header">
          <div><i class="iconfont icon-yonghuming"></i> 找回密码</div>
          <div class="backBtn" @click="$router.push({path: '/login'})">返回登录</div>
        </div>
        <div class="step-box">
          <div class="steps-header">
            <el-steps :space="300" :active="active" align-center>
              <el-step title="输入手机号">
              </el-step>
              <el-step title="确认密码">
              </el-step>
              <el-step title="完成"></el-step>
          </el-steps>
          </div>
          <div class="steps-content" >
              <div v-if="active===1">
                <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px">
                  <el-form-item label="手机号码：" prop="mobile">
                    <el-input placeholder="请输入手机号码" v-model="userForm.mobile"></el-input>
                  </el-form-item>
                  <el-form-item prop="smsCode" label="验证码：">
                    <el-input v-model="userForm.smsCode" placeholder="请输入验证码" clearable @keyup.enter.native="handleLogin">
                      <template slot="append">
                        <span class="getCode" :style="cursorStyle" @click="getCode">{{codeMsg}}</span>
                      </template>
                    </el-input>
                  </el-form-item>
                </el-form>
                <div class="steps-btn">
                  <el-button style="margin-top: 12px;" @click="next('userForm')">下一步</el-button>
                </div>
              </div>
              <div v-if="active===2">
                <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordForm" label-width="100px">
                  <el-form-item label="新密码：" prop="password">
                    <el-input placeholder="请输入密码" type="password" v-model="passwordForm.password" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码：" prop="passwordAgain">
                    <el-input placeholder="请确认密码" type="password" v-model="passwordForm.passwordAgain" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div class="steps-btn">
                  <el-button style="margin-top: 12px;" @click="next('passwordForm')">确定</el-button>
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { isPhone, checkPhone, checkPassword } from '@/utils';
// import { getPwdSmsCodeReq, verifySmsCodeReq, modifyPassword } from '@api/organization/person';
import md5 from 'js-md5';
export default {
  name: 'ForgetPwd',
  data () {
    var validatePass = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('请输入密码'));
      } else if (!checkPassword(value)) {
        callback(new Error('8-16位大小写字母、数字、特殊字符组成!'));
      } else {
        if (this.passwordForm.passwordAgain !== '') {
          this.$refs.passwordForm.validateField('passwordAgain');
        }
        callback();
      }
    };
    var validatePassAgain = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.password) {
        callback(new Error('两次输入密码不一致，请重新输入!'));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号'));
      } else if (!(/^1[345789]\d{9}$/).test(value)) {
        callback(new Error('不是合法的手机号'));
      } else {
        callback();
      }
    };
    return {
      logoTitle: '找回密码页面',
      active: 1,
      type: 1,
      codeMsg: '获取验证码',
      cursorStyle: {
        cursor: 'pointer'
        // background: "#1B68FD",
        // color: "#fff"
      },
      userForm: {
        mobile: '',
        smsCode: ''
      },
      passwordForm: {
        password: '',
        passwordAgain: ''
      },
      rules: {
        mobile: [
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        smsCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        passwordAgain: [
          { required: true, validator: validatePassAgain, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    getCode () {
      // 获取验证码
      const mobile = this.userForm.mobile;
      if (mobile == '') {
        this.$refs.userForm.validateField('mobile');
        return;
      } else if (!checkPhone(mobile)) {
        this.$refs.userForm.validateField('mobile');
        return;
      }
      this.$refs.userForm.validateField('mobile', (valid) => {
        if (!valid) {
          if (this.cursorStyle.cursor === 'pointer') {
            this.getCodeReq();
          }
        }
      });
    },
    // 发送短信验证码
    getCodeReq () {
      getPwdSmsCodeReq({ mobile: this.userForm.mobile, type: this.type }).then(response => {
        if (response.code === '000000') {
          this.cursorStyle = {
            cursor: 'not-allowed'
          // background: "#DCDFE6",
          // color: "#999"
          };
          this.setDelay(60);
          this.$message({ type: 'success', message: '发送成功' });
        } else {
          this.$message({ type: 'error', message: response.data });
        }
      });
    },
    setDelay (time) {
      // 倒计时
      this.codeMsg = '请' + time + '秒后再试';
      const that = this;
      setTimeout(function () {
        time--;
        if (time > 0) {
          that.setDelay(time);
        } else {
          that.cursorStyle = {
            cursor: 'pointer'
            // background: "#1B68FD",
            // color: "#fff"
          };
          that.codeMsg = '获取验证码';
        }
      }, 1000);
    },
    // 登录页忘记密码-校验手机验证码
    verifySmsCodeReq () {
      const params = {
        mobile: this.userForm.mobile,
        type: this.type,
        smsCode: this.userForm.smsCode
      };
      verifySmsCodeReq(params).then((res) => {
        if (res.code === '000000') {
          this.active = 2;
        } else {
          this.$message({ type: 'error', message: res.data });
        }
      });
    },
    // 确认修改密码
    confirmPassword () {
      const params = {
        mobile: this.userForm.mobile,
        type: this.type,
        password: md5(this.passwordForm.password),
        passwordAgain: md5(this.passwordForm.passwordAgain)
      };
      modifyPassword(params).then((res) => {
        if (res.code === '000000') {
          this.$message({ type: 'success', message: '修改密码成功' });
          this.$router.push({ path: '/login?from=gov' });
        } else {
          this.$message({ type: 'error', message: res.data });
        }
      });
    },
    next (formName) {
      this.$refs[formName].validate((vaild) => {
        if (vaild) {
          if (formName == 'passwordForm') {
            this.confirmPassword();
          } else {
            this.verifySmsCodeReq();
          }
        }
      });
    }
  }

};
</script>

<style lang="less" scoped>
// @import "~@styles/variables.scss";
.logon-box {
  width: 100%;
  min-height: 100%;
  background: #f5f5f5;
  .center-box {
    width: 100%;
    background: rgba(255,255,255,1);
    .app-logo {
      width: 1200px;
      height: 60px;
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 0 auto;
      box-sizing: border-box;

      img {
        width: 310px;
      }
      font-size: 14px;
      .sperate {
        height: 60%;
        width: 1px;
        margin: 0 30px;
        background: rgba(151, 151, 151, .6);
      }
      .logo_title {
        color: rgba(31, 35, 38, 100);
        font-size: 18px;
      }
    }
  }
  .content {
      width: 1200px;
      margin: 0 auto;
      margin-top: 48px;
      min-height: 650px;
      background: rgba(255,255,255,1);
      .header {
        height: 54px;
        line-height: 54px;
        background: #127AE6;
        color: #fff;
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        .backBtn {
          cursor: pointer;
        }
      }
      .step-box {
        margin-top: 60px;
        width: 100%;
        border-top: 1px dashed #e6e6e6;
        padding-bottom: 60px;
        .steps-header {
          width: 600px;
          margin: 10px auto;
        }
      }
      .steps-content {
        border-top: 1px dashed #e6e6e6;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        .el-form {
          width: 450px;
          margin: 60px auto;
        }
      }
      .steps-btn {
        text-align: center;
        margin-top: 30px;
      }
      .iconfont {
        margin-right: 10px;
      }
    }

}
</style>
