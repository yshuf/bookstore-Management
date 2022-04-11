<!--
 * @Author: mobai
 * @Date: 2022-04-08 13:51:59
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-08 17:17:54
 * @FilePath: \bookstore-Management\src\views\mapBuild\components\echartsMap.vue
-->
<template>
  <div class="echartsBox">
    <div id="echartsMap" class="echartsMap"  ></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import uploadedDataURL from '../map/zhejiang.json';
export default {
  name: 'EchartsMap',
  data () {
    return {
      echartsMap: null,
      cityRiskCountList: [
        {
          name: '杭州市',
          value: 9
        },
        {
          name: '宁波市',
          value: 0
        },
        {
          name: '温州市',
          value: 0
        },
        {
          name: '绍兴市',
          value: 0
        },
        {
          name: '台州市',
          value: 846
        },
        {
          name: '嘉兴市',
          value: 0
        },
        {
          name: '金华市',
          value: 1
        },
        {
          name: '湖州市',
          value: 0
        },
        {
          name: '衢州市',
          value: 0
        },
        {
          name: '丽水市',
          value: 1
        },
        {
          name: '舟山市',
          value: 3
        }
      ]

    };
  },
  mounted () {
    this.echartsMap = echarts.init(document.getElementById('echartsMap'));
    echarts.registerMap('浙江省', uploadedDataURL);
    this.initMap();
  },
  methods: {
    initMap () {
      let option = null;
      option = (data = []) => {
        return {

          // backgroundColor: 'transparent',
          tooltip: {
            trigger: 'item',
            show: true,
            // 解决图标闪烁
            showDelay: 30, // 显示延时，添加显示延时可以避免频繁切换
            hideDelay: 0, // 隐藏延时
            // backgroundColor: 'transparent',
            formatter: function (params) {
              return ('<div><div>' + params.data.name + '</div><div> <span>XXXX数量:</span>' + params.data.value + ' 个</div><div> <spanXXXX数量:</span>' + params.data.entNumValue + ' 个</div></div>');
            },
            padding: 6
          },
          visualMap: {
            left: '80%',
            // seriesIndex: 1,
            // // type: 'piecewise',
            bottom: 0,
            min: 0,
            max: 100,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
            inRange: {
              color: ['#00FCFF', '#00ACFB', '#005BF6']
            }
          },
          /* geo: {
            map: '浙江省',
            roam: false,
            layoutCenter: ['50%', '50%'], 　　　　　　// 地图中心在屏幕中的位置
            // layoutSize: 330,
            zoom: 1, // 当前视角的缩放比例
            label: {
              textStyle: {
                fontSize: '.1rem'
              }
            },
            itemStyle: {
              normal: {
                areaColor: 'rgba(0,255,255,.02)',
                borderType: 'dashed',
                borderColor: 'rgb(0,182,147)',
                borderWidth: 1,
                shadowColor: 'rgb(255,255,255)',
                shadowOffsetX: 0,
                shadowOffsetY: 3,
                shadowBlur: 10
              },
              emphasis: {
                areaColor: 'transparent'
              }
            }
          }, */
          series: [{
            type: 'map',
            map: '浙江省',
            mapType: '浙江省',
            geoIndex: -1,
            zlevel: 0,
            // roam: false,
            zoom: 1,
            layoutCenter: ['50%', '50%'], 　　　　　　// 地图中心在屏幕中的位置
            layoutSize: 330, // 相对于屏幕匡高的百分比或者绝对像素大小
            label: {
              show: false,
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                // areaColor: 'rgba(32, 76, 131, 1)',
                borderColor: '#fff'
              }
              // emphasis: {
              //     areaColor: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              //         offset: 1,
              //         color: "rgba(50, 197, 255, 1)"
              //     }, {
              //         offset: 0,
              //         color: "rgba(0, 145, 255, 1)"
              //     }], false),
              //     label: {
              //         show: false
              //     }
              // }
            },
            data: data
            /* nameMap: {
              'Central and Western': '中西区',
              Eastern: '东区',
              Islands: '离岛',
              'Kowloon City': '九龙城',
              'Kwai Tsing': '葵青',
              'Kwun Tong': '观塘',
              North: '北区',
              'Sai Kung': '西贡',
              'Sha Tin': '沙田',
              'Sham Shui Po': '深水埗',
              Southern: '南区',
              'Tai Po': '大埔',
              'Tsuen Wan': '荃湾',
              'Tuen Mun': '屯门',
              'Wan Chai': '湾仔',
              'Wong Tai Sin': '黄大仙',
              'Yau Tsim Mong': '油尖旺',
              'Yuen Long': '元朗'
            } */
          }]
        };
      };
      this.echartsMap.setOption(option(this.cityRiskCountList));
    }

  }
};
</script>

<style lang="less" scoped>
.echartsBox {
  height: 100%;
  width: 100%;
  background-color: #033468;
  .echartsMap {
    height: 100%;
    width: 100%;

  }
}

</style>
