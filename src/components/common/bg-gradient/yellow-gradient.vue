<!--
 * @Description:
 * @Author: mobai
 * @Date: 2022-10-17 20:33:30
 * @LastEditors: mobai
 * @LastEditTime: 2022-10-17 20:35:51
 * @FilePath: \yxjc-web\src\packages\components\bg-gradient\yellow-gradient.vue
-->
<template>
  <div class="container" :style="{ '--skew': skew + 'deg' }">
    <div class="type-box">
      <!-- <div class="type-name">{{ data.name }}</div> -->
      <div class="type-progress">
        <div class="type-progress-rect" :style="{ width: data.rate }"></div>
      </div>
      <img
        src="@/assets/images/platform/target-icon.png"
        alt=""
        class="target"
      />
      <div
        class="type-num"
        :title="
          '实际值' + data.nowValue + '%/' + '目标值' + data.targetValue + '%'
        "
      >
        {{
          '实际值' + data.nowValue + '%/' + '目标值' + data.targetValue + '%'
        }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BgGradient',
  props: {
    skew: {
      type: Number,
      default: 0
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {};
  }
};
</script>
<style scoped>
/* stylelint-disable */
.container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-content: space-between;
}

.type-box {
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  position: relative;
}
.target {
  width: 28px;
  height: 28px;
  position: absolute;
  right: 190px;
  top: -21px;
}
.type-name {
  width: 3.75rem;
  font-size: 1rem;
  color: #fff;
}

.type-progress {
  position: relative;
  flex: 1;
  height: 30px;
  /* 核心代码 */
  background: linear-gradient(to right, rgba(26, 57, 78) 50%, transparent 50%) 0
    0/12px 100% repeat-x;
  transform: skew(var(--skew));
}

.type-progress-rect {
  width: 100%;
  height: 100%;
  /* 核心代码 */
  background: linear-gradient(to right, #ffde00 50%, transparent 50%) 0 0/12px
    100% repeat-x;
  max-width: 100%;
}

.type-num {
  width: 190px;
  font-size: 16px;
  color: rgba(131, 188, 255, 1);
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 5px;
}
</style>
