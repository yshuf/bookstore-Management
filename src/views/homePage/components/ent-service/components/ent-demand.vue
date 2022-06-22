<template>
  <div class="ent">
    <div class="top">
      <div class="left">
        <img :src="require('@/assets/new-home/ent-demand.png')" alt="" />
        <span>企业诉求</span>
      </div>
      <div class="right">
        <span @click="viewAppealMore">查看更多</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="content">
      <template v-if="appealData.length">
        <div class="item" v-for="(item, index) in appealData" :key="index">
          <div class="title">{{ item.problemTitle }}</div>
            <div class="detail">
              <div class="left">
                <i class="el-icon-view"></i>
                <span>浏览量: {{ item.pageviews }}</span>
              </div>
              <div class="right">
                <i class="el-icon-time"></i>
                <span>{{ item.createTime | parseTime("{y}-{m}-{d}") }}</span>
              </div>
            </div>
        </div>
      </template>
      <div class="no_data_box" v-else>
        <NoData
        description="暂无企业诉求"
        :imgUrl="require('@/assets/home/noData.png')"
      ></NoData>
      </div>
    </div>
  </div>
</template>

<script>
// import { problemListAPI } from '@api/homePage/homePage.js';
import NoData from '@/components/NoData';
import _slice from 'lodash/slice';
export default {
  data () {
    return {
      appealData: []
    };
  },
  components: { NoData },
  created () {
    this.getList();
  },
  methods: {
    getList () {
      const params = {
        problemTypeId: '',
        key: '',
        pageNum: 1,
        pageSize: 5
      };

      problemListAPI(params).then(res => {
        const { data, msg, code } = res;

        if (code === '000000') {
          this.appealData = _slice(data.results || [], 0, 5);
        } else {
          this.$message.error(msg);
        }
      });
    },

    /**
     * @description 点击查看更多,跳转至企业诉求列表页
     */
    viewAppealMore () {
      this.$router.push({
        name: 'entDemands'
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ent {
  height: 100%;
  width: 34%;

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
      cursor: pointer;
      font-size: 14px;
      span {
        padding-right: 3px;
      }
    }
  }

  .content {
    background-color: rgba(244, 247, 251, 1);
    padding: 20px;
    height: 350px;
    .no_data_box {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .item {
      margin-bottom: 20px;
      .title {
        color: rgba(31, 35, 38, 100);
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: 600;
      }
      .detail {
        display: flex;
        justify-content: space-between;

        .left {
          span {
            color: rgba(156, 168, 180, 100);
            font-size: 12px;
          }
        }
        .right {
          span {
            color: rgba(156, 168, 180, 100);
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
