<!-- 公共顶部组件页面 -->
<template>
  <div id="commonTop">
    <div
      v-for="(item, index) in dataArry"
      :key="index"
      class="top-block"
      :style="
        hasBorder && index != dataArry.length - 1
          ? 'border-right: 1px solid #E8E8E8;'
          : ''
      "
      :class="specialFun(index)"
      ref="specialDiv"
    >
      <div class="top-block-title">
        <span
          v-if="type == 'productManage'"
          :class="circleFunc(index)"
          ref="circles"
        ></span>
        <span
          v-if="type == 'financingNeeds'"
          :class="financingCircleFunc(index)"
          ref="circles"
        ></span>
        {{ item.title }}
      </div>
      <div class="top-block-num">
        {{ item.num }}{{ item.unit ? item.unit : '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonTop',
  props: {
    dataArry: {
      type: Array,
      default: []
    },
    hasBorder: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      line: this.hasBorder,
      fileType: this.type
    };
  },
  mounted() {},
  methods: {
    circleFunc(index) {
      this.$nextTick(function() {
        if (index == 1) this.$refs.circles[index].style.background = '#FBC53F';
        if (index == 2) this.$refs.circles[index].style.background = '#336CEF';
        if (index == 3) this.$refs.circles[index].style.background = '#435188';
        if (index == 4) this.$refs.circles[index].style.background = '#E84939';
      });
    },
    financingCircleFunc(index) {
      this.$nextTick(function() {
        if (index == 1) this.$refs.circles[index].style.background = '#FBC53F';
        if (index == 2) this.$refs.circles[index].style.background = '#FBC53F';
        if (index == 3) this.$refs.circles[index].style.background = '#FBC53F';
        if (index == 4) this.$refs.circles[index].style.background = '#336CEF';
        if (index == 5) this.$refs.circles[index].style.background = '#435188';
        if (index == 6) this.$refs.circles[index].style.background = '#E84939';
        if (index == 7) this.$refs.circles[index].style.background = '#A7A7A7';
        if (index == 8) this.$refs.circles[index].style.background = '#A7A7A7';
        if (index == 9) this.$refs.circles[index].style.background = '#A7A7A7';
        if (index == 10) this.$refs.circles[index].style.background = '#A7A7A7';
        if (index == 11) this.$refs.circles[index].style.background = '#A7A7A7';
      });
    },
    specialFun(index) {
      if (this.fileType == 'financingNeeds' && index == 0) {
        this.$nextTick(function() {
          this.$refs.specialDiv[index].style.marginRight = '8rem';
        });
      }
      if (this.fileType == 'productManage' && (index == 0 || index == 1)) {
        this.$nextTick(function() {
          this.$refs.specialDiv[index].style.marginRight = '6rem';
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
#commonTop {
  width: 100%;
  margin: 20px auto 0;
  background: #fff;
  min-height: 5rem;
  display: flex;
  justify-content: space-around;
  .top-block {
    width: 30%;
    margin: 15px;
    text-align: center;
    /*border-right: 1px solid #E8E8E8;*/
    div {
      margin: 2px;
    }
    &-title {
      color: rgba(0, 0, 0, 0.45);
      font-size: 14px;
    }
    &-num {
      color: rgba(0, 0, 0, 0.85);
      font-size: 24px;
    }
    &:last-child {
      border-right: none;
    }
    span {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      display: inline-block;
      margin: 0 5px 3px 0;
    }
  }
}
</style>
