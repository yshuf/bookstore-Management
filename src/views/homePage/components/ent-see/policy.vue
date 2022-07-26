<template>
  <div class="policy">
    <div class="policy-list">
      <div
        class="policy-list-item"
        v-for="(item, index) of policyList"
        :key="index"
        @click="routerToPage(item)"
      >
        <div>
          <span v-show="index === 0">置顶</span>
          <span :title="item.name">{{ item.name }}</span>
        </div>
        <div>
          <span>{{ time(item.releaseTime) }}</span>
        </div>
      </div>
       <div class="more" @click="routerToPage()">查看更多 <i class="el-icon-arrow-right"></i></div>
    </div>
    <div class="policy-img">
      <div
        class="policy-img-item"
        v-for="(item, index) of imgList"
        :key="index"
        @click="JumpLink(item)"
      >
        <img :src="item.pictureUrl" alt="" />
        <!-- <div>{{ item.name }}</div> -->
      </div>
    </div>
  </div>
</template>
<script>
// import { getImgList, getList } from '@api/homePage/homePage.js'
import _slice from 'lodash/slice';
import { IndexModuleSkipList } from '@/common/commonConstant';
export default {
  data () {
    return {
      policyList: [],
      imgList: [],
      IndexSkipUrl: IndexModuleSkipList
    };
  },
  computed: {
    time () {
      return function (time) {
        if (!time) return '';

        return time.split(' ')[0];
      };
    }
  },
  created () {
    this.getPolicyImgData();
    this.getPolicyListData();
  },
  methods: {
    /**
     *  运营位图
     *  linkType: 0 内链 1 外联
     *  dataType：
     */
    JumpLink (data) {
      if (data.linkType === 0) {
        // 内链
        this.IndexSkipUrl.map(item => {
          if (item.id === data.dataType) {
            this.$router.push({
              name: item.detailUrl,
              query: {
                id: data.dataId
              }
            });
          }
        });
      } else {
        // 外链
        window.open(data.externalUrl);
      }
    },
    // 列表跳转只有内链跳转
    routerToPage (data) {
      let routerUrl = {};
      this.IndexSkipUrl.map((item) => {
        if (item.id === 1) {
          if (data) { // 列表
            routerUrl = {
              name: item.detailUrl,
              query: { id: data.id }
            };
          } else {
            // 查看更多
            routerUrl = {
              name: item.listUrl
            };
          }
          this.$router.push(routerUrl);
        }
      });
    },
    /**
     * @description 获取banner的数据
     */
    getPolicyImgData () {
      const params = {
        type: 1
      };

      // getImgList(params).then(res => {
      //   if (res.code == '000000') {
      //     this.imgList = _slice(res.data, 0, 3);
      //   }
      // });
    },
    /**
     * @description 获取
     */
    getPolicyListData () {
      const params = {
        type: 1
      };

      getList(params).then(res => {
        if (res.code == '000000') {
          this.policyList = _slice(res.data, 0, 6);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../../style/mixin.less';
.policy {
  display: flex;
  padding: 20px;
  position: relative;

  &-list {
    width: 49%;
    margin-right: 4%;
    margin-top: 1%;
    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 23px;
      cursor: pointer;
      @include textStyleHover;
      &:hover {
        color: @mainColor;
      }
      > div:first-child {
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        > span:first-child {
          background: #EC4646;
          padding: 0 7px;
          color: #fff;
          margin-right: 3px;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          display: inline-block;
        }
      }

      > div:last-child {
        > span:last-child {
          color: rgba(83, 91, 100, 0.7);
        }
      }
    }
  }

  &-img {
    width: 45%;
    &-item {
      cursor: pointer;
      width: 99%;
      height: 94px;
      margin-bottom: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }

      > div {
        position: absolute;
        top: 50%;
        left: 15%;
        color: #fff;
        font-size: 24px;
        letter-spacing: 1px;
        font-weight: 550;
        transform: translate(-50%, -50%);
      }
    }
  }
  .more {
    position: absolute;
    display: inline-block;
    width: 100px;
    border: 1px solid rgba(188, 188, 188, 1);
    text-align: center;
    padding: 8px 0 7px;
    border-radius: 2px;
    color: rgba(156, 168, 180, 1);
    cursor: pointer;
  }
}
</style>
