<style lang="less" scoped>
.ys-select {
  display: inline-block;
  width: 160px;
  height: 32px;
  border-radius: 4px;
  position: relative;
  &:hover {
    .select-content {
      color: $color-primary;
      &::after {
        border-color: $color-primary;
      }
    }
    .select-input {
      color: $color-primary;
      border-color: $color-primary !important;
    }
  }
  &.blue {
    border: 2px solid;
  }
  .select-content {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    &::after {
      box-sizing: content-box;
      content: '';
      border: 1px solid rgba(0, 0, 0, 0.25);
      border-left: 0;
      border-top: 0;
      height: 8px;
      width: 8px;
      position: absolute;
      right: 10px;
      top: 28%;
      transform: rotate(45deg) scaleY(1);
      transition: transform 0.15s ease-in 0.05s;
      transform-origin: center;
    }
  }
  .select-input {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background: #fff;
    padding: 0 20px 0 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: top;
    color: $color-light;
    border: 1px solid rgba(216, 220, 230, 1);
    transition: 0.5s;
  }
  .select-options {
    min-width: 100%;
    max-width: 200%;
    position: absolute;
    top: 29px;
    left: 0;
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    border-radius: 4px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 3;
    padding: 4px 0;
    .select-option {
      font-size: 12px;
      line-height: 24px;
    }
    .select-txt {
      display: block;
      width: 100%;
      height: 100%;
      color: #6c7489;
      padding: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: left;
      &:hover {
        background: #f0f6fa;
        color: $color-primary;
      }
      &.active {
        background: #f0f6fa;
        color: $color-primary;
      }
    }
  }
}
.filter-box {
  padding: 2px;
  width: 100%;
  box-sizing: border-box;
}
.showList-enter-active {
  transition: all 0.2s ease-in;
}
.showList-enter {
  opacity: 0;
}
.showList-enter-to {
  opacity: 1;
}
</style>
<template>
  <div
    class="ys-select"
    :style="{ width: selectWidth + 'px' }"
    v-clickoutside="hideOptionsList"
    @mouseenter="onMouseEnterHandler()"
    @mouseleave.stop="onMouseOutHandler()"
  >
    <a
      href="javascript:void (0)"
      class="select-content"
      @click="showOptionsList()"
    ></a>
    <input
      type="text"
      class="select-input"
      v-model="selectText"
      disabled
      readonly
    />
    <transition name="showList">
      <div
        class="select-options"
        v-show="isOptionsListShow"
        :style="{
          width: selectWidth + 'px',
          height: options.length >= 7 ? '180px' : ''
        }"
      >
        <vue-scroll :ops="ops">
          <ul>
            <li class="select-option" v-if="filterable">
              <input
                type="text"
                v-model="content"
                class="filter-box"
                placeholder="请输入查询内容"
              />
            </li>
            <li
              class="select-option"
              v-for="(item, index) in options"
              :key="index"
            >
              <a
                href="javascript:void (0)"
                class="select-txt"
                :class="{ active: index == selectIndex }"
                @click="selectOption(item.value, index, item)"
                :title="item.label"
                >{{ item.label }}</a
              >
            </li>
          </ul>
        </vue-scroll>
      </div>
    </transition>
  </div>
</template>

<script>
const clickoutside = {
  // 初始化指令
  bind (el, binding, vnode) {
    function documentHandler (e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
    }

    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  update () {},
  unbind (el, binding) {
    // 解除事件监听
    document.removeEventListener('click', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
export default {
  name: 'ys-select',
  data () {
    return {
      isOptionsListShow: false,
      selectIndex: 0,
      // 自定义搜索框内容
      content: '',
      ops: {
        scrollPanel: {
          scrollingX: false,
          easing: 'easeInOutQuint',
          speed: 800
        },
        rail: {
          background: '#01a99a',
          opacity: 0,
          /** 滚动条粗细 */
          size: '3px'
        },
        bar: {
          /** 当不做任何操作时滚动条自动消失的时间 */
          showDelay: 500,
          /** 是否只在滚动的时候现实滚动条 */
          onlyShowBarOnScroll: false,
          /** 是否保持显示 */
          keepShow: false,
          /** 背景色 */
          background: '#ccc',
          /**  透明度  */
          opacity: 1,
          /** 当你鼠标移动到滚动条的时候滚动条的样式， 返回一个style对象， 和现在的对象融合 */
          hoverStyle: false
        }
      }
    };
  },
  props: {
    defaultTxt: {
      type: String,
      default: void 0,
      required: false
    },
    selectList: {
      type: Array,
      default: this.selectList,
      required: true
    },
    textList: {
      type: Array,
      default: this.textList,
      required: false
    },
    selectWidth: {
      default: 130,
      required: false
    },
    mouseenterShowMode: {
      type: Boolean,
      default: true,
      required: false
    },
    moveoutHideMode: {
      type: Boolean,
      default: true,
      required: false
    },
    clickHideMode: {
      type: Boolean,
      default: true,
      required: false
    },
    value: {
      // 反显值
      required: false
    },
    filterable: {
      default: false
    }
  },
  directives: { clickoutside },
  computed: {
    selectText () {
      if (this.options[this.selectIndex]) {
        return this.options[this.selectIndex].label;
      } else {
        this.selectIndex = 0;
        return this.options[this.selectIndex].label || '';
      }
    },
    options () {
      const that = this;
      const options = [];
      if (that.$props.defaultTxt) {
        options.push({
          value: '',
          label: that.$props.defaultTxt
        });
      }
      that.selectList.map(function (v, i) {
        const option = {
          value: v,
          label: that.textList ? that.textList[i] : v
        };
        options.push(option);
      });
      options.map(function (v, i) {
        if (v.value == that.value) {
          that.selectIndex = i;
        }
      });

      that.$nextTick(function () {
        if (that.value) {
          $('.select-input').css('color', 'rgba(0, 0, 0, 0.65)');
        }
      });
      return options;
    }
  },
  watch: {
    value (curVal, oldVal) {
      const that = this;
      that.options.map(function (v, i) {
        if (v.value == curVal) {
          that.selectIndex = i;
        }
      });
    },
    content (curVal, olcVal) {
      this.$emit('changeContent', curVal);
    }
  },
  created () {},
  mounted () {},
  methods: {
    selectOption (data, index, item) {
      const that = this;
      that.selectIndex = index;
      that.$emit('change', data);
      that.$emit('changedata', item);
      that.clickHideMode && that.hideOptionsList();
      that.$nextTick(function () {
        if (that.$props.defaultTxt != item.label) {
          $('.select-input').css('color', 'rgba(0, 0, 0, 0.65)');
        }
      });
    },
    onMouseEnterHandler () {
      this.mouseenterShowMode && this.showOptionsList();
    },
    onMouseOutHandler () {
      this.moveoutHideMode && this.hideOptionsList();
    },
    showOptionsList () {
      this.isOptionsListShow = true;
    },
    hideOptionsList () {
      const that = this;
      this.$nextTick(function () {
        that.isOptionsListShow = false;
      });
    }
  }
};
</script>
