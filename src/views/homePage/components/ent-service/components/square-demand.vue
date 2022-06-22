<template>
  <div class="square">
    <div class="top">
      <div class="left">
        <img src="@/assets/new-home/square-demand.png" alt="" />
        <span>需求广场</span>
      </div>
      <div class="right">
        <span @click="viewSquareMore">查看更多</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="nav">
      <div
        v-for="(item, index) in nav"
        :key="index"
        :class="{ tab: true, 'tab-active': currentTab === index }"
        @click="tabChange(index)"
      >
        {{ item.title }}
      </div>
    </div>
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        @click="toDetailPage(item,index)"
      >
        <div>{{ item.title }}</div>
        <div>{{ item.entName }}</div>
        <div>{{ item.createTime | parseTime("{y}-{m}-{d}") }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// import {
//   listRecruitNeedsAPI,
//   listFactoryRentNeedsAPI,
//   listFactorySellNeedsAPI,
//   listFactorySeekRentNeedsAPI,
//   listMachineSellNeedsAPI,
//   listProductNeedsAPI,
//   lisOtherNeedsAPI
// } from '@api/homePage/homePage.js';
import { mapGetters } from 'vuex';
export default {
  data () {
    return {
      currentTab: 0,
      nav: [
        {
          title: '招聘信息',
          api: listRecruitNeedsAPI,
          name: 'entNeedsOtherDetail',
          flage: 1,
          key: 1
        },
        {
          title: '厂房出租',
          api: listFactoryRentNeedsAPI,
          name: 'entNeedsWorkShopDetail',
          key: 2
        },
        {
          title: '厂房求租',
          api: listFactorySeekRentNeedsAPI,
          name: 'entNeedsOtherDetail',
          flage: 3,
          key: 7

        },
        {
          title: '房产转让',
          api: listFactorySellNeedsAPI,
          name: 'entNeedsWorkShopDetail',
          key: 3
        },
        {
          title: '设备转让',
          api: listMachineSellNeedsAPI,
          name: 'entNeedsWorkShopDetail',
          key: 4
        },
        {
          title: '产品销售',
          api: listProductNeedsAPI,
          name: 'entNeedsWorkShopDetail',
          key: 5
        },
        {
          title: '其他需求',
          api: lisOtherNeedsAPI,
          name: 'entNeedsOtherDetail',
          flage: 2,
          key: 6
        }
      ],
      list: []
    };
  },
  created () {
    this.getTableList();
  },
  computed: {
    ...mapGetters(['getLoginStatus'])
  },
  methods: {
    /**
     * @description 点击切换tab
     */
    tabChange (index) {
      if (index === this.currentTab) return false;

      this.currentTab = index;
      this.getTableList();
    },
    /**
     * @description 获取列表的相关数据
     */
    getTableList () {
      const apiFun = this.nav[this.currentTab].api;
      const params = {
        pageNum: 1,
        pageSize: 8
      };

      apiFun(params).then(res => {
        const data = res.data;

        if (res.code === '000000') {
          this.list = [];
          this.list = data.results;
        }
      });
    },
    /**
     * @description 点击某条数据，跳转至对应需求详情页
     */
    toDetailPage (item) {
      let routerUrl = '';
      let query = {};
      if (this.getLoginStatus) {
        if (this.nav[this.currentTab].name === 'entNeedsOtherDetail') {
          query = {
            id: item.needsId || item.needsBaseId,
            flage: this.nav[this.currentTab].flage,
            tabIndex: this.nav[this.currentTab].key// 用来判断接口详情
          };
        } else if (this.nav[this.currentTab].name === 'entNeedsWorkShopDetail') {
        // 厂房出租到 产品销售
          query = {
            id: item.needsId,
            tabIndex: this.nav[this.currentTab].key// 用来判断接口详情
          };
        }
        routerUrl = this.$router.resolve({ name: this.nav[this.currentTab].name, query });
        window.location.href = `${routerUrl.href}`;
      } else {
        this.$message.warning('请先登录');
        this.$router.push({ path: '/login' });
      }
    },
    /**
     * @description 点击查看更多,跳转至需求广场列表页
     */
    viewSquareMore () {
      this.$router.push({
        name: 'entNeeds'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.square {
  height: 100%;
  width: 65%;
  background-color: rgba(255, 255, 255, 1);

  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgba(31, 35, 38, 100);
    margin-bottom: 10px;

    .left {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      color: rgba(31, 35, 38, 100);
      font-size: 20px;
      span {
        padding-left: 5px;
      }
    }
    .right {
      font-size: 14px;
      cursor: pointer;
      span {
        padding-right: 3px;
      }
    }
  }

  .nav {
    display: flex;
    margin-bottom: 10px;
    .tab {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 1);
      border: 1px solid rgba(18, 122, 230, 1);
      color: rgba(18, 122, 230, 100);
      font-size: 14px;
      padding: 6px 16px;
      margin-right: 12px;
    }
    .tab-active {
      background-color: rgba(18, 122, 230, 1);
      border: 1px solid rgba(18, 122, 230, 1);
      color: rgba(255, 255, 255, 100);
      font-size: 14px;
    }
  }

  .content {
    border-top: 1px solid rgba(230, 230, 230, 1);
    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 40px;
      width: 100%;
      height: 40px;
      div {
        width: 29%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        &:last-child {
          width: 13%;
        }
      }
    }
    .item:hover {
      cursor: pointer;
      background-color: rgba(227, 245, 255, 1);
      // background-color: pink;
    }
  }
}
</style>
