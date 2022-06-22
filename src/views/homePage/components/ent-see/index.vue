<template>
  <div class="see">
    <common-head
      @currentTab="currentTab"
      :moduelMsg="moduelMsg"
      :routerList="routerList"
    ></common-head>
    <component :is="currentComponent"></component>
  </div>
</template>
<script>
// eslint-disable-next-line quotes
import commonHead from "../common-head.vue"
import policy from './policy.vue'
import information from './information.vue'
import elegantDemeanour from './elegant-demeanour.vue'
export default {
  components: {
    commonHead,
    policy,
    information,
    elegantDemeanour
  },
  data() {
    return {
      currentComponent: 'policy',
      moduelMsg: {
        title: '政策资讯',
        img: require('@/assets/new-home/ent-see.png')
      },
      routerList: [
        {
          label: '惠企政策',
          name: 'policy'
        },
        {
          label: '资讯动态',
          name: 'information'
        },
        {
          label: '企业风采',
          name: 'elegantDemeanour'
        }
      ]
    }
  },
  created() {},
  methods: {
    currentTab(name) {
      this.currentComponent = name
    }
  }
}
</script>
<style lang="less" scoped>
.see {
  width: 100%;
  min-height: 410px;
}
</style>
