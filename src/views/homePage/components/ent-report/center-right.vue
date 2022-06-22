<template>
  <div class="center-right">
    <div>
      <el-carousel height="221px">
        <el-carousel-item v-for="(item, index) in imgList" :key="index"  @click.native="JumpLink(item)">
          <div class="banner-img">
            <img :src="item.pictureUrl" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="center-right-bottom">
      <div
        class="center-right-bottom-item"
        v-for="(item, index) of list"
        :key="index"
        @click.stop="routerToPage(item)"
      >
        <div>
          <img :src="item.imgUrl" alt=""/>
        </div>
        <div>
          <div>{{ item.name }}</div>
          <div>{{ status(item.activityStatus) }}</div>
          <div>
            <span>{{ item.createTime | parseTime("{y}-{m}-{d}") }}</span>
            <span><i class="el-icon-right"></i></span>
          </div>
        </div>
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
      IndexSkipUrl: IndexModuleSkipList,
      imgUrl: require('@/assets/home/home_bg.png'),
      imgList: [],
      list: []
    };
  },
  computed: {
    status () {
      return function (status) {
        if (!status) return '';

        const map = {
          1: '待开始',
          2: '活动中',
          3: '已结束'
        };

        return map[status];
      };
    }
  },
  created () {
    this.getImgData();
    this.getListData();
  },
  methods: {
    /**
     *  运营位图
     *  linkType: 0 内链 1 外联
     *  dataType：
     */
    JumpLink (data) {
      if (data.linkType === 0) { // 内链
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
      } else { // 外链
        window.open(data.externalUrl);
      }
    },
    // 列表跳转只有内链跳转
    routerToPage (data) {
      let routerUrl = {};
      this.IndexSkipUrl.map((item) => {
        if (item.id === 6) {
          if (data) { // 列表
            routerUrl = {
              name: item.detailUrl,
              query: { id: data.id }
            };
          }
          this.$router.push(routerUrl);
        }
      });
    },
    /**
     * @description 获取banner的数据
     */
    getImgData () {
      const params = {
        type: 3
      };

      getImgList(params).then(res => {
        if (res.code == '000000') {
          this.imgList = res.data;
        }
      });
    },
    /**
     * @description 获取
     */
    getListData () {
      const params = {
        type: 7
      };

      getList(params).then(res => {
        if (res.code == '000000') {
          this.list = _slice(res.data, 0, 2);
          console.log(this.list);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.center-right {
  width: 64%;
  .banner-img {
    img {
      width: 100%;
      height: 221px;
    }
  }

  > div:first-child {
    cursor: pointer;
  }

  &-bottom {
    display: flex;
    margin-top: 15px;

    &-item {
      width: 49%;
      background-color: rgba(244, 247, 251, 1);
      display: flex;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
      cursor: pointer;
      img {
        width: 186px;
        height: 141px;
      }

      > div:last-child {
        padding: 12px;
        width: 200px;
        > div:first-child {
          overflow: hidden; //超出文本隐藏
          text-overflow: ellipsis; //溢出省略号显示
          display: -webkit-box; //将对象作为弹性伸缩盒子
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式-从上到下垂直排列
          -webkit-line-clamp: 2;
        }

        > div:nth-child(2) {
          margin: 15px 0 20px;
          width: 70px;
          background: #c7eefd;
          border-radius: 2px;
          padding: 0 12px;
          color: #127ae6;
          height: 24px;
          line-height: 24px;
        }

        > div:last-child {
          display: flex;
          justify-content: space-between;
        }
      }
    }

    &-item:first-child {
      margin-right: 2%;
    }
  }
}
</style>
