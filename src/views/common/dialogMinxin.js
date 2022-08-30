export const mixins = {
  data () {
    return {
      isShowAll: '', // 放大元素的ref名
      refName: '' // 点击元素的ref名
    };
  },
  computed: {
    // 是否展示关闭图标
    isShowClose () {
      // 若放大的dom的ref名不为空且放大的dom的ref名和点击的dom的ref名相同则展示关闭图标
      return !!this.isShowAll && this.isShowAll === this.refName;
    }
  },
  methods: {
    /**
     * @desc 点击放大事件
     */
    handleShowAll (refName) {
      this.isShowAll = this.refName = refName;
      // 添加类
      this.$refs[refName].classList.add('bigger');
    },
    /**
     * @desc 点击缩小事件
     */
    handleHide () {
      // 删除类
      this.$refs[this.refName].classList.remove('bigger');
      // 清空存储的元素ref名
      this.refName = '';
      this.isShowAll = '';
    },
    /**
     * @desc 隐藏非点击元素模块
     */
    handleHideOther (refName) {
      return !this.refName || this.refName === refName;
    }
  }
};
