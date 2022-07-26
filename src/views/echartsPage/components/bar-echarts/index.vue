
<template>
  <div class="list_box">
    <div class="list_item" v-for="(item,index) in contentList" :key="index">
				<h3>{{item.title}}</h3>
				<div :id='`chartLineAndBar${index+1}`' class="chart"></div>
			</div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { pictorialBarOption } from '@/views/echartsPage/chart/index';

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
        },
        {
          title: '特殊柱状图'
        }
      ],
      colors: ['#EF4E4A', '#3BE49E']
    };
  },
  mounted () {
    const myChart1 = echarts.init(document.getElementById('chartLineAndBar1'));
    const myChart2 = echarts.init(document.getElementById('chartLineAndBar2'));
    const myChart3 = echarts.init(document.getElementById('chartLineAndBar3'));
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

    this.getTargetData();
  },
  methods: {
    getTargetData () {
      const industryInfo = [
        {
          indexName: '前十大行业工业增加值增速',
          name: '机械',
          value: '4.1'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '电子',
          value: '19.2'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '设备',
          value: '-2.2'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '制造',
          value: '2'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '制品',
          value: '11.1'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '纺织',
          value: '-2.3'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '非金属',
          value: '-3.6'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '金属',
          value: '4.9'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '医药',
          value: '3.6'
        },
        {
          indexName: '前十大行业工业增加值增速',
          name: '可专业设备',
          value: '5.8'
        }
      ];
      const averageInfo = [
        {
          name: '美加净增加值平均增速',
          value: '4.4'
        },
        {
          name: '定制增加值增速',
          value: '7.5'
        }
      ];
      const markData = [];
      const xData = [];
      let yData = [];
      averageInfo.map((item, index) => {
        const obj = {
          name: item.name,
          yAxis: item.value,
          color: this.colors[index]
        };
        markData.push(obj);
      });
      industryInfo.map(item => {
        xData.push(item.name);
      });
      yData = industryInfo.map(item => {
        return {
          value: parseFloat(item.value),
          symbolOffset: parseFloat(item.value) > 0 ? [0, -5] : [0, 5]
        };
      });
      this.initCharts(markData, xData, yData);
    },
    // 图标初始化
    initCharts (markData, xData, yData) {
      this.charts = echarts.init(document.getElementById('chartLineAndBar4'));
      const seriesData = {
        value: yData,
        markData: markData,
        xAxis: xData
      };
      const options = pictorialBarOption(seriesData, {
        unit: '%',
        barWidth: this.isShowSeriesValue ? this.barWidth : '22'
      });
      this.charts.setOption(options);
      this.isShowSeriesValue &&
        this.charts.setOption({
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 0,
              fontSize: this.transitionFontSize
            }
          },
          yAxis: {
            nameTextStyle: {
              fontSize: this.transitionFontSize
            },
            axisLabel: {
              fontSize: this.transitionFontSize
            }
          }
        });
    }
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
