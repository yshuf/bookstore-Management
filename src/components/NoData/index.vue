<template>
  <transition :name="transitionName">
    <div v-show="visible" :style="customStyle">
      <img :src="imgUrl" class="img-style"/>
      <div class="text-style">{{description}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NoData',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imgUrl: {
      type: String,
      default: ''
    },
    customStyle: {
      type: Object,
      default: function () {
        return {
          'text-align': 'center'
        };
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    description: {
      type: String,
      default: '暂无数据'
    }
  },
  data () {
    return {};
  },
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {
  }
};
</script>

<style scoped lang='less'>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

.back-to-ceiling .Icon {
  fill: #9aaabf;
  background: none;
}
.img-style {
  width: 90px;
}
.text-style {
  color: rgba(156, 168, 180, 100);
  font-size: 14px;
}
</style>
