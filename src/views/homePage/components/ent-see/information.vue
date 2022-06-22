<template>
  <div class="information-box">
    <div class="information">
    <div class="information-img">
      <div
        class="information-img-item"
        v-for="(item, index) of imgList"
        :key="index"
        @click="JumpLink(item)"
      >
        <img :src="item.pictureUrl" alt="" />
        <!-- <div>{{ item.name }}</div> -->
      </div>
    </div>
    <div>
      <div
        class="information-item"
        v-for="(item, index) of list"
        :key="index"
        @click="routerToPage(item)"
      >
        <div>
          <div>{{ item.releaseTime | parseTime("{d}") }}</div>
          <div>{{ item.releaseTime | parseTime("{y}-{m}") }}</div>
        </div>
        <div>
          <div class="information-item-title">
            <span v-show="index === 0">置顶</span>
            <span class="title">{{ item.name }} </span>
          </div>
          <div class="information-item-content">
            {{ item.briefIntroduction }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="more-box">
    <div class="more" @click="routerToPage('', 'more')">
      查看更多 <i class="el-icon-arrow-right"></i>
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
      list: [],
      imgList: [],
      IndexSkipUrl: IndexModuleSkipList
    };
  },
  created () {
    this.getInforImgData();
    this.getInforListData();
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
    routerToPage (data, type) {
      let routerUrl = {};
      this.IndexSkipUrl.map(item => {
        if (item.id === 4) {
          if (!type) {
            // 列表
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
    getInforImgData () {
      const params = {
        type: 2
      };

      getImgList(params).then(res => {
        if (res.code == '000000') {
          this.imgList = _slice(res.data, 0, 3);
        }
      });
    },
    /**
     * @description 获取
     */
    getInforListData () {
      const params = {
        type: 5
      };

      getList(params).then(res => {
        if (res.code == '000000') {
          this.list = _slice(res.data, 0, 3);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../../../style/variables.less';
.information-box{
  position: relative;
  padding: 20px;
  .more-box {
    display: flex;
    justify-content: flex-end;
    .more {
      display: inline-block;
      width: 100px;
      border: 1px solid rgba(188, 188, 188, 1);
      text-align: center;
      padding: 8px 0 7px;
      color: rgba(156, 168, 180, 1);
      cursor: pointer;
    }
  }
}
.information {
  display: flex;
  position: relative;

  > div {
    width: 49%;
  }

  > div:last-child {
    margin-left: 20px;
  }

  &-img {
    &-item {
      width: 99%;
      height: 94px;
      margin-bottom: 10px;
      position: relative;
      cursor: pointer;
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

  .information-item {
    display: flex;
    cursor: pointer;
    margin-bottom: 10px;
    &:hover {
      .title {
        color: @mainColor;
      }
    }

    > div:first-child {
      width: 94px;
      height: 94px;
      background-color: rgba(62, 149, 240, 1);
      color: #fff;
      text-align: center;

      > div:first-child {
        font-size: 28px;
        margin: 27px 0 3px;
      }

      > div:last-child {
        margin-top: 0;
      }
    }

    > div:last-child {
      margin-left: 17px;
      width: 75%;
      .information-item-title {
        margin-bottom: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        // &:hover {
        //   color: #127AE6;
        //   text-decoration: underline;
        // }
        > span:first-child {
          background: red;
          padding: 3px 5px;
          color: #fff;
          border-radius: 3px;
          margin-right: 3px;
        }

        > span:last-child {
          font-size: 16px;
          font-weight: 550;
          letter-spacing: 1px;
        }
      }

      .information-item-content {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}

</style>
