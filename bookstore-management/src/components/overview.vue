<template>
  <div class="overview_container page-content">
    统计概览页面
    <!-- <div :id="id" style="width:100%" /> -->
    <div id="lineCharts" style="width:100%" />
  </div>
</template>

<script>
export default {
  name: 'Overview',
  created () {
    this.id = Math.random().toString(36).substr(2);
  },
  mounted () {
    this.drawLine()
  },
  data () {
    return {
      id: '',
      myChart: null,
    }
  },
  methods: {
    drawLine () {
      let myChart = this.$echarts.init(document.getElementById('lineCharts'));
      myChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
          }
        ]
      });
    }
  },
}
</script>

<style lang="scss" scoped>
</style>>