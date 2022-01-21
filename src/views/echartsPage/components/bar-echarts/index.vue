
<template>
  <div class="list_box">
    <div class="list_item" v-for="(item,index) in contentList" :key="index">
				<h3>{{item.title}}</h3>
				<div :id='`chart${index+1}`' class="chart"></div>
			</div>
  </div>
</template>

<script>
import echarts from 'echarts';

export default {
  name: 'echartsAll',
  data () {
    return {
      contentList: [
        {
          title: '圆角柱图'
        }, {
          title: '双轴圆角柱图'
        },
        {
          title: '圆角横向柱图'
        }
      ]
    };
  },
  mounted () {
    const myChart1 = echarts.init(document.getElementById('chart1'));
    const myChart2 = echarts.init(document.getElementById('chart2'));
    const myChart3 = echarts.init(document.getElementById('chart3'));
    myChart1.setOption({
      // 图例
      legend: {
        data: ['销量']
      },
      // x轴
      xAxis: {
        data: [
          '衬衫',
          '羊毛衫',
          '雪纺衫',
          '裤子',
          '高跟鞋',
          '袜子'
        ]
      },
      // y轴
      yAxis: {},
      // 数据
      series: [
        {
          name: '销量',
          type: 'bar',
          barWidth: 30,
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#00CCFF' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#005AFF' // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [30, 30, 0, 0],
              shadowColor: 'rgba(25, 122, 255, 0.88)',
              shadowBlur: 12
            }
          }
        }
      ]
    });
    myChart2.setOption({
      // 图例
      legend: {
        right: 20,
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          color: '#000'
        }
      },
      grid: {
        top: 80,
        bottom: 80
        // left: 80,
        // right: 80,
      },
      // x轴
      xAxis: {
        data: [
          '衬衫',
          '羊毛衫',
          '雪纺衫',
          '裤子',
          '高跟鞋',
          '袜子'
        ]
      },
      yAxis: [
        {
          name: '单位（笔）',
          nameTextStyle: {
            color: '#000'
          },
          type: 'value',
          position: 'left',
          splitNumber: 5,
          min: 0,
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            // 分割线
            show: true,
            lineStyle: {
              color: 'rgba(52, 99, 251, 0.18)',
              type: 'solid'
            }
          }
        },
        {
          name: '单位（亿元）',
          nameTextStyle: {
            color: '#000'
          },
          type: 'value',
          position: 'right',
          splitNumber: 5,
          min: 0,
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#000'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            // 分割线
            show: true,
            lineStyle: {
              color: 'rgba(52, 99, 251, 0.18)',
              type: 'solid'
            }
          }
        }
      ],
      series: [
        {
          name: '需求数量',
          type: 'bar',
          barWidth: '25',
          barGap: '40%',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#00CCFF' // 近轴处的颜色
                  },
                  {
                    offset: 1,
                    color: '#005AFF' // 远轴处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [30, 30, 0, 0],
              shadowColor: 'rgba(25, 122, 255, 0.88)',
              shadowBlur: 12
            }
          },
          label: {
            color: '#00CCFF',
            show: true,
            position: 'top'
          }
        },
        {
          name: '需求金额',
          yAxisIndex: 1,
          type: 'bar',
          barWidth: '25',
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#FF9C00' // 近轴处的颜色
                  },
                  {
                    offset: 1,
                    color: '#FF3600' // 远轴处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [30, 30, 0, 0],
              shadowColor: 'rgba(255, 145, 58, 0.29)',
              shadowBlur: 12
            }
          },
          label: {
            color: '#FF9C00',
            show: true,
            position: 'top'
          }
        }
      ]
    });
    myChart3.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 60,
        left: 80
      },
      calculable: false,
      yAxis: {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: 'rgba(52, 99, 251, 0.18)'
          }
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#000'
          }
        },
        axisTick: {
          show: false
        },
        data: [
          '衬衫',
          '羊毛衫',
          '雪纺衫',
          '裤子',
          '高跟鞋',
          '袜子'
        ]
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#000'
          }
        },
        splitLine: {
          // 分割线
          show: true,
          lineStyle: {
            color: 'rgba(52, 99, 251, 0.18)',
            type: 'solid'
          }
        }
      },
      series: [
        {
          name: '授信数量',
          type: 'bar',
          barWidth: 30,
          data: [5, 20, 36, 10, 10, 20],
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: '#F2C485' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#FE9700' // 100% 处的颜色
                  }
                ],
                false
              ),
              barBorderRadius: [0, 30, 30, 0],
              shadowColor: 'rgba(254, 151, 0, 0.65)',
              shadowBlur: 12
            }
          }
        }
      ]
    });
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
 .list_box {
    display: flex;
    justify-content: start;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
  .list_item {
    margin: 20px 0;
    width: 32%;
    height: 500px;
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid rgba(214, 214, 214, 0.5);
    border-radius: 4px;
    box-sizing: border-box;
    &:not(:nth-child(3n+3)){
      margin-right: (100% - 3*32%)/2;
    }
    h3 {
      text-align: center;
      margin: 0;
      font-size: 16px;
      border-bottom: 1px solid rgba(214, 214, 214, 0.5);
      padding: 5px 0;
    }
    .chart {
      width: 100%;
      height: 450px;
    }
  }
}
</style>
