<template>
  <div class="link">
    <common-head :moduelMsg="moduelMsg"></common-head>
    <div class="layout">
      <div class="item" v-for="(item, index) in linkData" :key="index" @click="openLink(item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script>
import commonHead from '../common-head.vue'
// import { getLinkList } from '@api/homePage/homePage.js'
export default {
  components: {
    commonHead
  },
  data() {
    return {
      moduelMsg: {
        title: '友情链接',
        img: require('@/assets/new-home/ent-notice.png')
      },
      linkData: ['中国化纤网', '经济专业网']
    }
  },
  created() {
    this.getLinkData()
  },
  methods: {
    getLinkData() {
      getLinkList().then(res => {
        if (res.code == '000000') {
          this.linkData = res.data
        }
      })
    },
    openLink(data) {
      window.open(data.linkUrl)
    }
  }
}
</script>
<style lang="less" scoped>
.link {
  .layout {
    padding: 25px 40px  15px 40px;
    display: flex;
    flex-wrap: wrap;
    .item {
      cursor: pointer;
      padding-right: 20px;
      padding-bottom: 10px;
    }
  }
}
</style>
