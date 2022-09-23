<template>
  <div class="app " :class="isHome ? 'homeLayout' : 'layout-container'">
    <el-backtop :bottom="220" target=".page_content"></el-backtop>
    <el-container>
      <app-header />
      <article class="page_content">
        <el-main>
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
        <app-footer />
      </article>
    </el-container>
  </div>
</template>

<script>
import appHeader from './appHeader';
import appFooter from './appFooter';
import { mapGetters } from 'vuex';
export default {
  name: 'NoLayout',
  components: {
    appHeader,
    appFooter
  },
  data () {
    return {
      // 滚动条
      ops: {
        scrollPanel: {
          scrollingX: false,
          easing: 'easeInOutQuint',
          speed: 800
        },
        rail: {
          background: '#01a99a',
          opacity: 0,

          /** 滚动条粗细 */
          size: '5px'
        },
        bar: {
          /** 当不做任何操作时滚动条自动消失的时间 */
          showDelay: 500,

          /** 是否只在滚动的时候显示滚动条 */
          onlyShowBarOnScroll: false,

          /** 是否保持显示 */
          keepShow: false,

          /** 背景色 */
          background: '#ccc',

          /**  透明度  */
          opacity: 1,

          /** 当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合 */
          hoverStyle: false
        }
      }
    };
  },
  computed: {
    ...mapGetters(['getCurrentMenu', 'scrollTop']),
    isHome () {
      return this.$route.name === 'home';
    }
  },
  watch: {
    // $route(newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     this.goTop(0)
    //   }
    // },
    // scrollTop(val) {
    //   if (val) {
    //     this.goTop(val)
    //   }
    // }
  },
  mounted () {
    console.log(this.$route, 89898989);
  },
  methods: {
    // 滚动条滚动时添加样式
    handleScroll (vertical, horizontal, e) {}
    // goTop(val) {
    //   console.log('滚动中', this.$refs['indexscroll'])
    //   this.$refs['indexscroll'].scrollTo(
    //     {
    //       y: val
    //     },
    //     50,
    //     'easeInOutQuint'
    //   )
    // }
  }
};
</script>

<style lang="less" scoped>
@import "../style/variables.less";

.homeLayout {
  // height: 100%;
  background-image: linear-gradient(to bottom, #025cc2, #fff);
  background-color: #fff;
  background-size: 100% 16%;
  background-repeat: no-repeat;

  .page_content {
    padding-top: 28px;
  }

  /deep/.el-main {
    min-height: calc(100vh - 325px) !important;
    padding: 0;
    margin: 0 auto;
    overflow: initial !important;
  }
  .specialMain {
    width: 100% !important;
  }
  .techServiceMain {
    width: 100% !important;
    background: #fff;
  }
  /deep/.el-container {
    flex-direction: column;
    background-size: 7%;
    font-size: 14px;
  }
}
</style>

<style lang="less" scoped>
.layout-container {
  height: 100%;

  .page_content {
    padding-top: 190px;
  }
  /deep/.el-main {
    min-height: calc(100vh - 325px) !important;
    padding: 0;
    margin: 0 auto;
    overflow: initial !important;
  }
  .specialMain {
    width: 100% !important;
  }
  .techServiceMain {
    width: 100% !important;
    background: #fff;
  }
  /deep/.el-container {
    flex-direction: column;
    background-size: 7%;
    font-size: 14px;
  }
}
</style>
