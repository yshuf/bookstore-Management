<template>
  <div class="service">
    <common-head :moduelMsg="moduelMsg"></common-head>
    <div class="body-topNav">
      <hotServe />
      <serviceNav />
      <div class="bottom">
        <square-demand></square-demand>
        <ent-demand></ent-demand>
      </div>
    </div>
  </div>
</template>
<script>
import commonHead from '../common-head.vue';
import entDemand from './components/ent-demand.vue';
import squareDemand from './components/square-demand.vue';
import hotServe from './hot-service.vue';
import serviceNav from './service-nav.vue';
export default {
  components: {
    commonHead,
    serviceNav,
    entDemand,
    squareDemand,
    hotServe
  },
  data () {
    return {
      moduelMsg: {
        title: '服务超市',
        img: require('@/assets/new-home/ent-service.png')
      }
    };
  }
};
</script>
<style lang="less" scoped>
/deep/.el-carousel__button {
  background-color: #333;
}
.service {
  height: 1640px;
  box-sizing: border-box;
}
.body-topNav {
  height: 662px;
  width: calc(100% - 40px);
  margin: 15px 20px 0 20px;
}
.body {
  display: flex;

  &-top {
    height: 662px;
    width: 49.5%;
    background-color: rgba(244, 247, 251, 1);
    padding: 18px 17px;
  }
  > div:nth-child(1) {
    margin-right: 20px;
  }
  .top-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 19px;
    &-left {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    span {
      color: rgba(31, 35, 38, 100);
      font-size: 20px;
      margin-left: 5px;
      font-family: PingFangSC-Medium;
    }
    &-seemore {
      padding-left: 55px;
    }
  }
  &-box {
    background-color: #fff;
    height: 130px;
    width: 100%;
    display: flex;
    margin-bottom: 20px;

    &-right {
      height: 130px;
      padding: 25px;
    }
    span {
      display: block;
    }
    .title {
      font-weight: 900;
      margin-bottom: 20px;
      font-size: 15px;
    }
    .detail {
      margin-bottom: 10px;
      font-size: 14px;
      color: rbg(182, 185, 189);
    }
  }
}
.right-box {
  display: flex;
  flex-wrap: wrap;

  > div:nth-child(1),
  div:nth-child(3) {
    margin-right: 18px;
  }
  &-block {
    background-color: #fff;
    width: 258px;
    height: 277px;
    margin-bottom: 20px;
    .serve-title {
      display: block;
      font-weight: 900;
      margin: 12px 0 6px 15px;
      font-size: 16px;
      line-height: 22px;

      color: rgba(31, 35, 38, 100);
    }
    .serve-detail {
      margin-top: 6px;
      margin-left: 15px;
      font-size: 14px;
      line-height: 20px;
      color: rgba(83, 91, 100, 100);
    }
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}
</style>
