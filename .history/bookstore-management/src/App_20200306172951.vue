<template>
  <div id="app">
       <el-container>
            <el-aside width="200px">侧边栏</el-aside>
            <el-container>
              <el-header>头部</el-header>
              <el-main>主体部分</el-main>
              <el-footer>底部</el-footer>
            </el-container>
        </el-container>
    <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/about">登录</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="less">
body,html {
    margin: 0;
    padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
