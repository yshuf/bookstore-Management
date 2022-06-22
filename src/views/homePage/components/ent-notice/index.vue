<template>
  <div class="service">
    <common-head :moduelMsg="moduelMsg"></common-head>
    <div class="top">
        <div class="title">
          <img src="@/assets/new-home/window-department.png" alt="" />
          部门之窗
        </div>
        <div class="layout">
          <div class="content">
            <div
              :title="item.name"
              v-for="(item, index) in windowDepartment"
              :key="index"
              class="item"
              @click="viewDetail(item.id,'departmentDetail')"
            >
              {{ item.name }}
            </div>
          </div>
          <div class="department-img">
            <img src="~@/assets/home/department.png" alt="">
          </div>
        </div>
      </div>
    <div class="bottom">
       <div class="title">
          <img src="@/assets/new-home/street-service.png" alt="" />
          镇街服务
        </div>
        <div class="layout">
          <div class="street-img">
            <img src="~@/assets/home/streetServe.png" alt="">
          </div>
          <div class="content">
            <div
              :title="item.name"
              v-for="(item, index) in streetService"
              :key="index"
              class="item"
              @click="viewDetail(item.id,'streetDetail')"
            >
              {{ item.name }}
            </div>
          </div>
      </div>
    </div>

  </div>
</template>
<script>
import commonHead from '../common-head.vue';
// import {
//   getTownStreet,
//   getDepartmentNameList
// } from '@api/homePage/homePage.js';
export default {
  components: {
    commonHead
  },
  data () {
    return {
      moduelMsg: {
        title: '联系政府',
        img: require('@/assets/new-home/ent-notice.png')
      },
      windowDepartment: [],
      streetService: []
    };
  },
  created () {
    this.getCountyList();
    this.getDepartmentList();
  },
  methods: {
    /**
     * @description 跳转对应详情
     */
    viewDetail (id, name) {
      this.$router.push({
        name,
        query: {
          id
        }
      });
    },
    /**
     * @description 获取镇街相关的数据
     */
    getCountyList () {
      getTownStreet().then(res => {
        if (res.code == '000000') {
          this.streetService = res.data;
        }
      });
    },
    // 获取部门之窗相关的数据
    getDepartmentList () {
      getDepartmentNameList().then(res => {
        if (res.code == '000000') {
          this.windowDepartment = res.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.service {
  height: 600px;
  background-color: rgba(255, 255, 255, 1);
  // border: 1px solid rgba(230, 230, 230, 1);
  .layout {
    display: flex;
  }
  .title {
    color: rgba(31, 35, 38, 100);
    font-size: 20px;
    padding-bottom: 12px;
  }
    .top {
      padding: 20px 15px 0;
      .department-img {
        img {
          width: 580px;
        }

      }
      .content {
        display: flex;
        flex-wrap: wrap;
        width: 580px;
        height: 158px;
        // background-color: rgba(255, 255, 255, 1);
        background: url('~@/assets/home/department_bg.png') no-repeat 100% 100%;
        // border: 1px solid rgba(230, 230, 230, 1);
        padding: 20px;

        .item {
          cursor: pointer;
          width: 25%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
        }
      }
    }
    .bottom {
      padding: 20px 15px 20px;
      .street-img {
        img {
          width: 570px;
        }
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        width: 592px;
        height: 222px;
        background-color: rgba(244, 247, 251, 1);
        // border: 1px solid rgba(230, 230, 230, 1);
        padding: 20px;

        .item {
          cursor: pointer;
          width: 20%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;

          &:last-child {
            width: 40%;
          }
        }
      }
    }

}
</style>
