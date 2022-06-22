<template>
  <div class="head">
    <div>
      <img :src="moduelMsg.img" alt="" />
      <div>{{ moduelMsg.title }}</div>
    </div>
    <div>
      <div
        v-for="(item, index) of routerList"
        :key="index"
        @click="changeActiveRouter(item, index)"
      >
        <span :class="activeRouter === index ? 'routerActive' : ''">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    // 左侧
    moduelMsg: {
      type: Object,
      default: () => {
        return {
          img: '',
          title: ''
        }
      }
    },
    // 路由地址
    routerList: {
      type: Array
    }
  },
  data() {
    return {
      activeRouter: 0
      // routerList: [
      //   {
      //     label: "惠企政策",
      //     name: "gov"
      //   },
      //   {
      //     label: "资讯动态",
      //     name: "active"
      //   },
      //   {
      //     label: "企业风采",
      //     name: "ent"
      //   }
      // ]
    }
  },
  created() {},
  methods: {
    /**
     * @description 切换当前的模块
     */
    changeActiveRouter(data, index) {
      if (this.activeRouter === index) return false

      this.activeRouter = index

      this.$emit('currentTab', data.name)
    }
  }
}
</script>
<style lang="less" scoped>
.head {
  padding: 0 40px 0 13px;
  height: 62px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  font-size: 16px;

  > div:first-child {
    line-height: 62px;
    display: flex;
    align-items: center;
    > img {
      width: 22px;
      margin-right: 15px;
    }

    > div {
      font-size: 24px;
      font-weight: 550;
    }
  }

  > div:last-child {
    display: flex;

    > div {
      width: 100px;
      margin-left: 40px;
      font-weight: 550;
      line-height: 62px;
      text-align: center;
      cursor: pointer;
    }

    .routerActive {
      color: rgba(18, 122, 230, 100);
      border-bottom: 4px solid rgba(18, 122, 230, 100);
      font-size: 18px;
      display: inline-block;
    }
  }
}
</style>
