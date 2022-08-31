<template>
  <div class="step-content">
      <div class="step-item" v-for="(item, index) in stepList" :key="index">
        <div :class="['step-item-num', item.highlight ? 'active' : '']">
          {{ item.num }}
        </div>
        <div class="step-item-desc">{{ item.desc }}</div>
        <div class="step-item-line" v-if="index !== stepList.length-1"></div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'CommonStep',
  props: {
    stepList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    };
  }
};
</script>

<style lang="less" scoped>
@color45: rgba(0, 0, 0, 0.45);
.step-content {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  .step-item {
    display: flex;
    justify-content: center;
    align-items: center;
    &-num {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      text-align: center;
      line-height: 32px;

      font-size: 14px;
      color: rgba(0, 0, 0, 0.25);
      border: 1px solid rgba(0, 0, 0, 0.15);
      margin: 0 10px 0 0;
      &.active {
        background: #1890ff;
        color: #ffffff;
      }
    }
    &-desc {
      color: @color45;
    }
    &-line {
      width: 300px;
      border-top: 1px solid rgba(0, 0, 0, 0.15);
      margin: 0 10px;
    }
  }
}
</style>
