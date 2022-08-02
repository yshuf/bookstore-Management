<!--
 * @Author: mobai
 * @Date: 2022-07-21 10:01:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-29 09:51:55
 * @FilePath: \bookstore-Management\src\views\mapBuild\components\echarts3DMap.vue
-->
<template>
  <div class="echartsBox">
    <div class="map" id="mapContainer"></div>
    <div class="backInit" @click="backInitMap()" v-if="isShowBack">返回</div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import 'echarts-gl';
import LiShui from '@static/map/jiangXi.json';
export default {
  name: 'Echarts3DMap',
  data () {
    return {
      chartObj: null,
      cityName: '',
      isShowBack: false, // 是否显示返回按钮
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
            // areaColor: 'rgba(10,108,200,1)', // 地图板块的颜色
            color: '#0A7CF1', // 地图板块的颜色
            borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
            borderColor: 'rgba(106, 235, 245, 1)', // 图形描边的颜色。[ default: #333 ]
            shadowColor: 'rgba(0,228,242,0.5)',
            shadowBlur: 5
            /* color: '#082A52' */
          },
          emphasis: {
            itemStyle: {
              // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
              // areaColor: 'rgba(10,108,200,1)', // 地图板块的颜色
              color: '#0A7CF1', // 地图板块的颜色
              borderWidth: 1, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域 [ default: 0 ]
              borderColor: 'rgba(106, 235, 245, 1)' // 图形描边的颜色。[ default: #333 ]
            },
            label: { // 解决点击无法拿到城市名问题，在高亮实践中获取高亮区域的城市名称，保存到全局使用
              formatter: params => {
                this.cityName = params.name;
                return params.name;
              }

            }
          },
          light: { // 光照相关的设置。在 shading 为 'color' 的时候无效。
          // 光照的设置会影响到组件以及组件所在坐标系上的所有图表。合理的光照设置能够让整个场景的明暗变得更丰富，更有层次。
            main: { // 场景主光源的设置，在 globe 组件中就是太阳光。
              intensity: 1, // 主光源的强度。[ default: 1 ]
              shadow: true, // 主光源是否投射阴影。默认关闭。 开启阴影可以给场景带来更真实和有层次的光照效果。但是同时也会增加程序的运行开销。
              shadowQuality: 'ultra',
              alpha: 10, // 主光源绕 x 轴，即上下旋转的角度。配合 beta 控制光源的方向。[ default: 40 ]
              beta: 10 // 主光源绕 y 轴，即左右旋转的角度。[ default: 40 ]
            },
            ambient: { // 全局的环境光设置。
              color: '#fff', // 环境光的颜色。[ default: #fff ]
              intensity: 0.6 // 环境光的强度。[ default: 0.2 ]
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
      if (this.chartObj) {
        this.chartObj.clear();
      }
      this.chartObj = echarts.init(document.getElementById('mapContainer'));
      echarts.registerMap('丽水', LiShui);
      this.chartObj.setOption(this.option);
      // 2d地图点击
      // this.chartObj.on('click', (params) => {
      // params存有一系列参数可供使用
      // });
      // 3d地图点击
      this.chartObj.getZr().on('click', (e) => {
        // e 只有跟鼠标点击位置相关的坐标,offsetX和offsetY相对画布的坐标
        // 无法获取其他关于地图数据的参数
        console.log(e, this.cityName);
        // 通过获取的名字查找相应的城市code，利用code请求城市地理数据，然后下钻
        // bug：发现不管是点击地图上还是地图外 ，都会进行下钻，因为点击时获取的是整个画布
        // 解决方法：通过鼠标的状态进行判断，cursor为pointer时在地图上，default时在地图外
        // 获取鼠标样式 id为画布id
        this.isShowBack = true; // 点击成功，显示返回按钮
        const mouseStyle = document.getElementById('mapContainer').children[0].style
          .cursor;
        // 根据鼠标样式,城市名称,鼠标点击的位置下钻
        // TODO:需要根据点击的市名字查找点击的市code,发送请求,获取市的相关地理数据
        if (this.cityName !== '' && mouseStyle === 'pointer'
        ) {
          this.initSecondMap();
        }
      });
    },
    // 下砖级图层显示
    initSecondMap () {
      if (this.chartObj) {
        this.chartObj.dispose();
      }
      this.chartObj = echarts.init(document.getElementById('mapContainer'));
      const mapJson = {
        features: LiShui.features.filter((v) => {
          return v.properties.name === this.cityName;
        })
      };
      echarts.registerMap('丽水', mapJson);
      this.chartObj.setOption(this.option);
    },
    backInitMap () {
      this.initMap();
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
  .backInit {
    position: absolute;
    right: 10%;
    bottom: 10%;
    cursor: pointer;
  }
}

</style>
