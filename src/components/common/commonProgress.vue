<!--
 * @Description:
 * @Author: mobai
 * @Date: 2022-10-25 19:22:21
 * @LastEditors: mobai
 * @LastEditTime: 2022-10-26 09:15:12
 * @FilePath: \bookstore-Management\src\components\common\commonProgress.vue
-->
<template>
  <div class="commonStyle process-info">
        <div class="process-box" :key="new Date()">
          <div class="line">
          </div>
          <div class="process">
            <div
              class="processList"
              v-for="(item, index) in dataList"
              :key="index"
            >
              <div class="processName">
                {{ item.name }}
              </div>
              <div class="processTime">
                {{ item.time ? item.time : '数据丢失' }}
              </div>
              <img :src="getCurrentStatusImg(item.time)" alt="" />
              <div class="processDay" v-if="index != dataList.length - 1">
                {{ item.time || '数据丢失'}}
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
export default {
  name: 'CommonProgress',
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      processList: []
    };
  },
  methods: {
    getCurrentStatusImg (data) {
      const url = data ? 'success.png' : 'fail.png';
      return require('@/assets/images/' + url);
    }

  }
};
</script>

<style lang="less" scoped>
  .commonStyle {
    background: rgba(15, 36, 57, 0.9);
    box-shadow: inset 0 0 10px rgba(0, 242, 228, 0.3);
  }
  .process-info {
    width: 100%;
    height: 300px;
    // background: url('~@/assets/images/bottom-border.png') no-repeat;
    // background-size: 100% 300px;
    color: #fff;
    .process-box {
      width: 100%;
      height: 100%;
      position: relative;
      display: flex;
      // 核心代码
      clip-path: inset(0 100% 0 0);
      animation: expand 3s forwards linear;
    }
    @keyframes expand {
      to {
        clip-path: inset(0 0 0 0);
      }
    }
    .line {
      width: 90%;
      height: 50%;
      margin: 0 auto;
      text-align: center;
      border-bottom: 1px dashed #fff;
    }
    .process {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      .processList {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 165px;
        height: 80px;
        margin-right: 80px;
        .processName {
          position: absolute;
          bottom: -10%;
        }
        .processTime {
          position: absolute;
          top: -10%;
        }
        .img {
          width: 20px;
        }
        .circle {
          width: 10px;
          height: 10px;
          background: #3cf3ff;
          border: 2px solid #fff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(52, 255, 243, 0.7);
        }
        .processDay {
          position: absolute;
          left: 100%;
          padding: 2px 6px;
          white-space: nowrap;
          background: #1160b7;
          border-radius: 4px;
        }
      }
    }
  }

</style>
