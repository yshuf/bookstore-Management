<template>
  <div class="slider-x-wrap">
      <ul class="slider-x">
       <li :key="index" v-for="(item,index) in dataList"  class="slider-x-item">
          {{item.name}}
       </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => [
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        },
        {
          name: '数据'
        }
      ]
    }

  },
  data () {
    return {

    };
  }
};
</script>
<style lang="less" scoped>

.slider-x-wrap{
    width: 500px;
    overflow: hidden;
    margin: 20px 0;
    .slider-x {
        animation: marquee 20s linear infinite;
        width: fit-content;
        display: flex;
        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 80px;
            background-color:rgba(15,36,57,.9);
            margin: 0 10px;
            padding: 10px;
            color: #fff;
        }
        &:hover {
            animation-play-state: paused;
        }
    }
}
@keyframes marquee {
    to {
        transform: translateX(-50%)
    }
}
</style>
