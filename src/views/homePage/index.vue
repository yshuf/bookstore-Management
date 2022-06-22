<template>
  <div class="home">
    <div class="home_center">
      <banner></banner>
      <base-tree-anchor
        :list="NavList"
        containerId="anchorContent"
        treeItemClass="section-item"
        ref="anchorTree"
        @activeAnchor="getActiveAnchor"
        anchorPostion="start"
        anchorBehavior="auto"
        :showList="false"
      >
      </base-tree-anchor>
       <!-- <div class="header-list">
        <div
          :class="['header-list-item', i === currentIndex ? 'active' : '']"
          v-for="(item, i) in NavList"
          :key="i"
          @click="changeSelect(item, i)"
        >
          <img :src="getImgUrl(i)" alt="" />
          <div>{{ item.label }}</div>
        </div>
      </div> -->
      <div class="nav-list">
        <div
          :class="['nav-list-item', i === currentIndex ? 'active' : '']"
          v-for="(item, i) in NavList"
          :key="i"
          @click="changeSelect(item, i)"
        >
          <img :src="getImgUrl(i)" alt="" />
          <div>{{ item.label }}</div>
        </div>
      </div>
      <div class="module-list" id="anchorContent">
        <div id="xqk" class="section-item"><ent-see></ent-see></div>
        <!-- <div class="home-see"></div> -->
        <div id="xqb" class="section-item"><ent-report></ent-report></div>
        <!-- <div class="home-report"></div> -->
        <div id="xqf" class="section-item"><ent-service></ent-service></div>
        <!-- <div class="home-service"></div> -->
        <div id="xqt" class="section-item"><ent-notice></ent-notice></div>
        <ent-link></ent-link>
      </div>
      <div class="floating-window" v-if="showWindow">
        <img
          src="@/assets/new-home/floatingWindow.png"
          alt="萧山区五企培育企业画像工作"
          class="entrance"
          @click="enterQuestionnaire()"
        />
        <!-- <img src="@/assets/new-home/close.png" alt="关闭" class="close" @click="showWindow=false"> -->
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line quotes
import banner from "./components/banner.vue";
// eslint-disable-next-line quotes
import entSee from "./components/ent-see/index.vue";
import entReport from './components/ent-report/index.vue';
import entService from './components/ent-service/index.vue';
import entNotice from './components/ent-notice/index.vue';
import entLink from './components/ent-link/index.vue';
import BaseTreeAnchor from '@/components/tree-anchor';
import { leftNavTree } from '@/common/commonConstant';
import $ from 'jquery';
import { mapGetters } from 'vuex';
// import { getEntSpecialForm } from '@api/entBusiness/entBusiness';

export default {
  components: {
    banner,
    entSee,
    entReport,
    entService,
    entNotice,
    entLink,
    BaseTreeAnchor
  },
  data () {
    return {
      NavList: leftNavTree,
      currentIndex: '',
      showWindow: false
    };
  },
  created () {
    window.addEventListener('scroll', this.scroll, true);
  },
  mounted () {},
  computed: {
    ...mapGetters(['getLoginStatus'])
  },
  destroyed () {
    window.removeEventListener('scroll', this.scroll, true);
  },
  methods: {
    scroll (e) {
      // 滚动距离 大于 第一个导航切换距离
      if (
        e.target.scrollingElement.scrollTop >
        document.querySelectorAll('.section-item')[0].offsetTop - 50
      ) {
        $('.nav-list').addClass('active');
      } else {
        $('.nav-list').removeClass('active');
      }
    },
    getImgUrl (index) {
      const i = index + 1;
      return require('@/assets/images/ent/navImg' + i + '.png');
    },
    getActiveAnchor (data) {
      this.currentIndex = this.NavList.findIndex((item) => {
        return item.id === data;
      });
    },
    changeSelect (item, i) {
      this.currentIndex = i;
      this.$refs.anchorTree.goAnchor(item.id, item.id);
    },
    // 五企培育企业入口
    enterQuestionnaire () {
      if (this.getLoginStatus) {
        this.getEntIsHasSpecialForm();
      } else {
        this.$message.warning('请先登录');
        this.$router.push({ path: '/login' });
      }
    },
    // 获取当前登录企业有特殊表单
    getEntIsHasSpecialForm () {
      getEntSpecialForm()
        .then((res) => {
          if (res.code === '000000') {
            if (res.data) {
              this.$router.push({
                name: 'environment',
                query: {
                  id: res.data
                }
              });
            } else {
              this.$router.push({
                name: 'questionnaireList'
              });
            }
          }
        })
        .catch((err) => {
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style lang="less">
.searchText {
  border-color: rgba(255, 255, 255, 1) !important;
}
</style>
<style lang="less" scoped>
.home {
  width: 100%;
  // overflow-y: scroll;
  .home_center {
    width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .module-list {
    // height: 3184px;
    margin-top: 100px;
    > div {
      width: 1200px;
      border: 1px solid rgba(230, 230, 230, 1);
      margin: 32px auto;
      background: #fff;
    }
  }

  .header-list {
    position: fixed;
    display: flex;
    width: 1200px;
    margin: 0 auto;
    height: 88px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    &-item {
      width: 8%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        margin-bottom: 10px;
      }
      &.active {
        background-color: rgba(245, 245, 245, 1);
         &::before {
          content: '';
          display: block;
          position: absolute;
          width: 3px;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(18, 122, 230, 1);
        }
      }
    }
    &.active {
      position: fixed;
      //left: 13.5%;
      top: 50%;
      margin-top: -172.5px;
      margin-left: -92px;
    }
  }

  .nav-list {
    position: absolute;
    margin-left: -92px;
    top: 12.75%;
    // margin-top: -172.5px;
    width: 80px;
    height: 345px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    &-item {
      height: 25%;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: relative;
      img {
        margin-bottom: 10px;
      }
      &.active {
        background-color: rgba(245, 245, 245, 1);
         &::before {
          content: '';
          display: block;
          position: absolute;
          width: 3px;
          height: 100%;
          left: 0;
          top: 0;
          background: rgba(18, 122, 230, 1);
        }
      }
    }
    &.active {
      position: fixed;
      //left: 13.5%;
      top: 50%;
      margin-top: -172.5px;
      margin-left: -92px;
    }
  }
  .floating-window {
    position: fixed;
    right: 5%;
    bottom: 6%;
    z-index: 99;
    cursor: pointer;
    transition: all 0.2s;
    filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.2));
    .close {
      width: 24px;
      height: 24px;
      position: absolute;
      top: 15%;
      right: 20%;
      opacity: 0;
    }
    &:hover {
      & {
        bottom: 7%;
      }
      .close {
        opacity: 1;
      }
    }
    .entrance {
      width: 212px;
      height: 278px;
    }
  }
}
</style>
