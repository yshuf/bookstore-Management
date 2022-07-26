const echarts = require('echarts');
export const pictorialBarOption = (
  data = {},
  outOptions = { title: '', name: '', unit: '%', barWidth: '22', fontSize: 16 }
) => {
  return {
    tooltip: {},
    grid: {
      top: '20%',
      left: '3%',
      right: '5%',
      bottom: '5%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.xAxis,
        axisTick: {
          alignWithLabel: true
        },
        nameTextStyle: {
          color: '#6A7474'
        },
        axisLine: {
          lineStyle: {
            color: '#53798C'
          }
        },
        axisLabel: {
          textStyle: {
            color: 'rgba(0,0,0,0.8)',
            fontSize: outOptions.fontSize ? outOptions.fontSize : 12
          },
          rotate: 55
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '单位：' + outOptions.unit,
        nameTextStyle: {
          fontSize: outOptions.fontSize ? outOptions.fontSize : 12,
          color: 'rgba(0,0,0,0.8)',
          padding: [10, 0, 0, 0]
        },
        // min: 0,
        axisLabel: {
          textStyle: {
            color: 'rgba(0,0,0,0.8)',
            fontSize: outOptions.fontSize ? outOptions.fontSize : 12
          },
          formatter: '{value}'
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(83, 121, 140, .56)'
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '',
        type: 'pictorialBar',
        symbolSize: [outOptions.barWidth ? outOptions.barWidth : '22', 10],
        symbolOffset: [0, -5],
        symbolPosition: 'end',
        z: 12,
        label: {
          normal: {
            color: 'rgba(0,0,0,0.8)',
            show: true,
            position: 'top',
            formatter: '{c}'
          }
        },
        itemStyle: {
          color: '#2BAAFF'
        },
        data: data.value
      },
      {
        type: 'bar',
        barWidth: outOptions.barWidth ? outOptions.barWidth : '22',
        data: data.value.map(item => item.value),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#2F85FF ' },
            { offset: 1, color: '#0E4989' }
          ])
        },
        markLine: {
          symbol: 'none', // 设置为 none 不显示箭头
          silent: true,
          label: {
            position: 'middle',
            formatter: '{b}',
            color: 'red'
          },
          data: data.markData.map(v => {
            return {
              name: v.name,
              yAxis: v.yAxis,
              lineStyle: {
                color: v.color
              },

              label: {
                position: 'insideEndTop',
                formatter: '{c}',
                color: v.color
              }
            };
          })
        }
      }
    ]
  };
};
