<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../../assets/images/loginUser.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form
        class="login_input"
        ref="loginValidateRef"
        :model="loginForm"
        :rules="loginRules"
      >
        <!-- 用户名  prefix-icon 添加前置图标-->
        <el-form-item prop="username">
          <el-input
            placeholder="用户名/手机号"
            prefix-icon="iconfont icon-yonghu"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            placeholder="密码"
            type="password"
            prefix-icon="iconfont icon-denglumima"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <base-verify></base-verify>
        <el-form-item class="el-form-item-pwdOperate">
          <div class="flex-between">
            <el-checkbox v-model="isCheck">记住密码</el-checkbox>
            <div class="flx">
              <el-button type="text" @click="$router.push({path:'/login/forgetPwd'})">忘记密码？</el-button>
            </div>
          </div>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { fhwfroms, fhwton } from '@/utils/crypto';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils/storage';
import BaseVerify from '@/components/common/BaseVerify';
export default {
  name: 'AppLogin',
  components: { BaseVerify },
  data () {
    return {
      // 登录表单信息
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      slideVerify: false, // 滑动验证
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      },
      UK: 'fhwgrji5huh',
      SPLIT_STR: 'c3e3f79853lfnh43ge',
      isCheck: false
    };
  },
  mounted () {
    //  记住密码
    this._getPsd();
  },
  methods: {
    // 重置按钮
    resetForm () {
      this.$refs.loginValidateRef.resetFields();
    },
    /**
     * @description 记住密码的信息保存到本地
     * @author xiaomeng
     */
    _remPsd (username, password, type) {
      // 如果没有选中记住密码，移除本地的 UK
      if (!type) return removeLocalStorage(this.UK);
      setLocalStorage(
        this.UK,
        fhwton(username) + this.SPLIT_STR + fhwton(password)
      );
    },
    /**
     * @description 获取记住密码的信息
     */
    _getPsd () {
      const str = getLocalStorage(this.UK) || '';
      const u = str.split(this.SPLIT_STR)[0];
      const p = str.split(this.SPLIT_STR)[1];
      if (u && p) {
        this.loginForm.username = fhwfroms(u);
        this.loginForm.password = fhwfroms(p);
        this.isCheck = true;
      }
    },
    // 登录操作
    login () {
      this.$refs.loginValidateRef.validate(async valid => {
        // this.$message({
        //   message: '恭喜你，这是一条成功消息',
        //   type: 'success'
        // });
        if (!valid) return;
        // 记住密码 (当点击去登录的时候，去记住密码)
        this._remPsd(
          this.loginForm.username,
          this.loginForm.password,
          this.isCheck
        );
        // 如果一个方法返回promise 用 await 和async简化
        // let resules= await this.$http.post(url,this.loginForm);

        // 将登陆成功之后的 token，保存到客户端的 sessionStorage中
        //  1.项目中出了登录之外的其他API接口，必须在登陆之后才能访问
        //  2.token 只应在当前网站打开期间生效,所以token保存在sessionStorage中
        // 通过编程式导航跳转到后台主页，路由地址为 /home
        window.sessionStorage.setItem('token', '123456789');
        this.$router.push('/home');
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  // background: url('../assets/images/index.png') no-repeat;
  // background-size: 100% 100%;
}
.login_box {
  width: 450px;
  height: 380px;
  border-radius: 3px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}
.login_input {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  .el-form-item-pwdOperate {
      margin: 8px 0 8px 0;
      // & >>> .el-form-item__content {
      //   .el-checkbox__label {
      //     color: rgba(83, 91, 100, 100) !important;
      //   }
      //   .el-checkbox__inner {
      //     background-color: rgba(245, 245, 245, 1)!important;
      //   }
      //   .el-checkbox.is-checked {
      //     .el-checkbox__label {
      //       color: #0080ff !important;
      //     }
      //     .el-checkbox__inner {
      //     background-color: #0080ff!important;
      //   }
      //   }
      // }
      .flex-between {
        display: flex;
        justify-content: space-between;
        .flx {
          display: flex;
          align-items: center;
          .spe {
            color: rgba(212, 220, 233, 0.85);
          }
          .reg {
            margin-left: 10px !important;
          }
        }
      }
    }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
