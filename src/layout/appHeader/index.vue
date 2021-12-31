<template>
  <section :class="isHome ? 'home_head_layout' : 'home_header'">
    <div class="home_login_box">
      <div class="login_box_top">
        <div class="login_box_item">热线电话：0571-83518901</div>
        <div class="login_box">
          <div class="login_box_item" @click="$router.push({name: 'helpCenter'})">帮助中心</div>
          <div class="login_box_item erweima">
            <i class="iconfont icon-lingquqiyefuwuma"></i>领取企业服务码
            <!-- <img src="@/assets/home/erweima.png" alt=""> -->
          </div>
          <div class="login_box_item" v-if="!getLoginStatus">
            <i class="iconfont icon-qiyezhengfudenglu"></i> 企业/政府登录
          </div>
          <el-dropdown
            v-else
            class="avatar-container right-menu-item hover-effect"
            :hide-on-click="false"
          >
            <div class="avatar-wrapper">
              <!-- <el-avatar :size="28" :src="avatar"></el-avatar> -->
              <span @click="changeCurrentRoute()">个人中心</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <span style="display:block;" @click="logout">退出系统</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div class="login_box_item">
            <i class="iconfont icon-fuwujigouruzhu"></i>服务机构（个人）入驻
          </div>
        </div>
      </div>
    </div>
    <div class="header_top">
      <div class="header_nav">
        <div class="headlogo">
          <img :src="logoUrl" alt="" @click="$router.push('/home')" />
        </div>
        <div class="search_publish">
          <div class="search_nav">
            <div class="nav_list">
              <div
                :class="['nav_li', searchIndex == index ? 'active' : '']"
                v-for="(item, index) in searchNavList"
                :key="index"
                @click="searchRouter(item, index)"
              >
                <span>{{ item.name }} </span>
              </div>
            </div>
            <div class="search_publish">
              <div class="searchInput">
                <input
                  type="text"
                  class="searchTxt input-border"
                  placeholder="请输入搜索关键词"
                  :style="{'color':keyword?'#000':'#bbc9d7', 'border-color': isHome?'#fff':'#127ae6'}"
                  v-model="keyword"
                  @keyup.enter="searchByKeyword"
                />
                <input
                  type="button"
                  class="searchBtn"
                  value="搜索"
                  @click="searchByKeyword"
                />
              </div>
            </div>
          </div>
          <div class="btn_box">
            <div class="btns appeal" @click="apply('myDemands')">
              <i class="el-icon-document"></i>发布诉求
            </div>
            <div class="btns needs" @click="apply('myNeeds')">
              <i class="el-icon-s-promotion"></i>发布需求
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header_bottom">
      <div class="bottom_list">
        <div class="nav_list">
          <div
            :class="['nav_li']"
            v-for="(item, index) in navList"
            :key="index"
            @click="(activeIndex = index), goToRouter(item)"
            @mouseenter="showChilds=true"
            @mouseleave="showChilds=false"
          >
            <span :class="activeIndex == index ? 'active' : ''">{{ item.label }} </span>
            <div class="childList" v-if="showChilds">
              <div :class="['childList_item', childName == child.name ? 'childActive' : '']" v-for="(child,i) in item.children" :key="i" @click="goToRouter(child)">{{child.label}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PORTAL_MENUS } from '@/common/commonConstant';
import { mapGetters } from 'vuex';
export default {
  name: 'AppHeader',
  data: function () {
    return {
      activeIndex: null,
      searchIndex: 0,
      navList: PORTAL_MENUS,
      keyword: null,
      showChilds: false,
      itemPath: 'dynamics',
      childName: null,
      searchNavList: [
        {
          name: '资讯',
          path: 'dynamics'
        },
        {
          name: '政策',
          path: 'entPolicy'
        },
        {
          name: '项目',
          path: 'navigation'
        },
        {
          name: '服务',
          path: 'marketServiceDetail'
        },
        {
          name: '活动',
          path: 'entCultivation'
        },
        {
          name: '部门',
          path: 'department'
        },
        {
          name: '镇街',
          path: 'StreetService'
        },
        {
          name: '园区',
          path: 'parkStyle'
        },
        {
          name: '需求',
          path: 'entNeeds'
        }
      ],
      avatar: ''
      // loginStatus:getLocalStorage('loginStatus')
    };
  },
  watch: {
    /**
     * @description 解决刷新后的activeIndex未选中问题,方法是定义的路由路径的第一个path必须和navList的name一致
     */
    $route: {
      handler (to, from) {
        const path = to.path.split('/').slice(1) || [];
        if (path.length > 0) {
          const currentPath = path[0] || '';
          this.currentPath = currentPath;
          const index = this.navList.findIndex(v => {
            if (!v.children) {
              return currentPath === v.name; // 只有一级菜单
            } else {
              this.childName = currentPath; // 二级菜单默认选中
              // 二级菜单选中，返显一级菜单样式
              let childrenName = null;
              v.children.map((item, i) => {
                if (item.name === currentPath) {
                  childrenName = item.oneLevelName;
                }
              });
              return childrenName === v.label;
            }
          });
          if (index !== -1) {
            this.activeIndex = index;
          } else {
            this.activeIndex = null;
          }
        }
      },
      immediate: true
    },
    getKeyword (val) {
      if (val === '') {
        this.keyword = '';
      }
    }
  },
  created () {},
  mounted () {
    this.$store.dispatch('app/setKeyword', '');
  },
  computed: {
    ...mapGetters(['getLoginStatus', 'name', 'getKeyword']),
    isHome () {
      return this.$route.name === 'home';
    },
    logoUrl () {
      return require('@/assets/home/logo.png');
    }
  },
  methods: {
    apply (name) {
      if (this.getLoginStatus) {
        this.$router.push({
          name
        });
      } else {
        this.$message.warning('请先登录');
        this.$router.push({ path: '/login' });
      }
    },
    changeCurrentRoute () {
      this.activeIndex = null;
      this.$router.push({
        path: '/person'
      });
    },
    logout () {
      this.$confirm('确认要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('user/logout').then(res => {
          this.$router.push({ path: '/login' });
        });
      });
    },
    goToRouter (item) {
      console.log(item);
      debugger;
      // 企业问卷需要登录才能进入
      if (item.path === '/business' && !this.getLoginStatus) {
        this.$message.warning('请先登录');
        this.$router.push({ path: '/login' });
        return;
      }
      if (item && item.path) this.$router.push(item.path);
    },
    searchRouter (item, i) {
      this.searchIndex = i;
      this.itemPath = item.path;
    },
    searchByKeyword (item, index) {
      if (this.itemPath !== this.currentPath) {
        this.$router.push({ name: this.itemPath });
      }
      this.$store.dispatch('app/setKeyword', this.keyword);
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.home_head_layout {
  // position: fixed;
  // top: 0;
  z-index: 100;
  width: 100%;
  // height: 80px;
  font-size: 18px;
  // background: #025cc2;
  .home_login_box {
    width: 100%;
    .login_box_top {
      color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1200px;
      margin: 0 auto;
      color: rgba(245, 245, 245, 0.8);
      font-size: 14px;
      .login_box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 40px;
        &_item {
          cursor: pointer;
          margin-left: 28px;
          &:hover {
            color: rgba(245, 245, 245, 1);
          }
        }
        i {
          font-size: 13px;
          margin-right: 8px;
        }
        .erweima:hover{
          position: relative;
          &:after{
            content: '';
            position: absolute;
            top: 25px;
            left: 0;
            width: 111px;
            height: 121px;
            background: url('~@/assets/home/erweima.png');
            z-index: 999;
          }
        }
      }

      .avatar-container {
        margin-left: 48px;
        .avatar-wrapper {
          position: relative;
          display: flex;
          cursor: pointer;
          border-radius: 50%;
          align-items: center;
          font-size: 14px;
          // color: #1f2326 100%;
          /deep/ .el-avatar {
            margin-right: 8px;
          }
        }
      }
      /deep/ .el-dropdown {
        color: rgba(255,255,255,100);
      }
      .login_box_item:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  .header_top {
    width: 100%;
    height: 100%;
    // background-color: rgba(255, 255, 255, 1);
    // box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }

  .header_nav {
    position: relative;
    height: 100%;
    height: 100px;
    .navli_color(#030d1d);
    .widthMiddle;
    // padding: 0 1.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    .headlogo {
      cursor: pointer;
      img {
        width: 310px;
      }
    }
    .search_publish {
      display: flex;
      justify-content: space-between;
      .search_nav {
        margin-right: 45px;
        .nav_list {
          box-sizing: border-box;
          width: 80%;
          display: flex;
          justify-content: flex-end;
          font-size: 14px;
          align-items: center;
        }
        .nav_li {
          position: relative;
          cursor: pointer;
          width: 58px;
          height: 28px;
          line-height: 28px;
          text-align: center;

          span {
            color: rgba(255, 255, 255, 0.8);

            &:hover {
              color: rgba(255, 255, 255, 1);
            }
          }
        }
        .active {
          color: #fff;
          background: #127ae6;
        }

        .searchInput {
          .searchTitle {
            color: #fff;
            padding-right: 15px;
            font-size: 18px;
          }
          /* 修改 input 中 placeholder 的默认颜色 */
          input::-webkit-input-placeholder {
            color: #bbc9d7;
          }
          input:-moz-placeholder {
            color: #bbc9d7;
          }
          input::-moz-placeholder {
            color: #bbc9d7;
          }
          input:-ms-input-placeholder {
            color: #bbc9d7;
          }
          .searchTxt {
            width: 440px;
            height: 36px;
            display: inline-block;
            // background-color: rgba(255, 255, 255, 1);
            border-top: 1px solid rgba(255, 255, 255, 1);
            border-left: 1px solid rgba(255, 255, 255, 1);
            border-bottom: 1px solid rgba(255, 255, 255, 1);
            border-right: 0;
            font-size: 14px;
            vertical-align: top;
            padding-left: 10px;
            outline: none;
          }
          .searchBtn {
            width: 80px;
            height: 36px;
            background-color: @navColor;
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            border: none;
            margin-left: -5px;
            cursor: pointer;
            &:hover {
              background-color: @navColor;
            }
          }
        }
      }
      .btn_box {
        display: flex;
        align-items: flex-end;
        .btns {
          width: 110px;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;

          > i {
            margin-right: 7px;
          }
          &.appeal {
            color: rgba(18, 122, 230, 100);
            // color: rgba(230, 169, 14, 100);
            background-color: rgba(255, 255, 255, 1);
            // border: 1px solid rgba(18, 122, 230, 1);
          }
          &.needs {
            margin-left: 20px;
            color: rgba(255, 255, 255, 1);
            background-color: rgba(18, 122, 230, 1);
            // background-color: rgba(230, 169, 14, 100);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .nav_li {
      margin-left: 35px !important;
    }
  }
  @media screen and (max-width: 1570px) {
    .header_nav {
      padding: 0 !important;
      margin: 0 auto !important;
      width: 1200px !important;
    }
  }
  .header_bottom {
    width: 100%;
    border-bottom: 1px solid rgba(94, 165, 239, 0.5);
    // background-color: $navColor;
    .bottom_list {
      margin: 0 auto;
      width: 1200px;
      .nav_list {
        box-sizing: border-box;
        display: flex;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        align-items: center;
        justify-content: flex-start;
      }
      .nav_li {
        position: relative;
        cursor: pointer;
        width: 110px;
        text-align: center;
        color: rgba(255,255,255, .8);
        font-size: 17px;
        .childList {
          position: absolute;
          width: 100%;
          font-size: 16px;
          text-align: center;
          transition: .5s all;
          opacity: 0;
          box-shadow: 0 0 20px 0 rgba(0,0,0,.1);
          &_item {
            color: rgba(31, 35, 38, 100);
            background-color: rgba(255, 255, 255, 1);
            height: 40px;
            line-height: 40px;
          }
          .childActive {
            color: rgba(18, 122, 230, 100);
            background-color: rgba(199, 238, 253, 1);
          }
          &_item:hover,&_item:active{
            color: rgba(18, 122, 230, 100);
            background-color: rgba(199, 238, 253, 1);
          }
        }
        &:hover{
          color: #fff;
          .childList{
            animation: menu .5s ease-in-out forwards;
            // animation-delay: 0.2s;
          }
        }
      }
      .active {
        line-height: 48px;
        height: 48px;
        color: #fff;
        border-bottom: 4px solid #fff;
        display: inline-block;
      }
      @keyframes menu {
        0% {
          opacity: 0;
          transform: scale(1)
        }
        100% {
          opacity: 1;
          transform: scale(1)
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
@import "../../style/mixin.less";
 @keyframes menu {
 0% {
   opacity: 0;
   transform: scale(1)
 }
 100% {
   opacity: 1;
   transform: scale(1)
 }
}
.home_header {
  position: fixed;
  top: 0;
  z-index: 300;
  width: 100%;
  font-size: 18px;
  background: #fff;
  .home_login_box {
    width: 100%;
    background-color: rgba(245, 245, 245, 1);
    box-shadow: 0px 1px 0px 0px rgba(230, 230, 230, 1);
    .login_box_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 1200px;
      margin: 0 auto;
      color: #535b64;
      font-size: 14px;
      .login_box {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 40px;
        &_item {
          cursor: pointer;
          margin-left: 28px;
        }
        i {
          font-size: 13px;
          margin-right: 8px;
        }
        .erweima:hover{
          position: relative;
          &:after{
            content: '';
            position: absolute;
            top: 25px;
            left: 0;
            width: 111px;
            height: 121px;
            background: url('~@/assets/home/erweima.png');
            z-index: 999;
          }
        }
      }
      .avatar-container {
        margin-left: 48px;
        .avatar-wrapper {
          position: relative;
          display: flex;
          cursor: pointer;
          border-radius: 50%;
          align-items: center;
          font-size: 14px;
          color: #1f2326 100%;
          /deep/ .el-avatar {
            margin-right: 8px;
          }
        }
      }
    }
  }

  .header_top {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .header_nav {
    position: relative;
    height: 100%;
    height: 100px;
    .navli_color(#030d1d);
    .widthMiddle;
    // padding: 0 1.9rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    .headlogo {
      cursor: pointer;
      img {
        width: 310px;
      }
    }
    .search_publish {
      display: flex;
      justify-content: space-between;
      .search_nav {
        margin-right: 45px;
        .nav_list {
          box-sizing: border-box;
          width: 80%;
          display: flex;
          justify-content: flex-end;
          color: #535b64;
          font-size: 14px;
          align-items: center;
        }
        .nav_li {
          position: relative;
          cursor: pointer;
          width: 58px;
          height: 28px;
          line-height: 28px;
          text-align: center;
        }
        .active {
          color: #fff;
          .navbg_color(@navColor);
        }

        .searchInput {
          .searchTitle {
            color: #fff;
            padding-right: 15px;
            font-size: 18px;
          }
          /* 修改 input 中 placeholder 的默认颜色 */
          input::-webkit-input-placeholder {
            color: #bbc9d7;
          }
          input:-moz-placeholder {
            color: #bbc9d7;
          }
          input::-moz-placeholder {
            color: #bbc9d7;
          }
          input:-ms-input-placeholder {
            color: #bbc9d7;
          }
          .searchTxt {
            width: 440px;
            height: 36px;
            display: inline-block;
            color: #bbc9d7;
            background-color: rgba(255, 255, 255, 1);
            border-top: 2px solid rgba(18, 122, 230, 1);
            border-left: 2px solid rgba(18, 122, 230, 1);
            border-bottom: 2px solid rgba(18, 122, 230, 1);
            border-right: 0;
            font-size: 14px;
            vertical-align: top;
            padding-left: 10px;
            outline: none;
          }
          .searchBtn {
            width: 80px;
            height: 36px;
            background-color: @navColor;
            color: rgba(255, 255, 255, 1);
            font-size: 14px;
            border: none;
            margin-left: -5px;
            cursor: pointer;
            &:hover {
              background-color: @navColor;
            }
          }
        }
      }
      .btn_box {
        display: flex;
        align-items: flex-end;
        .btns {
          width: 110px;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          text-align: center;
          cursor: pointer;
          &.appeal {
            color: rgba(18, 122, 230, 100);
            background-color: rgba(255, 255, 255, 1);
            border: 1px solid rgba(18, 122, 230, 1);
          }
          &.needs {
            margin-left: 20px;
            color: rgba(255, 255, 255, 100);
            background-color: rgba(18, 122, 230, 1);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1366px) {
    .nav_li {
      margin-left: 35px !important;
    }
  }
  @media screen and (max-width: 1570px) {
    .header_nav {
      padding: 0 !important;
      margin: 0 auto !important;
      width: 1200px !important;
    }
  }
  .header_bottom {
    width: 100%;
    background-color: @navColor;
    .bottom_list {
      margin: 0 auto;
      width: 1200px;
      .nav_list {
        box-sizing: border-box;
        display: flex;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        align-items: center;
        justify-content: flex-start;
      }
      .nav_li {
        position: relative;
        cursor: pointer;
        // margin-right: 42px;
        width: 110px;
        text-align: center;
        color: rgba(255,255,255, .8);
        font-size: 17px;
        &:hover {
          color: #fff;
          background-color: #328ff0;
          .childList{
            animation: menu .5s ease-in-out forwards;
            // animation-delay: 0.1s;
          }
        }
        .childList {
          position: absolute;
          width: 100%;
          font-size: 16px;
          text-align: center;
          transition: .5s all;
          opacity: 0;
          box-shadow: 0 0 20px 0 rgba(0,0,0,.1);
          &_item {
            color: rgba(31, 35, 38, 100);
            background-color: rgba(255, 255, 255, 1);
            height: 40px;
            line-height: 40px;
            margin:0;
          }
          .childActive {
            color: rgba(18, 122, 230, 100);
            background-color: rgba(199, 238, 253, 1);
          }
          &_item:hover,&_item:active {
            color: rgba(18, 122, 230, 100);
            background-color: rgba(199, 238, 253, 1);
          }
        }
      }
      .active {
        color: #fff;
        width: 100%;
        height: 50px;
        line-height: 50px;
        display: inline-block;
        .navbg_color(rgba(230, 169, 14, 1));
      }
    }
  }
}
</style>
