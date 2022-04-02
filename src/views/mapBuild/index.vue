<template>
<!-- 设置 key 为fullPath 从 /page/1 => /page/2 ，
由于$route.fullPath并不一样，所以组件被强制不服用，钩子加载顺序为：beforeRouteUpdate=>created=>mounted -->
  <router-view :key="key"/>
</template>

<script>
export default {
  name: 'MapBuild',
  computed: {
    key () {
      return this.$route.fullPath; // 由于 Vue 会复用相同组件，即 /page/1 => /page/2 或者 /page?id=1 => /page?id=2 这类链接跳转时, 将不在执行created, mounted之类的钩子, 这时候你需要在路由组件中, 添加beforeRouteUpdate钩子来执行相关方法拉去数据
    }
  }
};
</script>
