<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src alt />
        <span>书店后台管理系统</span>
      </div>
      <div style="margin-right:25px">
        <i class="icon iconfont icon-guangji"></i>
      </div>
      <!-- <el-button type="info" @click="loginout">退出</el-button> -->
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="togglemenu()">
          <i class="el-icon-s-fold" v-if="!isCollapse"></i>
          <i class="el-icon-s-unfold" v-if="isCollapse"></i>
        </div>
        <!-- unique-opened 唯一展开某一菜单  collapse 开启菜单的折叠 collapse-transition 折叠动画 -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#000"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <el-submenu :index="'/'+item.path" v-for="item in menuList" :key="item.id">
            <!-- 防止这里点击第一个菜单时，其他项菜单联动打开，这里的的 index 属性应该设置为不同的值  -->
            <template slot="title">
              <i :class="iconsList[item.id]"></i>
              <span class="menuTxt">{{ item.authName }}</span>
            </template>
            <el-menu-item
              :index="'/'+subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavStatus('/'+subItem.path)"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ subItem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体部分 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  created () {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('active_path');
  },
  data () {
    return {
      // 左侧菜单栏
      menuList: [],
      // 菜单栏字体图标
      iconsList: {
        '100': 'icon iconfont icon-guanli',
        '101': 'icon iconfont icon-yonghuguanli',
        '104': 'icon iconfont icon-yonghu',
        '105': 'icon iconfont icon-icon-'
      },
      isCollapse: false,
      // 默认激活菜单为空
      activePath: ''
    }
  },
  methods: {
    loginout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList () {
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
          path: 'overview',
          children: []
        },
        {
          id: 101,
          authName: '账号管理',
          path: "userAccount",
          children: [
            {
              id: 102,
              authName: '用户账号',
              path: 'userAccount',
              children: []
            },
            {
              id: 103,
              authName: '员工账号',
              path: 'adminAccount',
              children: []
            }
          ]
        },
        {
          id: 105,
          authName: '书籍管理',
          path: "bookManagement",
          children: [
            {
              id: 106,
              authName: '书籍列表',
              path: "bookManagement",
              children: []
            },
            {
              id: 107,
              authName: '分类参数',
              path: 'sortParams',
              children: []
            },
            {
              id: 108,
              authName: '书籍分类',
              path: 'booksSort',
              children: []
            }
          ]
        },
        {
          id: 104,
          authName: '个人中心',
          path: "userCenter",
          children: []
        }
      ]
    },
    // 点击按钮，切换菜单的折叠与展开
    togglemenu () {
      this.isCollapse = !this.isCollapse
    },
    // 保存当前点击菜单的路由
    saveNavStatus (url) {
      window.sessionStorage.setItem('active_path', url);
      this.activePath = url;
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
}
.el-aside {
  background: #000;
  .el-menu {
    border-right: none;
  }
  .toggle-btn {
    color: #fff;
    font-size: 18px;
    text-align: center;
    background: #090909;
    line-height: 24px;
    cursor: pointer;
    letter-spacing: 0.2px; // 字体间距
  }
}
.el-main {
  background: #eaedf1;
}
.menuTxt {
  margin-left: 10px;
}
</style>
