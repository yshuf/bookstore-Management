<template>
  <div class="container" :style="{ '--skew': skew + 'deg' }">
    <div class="type-box">
      <!-- <div class="type-name">{{ data.name }}</div> -->
      <div class="type-progress">
        <div
          class="type-progress-rect"
          :style="{
            width: returnRate(
              Number(data.valueList[1].dataValue),
              Number(data.valueList[0].dataValue)
            )
          }"
        ></div>
      </div>
      <img
        src="@/assets/images/platform/target-icon.png"
        alt=""
        class="target"
      />
      <div
        class="type-num"
        :title="
          '实际值' +
            data.valueList[1].dataValue +
            '%/' +
            '目标值' +
            data.valueList[0].dataValue +
            '%'
        "
      >
        {{
          '实际值' +
            data.valueList[1].dataValue +
            '%/' +
            '目标值' +
            data.valueList[0].dataValue +
            '%'
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
  },
  mounted () {},
  methods: {
    returnRate (a, b) {
      return Number(a / b).toFixed(2) * 100 + '%';
    }
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
  height: 40px;
  position: relative;
}
.target {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 147px;
  top: -11px;
}
.type-name {
  width: 3.75rem;
  font-size: 1rem;
  color: #fff;
}

.type-progress {
  position: relative;
  flex: 1;
  height: 20px;
  /* 核心代码 */
  background: linear-gradient(to right, rgba(26, 57, 78) 50%, transparent 50%) 0
    0/12px 100% repeat-x;
  transform: skew(var(--skew));
}

.type-progress-rect {
  width: 100%;
  height: 100%;
  /* 核心代码 */
  background: linear-gradient(to right, #007dff 50%, transparent 50%) 0 0/12px
    100% repeat-x;
  max-width: 100%;
}

.type-num {
  width: 150px;
  font-size: 14px;
  color: rgba(131, 188, 255, 1);
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 5px;
}
</style>
