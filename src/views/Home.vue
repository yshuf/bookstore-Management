<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <img src alt />
        <span>XXXXXX</span>
      </div>
      <div class="right-info">
        <div @click="onclickFullScreen" title="全屏" class="pointer">
          <i :class="isFullScreen ? 'el-icon-plus' : 'el-icon-full-screen'"></i>
        </div>
        <div class="userName">你好，欢迎您！ admin</div>
        <div @click="loginout">
          <i
            class="icon iconfont icon-guangji"
            style="font-size:18px; cursor:pointer;"
          ></i>
        </div>
      </div>
      <!-- <el-button type="info" @click="loginout">退出</el-button> -->
    </el-header>
    <el-container class="left-container">
      <!-- 左侧菜单栏 -->
      <el-aside class="aside-container" :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-btn" @click="togglemenu()">
          <i class="el-icon-s-fold" v-if="!isCollapse"></i>
          <i class="el-icon-s-unfold" v-if="isCollapse"></i>
        </div>
        <!-- unique-opened 唯一展开某一菜单  collapse 开启菜单的折叠 collapse-transition 折叠动画 -->

        <el-scrollbar
          wrapStyle="overflow-x: hidden;"
          style="height:calc(100% - 24px)"
        >
          <el-menu
            class="el-menu-vertical-demo"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="#00b793"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            router
            :default-active="activePath"
          >
            <template v-for="item in menuList">
              <template v-if="item.children">
                <el-submenu :index="'/' + item.path" :key="item.id">
                  <!-- 防止这里点击第一个菜单时，其他项菜单联动打开，这里的的 index 属性应该设置为不同的值  -->
                  <template>
                    <template slot="title">
                      <i :class="iconsList[item.id]"></i>
                      <span class="menuTxt">{{ item.authName }}</span>
                    </template>
                    <el-menu-item
                      :index="'/' + subItem.path"
                      v-for="subItem in item.children"
                      :key="subItem.id"
                      @click="saveNavStatus('/' + subItem.path)"
                    >
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>{{ subItem.authName }}</span>
                      </template>
                    </el-menu-item>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item
                  :index="'/' + item.path"
                  @click="saveNavStatus('/' + item.path)"
                  :key="item.id"
                >
                  <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{ item.authName }}</span>
                  </template>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <!-- 主体部分 -->
      <el-main>
        <el-scrollbar
          wrapStyle="overflow-x: hidden;"
          viewStyle="height:100%"
          style="height:100%"
        >
          <keep-alive>
            <transition name="fade-transform" mode="out-in">
              <router-view></router-view>
            </transition>
          </keep-alive>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import screenfull from 'screenfull';
import { MenuList } from '@/common/commonConstant';
export default {
  name: 'Home',
  created () {
    this.getMenuList();
    this.activePath = window.sessionStorage.getItem('active_path');
  },
  data () {
    return {
      // 是否全屏
      isFullScreen: false,
      // 左侧菜单栏
      menuList: [],
      // 菜单栏字体图标
      iconsList: {
        99: 'icon iconfont icon-guanli',
        101: 'icon iconfont icon-yonghuguanli',
        104: 'icon iconfont icon-yonghu',
        106: 'icon iconfont icon-yonghu',
        105: 'icon iconfont icon-icon-'
      },
      isCollapse: false,
      // 默认激活菜单为空
      activePath: ''
    };
  },
  methods: {
    /**
     * @desc 全屏
     * @param {Objetc} event - 事件html对象
     */
    onclickFullScreen () {
      if (!screenfull.isEnabled) {
        this.$message({
          message: '不支持全屏',
          tyupe: 'warning'
        });
        return false;
      }
      this.isFullScreen = !this.isFullScreen;
      screenfull.toggle();
    },
    loginout () {
      window.sessionStorage.clear();
      this.$router.push('/login');
    },
    async getMenuList () {
      this.menuList = MenuList;
    },
    // 点击按钮，切换菜单的折叠与展开
    togglemenu () {
      this.isCollapse = !this.isCollapse;
    },
    // 保存当前点击菜单的路由
    saveNavStatus (url) {
      window.sessionStorage.setItem('active_path', url);
      this.activePath = url;
    }
  }
};
</script>

<style scoped lang="less">
.home-container {
  height: 100%;
  .left-container {
    margin-top: 60px;
    height: calc(100% - 60px);
    .aside-container {
      transition: 0.2s;
    }
  }
}
.el-header {
  width: 100%;
  position: fixed;
  background: rgb(48, 65, 86);
  padding: 0 18px !important;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 0;
  color: #fff;
  font-size: 20px;
  z-index: 1000;
  .right-info {
    display: flex;
    align-items: center;
    margin-right: 25px;
    .userName {
      font-size: 14px;
      margin: 0 10px;
    }
  }
}
.el-aside {
  // overflow-y: auto;
  height: 100%;
  background: rgb(48, 65, 86);
  .el-menu {
    border-right: none;
  }
  .toggle-btn {
    color: #fff;
    font-size: 18px;
    text-align: center;
    background: rgb(48, 65, 86);
    line-height: 24px;
    cursor: pointer;
    letter-spacing: 0.2px; // 字体间距
  }
}
.el-main {
  width: 100%;
  height: 100%;
  background: #eaedf1;
}
.menuTxt {
  margin-left: 10px;
}
</style>
