<template>
  <div class="hot-body">
    <div class="hot-body-top">
      <div class="top-tips">
        <div class="top-tips-left">
          <img src="@/assets/new-home/hot-serve.png" />
          <span>热门服务机构</span>
        </div>
        <div class="top-tips-seemore" @click.stop="viewMore()">
          查看更多 <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="top-tips-content">
        <el-carousel direction="vertical" indicator-position="none" height="600px">
          <el-carousel-item v-for="(item, index) in serviceOrganList" :key="index">
          <div
            class="hot-body-content-box"
            v-for="(ele, i) in item"
            :key="i"
            @click.stop="viewDetail('personDetail',ele.id)"
          >
            <img :src="ele.photoImgUrlList[0]" />

            <div class="hot-body-content-box-right">
              <span class="title">{{ ele.name }}</span>
              <span class="detail" v-if="ele.serveType===1">所属行业：{{ ele.industryName }}</span>
              <span class="detail" v-if="ele.serveType===1">企业地址：{{ ele.address }}</span>
              <span class="detail" v-if="ele.serveType===2">个人优势：{{ ele.description||'-' }}</span>
            </div>
          </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="hot-body-top">
      <div class="top-tips">
        <div class="top-tips-left">
          <img src="@/assets/new-home/hot-serve.png" />
          <span>热门服务</span>
        </div>
        <div class="top-tips-seemore" @click.stop="viewMore()">
          查看更多 <i class="el-icon-arrow-right"></i>
        </div>
      </div>

        <el-carousel direction="vertical" indicator-position="none" height="600px">
          <el-carousel-item v-for="(item, index) in serviceList" :key="index">
            <div class="hot-right-box">
              <div
                class="hot-right-box-block"
                v-for="(ele, i) in item"
                :key="i"
                @click.stop="viewDetail('marketDetail',ele.id)"
              >
                <img :src="ele.imgUrl" />
                <span class="serve-title">{{ ele.name }}</span>
                <span class="serve-detail">{{ ele.brief }}</span>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

  </div>
</template>

<script>
// import { getImgList, getList } from '@api/homePage/homePage.js';
import _chunk from 'lodash/chunk';
export default {
  data () {
    return {
      serviceOrganList: [],
      serviceList: []
    };
  },
  created () {
    this.getListData(3);
    this.getListData(8);
  },
  methods: {
    /**
     * @description 跳转服务列表
     */
    viewMore () {
      this.$router.push({
        name: 'marketServiceDetail'
      });
    },
    /**
     * @description 跳转服务详情
     */
    viewDetail (name, id) {
      this.$router.push({
        name,
        query: {
          id
        }
      });
    },
    /**
     * @description 获取banner的数据
     */
    getListData (type) {
      const params = {
        type
      };

      const map = {
        3: 'serviceList',
        8: 'serviceOrganList'
      };

      getList(params).then(res => {
        if (res.code == '000000') {
          this[map[type]] = _chunk(res.data, 4);
          console.log(this.serviceList, res.data);
          console.log(this.serviceOrganList, res.data);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
// @import '~@style/common.less';
.hot-body {
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
      cursor: pointer;
    }
  }

  &-content {
    overflow-y: scroll;
    height: 579px;
    width: 100%;

    &-box {
      background-color: #fff;
      height: 130px;
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      cursor: pointer;
      transition: all .5s;
      &:hover {
        @include cardBoxShadow;
        transform: translateY(-4px);
      }
      img {
        width: 192px;
        height: 100%;
      }

      &-right {
        flex: 1;
        overflow: hidden;
        height: 130px;
        padding: 25px;
      }
      span {
        display: block;
      }
      .title {
        font-weight: 900;
        margin-bottom: 10px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .detail {
        margin-bottom: 4px;
        font-size: 14px;
        color: rgba(83, 91, 100, 100);
        line-height: 1.5;
        // width: 90%;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
      }
    }
  }
}

.hot-right-box {
  display: flex;
  flex-wrap: wrap;
  height: 579px;
  // overflow-y: scroll;

  > div:nth-child(2n + 1) {
    margin-right: 18px;
  }

  &-block {
    background-color: #fff;
    width: 48%;
    height: 277px;
    margin-bottom: 20px;
    padding: 10px;
    cursor: pointer;
    transition: all .5s;
    &:hover {
      @include cardBoxShadow;
      transform: translateY(-4px);
    }
    img {
      width: 98%;
      height: 177px;
    }

    .serve-title {
      display: block;
      font-weight: 900;
      margin: 7px 0 6px 15px;
      font-size: 16px;
      line-height: 22px;
      color: rgba(31, 35, 38, 100);
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
    }
    .serve-detail {
      display: inline-block;
      width: 220px;
      margin: 0 15px 0;
      font-size: 14px;
      line-height: 20px;
      color: rgba(83, 91, 100, 100);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
