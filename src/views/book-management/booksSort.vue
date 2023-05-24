<template>
  <div class="page-content">
     <div class="step-progress">
        <div
          :class="{ 'step-progress-item': true, active: index === activeIndex }"
          v-for="(item, index) in stepProgressList"
          :key="index"
          @click="clickCurrentItem(item, index)"
        >
          <span class="circle-index">{{ index + 1 }}</span>
          <span>{{ item.name }}</span>
        </div>
      </div>
      <div class="content scroll-content">
        <div class="content-item scroll-item" id="scroll-item-1">
          <common-title title="一、企业概况"></common-title>
        </div>
        <div class="content-item scroll-item" id="scroll-item-2">
          <common-title title="二、数字化实施现状及现场问题描述"></common-title>
        </div>
        <div class="content-item scroll-item" id="scroll-item-3">
          <common-title title="三、数字化提升和改造"> </common-title>
        </div>
        <div class="content-item scroll-item" id="scroll-item-4">
          <common-title title="四、诊断现场照片"></common-title>
        </div>
        <div class="content-item scroll-item" id="scroll-item-5">
          <common-title title="五、技术指标评分表"></common-title>
        </div>
      </div>
  </div>
</template>

<script>
import CommonTitle from './common-title.vue';
export default {
  name: 'BooksSort',
  components: { CommonTitle },
  data () {
    return {
      stepProgressList: [
        {
          name: '企业概况'
        },
        {
          name: '土地数据'
        },
        {
          name: '用电数据'
        },
        {
          name: '用水数据'
        },
        {
          name: '统计数据'
        }
      ],
      activeIndex: 0
    };
  },
  mounted () {
    document.getElementsByClassName('page-content')[0].addEventListener('scroll', this.getScroll);
  },
  methods: {
    clickCurrentItem (item, i) {
      // this.activeIndex = i;
      document
        .querySelector(`#scroll-item-${i + 1}`)
        .scrollIntoView({ behavior: 'smooth' });
    },
    getScroll () {
      const ele = document.querySelector('.page-content');
      const isBottom = ele.scrollTop + ele.clientHeight - ele.scrollHeight;
      this.onScroll(ele.scrollTop, isBottom);
    },
    onScroll (currentScrollTop, isBottom) {
      const items = document.querySelectorAll('.scroll-item');
      const offSetTopArr = [];
      const offSetHeightArr = [];
      this.$nextTick(() => {
        items.forEach(item => {
          offSetTopArr.push(item.offsetTop);
          offSetHeightArr.push(item.offsetHeight);
        });
        for (let n = 0; n <= offSetTopArr.length - 1; n++) {
          if (Math.ceil(currentScrollTop) >= offSetTopArr[n - 1] && Math.ceil(currentScrollTop) < offSetTopArr[n]) {
            this.activeIndex = n - 1;
          }
        }
        if (Math.ceil(currentScrollTop) >= offSetTopArr[items.length - 1]) {
          this.activeIndex = items.length - 1;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.page-content {
  height: 0;
  overflow-y: scroll;
}
  .step-progress {
    display: flex;
    justify-content: center;
    position: absolute;
    right: 0;
    &-item {
      position: relative;
      width: 140px;
      height: 40px;
      margin-right: 10px;
      line-height: 40px;
      color: rgba(0, 0, 0, 0.65);
      text-align: center;
      cursor: pointer;
      background: rgb(246, 247, 250);
      .circle-index {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        line-height: 20px;
        border: 1px solid rgba(0, 0, 0, 0.65);
        border-radius: 50%;
      }
      &::after {
        position: absolute;
        right: -20px;
        content: '';
        border-top: 20px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 10px solid rgb(246, 247, 250);
      }
      &::before {
        position: absolute;
        left: 0;
        content: '';
        border-top: 20px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 10px solid white;
      }
      &:first-child::before {
        border-left: 10px solid rgb(246, 247, 250);
      }
      &.active {
        color: white;
        background: rgb(0, 89, 255);
        &::after {
          border-color: transparent transparent transparent rgb(0, 89, 255);
        }
        &::before {
          border-color: transparent transparent transparent white;
        }
        .circle-index {
          border: 1px solid white;
        }
      }
      &:first-child.active {
        &::before {
          border-color: transparent transparent transparent rgb(0, 89, 255);
        }
      }
    }
  }
  .content {
    height: 80%;
    &-item {
      margin-bottom: 30px;
      .title-style {
        margin: 12px 0 8px 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 24px;
        color: black;
      }
      .desc-item {
        font-size: 14px;
        line-height: 22px;
        color: rgba(0, 0, 0, 0.85);
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        &-title {
          font-weight: 550;
        }
      }
      .text-style {
        padding: 24px;
        background: rgb(250, 250, 250);
      }
      .introduce {
        box-sizing: border-box;
        display: flex;
        height: 336px;
        margin-top: 8px;
        overflow-y: auto;
        &-content {
          flex: 1;
          margin-right: 24px;
        }
      }
      .common-box {
        margin-top: 12px;
      }
    }
    #scroll-item-1 {
      height: 500px;
    }
        #scroll-item-2 {
      height: 800px;
    }
        #scroll-item-3 {
      height: 800px;
    }
        #scroll-item-4 {
      height: 800px;
    }
        #scroll-item-5 {
      height: 900px;
    }

  }
</style>
