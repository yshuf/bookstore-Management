<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="" alt="" />
        <span>书店后台管理系统</span>
      </div>
      <el-button type="info" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#000"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item index="1-4-1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template></el-menu-item
            >
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created() {
    this.getMenuList()
  },
  data() {
    return {
      meunList: {
        data: {
          id: 101,
          auth: '商品管理',
          path: null,
          children: [
            {
              id: 104,
              auth: '商品列表',
              path: null,
              children: []
            }
          ]
        }
      }
    }
  },
  methods: {
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
}
.el-header {
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  // >div {

  // }
}
.el-aside {
  background: #000;
}
.el-main {
  background: #eaedf1;
}
</style>
