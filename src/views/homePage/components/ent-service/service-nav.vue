<template>
  <div class="nav">
    <div class="top-tips">
      <div class="top-tips-left">
        <img src="@/assets/new-home/service-nav.png" />
        <span>服务导航</span>
      </div>
    </div>

    <el-carousel
      indicator-position="outside"
      height="400px"
      :autoplay="false"
      ref="viewBox"
    >
      <el-carousel-item v-for="(data, idx) in carouselist" :key="idx">
        <div class="nav-body">
          <div class="nav-body-box" :style="{backgroundImage: 'url(' +item.imgUrl + ')'}"  v-for="(item, index) in data" :key="index">

            <div class="mask" :style="{ background: data.backColor }"></div>

            <div class="abso-body">
              <div class="title" @click="viewMore(item)">{{ item.name }}</div>
              <div class="tab">
                <div
                  class="tab-box"
                  v-for="(child, dex) in labelList(item.dictServeTypeList)"
                  :key="dex"
                  @click="viewMore(item,1,child)"
                >
                  {{ child.name }}
                </div>
              </div>
              <div class="tab-more" @click="viewMore(item)">查看更多 ></div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
// import { getList } from '@api/homePage/homePage.js'
import _chunk from 'lodash/chunk'
import _slice from 'lodash/slice'
export default {
  data() {
    return {
      carouselIndex: 0,
      carouselist: []
    }
  },
  computed: {
    labelList() {
      return function(list) {
        if (!list) return []

        return _slice(list, 0, 5)
      }
    }
  },
  mounted() {
    this.getServiceNavList()
  },
  methods: {
    /**
     *  item: 对应当前点击项
     *  type： 1 子类  否则  父类
     *  PARENT: 当 type 为 1 时，需要传递父类信息
     *
     */
    viewMore(item, type, child) {
      this.$router.push({
        name: 'marketServiceDetail',
        query:
          type === 1 ? { mapId: child.id, allTypeId: item.id } : { allTypeId: item.id }

      })
    },
    getServiceNavList() {
      const params = {
        type: 4
      }

      getList(params).then(res => {
        if (res.code == '000000') {
          this.carouselist = _chunk(res.data, 6)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  margin-top: 20px;
  .top-tips {
    display: flex;
    align-items: center;
    // margin-bottom: 19px;
    &-left {
      display: flex;
      align-items: center;
    }
    span {
      color: rgba(31, 35, 38, 100);
      font-size: 20px;
      margin-left: 5px;
      font-family: PingFangSC-Medium;
    }
  }
  .nav-body {
    display: flex;
    flex-direction: row;
    position: relative;
    margin-top: 15px;
    .abso-body {
      position: absolute;
      top: 0;
      height: 375px;
      width: 177px;
    }
    .mask {
      opacity: 0.9;
      height: 0px;
      transition: all 0.5s; /*缓慢hover显示 */
    }
    &-box {
      height: 375px;
      width: 180px;
      margin-right: 16px;
      background-size: 100% 100%;
      cursor: pointer;
      transition: all 1s; /*缓慢hover显示 */
    }
    &-box:hover {
      box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
      .mask {
        height: 375px;
        background-color: rgba(18, 122, 230, 0.9);
      }
    }
    .title {
      margin-top: 24px;
      margin-left: 14px;
      color: rgba(255, 255, 255, 100);
      height: 38px;
      width: 72px;
      font-size: 18px;
      font-family: PingFangSC-Medium;
      position: relative;
      cursor: pointer;
    }
    .title::after {
      content: "";
      width: 20px;
      height: 3px;
      bottom: 0;
      left: 0;
      position: absolute;
      background-color:  rgba(255, 255, 255, 100);;
    }
  }

  .tab {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 14px;
    justify-content: space-between;
    &-box {
      width: 72px;
      height: 28px;
      border-radius: 2px;
      background-color: rgba(0, 0, 0, 0.1);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: 12px;
      line-height: 28px;
      font-family: PingFangSC-Regular;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.4s; /*缓慢hover显示 */
    }

    &-box:hover {
      background-color: rgba(255, 255, 255, 1);
      color: rgba(0, 0, 0, 0.6);
    }
  }

  .tab-more {
    text-align: center;
    margin-top: 30px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
  }
}
</style>
