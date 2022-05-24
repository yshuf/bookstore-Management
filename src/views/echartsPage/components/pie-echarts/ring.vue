<template>
  <div class="main">
    <div class="rightChartBox" ref="rightCharts"></div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  name: 'BottomCenter',
  data () {
    return {
      dataList: [
        {
          id: 1,
          type: '缙云县',
          value: null,
          proportion: 0.01
        },
        {
          id: 1,
          type: '松阳县',
          value: null,
          proportion: 0.01
        },
        {
          id: 1,
          type: '庆元县',
          value: null,
          proportion: 17.28
        },
        {
          id: 3,
          type: '龙泉市',
          value: null,
          proportion: 6.12
        },
        {
          id: 2,
          type: '莲都区',
          value: null,
          proportion: 20.1
        },
        {
          id: 2,
          type: '青田县',
          value: null,
          proportion: 18.5
        },
        {
          id: 4,
          type: '遂昌县',
          value: null,
          proportion: 1.75
        },
        {
          id: 4,
          type: '云和县',
          value: null,
          proportion: 20.48
        },
        {
          id: 4,
          type: '景宁县',
          value: null,
          proportion: 15.75
        }
      ],
      centerChart: null,
      pieChart: {
        seriesData: []
      },
      colorList: ['#0068FF', '#52B6FF', '#46F1F7', '#FFCF1D', '#FF7714']
    };
  },
  mounted () {
    this.centerChart = echarts.init(this.$refs.rightCharts);
    this.dataList.map((v, i) => {
      this.pieChart.seriesData.push(
        {
          value: v.proportion,
          show: true,
          name: v.type,
          itemStyle: {
            normal: {
              color: this.colorList[i]
            }
          }
        }
        /* {
          value: 3,
          show: false,
          name: '',
          itemStyle: {
            normal: {
              color: '#002f6a',
            },
          },
        } */
      );
    });
    window.addEventListener('resize', () => {
      this.centerChart.resize();
    });
    this.initChart();
  },
  methods: {
    initChart () {
      let option = null;

      const dataList = this.pieChart.seriesData;
      option = {
        graphic: {
          // 这个属性可以在饼图内部填充图片,文字等
          elements: [
            {
              type: 'image', // 需要填充图片,配置image,如果不需要图片可以配置其他的, text, circle, sector, ring, polygon, polyline, rect, line, bezierCurve, arc, group,
              style: {
                image: '/static/images/echarts/llzb.png', // 这里添加图片地址
                width: 40,
                height: 40
              },
              z: 999,
              left: '18.5%',
              top: '39.0%'
            }
          ]
        },
        legend: {
          // selectedMode: false, // 取消图例上的点击事件
          type: 'plain',
          itemGap: 8,
          itemWidth: 8, // 设置宽度
          itemHeight: 8, // 设置高度
          symbolKeepAspect: false,
          show: true,
          orient: 'vertical',
          icon: 'react',
          right: '5%',
          bottom: '10%',
          data: dataList.map((item) => {
            if (item.show) {
              return item.name;
            }
          }),
          formatter: function (name) {
            if (dataList && dataList.length) {
              for (var i = 0; i < dataList.length; i++) {
                if (name === dataList[i].name) {
                  return (
                    '{name| ' +
                    name +
                    '}  ' +
                    '{value| ' +
                    dataList[i].value +
                    '%}'
                  );
                }
              }
            }
          },
          textStyle: {
            color: '#D8DDE3',
            lineHeight: 10,
            rich: {
              name: {
                verticalAlign: 'right',
                align: 'left',
                padding: [0, 0, 0, 0],
                fontSize: 12
              },
              value: {
                align: 'left',
                fontSize: 12
              }
            }
          }
        },
        series: [
          {
            name: '丽水市流量占比',
            type: 'pie',
            radius: ['30%', '45%'],
            center: ['30%', '45%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            tooltip: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: dataList
          },
          // 边框的设置
          {
            radius: ['55%', '65%'],
            center: ['30%', '45%'],
            type: 'pie',
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            animation: false,
            data: [
              {
                value: 0.5,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(70, 241, 247, 0)' }, // 柱图渐变色
                      { offset: 0.5, color: 'rgba(0, 102, 255,0.34)' }, // 柱图渐变色
                      { offset: 1, color: 'rgba(70, 241, 247, 0)' } // 柱图渐变色
                    ])
                  }
                }
              },
              {
                value: 0.5,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: 'rgba(70, 241, 247, 0)' }, // 柱图渐变色
                      { offset: 0.5, color: 'rgba( 9,58,68,1)' }, // 柱图渐变色
                      { offset: 1, color: 'rgba(70, 241, 247, 0)' } // 柱图渐变色
                    ])
                  }
                }
              }
            ]
          }
        ]
      };
      this.centerChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: calc(100% - 20px);
  .rightChartBox {
    width: 100%;
    height: 100%;
  }
}
</style>
