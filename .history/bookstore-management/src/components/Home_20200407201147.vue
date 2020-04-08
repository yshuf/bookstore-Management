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
          active-text-color="#409EFF"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 防止这里点击第一个菜单时，其他项菜单联动打开，这里的的 index 属性应该设置为不同的值  -->
            <template slot="title">
              <i :class="iconsList[item.id]"></i>
              <span class="menuTxt">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="subItem.id + ''"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ subItem.authName }}</span>
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
      // 左侧菜单栏
      menuList: [],
      // 菜单栏字体图标
      iconsList: {
        '100': 'icon iconfont icon-icon-',
        '101': 'icon iconfont icon-yonghuguanli',
        '104': 'icon iconfont icon-yonghu',
        '105': 'icon iconfont icon-guanli'
      }
    }
  },
  methods: {
    loginout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      //   const { data: res } = await this.$http.get('menus')
      //   if (res.meta.status !== 200)
      //     return this.$message({
      //       message: '恭喜你，这是一条成功消息',
      //       type: 'success'
      //     })
      this.menuList = [
        {
          id: 100,
          authName: '数据统计',
          path: null,
          children: []
        },
        {
          id: 101,
          authName: '账号管理',
          path: null,
          children: [
            {
              id: 102,
              authName: '用户账号',
              path: null,
              children: []
            },
            {
              id: 103,
              authName: '员工账号',
              path: null,
              children: []
            }
          ]
        },
        {
          id: 105,
          authName: '书籍管理',
          path: null,
          children: [
            {
              id: 106,
              authName: '书籍列表',
              path: null,
              children: []
            },
            {
              id: 107,
              authName: '分类参数',
              path: null,
              children: []
            },
            {
              id: 108,
              authName: '书籍分类',
              path: null,
              children: []
            }
          ]
        },
        {
          id: 104,
          authName: '个人中心',
          path: null,
          children: []
        }
      ]
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
.menuTxt {
  margin-left: 8px;
}
</style>
