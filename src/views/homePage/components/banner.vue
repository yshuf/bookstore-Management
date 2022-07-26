<!--
 * @Author: mobai
 * @Date: 2021-08-25 14:58:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-25 10:42:34
 * @FilePath: \bookstore-Management\src\views\homePage\components\banner.vue
-->
<template>
  <div class="banner">
    <el-carousel height="475px">
      <el-carousel-item v-for="(item, index) of bannerList" :key="index">
        <div class="banner-img">
          <img :src="item.pictureUrl" alt="" @click="gotoBannerDetail(item)" />
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
// import { getImgList } from '@api/homePage/homePage.js'
import { IndexModuleSkipList } from '@/common/commonConstant';
export default {
  data () {
    return {
      bannerList: [],
      IndexSkipUrl: IndexModuleSkipList
    };
  },
  created () {
    this.getBannerDataList();
  },
  methods: {
    /**
     * @description 获取banner的数据
     */
    getBannerDataList () {
      const params = {
        type: 0,
        status: 1
      };

      // getImgList(params).then((res) => {
      //   if (res.code == '000000') {
      //     this.bannerList = res.data
      //   }
      // })
    },
    /**
     *  linkType: 0 内链 1 外联
     *  dataType：
     */
    gotoBannerDetail (data) {
      if (data.linkType === 0) {
        // 内链
        this.IndexSkipUrl.map((item) => {
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
    }
  }
};
</script>
<style lang="less" scoped>
.banner {
  width: 1200px;
  height: 470px;
  margin: 0 auto;

  /deep/ .el-carousel__item {
    width: 100%;
    height: 100%;
    background: white;
    display: flex;
    justify-content: center;

    .banner-img {
      width: 100%;
      height: 470px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
