<template>
  <div class="cashFunnel">
    <div class="dashboard_right" ref="dashboardChart"></div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  name: 'Semicircle',
  data () {
    return {
      dashboardChart: null
    };
  },
  props: {
    policyPayFunnelPlot: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    policyPayFunnelPlot (value) {
      this.payRate = ((value.payRate || 0) * 100).toFixed(2);
      this.initChart();
    }
  },
  mounted () {
    this.dashboardChart = echarts.init(this.$refs.dashboardChart);
    window.addEventListener('resize', () => {
      this.dashboardChart.resize();
    });
    this.payRate = ((this.policyPayFunnelPlot.payRate || 0) * 100).toFixed(2);
    this.initChart();
  },
  methods: {
    initChart () {
      const dashboardOption = this.getDashboardOption();
      this.dashboardChart.setOption(dashboardOption);
    },
    getDashboardOption () {
      var title = '申报兑现率';
      var colorJB = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: '#FFFFFF'
        },
        {
          offset: 1,
          color: '#0AF587'
        }
      ]);
      const option = {
        series: [
          { // 内层刻度展示
            type: 'gauge',
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            splitNumber: 5, // 刻度数量
            radius: '73%',
            center: ['50%', '75%'],
            axisLine: {
              show: true,
              lineStyle: {
                color: '#999'
              }
            },
            detail: {
              show: true,
              color: '#000',
              fontSize: 30,
              offsetCenter: [0, '-30%'],
              formatter: function (value) {
                return value + '%';
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#979797',
                width: 1
              }
            },
            splitLine: {
              show: true,
              length: 10,
              lineStyle: {
                color: '#979797',
                width: 1
              }
            },
            axisLabel: {
              show: false // 刻度上对应的数值不显示
            },
            pointer: {
              show: false,
              width: 4,
              length: '70%'
            },
            itemStyle: {
              color: '#fff'
            },
            data: [
              {
                value: this.payRate
              }
            ]
          },
          { // 外层值圆环展示
            type: 'gauge',
            radius: '100%',
            center: ['50%', '75%'],
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: 100,
            title: {
              show: false
            },
            detail: {
              show: true,
              offsetCenter: [0, 0], // 文案位置设置
              textStyle: {
                fontSize: 20,
                color: '#000'
              },
              formatter: function () {
                return title;
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 30, // 设置饼图宽度
                color: [
                  [this.payRate / 100, colorJB],
                  [1, '#E0F0FF']
                ]
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            pointer: {
              show: false
            }
          }
        ]
      };
      return option;
    }
  }
};
</script>

<style scoped lang="less">
.cashFunnel {
  width: 100%;
  height: calc(100% - 20px);
  .dashboard_right {
    width: 100%;
    height: 100%;
  }
}
</style>
