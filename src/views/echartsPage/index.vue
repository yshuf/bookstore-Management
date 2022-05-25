<template>
  <div class="echarts-all">
          <bar-echarts />
    <div class="list_box">
			<div class="list_item">
				<h3>折线图</h3>
				<div id="chart4" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>平滑折线图</h3>
				<div id="chart5" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>柱图折线图混合</h3>
				<div id="chart6" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>简单饼图 / 环图</h3>
				<div id="chart7" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>中心统计渐变色</h3>
				<div id="chart8" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>环图嵌套饼图</h3>
				<div id="chart9" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>玫瑰饼图 / 环图</h3>
				<div id="chart10" class="chart"></div>
			</div>
      <div class="list_item">
				<h3>特殊环形</h3>
				<all-circle></all-circle>
			</div>
      <div class="list_item">
				<h3>特殊环形</h3>
				<Ring></Ring>
			</div>
      <div class="list_item">
				<h3>半圆环</h3>
				<Semicircle :policyPayFunnelPlot="policyPayFunnelPlot"></Semicircle>
			</div>
      <div class="list_item">
				<h3>漏斗图</h3>
				<funnel-diagram :policyPayFunnelPlot="policyPayFunnelPlot"></funnel-diagram>
			</div>
      <div class="list_item">
				<h3>半玫瑰图</h3>
				<half-rose :policyPayFunnelPlot="policyPayFunnelPlot"></half-rose>
			</div>
			<div class="list_item">
				<h3>单个数据环形统计</h3>
				<div id="chartA" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>象形柱图</h3>
				<div id="chartB" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>带偏移的双象形柱图</h3>
				<div id="chartC" class="chart"></div>
			</div>
			<div class="list_item">
				<h3>重复象形柱图</h3>
				<div id="chartD" class="chart"></div>
			</div>
		</div>
  </div>
</template>

<script>
import echarts from 'echarts';

import BarEcharts from './components/bar-echarts/index';
import AllCircle from './components/pie-echarts/all-circle.vue';
import Ring from './components/pie-echarts/ring.vue';
import Semicircle from './components/pie-echarts/semicircle.vue';
import FunnelDiagram from './components/funnel-echarts/funnel-diagram.vue';
import HalfRose from './components/pie-echarts/half-rose.vue';
export default {
  name: 'echartsAll',
  components: { BarEcharts, Ring, Semicircle, FunnelDiagram, HalfRose, AllCircle },
  data () {
    return {
      policyPayFunnelPlot: {
        applyNum: 8,
        endNum: 7,
        endRate: 0.875,
        payNum: 4,
        payRate: 0.5
      }
    };
  },
  mounted () {
    const halfMonth = [];
    const halfCount = [];
    const halfAmount = [];
    const data = [
      {
        name: '2月',
        count: 0,
        amount: 10
      },
      {
        name: '3月',
        count: 1,
        amount: 22
      },
      {
        name: '4月',
        count: 9,
        amount: 34
      },
      {
        name: '5月',
        count: 5,
        amount: 76
      },
      {
        name: '6月',
        count: 0,
        amount: 10
      },
      {
        name: '7月',
        count: 1,
        amount: 21
      }
    ];
    data.map((v) => {
      halfMonth.push(v.name);
      halfCount.push(v.count);
      halfAmount.push(v.amount);
    });

    const maxL = Math.ceil(Math.max.apply(null, halfCount) / 5);
    const maxR = Math.ceil(
      Math.max.apply(null, halfAmount) > 1
        ? Math.max.apply(null, halfAmount) / 5
        : Math.max.apply(null, halfAmount) / 0.5
    );
    const myChart4 = echarts.init(document.getElementById('chart4'));
    const myChart5 = echarts.init(document.getElementById('chart5'));
    const myChart6 = echarts.init(document.getElementById('chart6'));
    const myChart7 = echarts.init(document.getElementById('chart7'));
    const myChart8 = echarts.init(document.getElementById('chart8'));
    const myChart9 = echarts.init(document.getElementById('chart9'));
    const myChart10 = echarts.init(document.getElementById('chart10'));
    const myChartA = echarts.init(document.getElementById('chartA'));
    const myChartB = echarts.init(document.getElementById('chartB'));
    const myChartC = echarts.init(document.getElementById('chartC'));
    const myChartD = echarts.init(document.getElementById('chartD'));

    myChart4.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }
      ]
    });
    myChart5.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 80,
        bottom: 80
        // left: 80,
        // right: 80,
      },
      legend: {
        right: 80,
        top: 40,
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          color: '#000'
        },
        icon: 'roundRect'
      },
      calculable: false,
      xAxis: [
        {
          type: 'category',
          axisLine: {},
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          name: '销售数量',
          type: 'value',
          position: 'left',
          splitNumber: 5,
          axisLine: {
            show: false
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
          name: '销售数量',
          type: 'line',
          // 折线图平滑
          smooth: true,
          data: [120, 200, 150, 80, 70, 110, 130],
          // 曲线的样式
          itemStyle: {
            color: 'rgba(0, 90, 255, 1)'
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0, // 近轴处的颜色
                    color: 'rgba(0, 90, 255, 1)'
                  },
                  {
                    offset: 1, // 远轴处的颜色
                    color: 'rgba(0, 204, 255, 0)'
                  }
                ]
              }
            }
          }
        }
      ]
    });
    myChart6.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 30,
        bottom: 20
      },
      legend: {
        right: 200,
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          color: '#ADD6FF'
        }
      },
      calculable: false,
      xAxis: [
        {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'rgba(52, 99, 251, 0.18)'
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#ADD6FF'
            }
          },
          axisTick: {
            show: false
          },
          data: halfMonth
        }
      ],
      yAxis: [
        {
          name: '单位（笔数）',
          nameTextStyle: {
            color: '#ADD6FF'
          },
          type: 'value',
          position: 'left',
          splitNumber: 5,
          interval: maxL,
          min: 0,
          max: maxL * 5,
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#ADD6FF'
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
            color: '#ADD6FF'
          },
          type: 'value',
          position: 'right',
          splitNumber: 5,
          interval: maxR,
          min: 0,
          max: maxR >= 1 ? maxR * 5 : maxR * 0.5,
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#ADD6FF'
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
          name: '授信笔数',
          type: 'line',
          barWidth: '15',
          data: halfCount,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                1,
                0,
                0,
                [
                  {
                    offset: 1,
                    color: '#0AFACA'
                  },
                  {
                    offset: 0,
                    color: '#00BFFF'
                  }
                ],
                false
              )
            }
          }
        },
        {
          name: '授信金额',
          yAxisIndex: 1,
          type: 'bar',
          barWidth: '15',
          data: halfAmount,
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
              )
            }
          }
        }
      ]
    });
    myChart7.setOption({
      // title: {
      // 	text: '简单饼图 / 环图',
      // 	subtext: '自行切换饼图环图案例',
      // 	left: 'center',
      // },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '分布',
          type: 'pie',
          radius: '55%', // 饼图
          // radius: ['50%', '60%'],  // 环图
          center: ['50%', '60%'],
          data: [
            {
              name: '中小微企业',
              value: 1
            },
            {
              name: '发债帮扶民营企业',
              value: 2
            },
            {
              name: '重优农业企业',
              value: 3
            },
            {
              name: '国高企业',
              value: 4
            },
            {
              name: '重优流通企业',
              value: 5
            },
            {
              name: '省科中小企业',
              value: 6
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });

    const creditInfo = [
      {
        name: '中小微企业',
        count: null,
        amount: 1,
        rate: 5
      },
      {
        name: '发债帮扶民营企业',
        count: null,
        amount: 2,
        rate: 10
      },
      {
        name: '重优农业企业',
        count: null,
        amount: 3,
        rate: 14
      },
      {
        name: '国高企业',
        count: null,
        amount: 4,
        rate: 19
      },
      {
        name: '重优流通企业',
        count: null,
        amount: 5,
        rate: 24
      },
      {
        name: '省科中小企业',
        count: null,
        amount: 6,
        rate: 29
      }
    ];
    const legendName = [];
    let sum = 0;
    const data1 = [];
    const color1 = [
      'rgba(0, 140, 239, 1)',
      'rgba(242, 196, 133, 1)',
      'rgba(255, 156, 0, 1)',
      'rgba(158, 244, 197, 1)',
      'rgba(0, 204, 255, 1)',
      'rgba(5,255,224,1)'
    ];
    const color2 = [
      'rgba(0, 140, 239, 1)',
      'rgba(254, 151, 0, 1)',
      'rgba(255, 54, 0, 1)',
      'rgba(77, 214, 140, 1)',
      'rgba(0, 90, 255, 1)',
      'rgba(0,191,254,1)'
    ];
    creditInfo.map((v, i) => {
      legendName.push(v.name);
      sum += v.amount;
      data1.push({
        value: v.amount,
        name: v.name,
        rate: v.rate,
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
                  color: color1[i] ? color1[i] : '#fff' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: color1[i] ? color2[i] : '#fff' // 100% 处的颜色
                }
              ]
            )
          }
        }
      });
    });

    myChart8.setOption({
      tooltip: {
        trigger: 'item',
        formatter: function (d) {
          return (
            d.name +
							'：' +
							d.value +
							'(万) ' +
							d.data.rate +
							'(%)'
          );
        }
      },
      title: {
        text: [
          '{txt|' + sum.toFixed(2) + '万}',
          '{txt2|\n累计授信额}'
        ].join(''),
        top: '35%',
        left: '20%',
        textStyle: {
          rich: {
            txt: {
              color: '#ff0000',
              lineHeight: 20,
              width: 180,
              align: 'center',
              fontSize: 26
            },
            txt2: {
              color: '#333',
              lineHeight: 40,
              width: 180,
              align: 'center',
              fontSize: 24
            }
          }
        }
      },
      legend: {
        data: legendName,
        right: '0%',
        top: '20%',
        orient: 'vertical',
        itemWidth: 14,
        itemHeight: 14,
        textStyle: {
          color: '#333'
        }
      },
      series: [
        {
          name: '特色培育库授信情况分析',
          type: 'pie',
          radius: ['55%', '70%'],
          center: ['40%', '40%'],
          avoidLabelOverlap: true,
          label: {
            normal: {
              show: false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: data1
        }
      ]
    });
    const data2 = [
      {
        name: '中小微企业',
        value: 5
      },
      {
        name: '发债帮扶民营企业',
        value: 10
      },
      {
        name: '重优农业企业',
        value: 14
      },
      {
        name: '国高企业',
        value: 19
      },
      {
        name: '重优流通企业',
        value: 24
      },
      {
        name: '省科中小企业',
        value: 29
      }
    ];
    myChart9.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal', // 布局方式，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
        bottom: 10
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          radius: [0, '30%'],

          label: {
            position: 'inner'
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 335, name: '私企', selected: true },
            { value: 679, name: '合资' },
            { value: 1548, name: '国营' }
          ]
        },
        {
          name: '类型',
          type: 'pie',
          radius: ['40%', '55%'],
          label: {
            // 可以去掉注释查看自定义效果
            // formatter: '{a|{a}}{abg|}\\n{hr|}\\n  {b|{b}：}{c}  {per|{d}%}  ',
            // backgroundColor: '#eee',
            // borderColor: '#aaa',
            // borderWidth: 1,
            // borderRadius: 4,
            // shadowBlur:3,
            // shadowOffsetX: 2,
            // shadowOffsetY: 2,
            // shadowColor: '#999',
            // padding: [0, 7],
            // rich: {
            //     a: {
            //         color: '#999',
            //         lineHeight: 22,
            //         align: 'center'
            //     },
            //     // abg: {
            //     //     backgroundColor: '#333',
            //     //     width: '100%',
            //     //     align: 'right',
            //     //     height: 22,
            //     //     borderRadius: [4, 4, 0, 0]
            //     // },
            //     hr: {
            //         borderColor: '#aaa',
            //         width: '100%',
            //         borderWidth: 0.5,
            //         height: 0
            //     },
            //     b: {
            //         fontSize: 16,
            //         lineHeight: 33
            //     },
            //     per: {
            //         color: '#eee',
            //         backgroundColor: '#334455',
            //         padding: [2, 4],
            //         borderRadius: 2
            //     }
            // }
          },
          data: data2
        }
      ]
    });
    const data3 = [
      {
        name: '中小微企业',
        value: 5
      },
      {
        name: '发债帮扶民营企业',
        value: 10
      },
      {
        name: '重优农业企业',
        value: 14
      },
      {
        name: '国高企业',
        value: 19
      },
      {
        name: '重优流通企业',
        value: 24
      },
      {
        name: '省科中小企业',
        value: 29
      }
    ];
    myChart10.setOption({
      backgroundColor: '#2c343c',

      title: {
        text: '玫瑰饼图 / 环图',
        subtext: '自行切换饼图环图案例',
        left: 'center',
        top: 20,
        textStyle: {
          color: '#ccc'
        }
      },

      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },

      visualMap: {
        show: false,
        min: 1,
        max: 100,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          // radius: '55%', // 饼图
          radius: ['10%', '50%'], // 环图
          center: ['50%', '50%'],
          data: data3.sort(function (a, b) {
            return a.value - b.value;
          }),
          // 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
          roseType: 'radius', //  'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
          // roseType: 'area', // 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
          label: {
            color: 'rgba(255, 255, 255, 0.3)'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200;
          }
        }
      ],
      color: [
        'rgba(0, 140, 239, 1)',
        'rgba(254, 151, 0, 1)',
        'rgba(255, 54, 0, 1)',
        'rgba(77, 214, 140, 1)',
        'rgba(0, 90, 255, 1)',
        'rgba(0,191,254,1)'
      ]
    });
    const data4 = {
      entCount: 5,
      amount: 0.27,
      rate: 83.33
    };
    myChartA.setOption({
      legend: {
        data: ['单笔授信500万以下占全部授信企业比重'],
        itemWidth: 14,
        itemHeight: 14,
        bottom: 0,
        textStyle: {
          color: '#333'
        }
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '35%',
          style: {
            text: data4.rate + '%',
            fontSize: 22,
            fill: '#333'
          }
        },
        {
          type: 'text',
          left: 'center',
          top: '45%',
          style: {
            text: data4.entCount + '家企业',
            fill: '#333',
            fontSize: 16,
            fontWeight: 'normal'
          }
        }
      ],
      series: [
        {
          name: '融资规模统计',
          type: 'pie',
          radius: ['55%', '60%'],
          center: ['50%', '40%'],
          label: {
            normal: {
              formatter: '{c}亿元',
              fontSize: 20,
              color: '#333'
            }
          },
          data: [
            {
              value: data4.amount.toFixed(2),
              selected: true,
              name: '单笔授信500万以下占全部授信企业比重',
              label: {
                show: true
              },
              labelLine: {
                show: true
              },
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
                        color:
														'rgba(0, 204, 255, 1)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color:
														'rgba(0, 90, 255, 1)' // 100% 处的颜色
                      }
                    ]
                  ),
                  // 圆角
                  borderColor: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color:
														'rgba(0, 204, 255, 1)' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color:
														'rgba(0, 90, 255, 1)' // 100% 处的颜色
                      }
                    ]
                  ),
                  borderWidth: 15,
                  shadowColor:
											'rgba(255, 255, 255, 0.35)',
                  shadowBlur: 12
                }
              }
            },
            {
              // 空缺处
              value: (
                data4.amount / (data4.rate / 100) -
									data4.amount
              ).toFixed(2),
              name: '',
              label: {
                show: false
              },
              itemStyle: {
                normal: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  },
                  color: 'rgba(0, 0, 0, 0)',
                  borderColor: 'rgba(0, 0, 0, 0)',
                  borderWidth: 0
                },
                emphasis: {
                  label: {
                    show: false
                  },
                  labelLine: {
                    show: false
                  }
                }
              }
            }
          ]
        },
        {
          // 底色
          type: 'pie',
          radius: ['52%', '62%'],
          center: ['50.5%', '42%'],
          hoverAnimation: false,
          data: [
            {
              value: 100,
              itemStyle: {
                color: 'rgba(44, 84, 151, 0.8)'
              },
              emphasis: {
                show: false
              }
            }
          ],
          labelLine: {
            show: false
          },
          z: 0
        }
      ]
    });
    var os_age = [
      '0~18岁',
      '19~24岁',
      '25~34岁',
      '35~44岁',
      '45~54岁',
      '55~64岁',
      '65~75岁',
      '75岁上'
    ];
    var os_agevalue = [0, 2, 3, 18, 4, 2, 2, 1];
    myChartB.setOption({
      grid: {
        top: '10%',
        bottom: '10%',
        right: '10%',
        left: '10%'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: os_age,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: {
        name: '年龄段统计',
        type: 'value',
        position: 'left',
        splitNumber: 5,
        axisLine: {
          show: false
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
      series: [
        {
          type: 'pictorialBar',
          barCategoryGap: '0%',
          // 不重复图形
          symbolRepeat: false,
          // svg 矢量图
          symbol:
							'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          label: {
            show: true,
            position: 'top',
            distance: 15,
            color: '#2D8CF0',
            fontWeight: 'bolder',
            fontSize: 20
          },
          itemStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(45, 140, 240, .8)' //  0%  处的颜色
                  },
                  {
                    offset: 1,
                    color: 'rgba(45, 140, 240, .1)' //  100%  处的颜色
                  }
                ],
                global: false //  缺省为  false
              }
            },
            emphasis: {
              opacity: 1
            }
          },
          data: os_agevalue
        }
      ]
    });
    var ageDataLeft = [];
    var ageDataRight = [];

    os_agevalue.forEach((item) => {
      ageDataLeft.push({
        value: item,
        // 设置偏移量
        symbolOffset: ['-20%', 0]
      });
      ageDataRight.push({
        value: item,
        // 设置偏移量
        symbolOffset: ['20%', 0]
      });
    });
    myChartC.setOption({
      grid: {
        top: '10%',
        bottom: '10%',
        right: '10%',
        left: '10%'
      },
      calculable: false,
      xAxis: {
        type: 'category',
        data: os_age,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#fff'
          }
        }
      },
      yAxis: [
        {
          name: '左侧列表',
          type: 'value',
          position: 'left',
          splitNumber: 5,
          axisLine: {
            show: false
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
          name: '右侧列表',
          type: 'value',
          position: 'right',
          splitNumber: 5,
          axisLine: {
            show: false
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

      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>{a0}：{c0}%<br/>{a1}：{c1}笔'
      },
      series: [
        {
          name: '左侧象形柱图',
          type: 'pictorialBar',
          // 不重复图形
          symbolRepeat: false,
          symbol:
							'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              color: '#FFEE72'
            }
          },
          data: ageDataLeft
        },
        {
          name: '右侧象形柱图',
          type: 'pictorialBar',
          // 不重复图形
          symbolRepeat: false,
          // 一定要写，不然右侧的y轴不会显示
          // yAxisIndex: 1,
          symbol:
							'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
          itemStyle: {
            normal: {
              color: '#1563EF'
            }
          },
          data: ageDataRight
        }
      ]
    });
    myChartD.setOption({
      backgroundColor: '#101a3c',
      grid: {
        left: '10%',
        top: 10,
        bottom: 10
      },
      tooltip: {
        trigger: 'item',
        textStyle: {
          fontSize: 14
        },
        formatter: '{b0}:{c0}'
      },
      xAxis: {
        splitLine: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      yAxis: [
        {
          type: 'category',
          inverse: false,
          data: [
            '山西',
            '四川',
            '西藏',
            '北京',
            '上海',
            '内蒙古',
            '云南',
            '黑龙江',
            '广东',
            '江苏'
          ],
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 16.25
            }
          }
        }
      ],
      series: [
        {
          type: 'pictorialBar',
          symbol:
							'path://M1017.66787896 459.89818156L836.57696927 644.21818156 879.34060614 904.72727281c6.10909125 36.82909125-17.45454563 71.91272719-52.71272719 78.37090875a62.4 62.4 0 0 1-41.45454562-6.89454562l-224.29090875-123.05454469-223.85454563 122.79272719a63.53454563 63.53454563 0 0 1-87.62181843-28.45090969 70.34181844 70.34181844 0 0 1-6.45818157-42.93818156l42.76363594-260.59636313L104.53333333 459.89818156a69.90545437 69.90545437 0 0 1-1.13454563-95.91272719 64.05818156 64.05818156 0 0 1 37.09090969-19.72363593l250.47272719-37.87636407L502.67151489 69.78909125A64.23272719 64.23272719 0 0 1 560.88242458 32c24.69818156 0 47.12727281 14.57454563 58.03636313 37.78909125l111.97090968 236.77090875 250.29818157 37.96363594c35.52 5.23636406 60.21818156 39.53454562 55.24363593 76.5381825a68.94545438 68.94545438 0 0 1-18.67636312 38.83636312z',
          symbolRepeat: true,
          symbolMargin: '5%',
          symbolClip: 'true',
          symbolSize: 20,
          symbolPosition: 'start',

          label: {
            normal: {
              show: true,
              position: 'insideRight',
              offset: [40, 0],
              color: '#fff',
              formatter: function (params) {
                return params.value;
              }
            }
          },
          itemStyle: {
            normal: {
              color: 'skyblue'
            }
          },
          data: [
            11233,
            23212,
            21267,
            18211,
            18346,
            19324,
            13266,
            12220,
            10249,
            9262
          ]
        }
      ]
    });
  },
  methods: {}
};
</script>

<style lang="less" scoped>
  .echarts-all {
    height: auto;
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
  }
</style>
