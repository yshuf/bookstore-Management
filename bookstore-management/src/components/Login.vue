<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form class="login_input" ref="loginValidateRef" :model="loginForm" :rules="loginRules">
        <!-- 用户名  prefix-icon 添加前置图标-->
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont icon-yonghu" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
         <el-input type="password" prefix-icon="iconfont icon-denglumima" v-model="loginForm.password"></el-input>
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
export default {
  name:'Login',
  data(){
    return {
      // 登录表单信息
      loginForm: {
        username:"admin",
        password:"123456",
      },
      loginRules:{
        username:[{ required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    // 重置按钮
    resetForm(){
      this.$refs.loginValidateRef.resetFields();
    },
    // 登录操作
    login(){
      this.$refs.loginValidateRef.validate(async valid=>{
        // this.$message({
        //   message: '恭喜你，这是一条成功消息',
        //   type: 'success'
        // });
        if(!valid) return;
        // 如果一个方法返回promise 用 await 和async简化
        // let resules= await this.$http.post(url,this.loginForm);

        // 将登陆成功之后的 token，保存到客户端的 sessionStorage中
        //  1.项目中出了登录之外的其他API接口，必须在登陆之后才能访问
        //  2.token 只应在当前网站打开期间生效,所以token保存在sessionStorage中
        // 通过编程式导航跳转到后台主页，路由地址为 /home
        window.sessionStorage.setItem('token','123456789');
        this.$router.push('/home');

      })
    }
  },  
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
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
.login_input{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>