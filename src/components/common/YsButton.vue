<style lang="less">
.ys-button {
  display: inline-block;
  -webkit-appearence: none;
  cursor: pointer;
  margin: 0;
  border: 1px solid transparent; //自定义边框
  outline: none;
  border-radius: 4px;
  transition: 0.1s;
  box-sizing: border-box;
  padding: 0;
  line-height: 30px;
  white-space: nowrap;
  font-size: 14px;
  text-align: center;
  span {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    -webkit-user-select: none;
    user-select: none;
  }
  &.ys-button--primary {
    background: $color-primary;
    border-color: $color-primary;
    span {
      color: #fff;
    }
    &:hover {
      background: $color-primary-hover;
    }
  }
  &.ys-button--warning {
    color: #fff;
    background-color: #e6a23c;
    border-color: #e6a23c;
  }
  &.ys-button--medium {
    line-height: 36px;
  }
  &.is-round {
    border-radius: 20px;
  }
  &.is-circle {
    border-radius: 50%;
  }
  &.is-disabled {
    background: #d9d9d9;
    color: #fff;
    cursor: not-allowed;
    border: 1px solid #d9d9d9;
    &:hover {
      background: #d9d9d9;
      border: 1px solid #d9d9d9;
      span {
        color: #fff;
      }
    }
  }
  &.is-plain {
    background: #fff;
    border: 1px solid $color-primary;
    span {
      color: $color-primary;
    }
    &:hover {
      background: #fff;
      border: 1px solid $color-primary-hover;
      span {
        color: $color-primary-hover;
      }
    }
  }
  .ys-loading-icon {
    margin-right: 8px;
    margin-left: -16px;
    -webkit-animation: rotating 2s linear infinite;
    -moz-animation: rotating 2s linear infinite;
    -ms-animation: rotating 2s linear infinite;
    -o-animation: rotating 2s linear infinite;
    animation: rotating 2s linear infinite;
  }
}
@-webkit-keyframes rotating /* Safari and Chrome */ {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
<template>
  <!-- 整个是封装在button之中 -->
  <button
    class="ys-button"
    @click="click"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'ys-button--' + type : '',
      size ? 'ys-button--' + size : '',
      {
        'is-disabled': buttonDisabled || loading,
        'is-round': round,
        'is-plain': plain,
        'is-circle': circle
      }
    ]"
    :style="{ width: isNumber(width) ? width + 'px' : width }"
  >
    <i class="iconfont icon-shuaxin ys-loading-icon" v-if="loading"></i>
    <!-- 给显示的内容增加个span，无内容时，则啥都不显示 -->
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import { debounce, throttle } from '../../../static/lodash-1.8.3.min';

export default {
  name: 'ys-button',
  data () {
    return {};
  },
  /**
   * *	<ys-button @click="login()" type="primary" />登录</ys-button>
   *  按钮类型颜色 type:['primary','success','info','warning','danger']
   *  按钮是否禁用 disabled:true / false
   **/
  props: {
    type: {
      // 按钮类型// 类型 primary / success / warning / danger / info / text
      type: String,
      default: 'default'
    },
    size: String, // 按钮尺寸大小  // 尺寸 medium / small / mini
    icon: {
      // icon的class类
      type: String,
      default: ''
    },
    nativeType: {
      // 原生 type 属性
      type: String,
      default: 'button'
    },
    width: {
      type: String,
      default: '60'
    },
    loading: Boolean, // 是否加载中状态
    disabled: Boolean, // 是否禁用状态
    plain: Boolean, // 是否朴素按钮
    autofocus: Boolean, // 是否默认聚焦
    round: Boolean, // 是否圆角按钮
    circle: Boolean, // 是否圆形按钮
    useType: {
      // 使用类型，debounce 防抖，throttle 节流，none 都不用
      type: String,
      default: 'none',
      validator: function (value) {
        return ['debounce', 'throttle', 'none'].indexOf(value) !== -1;
      }
    },
    wait: {
      // 防抖、节流周期
      type: Number,
      default: 500
    },
    maxWait: {
      // 防抖允许被延迟的最大值
      type: Number,
      default: 5000
    },
    atBegin: {
      // 是否立即触发
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 根据当前disabled状态确定button是否禁用
    buttonDisabled () {
      return this.disabled || false;
    },
    click () {
      if (this.useType == 'none') return this.handleClick;
      else if (this.useType == 'debounce') return this.handleClickDebounce;
      else if (this.useType === 'throttle') return this.handleClickThrottle;
    }
  },
  created () {
    this.handleClickDebounce = debounce(
      this.handleClick, // 要防抖动的函数
      this.wait, // 需要延迟的毫秒数
      {
        leading: this.atBegin, // 指定在延迟开始前调用
        maxWait: this.maxWait, // 设置 func 允许被延迟的最大值
        trailing: !this.atBegin // 指定在延迟结束后调用
      }
    );
    this.handleClickThrottle = throttle(
      this.handleClick, // 要防抖动的函数
      this.wait, // 需要延迟的毫秒数
      {
        leading: this.atBegin, // 指定在延迟开始前调用
        trailing: !this.atBegin // 指定在延迟结束后调用
      }
    );
  },
  mounted () {},
  methods: {
    isNumber (number) {
      const numReg = /^[0-9]+$/;
      const numRe = new RegExp(numReg);
      return numRe.test(number);
    },
    handleClick (evt) {
      // 触发当前实例上的click事件
      // 比如我们外部使用时，可以直接增加click方法
      this.$emit('click', evt);
    }
  }
};
</script>
