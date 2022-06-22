<template>
  <div class="report">
    <common-head
      @currentTab="currentTab"
      :moduelMsg="moduelMsg"
      :routerList="routerList"
    ></common-head>

    <component :is="currentComponent"></component>
  </div>
</template>
<script>
import commonHead from '../common-head.vue'
import navigation from './navigation.vue'
import center from './center.vue'
export default {
  components: {
    commonHead,
    navigation,
    center
  },
  data() {
    return {
      currentComponent: 'navigation',
      moduelMsg: {
        title: '项目活动',
        img: require('@/assets/new-home/ent-report.png')
      },
      routerList: [
        {
          label: '申报导航',
          name: 'navigation'
        },
        {
          label: '活动中心',
          name: 'center'
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
.report {
  // width: ;
  min-height: 500px;
}
</style>
