<!--
 * @Description:
 * @Author: mobai
 * @Date: 2023-06-25 16:24:55
 * @LastEditors: mobai
 * @LastEditTime: 2023-06-27 17:31:06
 * @FilePath: \bookstore-Management\src\views\mapBuild\components\build3DPage.vue
-->
<template>
<div class="mapBox">
  <div id="mapContainer" class="mapContainer">
    <div class="mapMask"></div>
  </div>
  <div class="switchBtn" @click="changeMapStyle()">
      切换地图
    </div>
</div>
</template>

<script>
export default {
  name: 'Build3DPage',
  data () {
    return {
      mapObj: null,
      styleType: 'default'
    };
  },
  mounted () {
    this.initMap();
  },
  methods: {
    initMap () {
      this.mapObj = new AMap.Map('mapContainer', {
        features: ['bg', 'road', 'point', 'building'],
        showLabel: true,
        rotateEnable: false,
        pitchEnable: false,
        zoom: 17,
        pitch: 65,
        rotation: 45,
        viewMode: '3D', // 开启3D视图,默认为关闭
        zooms: [2, 20],
        center: [120.582112, 29.997117],
        mapStyle: 'amap://styles/7bb561528901841af6f4c4ef711aeea7'
      });
    },
    initLoadMap () {
      this.styleType = 'Satellite';
      // 切换地图样式
      this.layers = new AMap.TileLayer.Satellite({ map: this.mapObj });
      this.layers && this.layers.show();
    },
    changeMapStyle () {
      if (this.styleType === 'default') {
        this.initLoadMap();
      } else {
        this.layers && this.layers.hide();
        this.styleType = 'default';
      }
      this.mapObj.remove(this.markerList);
      this.setMarker();
    }
  }
};
</script>

<style lang="less" scoped>
.mapBox {
  position: relative;
    width: 100%;
    height: 100%;
    background: rgb(26, 35, 44);

.mapContainer {
  width: 100%;
  height: 100%;
  position: relative;
  .mapMask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background-image: linear-gradient(
          180deg,
          rgba(17, 30, 50, 0.85) 0%,
          rgba(0, 14, 36, 0.5) 15%,
          rgba(0, 14, 36, 0) 50%,
          rgba(0, 14, 36, 0.8) 85%,
          rgba(17, 30, 50, 0.85) 100%
        ),
        linear-gradient(
          90deg,
          rgba(17, 30, 50, 0.85) 0%,
          rgba(0, 14, 36, 0.8) 20%,
          rgba(0, 14, 36, 0) 40%,
          rgba(0, 14, 36, 0) 50%,
          rgba(0, 14, 36, 0) 60%,
          rgba(0, 14, 36, 0.8) 80%,
          rgba(17, 30, 50, 0.85) 100%
        );
    }
}
    .switchBtn {
    position: absolute;
    right: 450px;
    bottom: 275px;
    z-index: 111;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 76px;
    height: 20px;
    color: white;
    cursor: pointer;
    background: rgb(20, 146, 255);
    border-radius: 2px;
    font-size: 12px;

  }
}
</style>
