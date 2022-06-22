<template>
  <div class="ent">
    <el-carousel indicator-position="none" :autoplay="false" height="345px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <div class="ent-list">
          <div class="ent-list-item" v-for="(ele, idx) of item" :key="idx" @click="routerToPage(ele)">
            <div class="ent-list-item-img">
              <img :src="ele.imgUrl" alt="" />
            </div>
            <div class="ent-list-item-title">{{ ele.name }}</div>
            <div class="ent-list-item-desc">
              {{ ele.brief }}
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="more" @click="routerToPage('', 'more')">
      查看更多 <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>
<script>
// import { getList } from '@api/homePage/homePage.js'
import _chunk from 'lodash/chunk'
import { IndexModuleSkipList } from '@/common/commonConstant'
export default {
  data() {
    return {
      IndexSkipUrl: IndexModuleSkipList,
      list: []
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    // 列表跳转只有内链跳转
    routerToPage(data, type) {
      let routerUrl = {}
      this.IndexSkipUrl.map(item => {
        if (item.id === 5) {
          if (!type) {
            // 列表
            routerUrl = {
              name: item.detailUrl,
              query: { id: data.id }
            }
          } else {
            // 查看更多
            routerUrl = {
              name: item.listUrl
            }
          }
          this.$router.push(routerUrl)
        }
      })
    },
    /**
     * @description 获取数据
     */
    getListData() {
      const params = {
        type: 6
      }

      getList(params).then(res => {
        if (res.code == '000000') {
          this.list = _chunk(res.data, 4)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ent {
  width: 100%;
  position: relative;
  height: 378px;
  .ent-list {
    display: flex;
    width: 98%;
    height: 345px;
    padding: 20px;
    &-item {
      width: 275px;
      margin-right: 20px;
      cursor: pointer;
      box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
      transition: all 0.5s;
      &-img {
        width: 275px;
        height: 200px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          transition: .5s;
        }
      }

      &-title {
        margin: 14px 10px 8px 16px;
        font-size: 16px;
        font-weight: 600;
      }

      &-desc {
        margin: 0 10px 22px 16px;
        width: 249px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        font-size: 14px;
        color: rgba(83, 91, 100, 1);
      }
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
        img {
          transform: scale(1.08);
        }
      }
    }

    &-item:last-child {
      margin-right: 0;
    }
  }

  .more {
    position: absolute;
    bottom: 2%;
    right: 2%;
    display: inline-block;
    width: 100px;
    border: 1px solid rgba(188, 188, 188, 1);
    text-align: center;
    padding: 8px 0 7px;
    border-radius: 2px;
    color: rgba(156, 168, 180, 1);
    cursor: pointer;
    > i {
      // margin-left: 5px;
    }
  }
}
</style>
