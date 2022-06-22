<template>
  <div class="center">
    <div class="center-top" @mouseleave="showRight = false">
    <div class="calendar">
      <div class="calendar-head">
        <div>活动日历</div>
        <div class="calendar-head-time">
          <span @click="prevMonth"><i class="el-icon-arrow-left"></i> </span>
          {{ calendarTime | parseTime("{y}年{m}月") }}
          <span><i class="el-icon-arrow-right" @click="nextMonth"></i></span>
        </div>
      </div>
      <el-calendar v-model="calendarTime">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div
            :class="[judgeActicity(data.day) ? 'acticityDay' : '']"
            @click="onClickDate(date, data.day, judgeActicity(data.day))"
          >
            <div>{{ data.day.split("-")[2] }}</div>
            <div class="acticityDay-dot" v-show="judgeActicity(data.day)"></div>
          </div>
        </template>
      </el-calendar>
      <div class="calendar-bottom" v-show="currentDate">
        <div>
          <span>{{ currentDate | parseTime("{m}月{d}日") }}</span
          >当日活动共<span>{{ acticityList.length }}</span
          >场
        </div>
        <div style="cursor:pointer" @click.stop="routerToPage()">查看详情</div>
      </div>
      <div class="calendar-list" v-show="acticityList.length && showRight">
        <div class="calendar-list-head">
          <div>当前活动共{{ acticityList.length }}场</div>
          <div><i class="el-icon-arrow-right"></i></div>
        </div>
        <div class="calendar-list-content">
          <div
            class="calendar-list-content-item"
            v-for="(item, index) of acticityList"
            :key="index"
            @click="routerToPage(item)"
          >
            <div>
              <div>{{ item.name }}</div>
              <div><i class="el-icon-arrow-right"></i></div>
            </div>
            <div v-html="item.introduce"></div>
            <div>
              <i class="el-icon-time"></i
              >{{ item.startTime | parseTime("{y}-{m}-{d}") }} ~ {{ item.endTime | parseTime("{y}-{m}-{d}") }}
            </div>
            <div>
              <i class="el-icon-location-outline"></i>{{ item.address }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <center-right></center-right>
  </div>
  <div class="more-box">
      <div class="more" @click="routerToPage('', 'more')">
        查看更多 <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>
<script>
import { parseTime, formatTime } from '@/utils';
import centerRight from './center-right.vue';
// import { getActivityDate, getActivityData } from '@api/homePage/homePage.js'
import _findIndex from 'lodash/findIndex';
import { IndexModuleSkipList } from '@/common/commonConstant';
export default {
  components: {
    centerRight
  },
  data () {
    return {
      calendarTime: new Date(),
      // 当前的时间
      currentDate: new Date(),
      // 当前的活动列表
      acticityList: [],
      showRight: false,
      // 活动的时间列表
      acticityTimeList: [],
      IndexSkipUrl: IndexModuleSkipList
    };
  },
  computed: {
    /**
     * @description 判断当前时间是否有活动
     */
    judgeActicity () {
      return function (time) {
        if (!this.acticityTimeList || !this.acticityTimeList.length) {
          return false;
        }

        for (const item of this.acticityTimeList) {
          if (item === time) {
            return true;
          }
        }

        return false;
      };
    }
  },
  created () {
    this.getActivityTime();
  },
  methods: {
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
          } else { // 查看更多
            routerUrl = {
              name: item.listUrl
            };
          }
          this.$router.push(routerUrl);
        }
      });
    },
    /**
     * @description 获取当前时间拥有活动的日期
     */
    getActivityTime () {
      const month = parseTime(this.calendarTime, '{y}-{m}');
      const params = {
        month
      };

      getActivityDate(params).then(res => {
        if (res.code === '000000') {
          this.acticityTimeList = res.data;
          this.$forceUpdate();
        }
      });
    },
    /**
     * @description 获取当前时间包含的活动数据
     */
    getActivityDataList (day) {
      const params = {
        date: day
      };

      this.acticityList = [];

      getActivityData(params).then(res => {
        if (res.code === '000000') {
          this.acticityList = res.data;
          this.showRight = true;
        }
      });
    },
    /**
     * @description 下个月
     */
    nextMonth () {
      this.calendarTime = new Date(
        this.calendarTime.getFullYear(),
        this.calendarTime.getMonth() + 1,
        1
      );

      this.getActivityTime();
    },
    /**
     * @description 上个月
     */
    prevMonth () {
      this.calendarTime = new Date(this.calendarTime.getTime());
      this.calendarTime.setDate(0);
      this.getActivityTime();
    },
    /**
     * @description 选中当前日期
     * @param { String } date 当前的时间 时间戳
     * @param { String } day 当前的时间
     * @param { Boolean } status true 有活动, false 没有活动
     */
    onClickDate (date, day, status) {
      if (this.currentDate === date) return false;

      this.currentDate = date;

      if (!status) {
        this.showRight = false;
        this.acticityList = [];
        return false;
      }

      if (status) {
        this.getActivityDataList(day);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.center-top {
  display: flex;
  //padding: 20px;

  .calendar {
    width: 34%;
    height: 383px;
    margin-right: 2%;
    padding: 15px;
    position: relative;
    background-color: rgba(244, 247, 251, 1);

    /deep/ .el-calendar__body {
      padding-bottom: 16px;
    }

    /deep/ .el-calendar .el-calendar__header {
      display: none;
    }

    /deep/ .el-calendar-table th {
      padding-top: 0;
    }
    /deep/ .el-calendar-table td {
      border: 0;
      width: 20px;
    }

    /deep/ .el-calendar-table .el-calendar-day {
      margin: 0 auto;
      height: 38px;
      text-align: center;
      padding: 5px;

      .acticityDay {
        color: rgba(230, 169, 14, 1);
        text-align: center;

        .acticityDay-dot {
          width: 6px;
          height: 6px;
          background-color: rgba(230, 169, 14, 1);
          border-radius: 8px;
          margin: 5px auto;
        }
      }
    }

    .calendar-head {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      font-weight: 550;

      &-time {
        > span {
          display: inline-block;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }

    .calendar-bottom {
      display: flex;
      margin-top: 12px;
      > div {
        > span {
          color: rgba(230, 169, 14, 1);
        }
      }

      > div:last-child {
        margin-left: 20px;
        color: rgba(18, 122, 230, 1);
      }
    }

    &-list {
      position: absolute;
      height: 383px;
      top: 0;
      left: 100%;
      width: 325px;
      background-color: rgba(244, 247, 251, 1);
      z-index: 888;
      padding: 15px;

      &-head {
        display: flex;
        justify-content: space-between;
        font-weight: 550;

        > div:last-child {
          width: 20px;
          height: 20px;
          border-radius: 20px;
          background: rgba(230, 169, 14, 1);
          color: #fff;
          text-align: center;
          line-height: 20px;
          cursor: pointer;
        }
      }

      &-content {
        margin-top: 10px;
        height: 300px;
        overflow-y: scroll;
        &-item {
          background: #fff;
          padding: 10px 10px 7px;
          border-radius: 8px;
          cursor: pointer;
          margin-bottom: 10px;

          > div {
            margin-bottom: 8px;
            font-size: 12px;
          }

          > div:first-child {
            font-size: 14px;
            display: flex;
            justify-content: space-between;
            > div:first-child {
              width: 80%;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            > div:last-child {
              width: 20px;
              height: 20px;
              border-radius: 20px;
              border: 1px solid #c0c4cc;
              color: #333;
              text-align: center;
              line-height: 18px;
            }
          }

          > div:nth-child(n + 2) {
            color: #c0c4cc;
            i {
              margin-right: 5px;
            }
          }
        }

        &-item:hover {
          > div:first-child {
            > div:first-child {
              color: rgba(230, 169, 14, 1);
            }

            > div:last-child {
              background: rgba(230, 169, 14, 1);

              border: 1px solid rgba(230, 169, 14, 1);
              color: #fff;
            }
          }

          > div:nth-child(2) {
            color: #333;
          }
        }
      }

      &-content::-webkit-scrollbar {
        width: 0 !important;
      }
    }
  }
}
.center {
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
</style>
