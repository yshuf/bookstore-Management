<!--
 * @Author: mobai
 * @Date: 2022-07-21 10:01:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-25 10:53:03
 * @FilePath: \bookstore-Management\src\views\mapBuild\components\echarts3DMap.vue
-->
<template>
  <div class="echartsBox">
    <div class="map" id="mapContainer"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import LiShui from '@static/map/lishui.json';
export default {
  name: 'Echarts3DMap',
  data () {
    return {
      chartObj: null,
      option: {
        tooltip: {
          position: 'top',
          textStyle: {
            color: '#fff' // 设置文字颜色
          },
          backgroundColor: '#2E7AEC', // 修改背景颜色
          borderColor: 'rgba(151, 151, 151, 1)', // 修改字体颜色
          trigger: 'item',
          formatter: function (params) {
            return params.name;
          }
        },
        geo3D: {
          name: '丽水',
          type: 'map3D',
          map: '丽水',
          roam: true,
          boxDepth: 120, // 地图倾斜度
          boxHeight: 5,
          shading: 'lambert',
          regionHeight: 4, // 地图厚度
          label: {
            color: '#ffffff',
            fontSize: 16,
            // 标签的相关设置
            show: true, // (地图上的城市名称)是否显示标签 [ default: false ]
            formatter: function (params) {
              return params.name;
            }
          },
          groundPlane: {
            show: false,
            color: '#aaa'
          },
          // symbol: 'image:///static/images/map.png',
          itemStyle: {
            // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
            // areaColor: 'rgba(95,158,160,0.5)', // 地图板块的颜色
            color: 'rgba(10,108,200,1)', // 地图板块的颜色
            borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
            borderColor: 'rgba(106, 235, 245, 1)', // 图形描边的颜色。[ default: #333 ]
            shadowColor: 'rgba(0,228,242,0.5)',
            shadowBlur: 5
            /* color: '#082A52' */
          },
          emphasis: {
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              // areaColor: 'rgba(95,158,160,0.5)', // 地图板块的颜色
              color: 'rgba(10,108,200,1)', // 地图板块的颜色
              borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: 'rgba(106, 235, 245, 1)' // 图形描边的颜色。[ default: #333 ]
            }
          },
          viewControl: {
            minBeta: -360,
            maxBeta: 360,
            top: -20,
            zoomSensitivity: 1,
            distance: 160, // [ default: 100 ] 默认视角距离主体的距离，对于 geo3D 等其它组件来说是距离中心原点的距离
            alpha: 65, // 视角绕 x 轴，即上下旋转的角度。配合 beta 可以控制视角的方向。[ default: 40 ]
            beta: 15 // 视角绕 y 轴，即左右旋转的角度。[ default: 0 ]
          },
          data: [{ name: '丽水市' }]
        },
        series: [
          {
            name: '企业名称',
            type: 'scatter3D',
            coordinateSystem: 'geo3D',
            shading: 'lambert',
            itemStyle: {
              color: '#00FFFE'
            },
            geo3DIndex: 0,
            symbolSize: [24, 24],
            // symbol: 'pin',
            // symbol: 'path://static/images/map.png',
            // symbol: function(params) {
            //   console.log(params)
            //   if (params[2] === '0') {
            //     return 'pin'
            //   } else {
            //     return 'diamond'
            //   }
            // },
            symbol:
              'path://M14.4230769,22.3547009 C11.939956,25.5525731 10.6841618,27.6266472 10.6556945,28.5769231 C10.6556945,27.647352 9.34738604,25.5732779 6.73076923,22.3547009 L6.73076923,22.3547009 Z M10.5769231,0 C16.4198321,0 21.1538462,4.78661419 21.1538462,10.6880342 C21.1538462,16.5894542 16.4198321,21.3760684 10.5769231,21.3760684 C4.73401403,21.3760684 0,16.5894542 0,10.6880342 C0,4.78661419 4.73401403,0 10.5769231,0 Z M10.5769231,1.15384615 C5.37413712,1.15384615 1.15384615,5.42102925 1.15384615,10.6880342 C1.15384615,15.9550391 5.37413712,20.2222222 10.5769231,20.2222222 C15.779709,20.2222222 20,15.9550391 20,10.6880342 C20,5.42102925 15.779709,1.15384615 10.5769231,1.15384615 Z M11.3461526,5.24358974 C11.5619297,5.24358974 11.7428332,5.40336982 11.78037,5.61246531 L11.7875141,5.69297202 L11.7875141,7.49050605 L15.9804569,7.49050605 C16.1962339,7.49050605 16.3771374,7.65028613 16.4146742,7.85938162 L16.4218184,7.93988833 L16.4218159,14.4559351 L16.7307692,14.4559351 L16.7307692,15.3547009 L5.96153846,15.3547009 L5.96153846,14.4559351 L6.27049175,14.4559351 L6.27049175,5.69297202 C6.27049175,5.47327369 6.42742,5.28908269 6.63278346,5.25086368 L6.71185326,5.24358974 L11.3461526,5.24358974 Z M9.91172595,11.8719876 L8.14627512,11.8719876 L8.14627512,12.7707534 L9.91172595,12.7707534 L9.91172595,11.8719876 Z M14.5460253,11.8719876 L12.7805745,11.8719876 L12.7805745,12.7707534 L14.5460253,12.7707534 L14.5460253,11.8719876 Z M9.91172595,9.98458053 L8.14627512,9.98458053 L8.14627512,10.8833463 L9.91172595,10.8833463 L9.91172595,9.98458053 Z M14.5460253,9.98458053 L12.7805745,9.98458053 L12.7805745,10.8833463 L14.5460253,10.8833463 L14.5460253,9.98458053 Z M9.91172595,8.11964788 L8.14627512,8.11964788 L8.14627512,9.01841367 L9.91172595,9.01841367 L9.91172595,8.11964788 Z',
            zlevel: 9999,
            label: {
              normal: {
                show: false,
                textStyle: {
                  color: '#ffffff',
                  fontSize: 12
                },
                position: 'top'
              },
              emphasis: {
                show: false,
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                // borderColor: 'rgba(151, 151, 151, 1)',
                borderWidth: 2,
                formatter (value) {
                  return value.data.name;
                }
              }
            },
            data: []
          }
        ]
      }
    };
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap();
    });
  },
  methods: {
    initMap () {
      this.chartObj = echarts.init(document.getElementById('mapContainer'));
      echarts.registerMap('丽水', LiShui);
      this.chartObj.setOption(this.option);
    }
  }
};
</script>
<style lang="less" scoped>
.echartsBox{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
  #mapContainer {
    width: 100%;
    height: 100%;
    /deep/ .amap-copyright {
      opacity: 0 !important;
    }
  }
}

</style>
