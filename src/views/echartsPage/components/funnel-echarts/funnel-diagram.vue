<template>
  <div class="cashFunnel">
    <div class="funnel_left" ref="funnelChart"></div>
  </div>
</template>

<script>
const echarts = require('echarts');
export default {
  name: 'FunnelDiagram',
  data () {
    return {
      funnelChart: null,
      payNum: '',
      endNum: '',
      applyNum: ''
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
      this.payNum = value.payNum;
      this.endNum = value.endNum;
      this.applyNum = value.applyNum;
      // this.initChart();
    }
  },
  mounted () {
    this.funnelChart = echarts.init(this.$refs.funnelChart);

    window.addEventListener('resize', () => {
      this.funnelChart.resize();
    });
    this.payNum = this.policyPayFunnelPlot.payNum;
    this.endNum = this.policyPayFunnelPlot.endNum;
    this.applyNum = this.policyPayFunnelPlot.applyNum;
    this.initChart();
  },
  methods: {
    initChart () {
      const option = this.getOption(this.xdata, this.ydata1);
      this.funnelChart.setOption(option, true);
    },
    getOption (xdata, ydata1, ydata2) {
      const options = {
        color: ['#006BFF', '#10EDFF', '#0AF587'],
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params);
            const text = `${params.data.name}：` + `${params.data.data}`;
            return text;
          }
        },
        legend: {
          data: ['已申报企业数', '已办结企业数', '完成兑付企业数'],
          orient: 'vertical',
          right: '9%',
          top: '33%',
          icon: 'rect',
          itemWidth: 20,
          itemHeight: 20,
          itemGap: 12,
          textStyle: {
            fontSize: 20,
            color: 'rgba(0, 0, 0, 100)'
          }
        },
        series: [
          {
            name: '漏斗图',
            type: 'funnel',
            gap: 20,
            top: '10%',
            bottom: '10%',
            left: '0',
            width: '50%',
            min: 40,
            max: 100,
            minSize: '20%',
            maxSize: '100%',
            sort: 'descending',
            label: {
              show: true,
              position: 'inside',
              fontSize: 20,
              formatter: function (params) {
                let text = '';
                switch (params.dataIndex) {
                  case 0:
                    text = `${params.data.data}` + '家';
                    break;
                  case 1:
                    text = `${params.data.data}` + '家';
                    break;
                  case 2:
                    text = `${params.data.data}` + '家';
                    break;
                }
                return text;
              },
              rich: {
                value1: {
                  color: '#000',
                  fontWeight: 700,
                  fontFamily: 'Camar'
                },
                value2: {
                  color: '#000',
                  fontWeight: 700,
                  fontFamily: 'Camar'
                },
                value3: {
                  color: '#000',
                  fontWeight: 700,
                  fontFamily: 'Camar'
                }
              }
            },
            itemStyle: {
              borderColor: '#000',
              borderWidth: 0
            },
            emphasis: {
              itemStyle: {
                color: '#999'
              }
            },
            data: [
              {
                value: 100,
                data: this.applyNum,
                name: '已申报企业数'
              },
              {
                value: 80,
                data: this.endNum,
                name: '已办结企业数'
              },
              {
                value: 60,
                data: this.payNum,
                name: '完成兑付企业数'
              }
            ]
          }
        ]
      };
      return options;
    }
  }
};
</script>

<style scoped lang="less">
.cashFunnel {
  width: 100%;
  height: calc(100% - 20px);
  .funnel_left {
    width: 100%;
    height: 100%;
  }
}
</style>
