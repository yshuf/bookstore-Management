<template>
  <div class="common-title"><span class="line"></span>{{ title }}</div>
</template>

<script>
export default {
  name: 'CommonTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="less" scoped>
.common-title {
  position: relative;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: black;
  .line {
    display: inline-block;
    width: 3px;
    height: 14px;
    margin-right: 8px;
    background: rgb(0, 91, 255);
    border-radius: 10px;
  }
}
</style>
