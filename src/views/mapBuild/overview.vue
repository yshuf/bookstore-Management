<!--
 * @Description: 地图初始化页面
 * @Author: MoBai
 * @Date: 2022-04-01 10:15:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-08-04 15:24:39
 * @FilePath: \bookstore-Management\src\views\mapBuild\overview.vue
-->
<template>
  <div class="mapBuild">
    <div class="selectListBox">
      <div :class="['select-item',activeIndex===index?'active':'']"  @click="selectShow(item,index)" v-for="(item,index) in selectList" :key="index">{{item.name}}</div>
    </div>
   <!--  <Map v-if="componentsId=='map'"></Map>
    <echarts-map v-if="componentsId=='echartsMap'"></echarts-map>
    <bubble-brick v-if="componentsId=='bubbleBrick'"></bubble-brick> -->

    <component :is='componentsId'></component>
  </div>
</template>

<script>
import EchartsMap from './components/echartsMap.vue';
import Echarts3DMap from './components/echarts3DMap.vue';
import Map from './components/map.vue';
import BubbleBrick from './components/bubbleBrick.vue';
export default {
  name: 'Overview',
  components: { Map, EchartsMap, BubbleBrick, Echarts3DMap },
  data () {
    return {
      componentsId: 'echarts3DMap',
      activeIndex: 1,
      selectList: [
        { name: 'echarts地图', componentId: 'echartsMap' },
        { name: 'echarts3D地图', componentId: 'echarts3DMap' },
        { name: '行政区域图层移入悬浮', componentId: 'map' },
        { name: '气泡下钻', componentId: 'bubbleBrick' }

      ]
    };
  },
  methods: {
    selectShow (item, i) {
      this.activeIndex = i;
      this.componentsId = item.componentId;
    }
  }
};
</script>

<style lang="less" scoped>
.mapBuild {
  width: 100%;
  height: 100%;
  .selectListBox {
    z-index:99999999;
    position: absolute;
    top: 3%;
    left: 2%;
    display: flex;
    box-shadow: 0px 2px 30px 0px rgba(42, 107, 255, 0.65);
    .select-item {
      cursor: pointer;
      padding: 6px 21px;
      border-radius: 2px;
      background-color: rgba(2, 21, 50, 1);
      color: rgba(255, 255, 255, 100);
      font-size: 14px;
      &:hover {
        background-color: rgba(42, 107, 255, 1);
      }
    }
    .active {
      background-color: rgba(42, 107, 255, 1);
    }
  }
}

</style>
