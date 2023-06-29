<!--
 * @Description: 地图初始化页面
 * @Author: MoBai
 * @Date: 2022-04-01 10:15:39
 * @LastEditors: mobai
 * @LastEditTime: 2023-06-25 16:24:54
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
import GaoDe3DPage from './components/gaoDe3DPage.vue';
import Build3DPage from './components/build3DPage.vue';
export default {
  name: 'Overview',
  components: { Map, EchartsMap, BubbleBrick, Echarts3DMap, GaoDe3DPage, Build3DPage },
  data () {
    return {
      componentsId: 'build3DPage',
      activeIndex: 5,
      selectList: [
        { name: 'echarts地图', componentId: 'echartsMap' },
        { name: 'echarts3D地图', componentId: 'echarts3DMap' },
        { name: '行政区域图层移入悬浮', componentId: 'map' },
        { name: '气泡下钻', componentId: 'bubbleBrick' },
        { name: '高德3d地图', componentId: 'gaoDe3DPage' },
        { name: '高德3d建筑物', componentId: 'build3DPage' }

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
