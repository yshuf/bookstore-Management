<template>
  <div class="nav">
    <el-carousel :autoplay="false" height="365px" indicator-position="none">
      <el-carousel-item v-for="(item, index) in navData" :key="index">
        <div class="nav-list">
          <div
            @click.prevent="JumpLink(ele.id,0)"
            class="nav-list-item"
            @mouseenter="showDetail(index, idx, true)"
            @mouseleave="showDetail(index, idx, false)"
            v-for="(ele, idx) of item"
            :key="idx"
          >
            <div class="nav-list-item-normal" v-if="!ele.mouseOver">
              <div class="nav-list-item-normal-img">
                <img :src="ele.pictureUrl" alt="" />
              </div>
              <div class="nav-list-item-normal-title">{{ ele.name }}</div>
              <div class="nav-list-item-normal-desc">
                申报日期: {{ ele.startTime | parseTime("{y}-{m}-{d}") }}至{{
                  ele.endTime | parseTime("{y}-{m}-{d}")
                }}
              </div>
            </div>

            <div v-if="ele.mouseOver" class="nav-list-item-hover">
              <div class="nav-list-item-hover-title">
                {{ ele.name }}
              </div>
              <div class="nav-list-item-hover-detail">
                <div
                  v-for="(mapItem, mapIndex) of navDetailMap"
                  :key="mapIndex"
                >
                  <span>{{ mapItem.name }}：</span
                  ><span>{{ ele[mapItem.key] }}</span>
                </div>
                <div>
                  <span>发布日期：</span
                  ><span>{{ ele.createTime | parseTime("{y}-{m}-{d}") }}</span>
                </div>
                <div>
                  <span>申报日期：</span
                  ><span
                    >{{ ele.startTime | parseTime("{y}-{m}-{d}") }}至{{
                      ele.endTime | parseTime("{y}-{m}-{d}")
                    }}</span
                  >
                </div>
              </div>
            </div>

            <div v-if="ele.mouseOver" class="number">{{ (index * 5 + idx + 1 < 10) ? `0${index * 5 + idx + 1}` : index * 5 + idx + 1 }}</div>

            <div class="nav-list-item-button">
              <div class="nav-list-item-button-hover" @click.stop="JumpLink(ele.id,0)">申报指南</div>
              <div v-if="ele.url" @click.stop="JumpLink(ele.url,1)">网上申报</div>
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="more-box">
      <div class="more" @click="$router.push({name:'navigation'})">
        查看更多 <i class="el-icon-arrow-right"></i>
      </div>
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
      elegantList: [],
      imgUrl: require('@/assets/new-home/box-tips.png'),
      navDetailMap: [
        {
          name: '咨询电话',
          key: 'consultPhone'
        },
        {
          name: '责任部门',
          key: 'departmentName'
        }
      ],
      navData: [
        [
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          }
        ],
        [
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          },
          {
            img: '',
            title: '',
            desc: '',
            mouseOver: false
          }
        ]
      ]
    }
  },
  created() {
    this.getListData()
  },
  methods: {
    /**
     *  运营位图
     *  type: 0 内链 1 外联
     *  dataType：
     */
    JumpLink(params, type) {
      if (type === 0) { // 内链
        this.IndexSkipUrl.map((item) => {
          if (item.id === 2) {
            this.$router.push({
              name: item.detailUrl,
              query: {
                id: params
              }
            })
          }
        })
      } else { // 外链
        window.open(params)
      }
    },
    /**
     * @description 展示详情
     * @param {Number} index 一级数组下标
     * @param {Number} idx 二级数组下标
     * @param {Boolean}status 状态
     */
    showDetail(index, idx, status) {
      this.navData.map(item => {
        item.map(ele => {
          ele.mouseOver = false
        })
      })

      if (this.navData[index][idx]) {
        this.navData[index][idx].mouseOver = status
      }
    },
    /**
     * @description 获取数据
     */
    getListData() {
      const params = {
        type: 2
      }

      getList(params).then(res => {
        if (res.code == '000000') {
          const data = (res.data || []).map(item => {
            return {
              ...item,
              mouseOver: false
            }
          })

          this.navData = _chunk(data, 5)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.nav {
  width: 100%;
  padding: 20px;

  .nav-list {
    display: flex;
    cursor: pointer;
    &-item {
      width: 232px;
      padding: 13px 14px 22px;
      border: 1px solid rgba(230, 230, 230, 1);
      position: relative;
      overflow: hidden;
      &-normal {
        text-align: center;
        &-img {
          width: 100%;
          height: 174px;
          padding-bottom: 16px;
          img {
            width: 100%;
            height: 100%;
          }
        }

        &-title {
          font-size: 16px;
          height: 44px;
          line-height: 22px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-weight: 600;
        }

        &-desc {
          margin-top: 21px;
          margin-bottom: 32px;
          display: -webkit-box;
          -webkit-box-orinav: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          font-size: 12px;
          color: rgba(83, 91, 100, 1);
        }
      }
      .number {
        font-size: 60px;
        position: absolute;
        top: -17px;
        left: -7px;
        opacity: 0.2;
        font-weight: bold;
        font-family: 'PTDINCondensedCyrillic';
        color: #fff;
      }

      &-hover {
        color: #fff;
        &-title {
          text-align: center;
          font-size: 16px;
          height: 44px;
          line-height: 22px;
          margin-top: 43px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        &-detail {
          margin-top: 70px;
          margin-bottom: 42px;
          font-size: 12px;
          > div {
            margin-bottom: 10px;
          }
        }
      }

      &-button {
        margin: 32px auto 0;
        display: flex;
        justify-content: center;

        > div {
          padding: 5px 14px;
          // border-radius: 4px;
          cursor: pointer;
        }

        > div:first-child {
          background-color: rgba(18, 122, 230, 1);
          color: #fff;
          margin-right: 6px;
        }

        > div:last-child {
          background-color: rgba(230, 169, 14, 1);
          color: #fff;
        }
      }
      &:not(:last-child) {
        border-right: none;
      }
    }

    &-item:hover {
      background-image: linear-gradient(
        to bottom,
        rgba(18, 122, 230, 0.8),
        rgba(41, 178, 244, 1)
      );
      // border-radius: 8px;

      .nav-list-item-button-hover {
          background: #fff!important;
          color: rgba(18, 122, 230, 1)!important;
      }
    }

    &-item:last-child {
      margin-right: 0;
    }
  }
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
