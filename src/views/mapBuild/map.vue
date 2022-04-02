<!--
 * @Author: your name
 * @Date: 2022-01-21 10:30:12
 * @LastEditTime: 2022-04-02 09:26:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \bookstore-Management\src\views\mapBuild\map.vue
-->

<template>
  <div id="mapBox">
    <div id="mapContainer"></div>
  </div>
</template>

<script>
import { SrsCode } from '../map';
export default {
  name: 'mapBuild',
  data () {
    return {
      mapObj: null
    };
  },
  mounted () {
    this.initMap();
  },
  methods: {
    // 广丰经纬度 118.19158, 28.43766
    // 南昌  115.89, 28.68
    initMap () {
      this.mapObj = new AMap.Map('mapContainer', {
        resizeEnable: true,
        zoom: 9.4, // 级别
        zooms: [5, 19],
        center: [117.271185, 28.74442], // 中心点坐标
        viewMode: '2D'// 使用3D视图
      });

      this.mapObj.on('complete', () => {
        this.initDistrict();
      });
    },
    initDistrict () {
      AMap.plugin('AMap.DistrictSearch', () => {
        const district = new AMap.DistrictSearch({
          subdistrict: 2, // 不返回下一级行政区
          extensions: 'all', // 返回行政区边界坐标组等具体信息
          level: 'district' // 查询行政级别
        });
        console.log(SrsCode);
        for (let index = 0; index < SrsCode.length; index++) {
          district.search(SrsCode[index].code, (status, result) => {
            console.log(status, result);
            if (status === 'complete') {
              getData(result.districtList[0]);
            }
          });

          const getData = data => {
            var bounds = data.boundaries;
            var polygons = [];
            if (bounds) {
              for (var i = 0, l = bounds.length; i < l; i++) {
                var polygon = new AMap.Polygon({
                  map: this.mapObj,
                  strokeWeight: 1,
                  strokeColor: 'rgba(255, 71, 25, 0.46)',
                  fillColor: 'rgba(255, 135, 25, 0.2)',
                  fillOpacity: 0.8,
                  zIndex: 100,
                  path: bounds[i]
                });
                polygons.push(polygon);
              }
            }
          };
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#mapBox {
  width: 100%;
  height: 100%;
  #mapContainer {
    width: 100%;
    height: 100%;
  }
}

</style>
