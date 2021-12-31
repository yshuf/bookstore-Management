<template>
    <article class="footer">
        <section class="footer_box">
          <div class="footer_nav">
            <div class="footer_nav_left">
              <div class="system_des">
                <div class="nav_title">登录入口：</div>
                <div class="nav_list">
                  <span class="nav_list_item" @click="skipLogin(item)" v-for="(item,index) in loginList" :key="index">{{item.name}}</span>
                </div>
              </div>
              <div class="system_des">
                <div class="nav_title">导&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;航：</div>
                <div class="nav_list">
                  <span  class="nav_list_item" @click="JumpList(item)"  v-for="(item,index) in navList" :key="index">{{item.label}}</span>
                </div>
              </div>
              <div class="system_des tips">请使用1920*1080分辨率/IE9及以上版本、Chrome、Firefox和360等主流浏览器浏览本网站</div>
            </div>
            <div class="telephone">
              <div>热线电话</div>
              <div class="phone">0571-12345687</div>
            </div>
          </div>
          <div class="footer_des">
              <div class="footer_center">
                <div>
                      主办单位：书店经济与信息化局
                    <span>技术支持：杭州有数金融信息服务有限公司 </span><span>备案编号 浙ICP备17003364号-3</span>
                </div>
                <div>
                  Copyright ©2019-2021  |  浙ICP备05000054号-1  |  公安部备案号：33082502000300
                </div>
              </div>
          </div>
        </section>
    </article>
</template>

<script>
import { FOOTER_MENUS } from '@/common/commonConstant';
export default {
  name: 'AppFooter',
  data () {
    return {
      loginList: [
        {
          name: '企业/政府登录',
          type: 'ent'
        },
        {
          name: '服务机构（个人）入驻',
          type: 'serve'
        }],
      navList: FOOTER_MENUS,
      marginTop: 0
    };
  },
  watch: {
    $route: {
      handler (to, from) {
        const path = to.path.split('/').slice(1) || [];
        if (path.length > 0) {
          const currentPath = path[0] || '';
          if (currentPath !== 'home') {
            this.marginTop = '80px';
          } else {
            this.marginTop = '0';
          }
        }
      },
      immediate: true
    }
  },
  methods: {
    // 跳转对应列表
    JumpList (item) {
      // 企业问卷需要登录才能进入
      if (item.path == '/business' && !this.getLoginStatus) {
        this.$message.warning('请先登录');
        this.$router.push({ path: '/login' });
        return;
      }
      if (item && item.path) this.$router.push(item.path);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';
.footer {
  width: 100%;
  height: 245px !important;
  margin-top: 80px;
  position: relative;
  .mainbg_color(@navLabel);
  .footer_box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: #7793B0;
    font-size: 12px;
    .footer_nav {
      .widthMiddle;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 190px;
      .footer_nav_left {
        width: 80%;
        padding-top: 38px;
        .system_des {
          color: rgba(119, 147, 176, 100);
          font-size: 14px;
          display: flex;
          flex-wrap: wrap;
          &:first-child {
            margin-bottom: 7px;
          }
          &:nth-child(2n) {
            margin-top: 2px;
          }
          &:last-child{
            margin-bottom: 21px;
          }
          .nav_title {
            width: 70px;
          }
          .nav_list {
            flex: 1;
            &_item {
              height: 20px;
              margin-left: 39px;
              margin-bottom: 15px;
              display: inline-block;
              cursor: pointer;
              &:hover{
                color: rgba(255, 255, 255, 100);
              }
            }
          }
        }
        .tips {
          font-size: 12px
        }
      }
      .telephone{
        flex: 1;
        text-align: center;
        font-size: 14px;
        .phone {
          font-size: 16px;
          margin-top: 10px;
        }
      }
    }
    .footer_des {
      background-color: rgba(32, 50, 69, 1);
      border-top: 1px solid rgba(42, 64, 87, 1);
      .footer_center {
        .widthMiddle;
        margin: 0 auto;
        height: 57px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
